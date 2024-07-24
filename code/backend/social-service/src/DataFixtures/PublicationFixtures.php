<?php

namespace App\DataFixtures;

use App\DataFixtures\AppFixtures;
use Doctrine\Persistence\ObjectManager;
use Doctrine\ORM\EntityManagerInterface;
use App\Entity\Publication;
use App\Entity\Comment;
use App\Entity\Relation;
use App\Entity\Tag;
use App\Entity\InteractionPublication;
use App\Entity\InteractionComment;
use App\Config\Relation\Type as RelationType;
use App\Config\InteractionComment\Type as CommentType;
use App\Config\InteractionPublication\Type as PublicationType;
use App\Config\Publication\Status as PublicationStatus;

class PublicationFixtures extends AppFixtures
{

    private EntityManagerInterface $entityManager;

    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
    }

    public function loadData(ObjectManager $manager)
    {
        $this->createTags($manager);
        $this->createPublications($manager, 100);
        $this->createComments($manager, 100);
        $this->createCommentsResponses($manager, 60);
        $this->createRelations($manager, 100);
        $this->createInteractionsPublications($manager, 100);
        $this->createCommentsInteractions($manager, 100);
    }

    // private function setEventType(Event $event, EntityManagerInterface $entityManager)
    // {
    //     $event_type = $entityManager->getRepository(EventType::class)->find($this->faker->numberBetween(1, 6));
    //     $event->setType($event_type);
    // }

    private function createTags(ObjectManager $manager)
    {
        $tags_name = [
            'Recycling',
            'Sustainability',
            'Environment',
            'Eco-Science',
            'Technology',
            'Literature'
        ];

        foreach ($tags_name as $tag_name) {
            $tag = new Tag();
            $tag->setLabel($tag_name);
            $manager->persist($tag);
            $manager->flush();
        }
    }

    private function createPublications(ObjectManager $manager, int $count)
    {        
        $this->createMany(Publication::class, $count, function (Publication $publication) {
            $tags = $this->entityManager->getRepository(Tag::class)->findAll();
            
            $publication->setAuthorId($this->faker->numberBetween(1, 100));
            $publication->setContent($this->faker->text($this->faker->numberBetween(5, 500)));
            $publication->setCreatedAt($this->faker->dateTimeBetween('-2 months', 'now'));
            $publication->setStatus($this->faker->randomElement([PublicationStatus::Published, PublicationStatus::Draft, PublicationStatus::Deleted, PublicationStatus::Pending]));
            $publication->setViews($this->faker->numberBetween(0, 1000));
            for ($i = 0; $i < $this->faker->numberBetween(1, 3); $i++) {
                $publication->addTag($this->faker->randomElement($tags));
            }
        });
    }

    public function createComments(ObjectManager $manager, int $count)
    {
        $this->createMany(Comment::class, $count, function (Comment $comment) {
            $publications = $this->entityManager->getRepository(Publication::class)->findAll();
            $publication = $this->faker->randomElement($publications);
            
            $comment->setAuthorId($this->faker->numberBetween(1, 100));
            $comment->setContent($this->faker->text($this->faker->numberBetween(5, 200)));
            $comment->setCreatedAt($this->faker->dateTimeBetween('-1 days', 'now'));
            $comment->setPublication($publication);
        });
    }

    public function createCommentsResponses(ObjectManager $manager, int $count)
    {
        $this->createMany(Comment::class, $count, function (Comment $comment_response) {
            $publications = $this->entityManager->getRepository(Publication::class)->findAll();
            $publication = $this->faker->randomElement($publications);
            $comments = $publication->getComments();

            $comment_response->setAuthorId($this->faker->numberBetween(1, 100));
            $comment_response->setContent($this->faker->text($this->faker->numberBetween(5, 200)));
            $comment_response->setCreatedAt($this->faker->dateTimeBetween('-1 hours', 'now'));
            $comment_response->setPublication($publication);
            $comment_response->setParentComment($this->faker->randomElement($comments));
        });
    }

    private function createRelations(ObjectManager $manager, int $count)
    {
        $this->createMany(Relation::class, $count, function (Relation $relation) {
            $relation->setUser1Id($this->faker->numberBetween(1, 100));
            $relation->setUser2Id($this->faker->numberBetween(1, 100));
            $relation->setType($this->faker->randomElement([RelationType::Friend, RelationType::Follower, RelationType::Blacklist]));
        });
    }

    private function createInteractionsPublications(ObjectManager $manager, int $count)
    {
        $this->createMany(InteractionPublication::class, $count, function (InteractionPublication $interaction) {
            $publications = $this->entityManager->getRepository(Publication::class)->findAll();
            $publication = $this->faker->randomElement($publications);

            $interaction->setUserId($this->faker->numberBetween(1, 100));
            $interaction->setPublication($publication);
            $interaction->setCreatedAt($this->faker->dateTimeBetween('-5 days', 'now'));
            $interaction->setType($this->faker->randomElement([PublicationType::Like, PublicationType::Dislike, PublicationType::Share]));
        });
    }

    private function createCommentsInteractions(ObjectManager $manager, int $count)
    {
        $this->createMany(InteractionComment::class, $count, function (InteractionComment $interaction) {
            $comments = $this->entityManager->getRepository(Comment::class)->findAll();
            $comment = $this->faker->randomElement($comments);

            $interaction->setUserId($this->faker->numberBetween(1, 100));
            $interaction->setComment($comment);
            $interaction->setCreatedAt($this->faker->dateTimeBetween('-5 days', 'now'));
            $interaction->setType($this->faker->randomElement([CommentType::Like, CommentType::Dislike, CommentType::Share]));
        });
    }
}
