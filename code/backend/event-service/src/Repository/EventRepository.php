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

    public function FindAllWithParams(array $params, int $limit = null, int $offset = null): array
    {
        $query = $this->createQueryBuilder('e');

        foreach ($params as $key => $value) {
            $query->andWhere("e.$key = :$key")
            ->setParameter($key, $value);
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


    public function FindAllWithAutoComplete(array $params, int $limit = null, int $offset = null): array
    {
        $query = $this->createQueryBuilder('e');
        // var_dump($params);

        foreach ($params as $key => $value) {
            // if()
            $query->andWhere("e.$key LIKE :$key")
            ->setParameter($key, '%' . $value . '%');
        }

        if ($limit) {
            $query->setMaxResults($limit);
        }
        
        if($offset){
            $query->setFirstResult($offset);
        }

        $request = $query->getQuery();

        return $request->execute();
    }
}
