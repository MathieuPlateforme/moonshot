<?php

namespace App\Tests\Controller;

use App\Controller\LoginController;
use App\Entity\User;
use App\Repository\UserRepository;
use App\Service\Token\TokenEncoder;
use Doctrine\ORM\EntityManagerInterface;
use PHPUnit\Framework\TestCase;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use ReflectionClass;

class LoginControllerTest extends TestCase
{
    private $userRepository;
    private $passwordHasher;
    private $entityManager;
    private $tokenEncoder;
    private $controller;

    protected function setUp(): void
    {
        $this->userRepository = $this->createMock(UserRepository::class);
        $this->passwordHasher = $this->createMock(UserPasswordHasherInterface::class);
        $this->entityManager = $this->createMock(EntityManagerInterface::class);
        $this->tokenEncoder = new TokenEncoder('secret');

        $this->controller = new LoginController();
    }

    public function testLoginWithValidCredentials()
    {
        $user = new User();
        $user->setEmail('test@example.com');
        $user->setPassword(password_hash('password123', PASSWORD_DEFAULT));
        $user->setRoles(['ROLE_USER']);

        $reflection = new ReflectionClass($user);
        $property = $reflection->getProperty('id');
        $property->setAccessible(true);
        $property->setValue($user, 1);

        $this->userRepository->expects($this->once())
            ->method('findOneBy')
            ->with(['email' => 'test@example.com'])
            ->willReturn($user);

        $this->passwordHasher->expects($this->once())
            ->method('isPasswordValid')
            ->with($user, 'password123')
            ->willReturn(true);

        $request = new Request([], [], [], [], [], [], json_encode([
            'email' => 'test@example.com',
            'password' => 'password123'
        ]));

        $response = $this->controller->index($request, $this->passwordHasher, $this->entityManager, $this->userRepository);

        $this->assertInstanceOf(Response::class, $response);
        $this->assertEquals(200, $response->getStatusCode());

        $token = $response->getContent();
        $decodedId = $this->tokenEncoder->decode($token);
        $this->assertEquals('1', $decodedId);
    }

    public function testLoginWithInvalidPassword()
    {
        $user = new User();
        $user->setEmail('test@example.com');
        $user->setPassword(password_hash('password123', PASSWORD_DEFAULT));

        $this->userRepository->expects($this->once())
            ->method('findOneBy')
            ->with(['email' => 'test@example.com'])
            ->willReturn($user);

        $this->passwordHasher->expects($this->once())
            ->method('isPasswordValid')
            ->with($user, 'wrongpassword')
            ->willReturn(false);

        $request = new Request([], [], [], [], [], [], json_encode([
            'email' => 'test@example.com',
            'password' => 'wrongpassword'
        ]));

        $response = $this->controller->index($request, $this->passwordHasher, $this->entityManager, $this->userRepository);

        $this->assertInstanceOf(Response::class, $response);
        $this->assertEquals(401, $response->getStatusCode());
        $this->assertEquals('Invalid password', $response->getContent());
    }

    public function testLoginWithNonExistentUser()
    {
        $this->userRepository->expects($this->once())
            ->method('findOneBy')
            ->with(['email' => 'nonexistent@example.com'])
            ->willReturn(null);

        $request = new Request([], [], [], [], [], [], json_encode([
            'email' => 'nonexistent@example.com',
            'password' => 'password123'
        ]));

        $response = $this->controller->index($request, $this->passwordHasher, $this->entityManager, $this->userRepository);

        $this->assertInstanceOf(Response::class, $response);
        $this->assertEquals(404, $response->getStatusCode());
        $this->assertEquals('User not found', $response->getContent());
    }
}