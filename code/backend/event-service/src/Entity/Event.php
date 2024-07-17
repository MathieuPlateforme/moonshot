<?php

namespace App\Entity;

use App\Repository\EventRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use App\Entity\EventType;

#[ORM\Entity(repositoryClass: EventRepository::class)]
class Event
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column]
    private ?int $user_id = null;

    #[ORM\Column(length: 255)]
    private ?string $title = null;

    #[ORM\Column(type: Types::TEXT)]
    private ?string $content = null;

    #[ORM\Column(type: Types::DATETIME_MUTABLE)]
    private ?\DateTimeInterface $created_at = null;

    private array $media = [];

    /**
     * @var Collection<int, EventDate>
     */
    #[ORM\OneToMany(targetEntity: EventDate::class, mappedBy: 'event', orphanRemoval: true)]
    private Collection $eventDates;

    #[ORM\ManyToOne(inversedBy: 'events')]
    #[ORM\JoinColumn(nullable: false)]
    private ?eventType $type = null;

    #[ORM\Column]
    private ?bool $recurrent = null;

    public function __construct()
    {
        $this->eventDates = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getUserId(): ?int
    {
        return $this->user_id;
    }

    public function setUserId(int $user_id): static
    {
        $this->user_id = $user_id;

        return $this;
    }

    public function getTitle(): ?string
    {
        return $this->title;
    }

    public function setTitle(string $title): static
    {
        $this->title = $title;

        return $this;
    }

    public function getContent(): ?string
    {
        return $this->content;
    }

    public function setContent(string $content): static
    {
        $this->content = $content;

        return $this;
    }

    public function getCreatedAt(): ?\DateTimeInterface
    {
        return $this->created_at;
    }

    public function setCreatedAt(\DateTimeInterface $created_at): static
    {
        $this->created_at = $created_at;

        return $this;
    }

    /**
     * @return Collection<int, EventDate>
     */
    public function getEventDates(): Collection
    {
        return $this->eventDates;
    }

    public function addEventDate(EventDate $eventDate): static
    {
        if (!$this->eventDates->contains($eventDate)) {
            $this->eventDates->add($eventDate);
            $eventDate->setEvent($this);
        }

        return $this;
    }

    public function removeEventDate(EventDate $eventDate): static
    {
        if ($this->eventDates->removeElement($eventDate)) {
            // set the owning side to null (unless already changed)
            if ($eventDate->getEvent() === $this) {
                $eventDate->setEvent(null);
            }
        }

        return $this;
    }

    public function getType(): ?eventType
    {
        return $this->type;
    }

    public function setType(?eventType $type): static
    {
        $this->type = $type;

        return $this;
    }

    public function isRecurrent(): ?bool
    {
        return $this->recurrent;
    }

    public function setRecurrent(bool $recurrent): static
    {
        $this->recurrent = $recurrent;

        return $this;
    }

    public function getMedia(): array
    {
        return $this->media;
    }

    public function setMedia(array $media): static
    {
        $this->media = $media;

        return $this;
    }
}
