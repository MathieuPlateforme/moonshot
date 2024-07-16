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
        $path = $this->getParameter('kernel.project_dir') . '/assets/' . $media_table . '_medias/' . $filename;
        file_put_contents($path, $data);

        switch ($media_table) {
            case 'publication':
                $media = new PublicationMedia();
                break;
            case 'event':
                $media = new EventMedia();
                break;
            case 'user':
                $media = new UserMedia();
                break;
            case 'chat':
                $media = new ChatMedia();
        }

        try {
            $media->setUrl($filename);
            $media->setType('image');
            $entityManager->persist($media);
            $entityManager->flush();
            return new JsonResponse([
                'status' => 'ok',
                // 'params' => $request
                'params' => $media
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
}
