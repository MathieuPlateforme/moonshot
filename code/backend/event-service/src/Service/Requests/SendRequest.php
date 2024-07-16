<?php
namespace App\Service\Requests;
use Symfony\Contracts\HttpClient\HttpClientInterface;

class RequestService
{
    public function __construct(
        private HttpClientInterface $client,
    ) {
    }

    public function sendMedia($file)
    // : array
    {
        $response = $this->client->request(
            'POST',
            'https://localhost:8002/media/new',
            [
                'json' => [
                    'media' => $file,
                    'table' => 'publication',
                ],
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
}