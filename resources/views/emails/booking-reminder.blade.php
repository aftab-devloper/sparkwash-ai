@component('mail::message')
# 🚗 Your Car Wash is Tomorrow!

Hi **{{ $customerName }}**,

This is a friendly reminder that your car wash appointment is scheduled for **tomorrow**.

@component('mail::panel')
**Booking Reference:** {{ $bookingRef }}
**Service:** {{ $serviceName }}
**Date & Time:** {{ \Carbon\Carbon::parse($scheduledAt)->format('l, d M Y \a\t h:i A') }}
@endcomponent

Please make sure your vehicle is available at the scheduled time.

@component('mail::button', ['url' => config('app.url') . '/bookings', 'color' => 'blue'])
View My Booking
@endcomponent

If you need to reschedule or cancel, please do so at least 2 hours before your appointment.

Thanks,
**{{ config('app.name') }} Team** 🚿

@component('mail::subcopy')
If you have any questions, reply to this email or contact us via WhatsApp.
@endcomponent
@endcomponent