<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\File\Exception\FileException;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\HttpFoundation\Response;
use Doctrine\ORM\EntityManagerInterface;
use App\Entity\PublicationMedia;
use App\Form\PublicationMediaType;
use App\Entity\EventMedia;
use App\Entity\UserMedia;
use App\Entity\ChatMedia;
use App\Entity\Event;
use PHPUnit\Util\Json;

class MediaController extends AbstractController
{
    #[Route('/media/new', methods: ['POST'])]
    public function newMedia(Request $request, EntityManagerInterface $entityManager)
    {
        $request_params = json_decode($request->getContent(), true);

        $media_table = $request_params['table'];

        $file = str_replace('data:image/png;base64,', '', $request_params['media']);
        $file = str_replace(' ', '+', $file);
        $data = base64_decode($file);
        $filename = uniqid() . '.png';
        $path = '../assets/' . $media_table . '_medias/' . $filename;
        file_put_contents($path, $data);

        switch ($media_table) {
            case 'publication':
                $media = new PublicationMedia();
                $media->setPublicationId($request_params['id']);
                break;
            case 'event':
                $media = new EventMedia();
                $media->setEventId($request_params['id']);
                break;
            case 'user':
                $media = new UserMedia();
                $media->setUserId($request_params['id']);
                break;
            case 'chat':
                $media = new ChatMedia();
                break;
        }

        $media->setUrl($filename);
        $media->setType('image');
        try {
            $entityManager->persist($media);
            $entityManager->flush();
            return new JsonResponse([
                'status' => 'ok',
                'id' => $media->getId(),
            ], 201);
        } catch (FileException $e) {
            return new Response($e);
        }

        //     $videoFile = $request->files->get('video');
        //     if ($videoFile) {
        //         $originalFilename = pathinfo($videoFile->getClientOriginalName(), PATHINFO_FILENAME);
        //         $saveFilename = $originalFilename . '-' . uniqid() . '.' . $videoFile->guessExtension();
        //         try {
        //             $videoFile->move(
        //                 $this->getParameter('kernel.project_dir') . '/assets/publication_medias',
        //                 $saveFilename
        //             );
        //             $videoObj = new PublicationMedia();
        //             $videoObj->setUrl($saveFilename);
        //             $videoObj->setType('video');
        //             $entityManager->persist($videoObj);
        //             $entityManager->flush();
        //             return new JsonResponse(['status' => 'ok']);
        //         } catch (FileException $e) {
        //             return new Response($e);
        //         }
        //     }
    }

    #[Route('/media', methods: ['GET'])]
    public function getMedia(Request $request, EntityManagerInterface $entityManager)
    {
        $params = $request->query->all();
        $media_table = $params['table'];
        $media_id = $params['id'];

        switch ($media_table) {
            case 'publication':
                $media = $entityManager->getRepository(PublicationMedia::class)->findOneBy(['publication_id' => $media_id]);
                break;
            case 'event':
                $media = $entityManager->getRepository(EventMedia::class)->findOneBy(['event_id' => $media_id]);
                break;
            case 'user':
                $media = $entityManager->getRepository(UserMedia::class)->findOneBy(['user_id' => $media_id]);
                break;
            case 'chat':
                $media = $entityManager->getRepository(ChatMedia::class)->find($media_id);
                break;
        }

        $fileHandler = fopen('../assets/' . $media_table . '_medias/' . $media->getUrl(), 'r');

        return new JsonResponse([
            'id' => $media->getId(),
            'url' => $media->getUrl(),
            'file' => base64_encode(fread($fileHandler, filesize('../assets/' . $media_table . '_medias/' . $media->getUrl()))),
        ], 200);
    }

    #[Route('/media/delete', methods: ['DELETE'])]
    public function deleteMedia(Request $request, EntityManagerInterface $entityManager)
    {
        $request_params = json_decode($request->getContent(), true);
        $media_table = $request_params['table'];
        $media_id = $request_params['id'];

        switch ($media_table) {
            case 'publication':
                $media = $entityManager->getRepository(PublicationMedia::class)->findOneBy(['publication_id' => $media_id]);
                break;
            case 'event':
                $media = $entityManager->getRepository(EventMedia::class)->findOneBy(['event_id' => $media_id]);
                break;
            case 'user':
                $media = $entityManager->getRepository(UserMedia::class)->findOneBy(['user_id' => $media_id]);
                break;
            case 'chat':
                $media = $entityManager->getRepository(ChatMedia::class)->find($media_id);
                break;
        }

        $path = '../assets/' . $media_table . '_medias/' . $media->getUrl();
        unlink($path);

        $entityManager->remove($media);
        $entityManager->flush();

        return new JsonResponse([
            'status' => 'ok',
        ], 200);
    }
}
