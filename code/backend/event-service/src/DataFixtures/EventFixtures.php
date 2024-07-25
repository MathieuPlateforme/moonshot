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

            $addresses = [
                "1 Rue de la Paix, 75001, Paris",
                "2 Avenue des Champs-Elysees, 75008, Paris",
                "3 Place de la Concorde, 75008, Paris",
                "4 Rue du Faubourg Saint-Honore, 75008, Paris",
                "5 Boulevard Saint-Germain, 75005, Paris",
                "6 Rue de Rivoli, 75004, Paris",
                "7 Rue de la Roquette, 75011, Paris",
                "8 Rue de la Republique, 75003, Paris",
                "9 Rue de la Pompe, 75116, Paris",
                "10 Rue de la Paix, 75001, Paris",
                "11 Avenue des Champs-Elysees, 75008, Paris",
                "12 Place de la Concorde, 75008, Paris",
                "13 Rue du Faubourg Saint-Honore, 75008, Paris",
                "14 Boulevard Saint-Germain, 75005, Paris",
                "15 Rue de Rivoli, 75004, Paris",
                "16 Rue de la Roquette, 75011, Paris",
                "17 Rue de la Republique, 75003, Paris",
                "18 Rue de la Canebiere, 13001, Marseille",
                "19 Boulevard de la Liberation, 13001, Marseille",
                "20 Rue Saint-Ferreol, 13001, Marseille",
                "21 Rue de Rome, 13001, Marseille",
                "22 Rue Paradis, 13001, Marseille",
                "23 Rue de la Republique, 13002, Marseille",
                "24 Quai du Port, 13002, Marseille",
                "25 Rue de la Major, 13002, Marseille",
                "26 Rue de la Joliette, 13002, Marseille",
                "27 Rue de la Corderie, 13007, Marseille",
                "28 Rue Sainte, 13007, Marseille",
                "29 Rue d'Endoume, 13007, Marseille",
                "30 Rue de la Republique, 13007, Marseille",
                "1 Rue de la Paix, 69001, Lyon",
                "2 Avenue des Champs-Elysees, 69002, Lyon",
                "3 Place de la Concorde, 69003, Lyon",
                "4 Rue du Faubourg Saint-Honore, 69004, Lyon",
                "5 Boulevard Saint-Germain, 69005, Lyon",
                "6 Rue de Rivoli, 69006, Lyon",
                "7 Rue de la Roquette, 69007, Lyon",
                "8 Rue de la Republique, 69008, Lyon",
                "9 Rue de la Pompe, 69009, Lyon",
                "10 Rue de la Paix, 69001, Lyon",
                "11 Avenue des Champs-Elysees, 69002, Lyon",
                "12 Place de la Concorde, 69003, Lyon",
                "13 Rue du Faubourg Saint-Honore, 69004, Lyon",
                "14 Boulevard Saint-Germain, 69005, Lyon",
                "15 Rue de Rivoli, 69006, Lyon",
                "16 Rue de la Roquette, 69007, Lyon",
                "17 Rue de la Republique, 69008, Lyon",
            ];


        for ($i = 1; $i <= $count; $i++) {
            $event = $this->entityManager->getRepository(Event::class)->find($i);
            $recurrent = $event->isRecurrent();
            if ($recurrent) {
                for ($j = 0; $j < 5; $j++) {
                    $event_date = new EventDate();
                    $event_date->setEvent($event);
                    $event_date->setStartDate($this->faker->dateTimeBetween('now', '+2 months'));
                    $event_date->setEndDate($this->faker->dateTimeBetween($event_date->getStartDate(), '+2 months'));
                    $event_date->setAddress($addresses[$this->faker->numberBetween(0, count($addresses) - 1)]);
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
