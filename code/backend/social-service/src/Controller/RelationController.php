<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use App\Entity\Relation;

#[Route('/relation', name: 'relation_')]
class RelationController extends AbstractController
{
    private EntityManagerInterface $entityManager;

    #[Route('/new', name: 'new', methods: ['POST'])]
    public function new(EntityManagerInterface $entityManager, Request $request)
    {
        $relation = new Relation();
        $relation
            ->setUser1Id($request->get('user1Id'))
            ->setUser2Id($request->get('user2Id'))
            ->setType($request->get('type')); // see \App\Config\Relation\Type

        $entityManager->persist($relation);
        $entityManager->flush();

        return new JsonResponse([
            'message' => 'Relation created',
            'id' => $relation->getId(),
        ], 201);
    }

    #[Route('/{id}', name: 'getone', methods: ['GET'])]
    public function get(EntityManagerInterface $entityManager, int $id)
    {
        $relation = $entityManager->getRepository(Relation::class)->find($id);

        if (!$relation) {
            return new JsonResponse([
                'message' => 'Relation not found',
            ], 404);
        }

        return new JsonResponse([
            'id' => $relation->getId(),
            'user1Id' => $relation->getUser1Id(),
            'user2Id' => $relation->getUser2Id(),
            'type' => $relation->getType(),
        ]);
    }

    #[Route('/{id}', name: 'deleteone', methods: ['DELETE'])]
    public function delete(EntityManagerInterface $entityManager, int $id)
    {
        $relation = $entityManager->getRepository(Relation::class)->find($id);

        if (!$relation) {
            return new JsonResponse([
                'message' => 'Relation not found',
            ], 404);
        }

        $entityManager->remove($relation);
        $entityManager->flush();

        return new JsonResponse([
            'message' => 'Relation deleted',
        ]);
    }

    #[Route('/{id}', name: 'updateone', methods: ['PUT'])]
    public function update(EntityManagerInterface $entityManager, int $id, string $content)
    {
        $relation = $entityManager->getRepository(Relation::class)->find($id);

        if (!$relation) {
            return new JsonResponse([
                'message' => 'Relation not found',
            ], 404);
        }

        $relation->setLabel($content);

        $entityManager->flush();

        return new JsonResponse([
            'message' => 'Relation updated',
        ]);
    }

    #[Route('/user', name: 'get_user_friends', methods: ['GET'])]
    public function getUserRelations(EntityManagerInterface $entityManager, int $id)
    {
        $relation = $entityManager->getRepository(Relation::class)->find($id);

        if (!$relation) {
            return new JsonResponse([
                'message' => 'Relation not found',
            ], 404);
        }

        return new JsonResponse([
            'id' => $relation->getId(),
            'user1Id' => $relation->getUser1Id(),
            'user2Id' => $relation->getUser2Id(),
            'type' => $relation->getType(),
        ]);
    }
}
