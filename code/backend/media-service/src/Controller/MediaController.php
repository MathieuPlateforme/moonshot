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

class MediaController extends AbstractController
{
    #[Route('/media/new', methods: ['POST'])]
    public function newPublicationMedia(Request $request, EntityManagerInterface $entityManager)
    {
        $request = Request::createFromGlobals();

        $imageFile = $request->files->get('image');
        if ($imageFile) {
            $originalFilename = pathinfo($imageFile->getClientOriginalName(), PATHINFO_FILENAME);
            $saveFilename = $originalFilename . '-' . uniqid() . '.' . $imageFile->guessExtension();
            try {
                $imageFile->move(
                    $this->getParameter('kernel.project_dir') . '/assets/publication_medias',
                    $saveFilename
                );
                $imageObj = new PublicationMedia();
                $imageObj->setUrl($saveFilename);
                $imageObj->setType('image');
                $entityManager->persist($imageObj);
                $entityManager->flush();
                return new JsonResponse(['status' => 'ok']);
            } catch (FileException $e) {
                return new Response($e);
            }
        }
    }
}
