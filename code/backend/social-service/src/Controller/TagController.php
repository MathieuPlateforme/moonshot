<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use App\Entity\Tag;

#[Route('/tag', name: 'tag_')]
class TagController extends AbstractController
{
    private EntityManagerInterface $entityManager;

    #[Route('/new', name: 'new', methods: ['POST'])]
    public function new(EntityManagerInterface $entityManager, Request $request)
    {
        $tag = new Tag();
        $tag
            ->setLabel($request->get('label'));

        $entityManager->persist($tag);
        $entityManager->flush();

        return new JsonResponse([
            'message' => 'Tag created',
            'id' => $tag->getId(),
        ], 201);
    }

    #[Route('/{id}', name: 'getone', methods: ['GET'])]
    public function get(EntityManagerInterface $entityManager, int $id)
    {
        $tag = $entityManager->getRepository(Tag::class)->find($id);

        if (!$tag) {
            return new JsonResponse([
                'message' => 'Tag not found',
            ], 404);
        }

        return new JsonResponse([
            'id' => $tag->getId(),
            'label' => $tag->getLabel(),
        ]);
    }

    #[Route('/{id}', name: 'deleteone', methods: ['DELETE'])]
    public function delete(EntityManagerInterface $entityManager, int $id)
    {
        $tag = $entityManager->getRepository(Tag::class)->find($id);

        if (!$tag) {
            return new JsonResponse([
                'message' => 'Tag not found',
            ], 404);
        }

        $entityManager->remove($tag);
        $entityManager->flush();

        return new JsonResponse([
            'message' => 'Tag deleted',
        ]);
    }

    #[Route('/{id}', name: 'updateone', methods: ['PUT'])]
    public function update(EntityManagerInterface $entityManager, int $id, string $content)
    {
        $tag = $entityManager->getRepository(Tag::class)->find($id);

        if (!$tag) {
            return new JsonResponse([
                'message' => 'Tag not found',
            ], 404);
        }

        $tag->setLabel($content);

        $entityManager->flush();

        return new JsonResponse([
            'message' => 'Tag updated',
        ]);
    }

    // #[Route('/search/{keywords}', name: 'search', methods: ['GET'])]
    // public function search(EntityManagerInterface $entityManager, array $keywords)
    // {
    //     $tags = $entityManager->getRepository(Tag::class)->findByKeywords($keywords, ["content" => "ASC"], 10);

    //     return new JsonResponse([
    //         'tags' => $tags,
    //     ]);
    // }

    // #[Route('/search/{content}', name: 'search', methods: ['GET'])]
    // public function search(string $content)
    // {
    //     $tags = $this->entityManager->getRepository(Tag::class)->findBy(['content' => $content]);

    //     if (!$tags) {
    //         return new JsonResponse([
    //             'message' => 'Tags not found',
    //         ], 404);
    //     }

    //     $response = [];
    //     foreach ($tags as $tag) {
    //         $response[] = [
    //             'id' => $tag->getId(),
    //             'content' => $tag->getContent(),
    //             'status' => $tag->getStatus(),
    //             'views' => $tag->getViews(),
    //             'authorId' => $tag->getAuthorId(),
    //             'eventId' => $tag->getEventId(),
    //         ];
    //     }

    //     return new JsonResponse($response);
    // }

 
}
