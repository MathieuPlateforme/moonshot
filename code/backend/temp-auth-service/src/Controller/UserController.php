<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use App\Entity\User;	
use Symfony\Component\HttpFoundation\JsonResponse;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use App\Service\Requests\RequestService;
use Symfony\Contracts\HttpClient\HttpClientInterface;
class UserController extends AbstractController
{
    #[Route('/user', name: 'app_user')]
    public function index(): Response
    {
        return $this->render('user/index.html.twig', [
            'controller_name' => 'UserController',
        ]);
    }

    #[Route('/user/{id}', name: 'app_user_by_id')]
    public function getUserById(int $id, EntityManagerInterface $entityManager, HttpClientInterface $client,): Response
    {
        $user = $entityManager->getRepository(User::class)->find($id);
        $file_request = new RequestService($client);
        $file_response = $file_request->getMedia(['table' => 'user', 'id' => $user->getId()]);

        return new JsonResponse([
            'id' => $user->getId(),
            'firstname' => $user->getFirstname(),
            'lastname' => $user->getLastname(),
            'username' => $user->getUsername(),
            'email' => $user->getEmail(),
            'media' => $file_response
        ], 200);
    }
}
