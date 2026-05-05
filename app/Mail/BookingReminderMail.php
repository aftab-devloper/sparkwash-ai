<?php

namespace App\Mail;

use App\Models\Booking;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class BookingReminderMail extends Mailable
{
    use Queueable, SerializesModels;

    public function __construct(public Booking $booking)
    {
        //
    }

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: '🚗 Reminder: Your Car Wash is Tomorrow!',
        );
    }

    public function content(): Content
    {
        return new Content(
            markdown: 'emails.booking-reminder',
            with: [
                'booking' => $this->booking,
                'customerName' => $this->booking->user->name,
                'serviceName' => $this->booking->service->name,
                'scheduledAt' => $this->booking->scheduled_at,
                'bookingRef' => $this->booking->booking_ref,
            ]
        );
    }
}