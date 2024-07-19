<?php

namespace App\Entity;

use App\Config\InteractionComment\Type;
use App\Repository\InteractionCommentRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: InteractionCommentRepository::class)]
class InteractionComment
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(enumType: Type::class)]
    private ?Type $type = null;

    #[ORM\ManyToOne(inversedBy: 'interactionComments')]
    #[ORM\JoinColumn(nullable: false)]
    private ?Comment $comment = null;

    public function getId(): ?int
    {
        return $this->id;
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

    public function getComment(): ?Comment
    {
        return $this->comment;
    }

    public function setComment(?Comment $comment): static
    {
        $this->comment = $comment;

        return $this;
    }
}
