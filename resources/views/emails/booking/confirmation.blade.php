@component('mail::message')
# Booking Confirmed! 🎉

Hi **{{ $customer->name }}**,

Your car wash booking has been confirmed. Here are your booking details:

@component('mail::panel')
**Booking ID:** #{{ $booking->id }}
**Service:** {{ $service->name }}
**Vehicle:** {{ $vehicle->make }} {{ $vehicle->model }} ({{ $vehicle->license_plate }})
**Date:** {{ \Carbon\Carbon::parse($booking->booking_date)->format('D, d M Y') }}
**Time:** {{ $booking->booking_time }}
**Status:** ✅ Confirmed
@endcomponent

@component('mail::button', ['url' => url('/bookings'), 'color' => 'success'])
View My Booking
@endcomponent

If you have any questions, feel free to contact us.

Thanks,
**{{ config('app.name') }}** Team
@endcomponent