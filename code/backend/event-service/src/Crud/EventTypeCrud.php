<?php

namespace App\Crud;

use Symfony\Component\HttpFoundation\JsonResponse;
use Doctrine\ORM\EntityManagerInterface;
use App\Entity\EventType;

//https://symfony.com/doc/current/service_container/request.html
class EventTypeCrud
{
    public function getEventType(EntityManagerInterface $entityManager): JsonResponse
    {
        $event_types = $entityManager->getRepository(EventType::class)->findAll();
        $event_types_arr = [];
        foreach ($event_types as $event_type) {
            $temp_event = [
                'id' => $event_type->getId(),
                'name' => $event_type->getName(),
            ];
            $event_types_arr[] = $temp_event;
        }
        return new JsonResponse($event_types_arr, 200);
    }

    public function deleteEventType(int $id, EntityManagerInterface $entityManager): JsonResponse
    {
        $participant = $entityManager->getRepository(EventType::class)->find($id);
        $entityManager->remove($participant);
        $entityManager->flush();

        return new JsonResponse([
            'message' => 'Event type deleted',
        ], 200);
    }
}
