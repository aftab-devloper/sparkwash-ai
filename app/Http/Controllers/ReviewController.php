<?php

namespace App\Http\Controllers;

use App\Models\Booking;
use App\Models\Review;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ReviewController extends Controller
{
    public function store(Request $request, Booking $booking)
    {
        // Sirf owner
        if ($booking->user_id !== Auth::id()) {
            abort(403);
        }

        // Sirf completed booking
        if ($booking->status !== 'completed') {
            return back()->with('error', 'You can only review completed bookings.');
        }

        // Already reviewed?
        if ($booking->review) {
            return back()->with('error', 'You have already reviewed this booking.');
        }

        $request->validate([
            'rating'  => 'required|integer|min:1|max:5',
            'comment' => 'nullable|string|max:500',
        ]);

        Review::create([
            'user_id'    => Auth::id(),
            'booking_id' => $booking->id,
            'service_id' => $booking->service_id,
            'rating'     => $request->rating,
            'comment'    => $request->comment,
            'is_public'  => true,
        ]);

        return back()->with('success', 'Review submitted! Thank you. ⭐');
    }
}