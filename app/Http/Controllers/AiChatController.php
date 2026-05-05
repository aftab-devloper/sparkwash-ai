<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Auth;
use App\Models\Service;
use App\Models\Vehicle;
use App\Models\Booking;
use App\Models\TimeSlot;
use Carbon\Carbon;

class AiChatController extends Controller
{
    public function index()
    {
        $services = Service::all(['id', 'name', 'price', 'duration_minutes']);
        $vehicles = Auth::user()->vehicles()->get(['id', 'make', 'model', 'plate_no']);

        return inertia('AiChat/Index', [
            'services' => $services,
            'vehicles' => $vehicles,
        ]);
    }

    public function chat(Request $request)
    {
        $request->validate([
            'messages' => 'required|array',
            'messages.*.role'    => 'required|string',
            'messages.*.content' => 'required|string',
        ]);

        $user     = Auth::user();
        $services = Service::all(['id', 'name', 'price', 'duration_minutes']);
        $vehicles = $user->vehicles()->get(['id', 'make', 'model', 'plate_no']);

        $servicesText = $services->map(fn($s) =>
            "- {$s->name} (ID:{$s->id}) = \${$s->price}, {$s->duration_minutes} mins"
        )->join("\n");

        $vehiclesText = $vehicles->count()
            ? $vehicles->map(fn($v) =>
                "- {$v->make} {$v->model} plate:{$v->plate_no} (ID:{$v->id})"
              )->join("\n")
            : "No vehicles added yet.";

        $today = Carbon::now()->format('l, d M Y');

        $bookedSlots = Booking::where('scheduled_at', '>=', Carbon::today())
            ->where('status', '!=', 'cancelled')
            ->get(['scheduled_at'])
            ->map(fn($b) => Carbon::parse($b->scheduled_at)->format('Y-m-d H:i'))
            ->toArray();

        $bookedSlotsText = !empty($bookedSlots)
            ? implode(', ', $bookedSlots)
            : 'None';

        $systemPrompt = <<<EOT
You are SparkBot, a friendly AI booking assistant for SparkWash car wash service.
Today is {$today}. Customer name: {$user->name}.

AVAILABLE SERVICES:
{$servicesText}

CUSTOMER VEHICLES:
{$vehiclesText}

YOUR JOB:
1. Help customer book a car wash in natural conversation
2. Collect: service, vehicle, date, time
3. When all info collected, respond with EXACTLY this JSON on the last line:
   BOOKING_READY:{"service_id":1,"vehicle_id":1,"date":"2026-05-03","time":"14:00"}
4. Be friendly, short responses, use emojis
5. If customer asks about prices/services, explain clearly
6. Date format: YYYY-MM-DD, time: HH:MM (24hr)

VEHICLE RULES:
7. Customer can have ANY car — Honda, Toyota, Suzuki, BMW, Audi, anything!
8. ONLY use vehicles from CUSTOMER VEHICLES list above — do not invent vehicles
9. If customer mentions a car by name (e.g. "my Honda Civic"), match it to their vehicle list
10. If customer mentions a car NOT in their list, say:
    "I don't see that car in your profile! Please add it here first: [Add Vehicle](http://127.0.0.1:8000/vehicles?from=ai) 🚗 Then come back and I'll book it for you!"
11. If customer has NO vehicles, say:
    "You have no vehicles added yet! Please [Add Your Vehicle](http://127.0.0.1:8000/vehicles?from=ai) 🚗 — it only takes 30 seconds. Then come back and I'll book right away!"
12. If customer has ONE vehicle, automatically use it without asking
13. If customer has MULTIPLE vehicles, show them the list and ask which one

TIME SLOT RULES:
14. NEVER auto-select time — ALWAYS ask day first, then time
15. Working days: Monday to Saturday ONLY — Sunday is CLOSED ❌
16. Working hours: 10:00 AM to 7:00 PM only
17. Available time slots to show customer (ALWAYS in 12hr format):
    10:00 AM, 11:00 AM, 12:00 PM, 1:00 PM, 2:00 PM, 3:00 PM, 4:00 PM, 5:00 PM, 6:00 PM, 7:00 PM
18. ALREADY BOOKED slots (do NOT offer these): {$bookedSlotsText}
19. When customer picks a day, FIRST check if it's Sunday:
    If Sunday → "Sorry, we are closed on Sundays! Please pick another day 😊"
20. When customer picks a time, check against booked slots for that date:
    If already booked → "Sorry, that slot is already booked! Available slots for that day:
    [show only unbooked slots for that date]"
21. Only show AVAILABLE (unbooked) slots to customer
22. Time mapping (customer input → 24hr for BOOKING_READY):
    "10AM" or "10" or "morning" → 10:00
    "11AM" or "11" → 11:00
    "12PM" or "noon" or "12" → 12:00
    "1PM" or "1" → 13:00
    "2PM" or "afternoon" or "2" → 14:00
    "3PM" or "3" → 15:00
    "4PM" or "4" → 16:00
    "5PM" or "5" → 17:00
    "6PM" or "6" → 18:00
    "7PM" or "evening" or "7" → 19:00
    ALWAYS show times in 12hr format (10:00 AM, 1:00 PM, 2:00 PM) — NEVER show 14:00 to customer
23. After day + available time confirmed, create BOOKING_READY

BOOKING CONFIRMED FLOW:
24. If conversation starts with a booking confirmation message, say:
    "🎉 Great news {$user->name}! Your booking is confirmed!
    Now, what time slot would you prefer?
    ⏰ Available slots:
    1️⃣ 9:00 AM
    2️⃣ 11:00 AM
    3️⃣ 2:00 PM
    4️⃣ 4:00 PM
    5️⃣ 6:00 PM"

VEHICLE RESUME FLOW:
25. If conversation has "✅ Vehicle has been added" message, use the LAST vehicle in customer list
26. Do NOT ask service/date again — use what was already discussed
27. Directly show available time slots and confirm booking
EOT;

        $response = Http::withHeaders([
            'Authorization' => 'Bearer ' . env('GROQ_API_KEY'),
            'Content-Type'  => 'application/json',
        ])->post('https://api.groq.com/openai/v1/chat/completions', [
            'model'       => 'llama-3.3-70b-versatile',
            'max_tokens'  => 500,
            'temperature' => 0.7,
            'messages'    => array_merge(
                [['role' => 'system', 'content' => $systemPrompt]],
                $request->messages
            ),
        ]);

        if (!$response->successful()) {
            return response()->json(['error' => 'AI unavailable. Please try again.'], 500);
        }

        $aiMessage = $response->json('choices.0.message.content');

        $bookingData = null;
        if (str_contains($aiMessage, 'BOOKING_READY:')) {
            preg_match('/BOOKING_READY:({.*})/s', $aiMessage, $matches);
            if (!empty($matches[1])) {
                $data = json_decode($matches[1], true);
                if ($data) {
                    $booking = $this->createBooking($data, $user);
                    if ($booking) {
                        $bookingData = [
                            'booking_ref' => $booking->booking_ref,
                            'service'     => $booking->service->name,
                            'scheduled_at'=> $booking->scheduled_at->format('D, d M Y h:i A'),
                            'total_price' => $booking->total_price,
                            'id'          => $booking->id,
                        ];
                        $aiMessage = trim(preg_replace('/BOOKING_READY:{.*}/s', '', $aiMessage));
                    } else {
                        // Slot conflict
                        $aiMessage = "⚠️ Sorry, that time slot is already booked by another customer! Please choose a different time. Here are available slots:\n10:00 AM, 11:00 AM, 12:00 PM, 1:00 PM, 2:00 PM, 3:00 PM, 4:00 PM, 5:00 PM, 6:00 PM, 7:00 PM";
                    }
                }
            }
        }

        return response()->json([
            'message' => $aiMessage,
            'booking' => $bookingData,
        ]);
    }

    private function createBooking(array $data, $user): ?Booking
    {
        try {
            $service     = Service::findOrFail($data['service_id']);
            $scheduledAt = Carbon::parse($data['date'] . ' ' . $data['time']);

            // ✅ Slot conflict check
            $slotTaken = Booking::where('scheduled_at', $scheduledAt)
                ->whereNotIn('status', ['cancelled'])
                ->exists();

            if ($slotTaken) {
                return null;
            }

            return Booking::create([
                'booking_ref' => 'BK-' . strtoupper(uniqid()),
                'user_id'     => $user->id,
                'service_id'  => $data['service_id'],
                'vehicle_id'  => $data['vehicle_id'],
                'scheduled_at'=> $scheduledAt,
                'status'      => 'pending',
                'total_price' => $service->price,
            ]);
        } catch (\Exception $e) {
            return null;
        }
    }
}