<?php
namespace App\Service\Requests;

use Symfony\Contracts\HttpClient\HttpClientInterface;

class RequestService
{
    public function __construct(
        private HttpClientInterface $client,
    ) {
    }
    
    public function getMedia(array $params)
    {
        $response = $this->client->request(
            'GET',
            'http://localhost:8002/media',
            [
                'query' => $params,
            ]
        );

        $statusCode = $response->getStatusCode();
        // $statusCode = 200
        $contentType = $response->getHeaders()['content-type'][0];
        // $contentType = 'application/json'
        $content = $response->getContent();
        // $content = '{"id":521583, "name":"symfony-docs", ...}'
        $content = $response->toArray();
        // $content = ['id' => 521583, 'name' => 'symfony-docs', ...]

        return $content;
    }
    public function getUser(string $id) {
        $response = $this->client->request(
            'GET',
            'http://localhost:8000/user/' . $id,
        );

        $statusCode = $response->getStatusCode();
        // $statusCode = 200
        $contentType = $response->getHeaders()['content-type'][0];
        // $contentType = 'application/json'
        $content = $response->getContent();
        // $content = '{"id":521583, "name":"symfony-docs", ...}'
        $content = $response->toArray();
        // $content = ['id' => 521583, 'name' => 'symfony-docs', ...]

        return $content;
    }
}