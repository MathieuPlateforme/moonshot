<?php

namespace App\Config\InteractionPublication;

enum Type: string
{
    case Like = 'like';
    case Dislike = 'dislike';
    case Share = 'share';
}