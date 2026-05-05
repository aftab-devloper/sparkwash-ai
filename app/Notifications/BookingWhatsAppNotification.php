<?php

namespace App\Notifications;

use App\Models\Booking;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;
use Twilio\Rest\Client;

class BookingWhatsAppNotification extends Notification
{
    use Queueable;

    public function __construct(public Booking $booking)
    {
        //
    }

    public function via(object $notifiable): array
    {
        return ['database'];
    }

    public function toArray(object $notifiable): array
    {
        return [
            'booking_ref' => $this->booking->booking_ref,
        ];
    }

    public static function sendWhatsApp(Booking $booking): void
    {
        try {
            $sid   = config('services.twilio.sid');
            $token = config('services.twilio.token');
            $from  = config('services.twilio.whatsapp_from');
            $to    = 'whatsapp:' . $booking->user->phone;

            $message = "🚗 *SparkWash Booking Confirmed!*\n\n"
                . "Hi {$booking->user->name}!\n"
                . "Your booking is confirmed.\n\n"
                . "📋 *Ref:* {$booking->booking_ref}\n"
                . "🧼 *Service:* {$booking->service->name}\n"
                . "📅 *Date:* " . \Carbon\Carbon::parse($booking->scheduled_at)->format('d M Y, h:i A') . "\n"
                . "💰 *Amount:* \${$booking->total_price}\n\n"
                . "Thank you for choosing SparkWash! 🙌";

            $client = new Client($sid, $token);
            $client->messages->create($to, [
                'from' => $from,
                'body' => $message,
            ]);

        } catch (\Exception $e) {
            \Log::error('WhatsApp notification failed: ' . $e->getMessage());
        }
    }
}