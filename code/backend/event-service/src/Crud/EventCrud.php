<?php

namespace App\Crud;

use Symfony\Component\HttpFoundation\JsonResponse;
use Doctrine\ORM\EntityManagerInterface;
use App\Entity\Event;
use Symfony\Component\HttpFoundation\Request;
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

    public function getEvent(array $request_params, int $user_id, EntityManagerInterface $entityManager, HttpClientInterface $client): JsonResponse
    {
        if (count($request_params) > 0) {
            $events = $entityManager->getRepository(Event::class)->findBy($request_params);
        } else {
            $events = $entityManager->getRepository(Event::class)->findAll();
        }

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
            ];
        }
        return new JsonResponse($eventData, 200);
    }
}
