<?php

namespace App\Policies;

use App\Models\User;
use App\Models\Vehicle;

class VehiclePolicy
{
    // Sirf owner update kar sakta hai
    public function update(User $user, Vehicle $vehicle): bool
    {
        return $user->id === $vehicle->user_id;
    }

    // Sirf owner delete kar sakta hai
    public function delete(User $user, Vehicle $vehicle): bool
    {
        return $user->id === $vehicle->user_id;
    }
}