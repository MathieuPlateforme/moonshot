<?php

namespace App\Entity;

use App\Config\Relation\Type;
use App\Repository\RelationRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: RelationRepository::class)]
class Relation
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column]
    private ?int $user1Id = null;

    #[ORM\Column]
    private ?int $user2Id = null;

    #[ORM\Column(enumType: Type::class)]
    private ?Type $type = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getUser1Id(): ?int
    {
        return $this->user1Id;
    }

    public function setUser1Id(int $user1Id): static
    {
        $this->user1Id = $user1Id;

        return $this;
    }

    public function getUser2Id(): ?int
    {
        return $this->user2Id;
    }

    public function setUser2Id(int $user2Id): static
    {
        $this->user2Id = $user2Id;

        return $this;
    }

    public function getType(): ?Type
    {
        return $this->type;
    }

    public function setType(Type $type): static
    {
        $this->type = $type;

        return $this;
    }
}
