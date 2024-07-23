<?php

namespace App\Controller;

use App\Crud\EventDateCrud;
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
    public function postEventDate(EntityManagerInterface $entityManager, Request $request, EventDateCrud $event_date): JsonResponse
    {
        $token_decoder = new TokenDecoder('secret');
        $token = $token_decoder->token_verify($request->headers->get('token'));
        if ($token == false) {
            return new JsonResponse(['error' => 'Unauthorized'], 401);
        } else {
            $request_params = json_decode($request->getContent(), true)['eventDate'];
            return $event_date->postEventDate($request_params, $entityManager);
        }
    }
}
