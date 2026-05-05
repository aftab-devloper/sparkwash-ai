<?php

namespace App\Http\Controllers;

use App\Models\Booking;
use Illuminate\Http\Request;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Inertia\Inertia;
use Stripe\Stripe;
use Stripe\PaymentIntent;
use App\Mail\PaymentSuccessMail;
use Illuminate\Support\Facades\Mail;

class PaymentController extends Controller
{
    use AuthorizesRequests;

    public function checkout(Booking $booking)
    {
        $this->authorize('view', $booking);

        Stripe::setApiKey(config('cashier.secret'));

        $paymentIntent = PaymentIntent::create([
            'amount' => $booking->total_price * 100,
            'currency' => 'usd',
            'metadata' => [
                'booking_ref' => $booking->booking_ref,
            ],
        ]);

        return Inertia::render('Payments/Checkout', [
            'booking' => $booking->load('service'),
            'clientSecret' => $paymentIntent->client_secret,
            'stripeKey' => config('cashier.key'),
        ]);
    }

    public function success(Booking $booking)
    {
        $this->authorize('view', $booking);

        $booking->update(['status' => 'confirmed']);

        // Payment success email send karo
        Mail::to($booking->user->email)
            ->send(new PaymentSuccessMail(
                $booking->load(['service', 'vehicle', 'user']),
                number_format($booking->total_price, 2)
            ));

        return Inertia::render('Payments/Success', [
            'booking' => $booking->load('service'),
        ]);
    }
}