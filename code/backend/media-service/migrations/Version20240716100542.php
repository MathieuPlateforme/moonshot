<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20240716100542 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE event_media ADD event_id INT NOT NULL');
        $this->addSql('ALTER TABLE publication_media ADD publication_id INT NOT NULL');
        $this->addSql('ALTER TABLE user_media ADD user_id INT NOT NULL');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE user_media DROP user_id');
        $this->addSql('ALTER TABLE publication_media DROP publication_id');
        $this->addSql('ALTER TABLE event_media DROP event_id');
    }
}
