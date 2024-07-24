<?php

namespace App\Crud;

use Symfony\Component\HttpFoundation\JsonResponse;
use Doctrine\ORM\EntityManagerInterface;
use App\Entity\Event;
use App\Entity\EventDateParticipants;
use Symfony\Contracts\HttpClient\HttpClientInterface;
use App\Entity\EventDate;

//https://symfony.com/doc/current/service_container/request.html
class EventParticipantCrud
{
    public function postEventParticipant(array $request_params, int $user_id, EntityManagerInterface $entityManager, HttpClientInterface $client): JsonResponse
    {
        $event_date = $entityManager->getRepository(EventDate::class)->find($request_params['event_date_id']);
        $today = new \DateTime();

        if ($event_date->getStartDate() > $today) {
            $new_participant = new EventDateParticipants();
            $new_participant->setEventDate($event_date);
            $new_participant->setUserId($user_id);
            $new_participant->setCreatedAt(new \DateTime());
            $entityManager->persist($new_participant);
            $entityManager->flush();

            return new JsonResponse([
                'message' => 'Participant added',
                'id' => $new_participant->getId(),
            ], 201);
        }
        else {
            return new JsonResponse([
                'message' => 'Event date has passed',
            ], 400);
        }
    }

    public function getEventDateParticipants(array $request_params, EntityManagerInterface $entityManager, HttpClientInterface $client): JsonResponse
    {
        $participants = $entityManager->getRepository(EventDateParticipants::class)->FindAllWithParams($request_params);
        $response = [];
        foreach ($participants as $participant) {
            $event_date = $entityManager->getRepository(EventDate::class)->find($participant->getEventDate()->getId());
            $event = $entityManager->getRepository(Event::class)->find($event_date->getEvent()->getId());
            $event_data = [
                'event_title' => $event->getTitle(),
                'event_start_date' => $event_date->getStartDate(),
                'event_end_date' => $event_date->getEndDate(),
            ];
            $response[] = [
                'id' => $participant->getId(),
                'user_id' => $participant->getUserId(),
                'created_at' => $participant->getCreatedAt(),
                'event_data' => $event_data,
            ];
        }

        return new JsonResponse($response, 200);
    }

    public function deleteEventParticipant(int $id, EntityManagerInterface $entityManager): JsonResponse
    {
        $participant = $entityManager->getRepository(EventDateParticipants::class)->find($id);
        $entityManager->remove($participant);
        $entityManager->flush();

        return new JsonResponse([
            'message' => 'Participant deleted',
        ], 200);
    }
}
