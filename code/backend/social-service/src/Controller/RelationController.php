<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Doctrine\ORM\EntityManagerInterface;
use App\Service\Token\TokenDecoder;
use App\Entity\Relation;
use Symfony\Contracts\HttpClient\HttpClientInterface;
use Symfony\Component\HttpFoundation\Request;
use App\Entity\Publication;
use App\Crud\RelationCrud;
use App\Config\Relation\Type;

#[Route('/relation', name: 'relation_')]
class RelationController extends AbstractController
{
    private EntityManagerInterface $entityManager;

    #[Route('/new', name: 'new', methods: ['POST'])]
    public function new(EntityManagerInterface $entityManager, Request $request)
    {
        $token_decoder = new TokenDecoder('secret');
        $token = $token_decoder->token_verify($request->headers->get('token'));
        if ($token == false) {
          return new JsonResponse(['error' => 'Unauthorized'], 401);
        }

        $request_params = json_decode($request->getContent(), true);
        var_dump($request_params);

        $relation = new Relation();
        $relation->setUser1Id($request_params['user1Id']);
        $relation->setUser2Id($request_params['user2Id']);
        switch ($request_params['type']) {
            case 'friend':
                $relation->setType(Type::Friend);
                break;
            case 'follower':
                $relation->setType(Type::Follower);
                break;
            case 'blacklist':
                $relation->setType(Type::Blacklist);
                break;
            default:
                return new JsonResponse(['error' => 'Invalid type'], 400);
        }
    
        $entityManager->persist($relation);
        $entityManager->flush();

        return new JsonResponse([
            'message' => 'Relation created',
            'id' => $relation->getId(),
        ], 201);
    }

    #[Route('/filter', name: 'filter', methods: ['GET'])]
    public function get(EntityManagerInterface $entityManager, Request $request, HttpClientInterface $client, RelationCrud $relation_crud): JsonResponse
    {

      $token_decoder = new TokenDecoder('secret');
      $token = $token_decoder->token_verify($request->headers->get('token'));

      if ($token == false) {
        return new JsonResponse(['error' => 'Unauthorized'], 401);
      } else {
        $request_params = $request->query->all();
        return $relation_crud->getRelations($request_params, $entityManager, $client);
      }
    }
 
}
