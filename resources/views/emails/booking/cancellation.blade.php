@component('mail::message')
# Booking Cancelled ❌

Hi **{{ $customer->name }}**,

Your car wash booking has been cancelled. Here are the details:

@component('mail::panel')
**Booking ID:** #{{ $booking->id }}
**Service:** {{ $service->name }}
**Vehicle:** {{ $vehicle->make }} {{ $vehicle->model }} ({{ $vehicle->license_plate }})
**Date:** {{ \Carbon\Carbon::parse($booking->booking_date)->format('D, d M Y') }}
**Time:** {{ $booking->booking_time }}
**Status:** ❌ Cancelled
@endcomponent

If you did not request this cancellation or have any questions, please contact us immediately.

@component('mail::button', ['url' => url('/bookings'), 'color' => 'error'])
View My Bookings
@endcomponent

Thanks,
**{{ config('app.name') }}** Team
@endcomponent