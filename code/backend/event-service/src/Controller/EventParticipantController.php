<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Attribute\Route;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Contracts\HttpClient\HttpClientInterface;
use App\Crud\EventParticipantCrud;
use App\Service\Token\TokenDecoder;

class EventParticipantController extends AbstractController
{
    #[Route('/event/participant/new', name: 'app_event_new_participant')]
    public function addNewParticipant(EntityManagerInterface $entityManager, Request $request, HttpClientInterface $client, EventParticipantCrud $participant_crud): JsonResponse
    {
        $token_decoder = new TokenDecoder('secret');
        $token = $token_decoder->token_verify($request->headers->get('token'));
        if ($token == false) {
            return new JsonResponse(['error' => 'Unauthorized'], 401);
        } else {
            $request_params = json_decode($request->getContent(), true)['eventParticipant'];
            return $participant_crud->postEventParticipant($request_params, $token['id'], $entityManager, $client);
        }
    }

    #[Route('/event/participant/delete', name: 'app_event_delete_participant')]
    public function deleteParticipant(EntityManagerInterface $entityManager, Request $request, HttpClientInterface $client, EventParticipantCrud $participant_crud): JsonResponse
    {
        $token_decoder = new TokenDecoder('secret');
        $token = $token_decoder->token_verify($request->headers->get('token'));
        if ($token == false) {
            return new JsonResponse(['error' => 'Unauthorized'], 401);
        } else {
            $request_params = json_decode($request->getContent(), true);
            return $participant_crud->deleteEventParticipant($request_params['id'], $entityManager, $client);
        }
    }
}
