<?php

namespace App\DataFixtures;

use App\Entity\Relation;
use App\Config\Relation\Type;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Faker\Factory;

class RelationFixtures extends Fixture
{
    public function load(ObjectManager $manager): void
    {
        $faker = Factory::create();

        for ($userId = 1; $userId <= 301; $userId++) {

            $friendCount = $faker->numberBetween(0, 5);
            for ($i = 0; $i < $friendCount; $i++) {
                $relation = new Relation();
                $relation->setUser1Id($userId);
                $relation->setUser2Id($this->getRandomUserId($userId));
                $relation->setType(Type::Friend);

                $manager->persist($relation);
            }


            $followCount = $faker->numberBetween(0, 10);
            for ($i = 0; $i < $followCount; $i++) {
                $relation = new Relation();
                $relation->setUser1Id($userId);
                $relation->setUser2Id($this->getRandomUserId($userId));
                $relation->setType(Type::Follower);

                $manager->persist($relation);
            }


            $blockCount = $faker->numberBetween(0, 5);
            for ($i = 0; $i < $blockCount; $i++) {
                $relation = new Relation();
                $relation->setUser1Id($userId);
                $relation->setUser2Id($this->getRandomUserId($userId));
                $relation->setType(Type::Blacklist);

                $manager->persist($relation);
            }
        }

        $manager->flush();
    }

    private function getRandomUserId(int $currentUserId): int
    {
        $userId = $currentUserId;
        while ($userId === $currentUserId) {
            $userId = rand(1, 100);
        }
        return $userId;
    }
  }