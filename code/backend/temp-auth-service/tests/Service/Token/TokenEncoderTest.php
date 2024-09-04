<?php

namespace App\Tests\Service\Token;

use App\Service\Token\TokenEncoder;
use PHPUnit\Framework\TestCase;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;

class TokenEncoderTest extends TestCase
{
    private $tokenEncoder;
    private $jwtSecret = 'test_secret';

    protected function setUp(): void
    {
        $this->tokenEncoder = new TokenEncoder($this->jwtSecret);
    }

    public function testEncode()
    {
        $exp = '1 hour';
        $identifier = '123';
        $role = 'ROLE_USER';

        $token = $this->tokenEncoder->encode($exp, $identifier, $role);

        $this->assertIsString($token);

        // Décode le token pour vérifier le contenu
        $decoded = JWT::decode($token, new Key($this->jwtSecret, 'HS256'));

        $this->assertEquals($identifier, $decoded->id);
        $this->assertEquals($role, $decoded->role);
        $this->assertGreaterThan(time(), $decoded->exp);
        $this->assertLessThanOrEqual(time(), $decoded->nbf);
    }

    public function testDecode()
    {
        $identifier = '456';
        $token = JWT::encode([
            'exp'  => time() + 3600,
            'nbf'  => time(),
            'id' => $identifier,
            'role' => 'ROLE_ADMIN',
        ], $this->jwtSecret, 'HS256');

        $decodedId = $this->tokenEncoder->decode($token);

        $this->assertEquals($identifier, $decodedId);
    }

    public function testEncodeAndDecode()
    {
        $exp = '2 hours';
        $identifier = '789';
        $role = 'ROLE_MANAGER';

        $token = $this->tokenEncoder->encode($exp, $identifier, $role);
        $decodedId = $this->tokenEncoder->decode($token);

        $this->assertEquals($identifier, $decodedId);
    }
}