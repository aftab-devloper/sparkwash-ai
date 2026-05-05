<?php

namespace App\Http\Controllers;

use App\Models\Booking;
use App\Models\Service;
use App\Models\Vehicle;
use App\Models\TimeSlot;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use App\Mail\BookingConfirmationMail;
use App\Mail\BookingCancellationMail;
use Illuminate\Support\Facades\Mail;
use App\Notifications\BookingWhatsAppNotification;

class BookingController extends Controller
{
    // User ki all bookings
    public function index()
    {
        $bookings = auth()->user()->bookings()
            ->with(['service', 'vehicle', 'review'])
            ->latest()
            ->get();

        $services = Service::all();
        $vehicles = auth()->user()->vehicles;

        return Inertia::render('Bookings/Index', [
            'bookings' => $bookings,
            'services' => $services,
            'vehicles' => $vehicles,
        ]);
    }

    // Single booking detail
    public function show(Booking $booking)
    {
        if ($booking->user_id !== auth()->id()) {
            abort(403);
        }

        $booking->load(['service', 'vehicle']);
        return Inertia::render('Bookings/Show', [
            'booking' => $booking
        ]);
    }

    // Create new booking
    public function store(Request $request)
    {
        $validated = $request->validate([
            'service_id'   => 'required|exists:services,id',
            'vehicle_id'   => 'required|exists:vehicles,id',
            'booking_date' => 'required|date|after:today',
            'booking_time' => 'required|string',
            'notes'        => 'nullable|string|max:500',
        ]);

        // ✅ Slot conflict check
        $scheduledAt = $validated['booking_date'] . ' ' . $validated['booking_time'] . ':00';

        $slotTaken = Booking::where('scheduled_at', $scheduledAt)
            ->whereNotIn('status', ['cancelled'])
            ->exists();

        if ($slotTaken) {
            $bookedSlots = Booking::where('scheduled_at', 'like', $validated['booking_date'] . '%')
                ->whereNotIn('status', ['cancelled'])
                ->pluck('scheduled_at')
                ->map(fn($s) => date('h:i A', strtotime($s)))
                ->toArray();

            $allSlots = [
                '10:00 AM', '11:00 AM', '12:00 PM',
                '01:00 PM', '02:00 PM', '03:00 PM',
                '04:00 PM', '05:00 PM', '06:00 PM', '07:00 PM'
            ];

            $availableSlots = array_values(array_diff($allSlots, $bookedSlots));

            return back()->withErrors([
                'booking_time' => 'Sorry, this time slot is already booked. Please choose another slot.'
            ])->with('available_slots', $availableSlots);
        }

        $service = Service::findOrFail($validated['service_id']);

        $booking = auth()->user()->bookings()->create([
            'booking_ref'  => 'BK-' . strtoupper(uniqid()),
            'service_id'   => $validated['service_id'],
            'vehicle_id'   => $validated['vehicle_id'],
            'scheduled_at' => $scheduledAt,
            'notes'        => $validated['notes'] ?? null,
            'total_price'  => $service->price,
            'status'       => 'pending',
        ]);

        // ✅ Queue email (async send)
        Mail::to($booking->user->email)
            ->queue(new BookingConfirmationMail($booking->load(['service', 'vehicle', 'user'])));

        // ✅ WhatsApp notification
        BookingWhatsAppNotification::sendWhatsApp($booking->load(['service', 'vehicle', 'user']));

        // ✅ Redirect to AI Booking page with booking_ref
        return redirect()->route('ai-booking')->with('booking_confirmed', $booking->booking_ref);
    }

    // Cancel booking
    public function destroy(Booking $booking)
    {
        if ($booking->user_id !== auth()->id()) {
            abort(403);
        }

        $booking->update(['status' => 'cancelled']);

        // Queue cancellation mail
        Mail::to($booking->user->email)
            ->queue(new BookingCancellationMail($booking->load(['service', 'vehicle', 'user'])));

        return redirect()->route('bookings.index')->with('success', 'Booking cancelled!');
    }
}