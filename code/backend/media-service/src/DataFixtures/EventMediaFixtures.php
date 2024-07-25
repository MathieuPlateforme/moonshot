<?php
namespace App\DataFixtures;

use App\DataFixtures\AppFixtures;
use App\Entity\EventMedia;
use Doctrine\Persistence\ObjectManager;

class EventMediaFixtures extends AppFixtures {

    protected $imageName = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14'];

    public function loadData(ObjectManager $manager)
    {
        for($i = 1; $i <= 100; $i++) {
            $event_media = new EventMedia();
            $event_media->setUrl($this->faker->randomElement($this->imageName) . '.png');
            $event_media->setType('image');
            $event_media->setEventId($i);
            $manager->persist($event_media);
            $manager->flush();
        };
    }
}