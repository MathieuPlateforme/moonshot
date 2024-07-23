<?php
namespace App\Service\Requests;

use Symfony\Contracts\HttpClient\HttpClientInterface;

class RequestService
{
    private string $mediaServiceUrl;

    public function __construct(
        private HttpClientInterface $client,
    ) {
        $this->mediaServiceUrl = getenv('MEDIA_SERVICE_URL') ?: 'http://localhost:8002';
    }

    public function postMedia(string $file, int $id): array
    {
        $response = $this->client->request(
            'POST',
            $this->mediaServiceUrl . '/media/new',
            [
                'json' => [
                    'media' => $file,
                    'table' => 'event',
                    'id' => $id,
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

    public function getMedia(array $params): array
    {
        $response = $this->client->request(
            'GET',
            $this->mediaServiceUrl . '/media',
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
}