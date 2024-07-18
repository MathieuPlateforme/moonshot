<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Doctrine\ORM\EntityManagerInterface;
use App\Entity\User;
use App\Repository\UserRepository;
use App\Service\Token\TokenEncoder;

class LoginController extends AbstractController
{
    #[Route('/tempLogin', name: 'app_loginnn')]
    public function index(Request $request, UserPasswordHasherInterface $userPasswordHasher, EntityManagerInterface $entityManager, UserRepository $userRepository): Response
    {
        $request_params = json_decode($request->getContent(), true);

        $user_match = $userRepository->findOneBy(['email' => $request_params['email']]);
        if($user_match){
            if($userPasswordHasher->isPasswordValid($user_match, $request_params['password'])){
                // return new Response('User logged in', 200, ['Content-Type' => 'application/json']);
                $token = new TokenEncoder('secret');
                $token = $token->encode('100 hour', $user_match->getId(), $user_match->getRoles()[0]);
                return new Response($token, 200, ['Content-Type' => 'application/json']);
            }
            else {
                return new Response('Invalid password', 401);
            }
        }
        else {
            return new Response('User not found', 404);
        }

        return $this->render('login/index.html.twig', [
            'controller_name' => 'LoginController',
        ]);
    }
}
