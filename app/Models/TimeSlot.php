<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TimeSlot extends Model
{
    use HasFactory;

    protected $fillable = [
        'date',
        'start_time',
        'end_time',
        'is_available',
        'max_bookings',
    ];

    protected $casts = [
        'date' => 'date',
        'is_available' => 'boolean',
    ];
}