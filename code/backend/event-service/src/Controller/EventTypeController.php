<?php

namespace App\Controller;

use App\Crud\EventTypeCrud;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use App\Service\Token\TokenDecoder;

class EventTypeController extends AbstractController
{
    #[Route('/event/types', name: 'app_get_event_types')]
    public function index(EntityManagerInterface $entityManager, Request $request, EventTypeCrud $event_type): Response
    {
        $token_decoder = new TokenDecoder('secret');
        $token = $token_decoder->token_verify($request->headers->get('token'));
        if ($token == false) {
            return new JsonResponse(['error' => 'Unauthorized'], 401);
        } else {
            // $request_params = json_decode($request->getContent(), true)['event'];
            return $event_type->getEventType($entityManager);
        }
    }
}
