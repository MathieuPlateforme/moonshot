<?php

namespace App\Crud;

use Symfony\Component\HttpFoundation\JsonResponse;
use Doctrine\ORM\EntityManagerInterface;
use App\Service\Requests\RequestService;
use Symfony\Contracts\HttpClient\HttpClientInterface;
use App\Entity\Relation;

class RelationCrud
{

    public function getRelations(array $params, EntityManagerInterface $entityManager, HttpClientInterface $client): JsonResponse
    {

        $relations = $entityManager->getRepository(Relation::class)->findAllWith($params);
        
        $request = new RequestService($client);

        $relations_data = [];

        foreach ($relations as $relation) {
            $relations_data[] = [
                'id' => $relation->getId(),
                'user1Id' => $request->getUser($relation->getUser1Id()),
                'user2Id' => $request->getUser($relation->getUser2Id()),
                'type' => $relation->getType(),
            ];
        }


        return new JsonResponse($relations_data, 200);
    }
}
