@component('mail::message')
# Payment Successful! 💳✅

Hi **{{ $customer->name }}**,

We have received your payment successfully. Here are your payment details:

@component('mail::panel')
**Booking ID:** #{{ $booking->id }}
**Service:** {{ $service->name }}
**Vehicle:** {{ $vehicle->make }} {{ $vehicle->model }} ({{ $vehicle->license_plate }})
**Date:** {{ \Carbon\Carbon::parse($booking->booking_date)->format('D, d M Y') }}
**Time:** {{ $booking->booking_time }}
**Amount Paid:** ${{ $amount }}
**Status:** 💳 Payment Confirmed
@endcomponent

@component('mail::button', ['url' => url('/bookings'), 'color' => 'success'])
View My Booking
@endcomponent

Thank you for choosing SparkWash. We look forward to serving you!

Thanks,
**{{ config('app.name') }}** Team
@endcomponent