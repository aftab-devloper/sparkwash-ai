<?php

namespace App\Http\Controllers;

use App\Models\Booking;
use Illuminate\Http\Request;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Barryvdh\DomPDF\Facade\Pdf;

class InvoiceController extends Controller
{
    use AuthorizesRequests;

    public function download(Booking $booking)
    {
        $this->authorize('view', $booking);

        $booking->load(['service', 'vehicle', 'user']);

        $pdf = Pdf::loadView('invoices.invoice', [
            'booking' => $booking,
        ]);

        return $pdf->download('invoice-' . $booking->booking_ref . '.pdf');
    }
}