<?php
namespace App\DataFixtures;

use App\DataFixtures\AppFixtures;
use App\Entity\UserMedia;
use Doctrine\Persistence\ObjectManager;

class UserMediaFixtures extends AppFixtures {

    protected $imageName = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];

    public function loadData(ObjectManager $manager)
    {
        for($i = 1; $i <= 302; $i++) {
            $event_media = new UserMedia();
            $event_media->setUrl($this->faker->randomElement($this->imageName) . '.png');
            $event_media->setType('image');
            $event_media->setUserId($i);
            $manager->persist($event_media);
            $manager->flush();
        };
    }
}