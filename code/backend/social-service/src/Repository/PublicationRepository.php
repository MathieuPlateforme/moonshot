<?php

namespace App\Repository;

use App\Entity\Publication;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<Publication>
 */
class PublicationRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Publication::class);
    }

    public function findAllWithLimitAndOffset(int $limit, int $offset): array
    {
        $query = $this->createQueryBuilder('e')
            ->andWhere('e.status = :status')
            ->setParameter('status', 'published')
            ->setMaxResults($limit)
            ->setFirstResult($offset);

        $request = $query->getQuery();
        return $request->execute();
    }
}
