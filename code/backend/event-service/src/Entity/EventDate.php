<?php

namespace App\Entity;

use App\Repository\EventDateRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: EventDateRepository::class)]
class EventDate
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\ManyToOne(inversedBy: 'eventDates')]
    #[ORM\JoinColumn(nullable: false)]
    private ?event $event = null;

    #[ORM\Column(type: Types::DATETIME_MUTABLE)]
    private ?\DateTimeInterface $start_date = null;

    #[ORM\Column(type: Types::DATETIME_MUTABLE)]
    private ?\DateTimeInterface $end_date = null;

    #[ORM\Column(length: 255)]
    private ?string $address = null;

    #[ORM\Column(type: Types::DATETIME_MUTABLE)]
    private ?\DateTimeInterface $created_at = null;

    /**
     * @var Collection<int, EventDateParticipants>
     */
    #[ORM\OneToMany(targetEntity: EventDateParticipants::class, mappedBy: 'event_date')]
    private Collection $eventDateParticipants;

    public function __construct()
    {
        $this->eventDateParticipants = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getEvent(): ?event
    {
        return $this->event;
    }

    public function setEvent(?event $event): static
    {
        $this->event = $event;

        return $this;
    }

    public function getStartDate(): ?\DateTimeInterface
    {
        return $this->start_date;
    }

    public function setStartDate(\DateTimeInterface $start_date): static
    {
        $this->start_date = $start_date;

        return $this;
    }

    public function getEndDate(): ?\DateTimeInterface
    {
        return $this->end_date;
    }

    public function setEndDate(\DateTimeInterface $end_date): static
    {
        $this->end_date = $end_date;

        return $this;
    }

    public function getAddress(): ?string
    {
        return $this->address;
    }

    public function setAddress(string $address): static
    {
        $this->address = $address;

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
     * @return Collection<int, EventDateParticipants>
     */
    public function getEventDateParticipants(): Collection
    {
        return $this->eventDateParticipants;
    }

    public function addEventDateParticipant(EventDateParticipants $eventDateParticipant): static
    {
        if (!$this->eventDateParticipants->contains($eventDateParticipant)) {
            $this->eventDateParticipants->add($eventDateParticipant);
            $eventDateParticipant->setEventDate($this);
        }

        return $this;
    }

    public function removeEventDateParticipant(EventDateParticipants $eventDateParticipant): static
    {
        if ($this->eventDateParticipants->removeElement($eventDateParticipant)) {
            // set the owning side to null (unless already changed)
            if ($eventDateParticipant->getEventDate() === $this) {
                $eventDateParticipant->setEventDate(null);
            }
        }

        return $this;
    }
}
