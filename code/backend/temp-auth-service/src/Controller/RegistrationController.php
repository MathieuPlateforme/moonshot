<?php

namespace App\Controller;

use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Routing\Attribute\Route;

class RegistrationController extends AbstractController
{
    #[Route('/register', name: 'app_register')]
    public function register(Request $request, UserPasswordHasherInterface $userPasswordHasher, EntityManagerInterface $entityManager): Response
    {
        $request_params = json_decode($request->getContent(), true);
        $user = new User();
        $user->setFirstname($request_params['firstName']);
        $user->setLastname($request_params['lastName']);
        $user->setUsername($request_params['username']);
        $user->setEmail($request_params['email']);
        $user->setPassword(
        $userPasswordHasher->hashPassword($user, $request_params['password'])
        );
        $user->setRoles(['USER']);
        
            $entityManager->persist($user);
            $entityManager->flush();
            
            if($entityManager->contains($user)){
                return new Response('User created', 201, ['Content-Type' => 'application/json']);
            }
            else {
                return new Response('User not created', 500);
            }
    }
}
