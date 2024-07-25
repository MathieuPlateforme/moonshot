<?php

namespace App\Crud;

use Symfony\Component\HttpFoundation\JsonResponse;
use Doctrine\ORM\EntityManagerInterface;
use App\Entity\Event;
use App\Entity\EventType;
use App\Service\Requests\RequestService;
use Symfony\Contracts\HttpClient\HttpClientInterface;

//https://symfony.com/doc/current/service_container/request.html
class EventCrud
{
    public function postEvent(array $request_params, int $user_id, EntityManagerInterface $entityManager, HttpClientInterface $client): JsonResponse
    {
        $new_event = new Event();
        $event_type = $entityManager->getRepository(EventType::class)->find($request_params['type']);
        $new_event->setType($event_type);
        $new_event->setUserId($user_id);
        $new_event->setTitle($request_params['title']);
        $new_event->setContent($request_params['description']);
        $new_event->setCreatedAt(new \DateTime());
        $new_event->setRecurrent($request_params['recurrent']);
        $entityManager->persist($new_event);
        $entityManager->flush();

        $file_request = new RequestService($client);
        $file_response = $file_request->postMedia($request_params['media'], $new_event->getId());
        if ($file_response['status'] !== 'ok') {
            return new JsonResponse([
                'message' => 'Error uploading media',
                'path' => 'src/Controller/EventController.php',
            ], 500);
        } else {
            return new JsonResponse([
                'message' => 'Event created',
                'id' => $new_event->getId(),
            ], 201);
        }
    }

    public function getEvent(array $request_params, EntityManagerInterface $entityManager, HttpClientInterface $client, int $user_id): JsonResponse
    {
        $load_participants = false;
        $limit = 0;
        $offset = 0;

        if (array_key_exists('limit', $request_params)) {
            $limit = $request_params['limit'];
            unset($request_params['limit']);
        }

        if (array_key_exists('offset', $request_params)) {
            $offset = $request_params['offset'];
            unset($request_params['offset']);
        }

        if (array_key_exists('participants', $request_params)) {
            $load_participants = true;
            $participants_list = [];
            unset($request_params['participants']);
        }

        if (count($request_params) > 0) {
            $events = $entityManager->getRepository(Event::class)->FindAllWithParams($request_params, $limit, $offset);
        } else {
            $events = $entityManager->getRepository(Event::class)->findAllWithLimitAndOffset($limit, $offset);
        }

        $eventData = [];
        foreach ($events as $event) {
            $file_request = new RequestService($client);
            $file_response = $file_request->getMedia(['table' => 'event', 'id' => $event->getId()]);
            $event_dates = $event->getEventDates();
            // if(count($event_dates) == 0){
            //     continue;
            // }
            $subEvents = [];
            $total_participants = 0;
            $today_date = new \DateTime();
            foreach ($event_dates as $event_date) {
                if ($event_date->getStartDate() > $today_date) {
                    $participants = $event_date->getEventDateParticipants();
                    $user_is_subscribed = false;
                    foreach ($participants as $participant) {
                        if ($participant->getUserId() == $user_id) {
                            $user_is_subscribed = true;
                        }
                    }
                    $total_participants += count($participants);
                    $subEvents[] = [
                        'id' => $event_date->getId(),
                        'start_date' => $event_date->getStartDate()->format('Y-m-d H:i'),
                        'end_date' => $event_date->getEndDate()->format('Y-m-d H:i'),
                        'address' => $event_date->getAddress(),
                        'created_at' => $event_date->getCreatedAt()->format('Y-m-d H:i'),
                        'is_subscribed' => $user_is_subscribed,
                        'participants' => count($participants),
                    ];
                    if ($load_participants) {
                        foreach ($participants as $participant) {
                            $participants_list[] = [
                                'id' => $participant->getId(),
                                'user_id' => $participant->getUserId(),
                                'event_date_id' => $participant->getEventDate()->getId(),
                                'created_at' => $participant->getCreatedAt()->format('Y-m-d H:i'),
                            ];
                        }
                    }
                }
            }

            if (count($subEvents) > 1) {
                usort($subEvents, function ($a, $b) {
                    $aStartDate = new \DateTime($a['start_date']);
                    $bStartDate = new \DateTime($b['start_date']);
                    return $aStartDate <=> $bStartDate;
                });
            }

            $eventData[] = [
                'id' => $event->getId(),
                'type' => $event->getType()->getName(),
                'user_id' => $event->getUserId(),
                'title' => $event->getTitle(),
                'description' => $event->getContent(),
                'createdAt' => $event->getCreatedAt()->format('Y-m-d H:i'),
                'recurrent' => $event->isRecurrent(),
                'subEvents' => $subEvents,
                'media' => $file_response,
                'total_participants' => $total_participants,
                'offset' => $offset,
            ];
            if ($load_participants) {
                $eventData['participants'] = $participants_list;
            }
        }

        // foreach($eventData as $event){
        //     if(count($event['subEvents']) == 0){
        //         unset($event);
        //     }
        // }

        // if (count($eventData) > 2) {
        //     usort($eventData, function ($a, $b) {
        //         $aStartDate = new \DateTime($a['subEvents'][0]['start_date']);
        //         $bStartDate = new \DateTime($b['subEvents'][0]['start_date']);
        //         return $aStartDate <=> $bStartDate;
        //     });
        // }

        return new JsonResponse($eventData, 200);
    }

    public function getEventAutocomplete(array $request_params, EntityManagerInterface $entityManager, HttpClientInterface $client): JsonResponse
    {
        $load_participants = false;
        $limit = 0;
        $offset = 0;

        if (array_key_exists('limit', $request_params)) {
            $limit = $request_params['limit'];
            unset($request_params['limit']);
        }

        if (array_key_exists('offset', $request_params)) {
            $offset = $request_params['offset'];
            unset($request_params['offset']);
        }

        if (array_key_exists('participants', $request_params)) {
            $load_participants = true;
            $participants_list = [];
            unset($request_params['participants']);
        }

        // if (count($request_params) > 0) {       
        $events = $entityManager->getRepository(Event::class)->FindAllWithAutoComplete($request_params, $limit, $offset);
        // } else {
        //     $events = $entityManager->getRepository(Event::class)->findAllWithLimitAndOffset($limit, $offset);
        // }

        $eventData = [];
        foreach ($events as $event) {
            $file_request = new RequestService($client);
            $file_response = $file_request->getMedia(['table' => 'event', 'id' => $event->getId()]);
            $event_dates = $event->getEventDates();
            $subEvents = [];
            $total_participants = 0;
            foreach ($event_dates as $event_date) {
                $participants = $event_date->getEventDateParticipants();
                $total_participants += count($participants);
                $subEvents[] = [
                    'id' => $event_date->getId(),
                    'start_date' => $event_date->getStartDate()->format('Y-m-d H:i'),
                    'end_date' => $event_date->getEndDate()->format('Y-m-d H:i'),
                    'address' => $event_date->getAddress(),
                    'created_at' => $event_date->getCreatedAt()->format('Y-m-d H:i'),
                    'participants' => count($participants),
                ];
                if ($load_participants) {
                    foreach ($participants as $participant) {
                        $participants_list[] = [
                            'id' => $participant->getId(),
                            'user_id' => $participant->getUserId(),
                            'event_date_id' => $participant->getEventDate()->getId(),
                            'created_at' => $participant->getCreatedAt()->format('Y-m-d H:i'),
                        ];
                    }
                }
            }
            $eventData[] = [
                'id' => $event->getId(),
                'type' => $event->getType()->getName(),
                'user_id' => $event->getUserId(),
                'title' => $event->getTitle(),
                'description' => $event->getContent(),
                'createdAt' => $event->getCreatedAt()->format('Y-m-d H:i'),
                'recurrent' => $event->isRecurrent(),
                'subEvents' => $subEvents,
                'media' => $file_response,
                'total_participants' => $total_participants,
                'offset' => $offset,
            ];
            if ($load_participants) {
                $eventData['participants'] = $participants_list;
            }
        }
        return new JsonResponse($eventData, 200);
    }

    public function deleteEvent(int $event_id, EntityManagerInterface $entityManager, HttpClientInterface $client): JsonResponse
    {
        $event = $entityManager->getRepository(Event::class)->find($event_id);
        if ($event) {
            $file_request = new RequestService($client);
            $file_response = $file_request->deleteMedia($event_id);
            if ($file_response['status'] !== 'ok') {
                return new JsonResponse([
                    'message' => 'Error deleting media',
                    'path' => 'src/Controller/EventController.php',
                ], 500);
            } else {
                $entityManager->remove($event);
                $entityManager->flush();
                return new JsonResponse([
                    'message' => 'Event deleted',
                ], 200);
            }
        } else {
            return new JsonResponse([
                'message' => 'Event not found',
            ], 404);
        }
    }
}
