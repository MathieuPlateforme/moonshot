<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Attribute\Route;
use Doctrine\ORM\EntityManagerInterface;
use App\Entity\Event;
use App\Entity\EventDate;
use App\Entity\EventType;
use Symfony\Component\HttpFoundation\Request;
use App\Service\Token\TokenDecoder;

class EventDateController extends AbstractController
{
    #[Route('/eventDate/new', name: 'app_new_event_date')]
    public function postEventDate(EntityManagerInterface $entityManager, Request $request): JsonResponse
    {

        $token_decoder = new TokenDecoder('secret');
        $token = $token_decoder->token_verify($request->headers->get('token'));
        if ($token == false) {
            return new JsonResponse(['error' => 'Unauthorized'], 401);
        } else {
            $request_params = json_decode($request->getContent(), true)['eventDate'];
            $new_event_date = new EventDate();
            $event = $entityManager->getRepository(Event::class)->find($request_params['event_id']);
            $new_event_date->setEvent($event);
            $new_event_date->setStartDate(new \DateTime($request_params['start_date']));
            $new_event_date->setEndDate(new \DateTime($request_params['end_date']));
            $new_event_date->setAddress($request_params['address']);
            $new_event_date->setCreatedAt(new \DateTime());
            $entityManager->persist($new_event_date);
            $entityManager->flush();

            return $this->json([
                'message' => 'Event Date created',
                // 'id' => $new_event_date->getId(),
            ], 201);
        }
    }
}
