<?php

namespace App\Repository;

use App\Entity\EventDateParticipants;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<EventDateParticipants>
 */
class EventDateParticipantsRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, EventDateParticipants::class);
    }

    public function FindAllWithParams(array $params, int $limit = null, int $offset = null): array
    {
        $query = $this->createQueryBuilder('e');

        foreach ($params as $key => $value) {
            $query->andWhere("e.$key LIKE :$key")
            ->setParameter($key, '%' . $value . '%');
        }

        if ($limit && $limit > 0) {
            $query->setMaxResults($limit);
        }
        
        if($offset && $offset > 0){
            $query->setFirstResult($offset);
        }

        $request = $query->getQuery();

        return $request->execute();
    }
}
