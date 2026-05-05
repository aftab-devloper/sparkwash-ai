<?php

namespace App\Policies;

use App\Models\User;
use App\Models\Booking;

class BookingPolicy
{
    // Sirf owner dekh sakta hai
    public function view(User $user, Booking $booking): bool
    {
        return $user->id === $booking->user_id;
    }

    // Sirf owner cancel kar sakta hai
    public function delete(User $user, Booking $booking): bool
    {
        return $user->id === $booking->user_id
            && $booking->status === 'pending';
    }
}