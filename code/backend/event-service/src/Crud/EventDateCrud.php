<?php

namespace App\Crud;

use Symfony\Component\HttpFoundation\JsonResponse;
use Doctrine\ORM\EntityManagerInterface;
use App\Entity\Event;
use App\Entity\EventDate;

//https://symfony.com/doc/current/service_container/request.html
class EventDateCrud
{
    public function postEventDate(array $request_params, EntityManagerInterface $entityManager): JsonResponse
    {
        $new_event_date = new EventDate();
        $event = $entityManager->getRepository(Event::class)->find($request_params['event_id']);
        $new_event_date->setEvent($event);
        $new_event_date->setStartDate(new \DateTime($request_params['start_date']));
        $new_event_date->setEndDate(new \DateTime($request_params['end_date']));
        $new_event_date->setAddress($request_params['address']);
        $new_event_date->setCreatedAt(new \DateTime());
        $entityManager->persist($new_event_date);
        $entityManager->flush();

        return new JsonResponse([
            'message' => 'Event Date created',
        ], 201);
    }

    public function deleteEventDate(int $id, EntityManagerInterface $entityManager): JsonResponse
    {
        $participant = $entityManager->getRepository(EventDate::class)->find($id);
        $entityManager->remove($participant);
        $entityManager->flush();

        return new JsonResponse([
            'message' => 'Event date deleted',
        ], 200);
    }
}
