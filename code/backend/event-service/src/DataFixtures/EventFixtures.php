<?php

namespace App\DataFixtures;

use App\DataFixtures\AppFixtures;
use App\Entity\Event;
use Doctrine\Persistence\ObjectManager;
use Doctrine\ORM\EntityManagerInterface;
use App\Entity\EventType;
use App\Entity\EventDate;
use App\Entity\EventDateParticipants;

class EventFixtures extends AppFixtures
{

    private EntityManagerInterface $entityManager;

    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
    }

    public function loadData(ObjectManager $manager)
    {
        $this->createEventTypes($manager);
        $this->createEvents(100);
        $this->createEventDates($manager, 100);
        $this->addParticipants($manager);
    }

    private function setEventType(Event $event, EntityManagerInterface $entityManager)
    {
        $event_type = $entityManager->getRepository(EventType::class)->find($this->faker->numberBetween(1, 6));
        $event->setType($event_type);
    }

    private function createEventTypes(ObjectManager $manager)
    {
        $type1 = new EventType();
        $type1->setName('Collecting');
        $manager->persist($type1);
        $manager->flush();

        $type2 = new EventType();
        $type2->setName('Marauding');
        $manager->persist($type2);
        $manager->flush();

        $type3 = new EventType();
        $type3->setName('Concert');
        $manager->persist($type3);
        $manager->flush();

        $type4 = new EventType();
        $type4->setName('March');
        $manager->persist($type4);
        $manager->flush();

        $type5 = new EventType();
        $type5->setName('Recycling');
        $manager->persist($type5);
        $manager->flush();

        $type6 = new EventType();
        $type6->setName('Conference');
        $manager->persist($type6);
        $manager->flush();
    }

    private function createEvents(int $count)
    {
        $this->createMany(Event::class, $count, function (Event $event) {
            $event->setUserId($this->faker->numberBetween(1, 100));
            $event->setTitle($this->faker->sentence(6));
            $event->setContent($this->faker->text($this->faker->numberBetween(5, 200)));
            $event->setCreatedAt($this->faker->dateTimeBetween('now', '+2 months'));
            $event_recurrent = $this->faker->boolean();
            $event->setRecurrent($event_recurrent);
            $this->setEventType($event, $this->entityManager);
        });
    }

    private function createEventDates(ObjectManager $manager, int $count )
    {
        for ($i = 1; $i <= $count; $i++) {
            $event = $this->entityManager->getRepository(Event::class)->find($i);
            $recurrent = $event->isRecurrent();
            if ($recurrent) {
                for ($j = 0; $j < 5; $j++) {
                    $event_date = new EventDate();
                    $event_date->setEvent($event);
                    $event_date->setStartDate($this->faker->dateTimeBetween('now', '+2 months'));
                    $event_date->setEndDate($this->faker->dateTimeBetween($event_date->getStartDate(), '+2 months'));
                    $event_date->setAddress($this->faker->address);
                    $event_date->setCreatedAt($this->faker->dateTimeBetween('now', '+2 months'));
                    $manager->persist($event_date);
                    $manager->flush();
                }
            } else {
                $event_date = new EventDate();
                $event_date->setEvent($event);
                $event_date->setStartDate($this->faker->dateTimeBetween('now', '+2 months'));
                $event_date->setEndDate($this->faker->dateTimeBetween($event_date->getStartDate(), '+2 months'));
                $event_date->setAddress($this->faker->address);
                $event_date->setCreatedAt($this->faker->dateTimeBetween('now', '+2 months'));
                $manager->persist($event_date);
                $manager->flush();
            }
        }
    }

    private function addParticipants(ObjectManager $manager)
    {
        $event_date_count = $this->entityManager->getRepository(EventDate::class)->count([]);
        for ($i = 1; $i <= $event_date_count; $i++) {
            $event_date = $this->entityManager->getRepository(EventDate::class)->find($i);
            for ($j = 0; $j < $this->faker->numberBetween(10, 100); $j++) {
                $event_date_participant = new EventDateParticipants();
                $event_date_participant->setEventDate($event_date);
                $event_date_participant->setUserId($this->faker->numberBetween(1, 300));
                $event_date_participant->setCreatedAt($this->faker->dateTimeBetween('now', '+2 months'));
                $manager->persist($event_date_participant);
                $manager->flush();
            }
        }
    }
}
