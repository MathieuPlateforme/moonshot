<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use App\Entity\Publication;

#[Route('/publication', name: 'publication_')]
class PublicationController extends AbstractController
{
    private EntityManagerInterface $entityManager;

    #[Route('/new', name: 'new', methods: ['POST'])]
    public function new(EntityManagerInterface $entityManager, Request $request)
    {
        $publication = new Publication();
        $publication
            ->setContent($request->get('content'))
            ->setAuthorId($request->get('authorId'))
            ->setEventId($request->get('eventId'))
            ->setStatus(\App\Config\Publication\Status::Draft)
            ->setCreatedAt(new \DateTime())
            ->setViews(0);

        $entityManager->persist($publication);
        $entityManager->flush();

        return new JsonResponse([
            'message' => 'Publication created',
            'id' => $publication->getId(),
        ], 201);
    }

    #[Route('/{id}', name: 'getone', methods: ['GET'])]
    public function get(EntityManagerInterface $entityManager, int $id)
    {
        $publication = $entityManager->getRepository(Publication::class)->find($id);

        if (!$publication) {
            return new JsonResponse([
                'message' => 'Publication not found',
            ], 404);
        }

        return new JsonResponse([
            'id' => $publication->getId(),
            'content' => $publication->getContent(),
            'status' => $publication->getStatus(),
            'views' => $publication->getViews(),
            'authorId' => $publication->getAuthorId(),
            'eventId' => $publication->getEventId(),
        ]);
    }

    #[Route('/{id}', name: 'deleteone', methods: ['DELETE'])]
    public function delete(EntityManagerInterface $entityManager, int $id)
    {
        $publication = $entityManager->getRepository(Publication::class)->find($id);

        if (!$publication) {
            return new JsonResponse([
                'message' => 'Publication not found',
            ], 404);
        }

        $entityManager->remove($publication);
        $entityManager->flush();

        return new JsonResponse([
            'message' => 'Publication deleted',
        ]);
    }

    #[Route('/{id}', name: 'updateone', methods: ['PUT'])]
    public function update(EntityManagerInterface $entityManager, int $id, string $content)
    {
        $publication = $entityManager->getRepository(Publication::class)->find($id);

        if (!$publication) {
            return new JsonResponse([
                'message' => 'Publication not found',
            ], 404);
        }

        $publication->setContent($content);

        $entityManager->flush();

        return new JsonResponse([
            'message' => 'Publication updated',
        ]);
    }

    // #[Route('/search/{keywords}', name: 'search', methods: ['GET'])]
    // public function search(EntityManagerInterface $entityManager, array $keywords)
    // {
    //     $publications = $entityManager->getRepository(Publication::class)->findByKeywords($keywords, ["content" => "ASC"], 10);

    //     return new JsonResponse([
    //         'publications' => $publications,
    //     ]);
    // }

    // #[Route('/search/{content}', name: 'search', methods: ['GET'])]
    // public function search(string $content)
    // {
    //     $publications = $this->entityManager->getRepository(Publication::class)->findBy(['content' => $content]);

    //     if (!$publications) {
    //         return new JsonResponse([
    //             'message' => 'Publications not found',
    //         ], 404);
    //     }

    //     $response = [];
    //     foreach ($publications as $publication) {
    //         $response[] = [
    //             'id' => $publication->getId(),
    //             'content' => $publication->getContent(),
    //             'status' => $publication->getStatus(),
    //             'views' => $publication->getViews(),
    //             'authorId' => $publication->getAuthorId(),
    //             'eventId' => $publication->getEventId(),
    //         ];
    //     }

    //     return new JsonResponse($response);
    // }

 
}
