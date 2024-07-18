<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Attribute\Route;
use Doctrine\ORM\EntityManagerInterface;
use App\Entity\Event;
use Symfony\Component\HttpFoundation\Request;
use App\Service\Token\TokenDecoder;
use App\Entity\EventType;
use App\Service\Requests\RequestService;
use Symfony\Contracts\HttpClient\HttpClientInterface;

//https://symfony.com/doc/current/service_container/request.html
class EventController extends AbstractController
{
    #[Route('/event/new', name: 'app_new_event')]
    public function postEvent(EntityManagerInterface $entityManager, Request $request, HttpClientInterface $client): JsonResponse
    {
        $token_decoder = new TokenDecoder('secret');
        $token = $request->headers->get('token');
        if (!$token) {
            return $this->json([
                'message' => 'Unauthorized',
                'path' => 'src/Controller/EventController.php',
            ], 401);
        } else {
            $token = $token_decoder->decode($token);
            if (!$token) {
                return $this->json([
                    'message' => 'Unauthorized',
                    'path' => 'src/Controller/EventController.php',
                ], 401);
            } else {
                $request_params = json_decode($request->getContent(), true)['event'];
                $new_event = new Event();
                $event_type = $entityManager->getRepository(EventType::class)->find($request_params['type']);
                $new_event->setType($event_type);
                $new_event->setUserId($token['id']);
                $new_event->setTitle($request_params['title']);
                $new_event->setContent($request_params['description']);
                $new_event->setCreatedAt(new \DateTime());
                $new_event->setRecurrent($request_params['recurrent']);
                $entityManager->persist($new_event);
                $entityManager->flush();

                $file_request = new RequestService($client);
                $file_response = $file_request->postMedia($request_params['media'], $new_event->getId());
                if ($file_response['status'] !== 'ok') {
                    return $this->json([
                        'message' => 'Error uploading media',
                        'path' => 'src/Controller/EventController.php',
                    ], 500);
                } else {
                    return $this->json([
                        'message' => 'Event created',
                        'id' => $new_event->getId(),
                    ], 201);
                }
            }
        }
    }

    #[Route('/events', name: 'app_all_events')]
    public function getEvents(EntityManagerInterface $entityManager, Request $request, HttpClientInterface $client): JsonResponse
    {
        $request_params = $request->query->all();
        if(count($request_params) > 0) {
            $events = $entityManager->getRepository(Event::class)->findBy($request_params);
        } else {
            $events = $entityManager->getRepository(Event::class)->findAll();
        }

        $eventData = [];
        foreach ($events as $event) {
            $file_request = new RequestService($client);
            $file_response = $file_request->getMedia(['table' => 'event', 'id' => $event->getId()]);
            // if (!$file_response) {
            //     return $this->json([
            //         'message' => 'Error getting media',
            //         'path' => 'src/Controller/EventController.php',
            //     ], 500);
            // } else {
            //     $event->setMedia($file_response);
            // }
            $event_dates = $event->getEventDates();
            $subEvents = [];
            foreach ($event_dates as $event_date) {
                $subEvents[] = [
                    'id' => $event_date->getId(),
                    'start_date' => $event_date->getStartDate()->format('Y-m-d H:i'),
                    'end_date' => $event_date->getEndDate()->format('Y-m-d H:i'),
                    'address' => $event_date->getAddress(),
                    'created_at' => $event_date->getCreatedAt()->format('Y-m-d H:i'),
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
                'media' => $file_response
            ];
        }

        return $this->json($eventData, 200);
    }
}
