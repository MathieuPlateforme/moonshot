<?php

namespace App\Service\Token;

use Firebase\JWT\JWT;
use Firebase\JWT\Key;

class TokenEncoder
{
    public function __construct(
        private readonly string $jwtSecret,
    ){}

    public function encode(string $exp, string $identifier, string $role): string
    {
        return JWT::encode([
            'exp'  => (new \DateTime())->add(\DateInterval::createFromDateString($exp))->getTimestamp(),
            'nbf'  => (new \DateTime())->getTimestamp(),
            'id' => $identifier,
            'role' => $role,
        ], $this->jwtSecret, 'HS256');
    }

    public function decode(string $token): string
    {
        $credentials = (array)JWT::decode($token, new Key($this->jwtSecret, 'HS256'));
        return $credentials['id'];    
    }
}