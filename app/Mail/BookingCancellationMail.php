<?php

namespace App\Mail;

use App\Models\Booking;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class BookingCancellationMail extends Mailable
{
    use Queueable, SerializesModels;

    public function __construct(public Booking $booking)
    {}

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Booking Cancelled — SparkWash #' . $this->booking->id,
        );
    }

    public function content(): Content
    {
        return new Content(
            markdown: 'emails.booking.cancellation',
            with: [
                'booking' => $this->booking,
                'customer' => $this->booking->user,
                'service' => $this->booking->service,
                'vehicle' => $this->booking->vehicle,
            ]
        );
    }
}