<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Doctrine\ORM\EntityManagerInterface;
use App\Entity\EventType;
use Symfony\Component\HttpFoundation\Request;

class EventTypeController extends AbstractController
{
    #[Route('/event/types', name: 'app_get_event_types')]
    public function index(EntityManagerInterface $entityManager, Request $request): Response
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
        return $this->json($event_types_arr);
    }
}
