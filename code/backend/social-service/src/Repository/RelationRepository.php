<?php

namespace App\Repository;

use App\Entity\Relation;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<Relation>
 */
class RelationRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Relation::class);
    }

    public function findAllWith(array $params): array
    {
        $query = $this->createQueryBuilder('r');

        foreach ($params as $key => $value) {
            if($key == 'user1Id' || $key == 'type'){
                $query->andWhere("r.$key = :$key")->setParameter($key, $value);
            }
        }

        if (array_key_exists('limit', $params)) {
            $query->setMaxResults($limit);
        } else {
            $query->setMaxResults(10);
        }
        
        if(array_key_exists('offset', $params)) {
            $query->setFirstResult($offset);
        } else {
            $query->setFirstResult(0);
        }

        $request = $query->getQuery();

        return $request->execute();
    }
    
}
