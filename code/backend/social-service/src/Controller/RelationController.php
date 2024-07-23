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
            ->setContent($request->get('content'))
            ->setAuthorId($request->get('userId'))
            ->setEventId($request->get('eventId'))
            ->setStatus(\App\Config\Relation\Status::Draft)
            ->setCreatedAt(new \DateTime())
            ->setViews(0);

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
            'label' => $relation->getLabel(),
            'status' => $relation->getStatus(),
            'views' => $relation->getViews(),
            'authorId' => $relation->getAuthorId(),
            'eventId' => $relation->getEventId(),
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

    // #[Route('/search/{keywords}', name: 'search', methods: ['GET'])]
    // public function search(EntityManagerInterface $entityManager, array $keywords)
    // {
    //     $relations = $entityManager->getRepository(Relation::class)->findByKeywords($keywords, ["content" => "ASC"], 10);

    //     return new JsonResponse([
    //         'relations' => $relations,
    //     ]);
    // }

    // #[Route('/search/{content}', name: 'search', methods: ['GET'])]
    // public function search(string $content)
    // {
    //     $relations = $this->entityManager->getRepository(Relation::class)->findBy(['content' => $content]);

    //     if (!$relations) {
    //         return new JsonResponse([
    //             'message' => 'Relations not found',
    //         ], 404);
    //     }

    //     $response = [];
    //     foreach ($relations as $relation) {
    //         $response[] = [
    //             'id' => $relation->getId(),
    //             'content' => $relation->getContent(),
    //             'status' => $relation->getStatus(),
    //             'views' => $relation->getViews(),
    //             'authorId' => $relation->getAuthorId(),
    //             'eventId' => $relation->getEventId(),
    //         ];
    //     }

    //     return new JsonResponse($response);
    // }

 
}
