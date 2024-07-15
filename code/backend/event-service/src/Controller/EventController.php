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

class EventController extends AbstractController
{
    #[Route('/event/new', name: 'app_new_event')]
    public function postEvent(EntityManagerInterface $entityManager, Request $request): JsonResponse
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
                var_dump($request_params['media']);
                die;
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

                return $this->json([
                    'message' => 'Event created',
                    'id' => $new_event->getId(),
                ], 201);
            }
        }
    }

    #[Route('/events', name: 'app_all_events')]
    public function index(EntityManagerInterface $entityManager): JsonResponse
    {
        $events = $entityManager->getRepository(Event::class)->findAll();
        return $this->json([
            'message' => 'Welcome to your new controller!',
            'path' => 'src/Controller/EventController.php',
        ]);
    }
}
