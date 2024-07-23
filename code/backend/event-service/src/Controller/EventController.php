<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Attribute\Route;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use App\Service\Token\TokenDecoder;
use Symfony\Contracts\HttpClient\HttpClientInterface;
use App\Crud\EventCrud;

//https://symfony.com/doc/current/service_container/request.html
class EventController extends AbstractController
{
    #[Route('/event/new', name: 'app_new_event')]
    public function postEvent(EntityManagerInterface $entityManager, Request $request, HttpClientInterface $client, EventCrud $event_crud): JsonResponse
    {

        $token_decoder = new TokenDecoder('secret');
        $token = $token_decoder->token_verify($request->headers->get('token'));
        if ($token == false) {
            return new JsonResponse(['error' => 'Unauthorized'], 401);
        } else {
            $request_params = json_decode($request->getContent(), true)['event'];
            return $event_crud->postEvent($request_params, $token['id'], $entityManager, $client);
        }
    }

    #[Route('/events', name: 'app_get_events')]
    public function getEvents(EntityManagerInterface $entityManager, Request $request, HttpClientInterface $client, EventCrud $event_crud): JsonResponse
    {
        $token_decoder = new TokenDecoder('secret');
        $token = $token_decoder->token_verify($request->headers->get('token'));
        if ($token == false) {
            return new JsonResponse(['error' => 'Unauthorized'], 401);
        } else {
            $request_params = $request->query->all();
            return $event_crud->getEvent($request_params, $entityManager, $client);
        }
    }

    #[Route('/event/delete', name: 'app_delete_event')]
    public function deleteEvent(EntityManagerInterface $entityManager, Request $request, HttpClientInterface $client, EventCrud $event_crud): JsonResponse
    {
        $token_decoder = new TokenDecoder('secret');
        $token = $token_decoder->token_verify($request->headers->get('token'));
        if ($token == false) {
            return new JsonResponse(['error' => 'Unauthorized'], 401);
        } else {
            $request_params = json_decode($request->getContent(), true);
            return $event_crud->deleteEvent($request_params['id'], $entityManager, $client);
        }
    }

    #[Route('/events/autocomplete', name: 'app_get_events_autocomplete')]
    public function getEventsAutoComplete(EntityManagerInterface $entityManager, Request $request, HttpClientInterface $client, EventCrud $event_crud): JsonResponse
    {
        $token_decoder = new TokenDecoder('secret');
        $token = $token_decoder->token_verify($request->headers->get('token'));
        if ($token == false) {
            return new JsonResponse(['error' => 'Unauthorized'], 401);
        } else {
            $request_params = $request->query->all();
            return $event_crud->getEventAutocomplete($request_params, $entityManager, $client);
        }
    }
}
