<?php

namespace App\Config\Relation;

enum Type: string
{
    case Friend = 'friend';
    case Follower = 'follower';
    case Blacklist = 'blacklist';
}