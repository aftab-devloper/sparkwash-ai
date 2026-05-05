<?php

namespace App\Providers;

use App\Models\Vehicle;
use App\Models\Booking;
use App\Policies\VehiclePolicy;
use App\Policies\BookingPolicy;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider;

class AppServiceProvider extends AuthServiceProvider
{
    protected $policies = [
        Vehicle::class => VehiclePolicy::class,
        Booking::class => BookingPolicy::class,
    ];

    public function boot(): void
    {
        $this->registerPolicies();
    }
}