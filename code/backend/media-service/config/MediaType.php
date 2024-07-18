<?php

namespace App\Config;

enum MediaType: string {
    case IMAGE = 'image';
    case VIDEO = 'video';
    case GIF = 'gif';
    case AUDIO = 'audio';
}