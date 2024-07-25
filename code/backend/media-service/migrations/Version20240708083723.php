<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20240708083723 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE user_media DROP FOREIGN KEY FK_88EE5A54BF396750');
        $this->addSql('ALTER TABLE publication_media DROP FOREIGN KEY FK_8FF2E780BF396750');
        $this->addSql('ALTER TABLE chat_media DROP FOREIGN KEY FK_6B514C97BF396750');
        $this->addSql('ALTER TABLE event_media DROP FOREIGN KEY FK_2B371020BF396750');
        $this->addSql('DROP TABLE media');
        $this->addSql('ALTER TABLE chat_media ADD url VARCHAR(255) NOT NULL, ADD type VARCHAR(25) NOT NULL, CHANGE id id INT AUTO_INCREMENT NOT NULL');
        $this->addSql('ALTER TABLE event_media ADD url VARCHAR(255) NOT NULL, ADD type VARCHAR(25) NOT NULL, CHANGE id id INT AUTO_INCREMENT NOT NULL');
        $this->addSql('ALTER TABLE publication_media ADD url VARCHAR(255) NOT NULL, ADD type VARCHAR(25) NOT NULL, CHANGE id id INT AUTO_INCREMENT NOT NULL');
        $this->addSql('ALTER TABLE user_media ADD url VARCHAR(255) NOT NULL, ADD type VARCHAR(25) NOT NULL, CHANGE id id INT AUTO_INCREMENT NOT NULL');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE media (id INT AUTO_INCREMENT NOT NULL, url VARCHAR(500) CHARACTER SET utf8mb4 NOT NULL COLLATE `utf8mb4_unicode_ci`, type VARCHAR(25) CHARACTER SET utf8mb4 NOT NULL COLLATE `utf8mb4_unicode_ci`, discr VARCHAR(255) CHARACTER SET utf8mb4 NOT NULL COLLATE `utf8mb4_unicode_ci`, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB COMMENT = \'\' ');
        $this->addSql('ALTER TABLE user_media DROP url, DROP type, CHANGE id id INT NOT NULL');
        $this->addSql('ALTER TABLE user_media ADD CONSTRAINT FK_88EE5A54BF396750 FOREIGN KEY (id) REFERENCES media (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE publication_media DROP url, DROP type, CHANGE id id INT NOT NULL');
        $this->addSql('ALTER TABLE publication_media ADD CONSTRAINT FK_8FF2E780BF396750 FOREIGN KEY (id) REFERENCES media (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE chat_media DROP url, DROP type, CHANGE id id INT NOT NULL');
        $this->addSql('ALTER TABLE chat_media ADD CONSTRAINT FK_6B514C97BF396750 FOREIGN KEY (id) REFERENCES media (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE event_media DROP url, DROP type, CHANGE id id INT NOT NULL');
        $this->addSql('ALTER TABLE event_media ADD CONSTRAINT FK_2B371020BF396750 FOREIGN KEY (id) REFERENCES media (id) ON DELETE CASCADE');
    }
}
