<?php

namespace App\Config\InteractionComment;

enum Type: string
{
    case Like = 'like';
    case Dislike = 'dislike';
    case Share = 'share';
}