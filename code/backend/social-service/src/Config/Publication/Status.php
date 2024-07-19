<?php

namespace App\Config\Publication;

enum Status: string
{
    case Published = 'published';
    case Draft = 'draft';
    case Deleted = 'deleted';
    case Pending = 'pending';
}