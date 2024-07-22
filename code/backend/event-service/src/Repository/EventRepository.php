<?php

namespace App\Repository;

use App\Entity\Event;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<Event>
 */
class EventRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Event::class);
    }

    public function findAllWithLimitAndOffset(int $limit, int $offset): array
    {
        $query = $this->createQueryBuilder('e')
            ->setMaxResults($limit)
            ->setFirstResult($offset);

        $request = $query->getQuery();

        return $request->execute();
    }
}
