<?php

namespace App\Console\Commands;

use App\Mail\BookingReminderMail;
use App\Models\Booking;
use Carbon\Carbon;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Mail;

class SendBookingReminders extends Command
{
    protected $signature = 'bookings:send-reminders';
    protected $description = 'Send reminder emails 24 hours before booking';

    public function handle()
    {
        $tomorrow = Carbon::now()->addHours(24);

        $bookings = Booking::with(['user', 'service'])
            ->where('status', 'confirmed')
            ->whereBetween('scheduled_at', [
                $tomorrow->copy()->startOfHour(),
                $tomorrow->copy()->endOfHour(),
            ])
            ->get();

        if ($bookings->isEmpty()) {
            $this->info('No reminders to send.');
            return;
        }

        foreach ($bookings as $booking) {
            Mail::to($booking->user->email)
                ->queue(new BookingReminderMail($booking));

            $this->info("Reminder sent to: {$booking->user->email}");
        }

        $this->info("Total reminders sent: {$bookings->count()}");
    }
}