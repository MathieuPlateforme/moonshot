<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use App\Entity\Comment;

#[Route('/comment', name: 'comment_')]
class CommentController extends AbstractController
{
    private EntityManagerInterface $entityManager;

    #[Route('/new', name: 'new', methods: ['POST'])]
    public function new(EntityManagerInterface $entityManager, Request $request)
    {
        $comment = new Comment();
        $comment
            ->setContent($request->get('content'))
            ->setAuthorId($request->get('userId'))
            ->setPublication($request->get('publication'))
            ->setCreatedAt(new \DateTime());

        $entityManager->persist($comment);
        $entityManager->flush();

        return new JsonResponse([
            'message' => 'Comment created',
            'id' => $comment->getId(),
        ], 201);
    }

    #[Route('/{id}', name: 'getone', methods: ['GET'])]
    public function get(EntityManagerInterface $entityManager, int $id)
    {
        $comment = $entityManager->getRepository(Comment::class)->find($id);

        if (!$comment) {
            return new JsonResponse([
                'message' => 'Comment not found',
            ], 404);
        }

        return new JsonResponse([
            'id' => $comment->getId(),
            'content' => $comment->getContent(),
            'authorId' => $comment->getAuthorId(),
            'publication' => $comment->getPublication()
        ]);
    }

    #[Route('/{id}', name: 'deleteone', methods: ['DELETE'])]
    public function delete(EntityManagerInterface $entityManager, int $id)
    {
        $comment = $entityManager->getRepository(Comment::class)->find($id);

        if (!$comment) {
            return new JsonResponse([
                'message' => 'Comment not found',
            ], 404);
        }

        $entityManager->remove($comment);
        $entityManager->flush();

        return new JsonResponse([
            'message' => 'Comment deleted',
        ]);
    }

    #[Route('/{id}', name: 'updateone', methods: ['PUT'])]
    public function update(EntityManagerInterface $entityManager, int $id, string $content)
    {
        $comment = $entityManager->getRepository(Comment::class)->find($id);

        if (!$comment) {
            return new JsonResponse([
                'message' => 'Comment not found',
            ], 404);
        }

        $comment->setContent($content);

        $entityManager->flush();

        return new JsonResponse([
            'message' => 'Comment updated',
        ]);
    }

    // #[Route('/search/{keywords}', name: 'search', methods: ['GET'])]
    // public function search(EntityManagerInterface $entityManager, array $keywords)
    // {
    //     $comments = $entityManager->getRepository(Comment::class)->findByKeywords($keywords, ["content" => "ASC"], 10);

    //     return new JsonResponse([
    //         'comments' => $comments,
    //     ]);
    // }

    // #[Route('/search/{content}', name: 'search', methods: ['GET'])]
    // public function search(string $content)
    // {
    //     $comments = $this->entityManager->getRepository(Comment::class)->findBy(['content' => $content]);

    //     if (!$comments) {
    //         return new JsonResponse([
    //             'message' => 'Comments not found',
    //         ], 404);
    //     }

    //     $response = [];
    //     foreach ($comments as $comment) {
    //         $response[] = [
    //             'id' => $comment->getId(),
    //             'content' => $comment->getContent(),
    //             'authorId' => $comment->getAuthorId(),
    //             'publicationId' => $comment->getPublicationId(),
    //         ];
    //     }

    //     return new JsonResponse($response);
    // }

 
}
