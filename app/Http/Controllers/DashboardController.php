<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Booking;
use App\Models\Service;
use Carbon\Carbon;

class DashboardController extends Controller
{
    public function index()
    {
        $user = Auth::user();

        $bookings = $user->bookings()->with(['service', 'vehicle'])->latest()->get();

        $stats = [
            'total_bookings'    => $bookings->count(),
            'pending_bookings'  => $bookings->where('status', 'pending')->count(),
            'completed_bookings'=> $bookings->where('status', 'completed')->count(),
            'total_spent'       => $bookings->where('status', 'completed')->sum('total_price'),
            'total_vehicles'    => $user->vehicles()->count(),
            'member_since'      => $user->created_at->format('M Y'),
        ];

        $recentBookings = $bookings->take(5);

        $monthlyData = $bookings
            ->where('created_at', '>=', Carbon::now()->subMonths(6))
            ->groupBy(fn($b) => $b->created_at->format('M'))
            ->map(fn($group) => $group->count());

        return inertia('Dashboard', [
            'stats'          => $stats,
            'recentBookings' => $recentBookings,
            'monthlyData'    => $monthlyData,
            'userName'       => $user->name,
        ]);
    }
}