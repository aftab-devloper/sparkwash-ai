<?php

namespace App\Http\Controllers;

use App\Models\Vehicle;
use Illuminate\Http\Request;
use Inertia\Inertia;

class VehicleController extends Controller
{
    // User ki all vehicles
    public function index()
    {
        $vehicles = auth()->user()->vehicles;

        return Inertia::render('Vehicles/Index', [
            'vehicles' => $vehicles
        ]);
    }

    // Naya vehicle add karo
    public function store(Request $request)
    {
        $validated = $request->validate([
            'make'     => 'required|string|max:100',
            'model'    => 'required|string|max:100',
            'year'     => 'required|integer|min:1990|max:2030',
            'plate_no' => 'required|string|max:20|unique:vehicles',
            'color'    => 'nullable|string|max:50',
        ]);

        auth()->user()->vehicles()->create($validated);

        return redirect()->route('vehicles.index')->with('success', 'Vehicle added!');
    }

    // Vehicle update karo
    public function update(Request $request, Vehicle $vehicle)
    {
        $this->authorize('update', $vehicle);

        $validated = $request->validate([
            'make'     => 'required|string|max:100',
            'model'    => 'required|string|max:100',
            'year'     => 'required|integer|min:1990|max:2030',
            'plate_no' => 'required|string|max:20|unique:vehicles,plate_no,'.$vehicle->id,
            'color'    => 'nullable|string|max:50',
        ]);

        $vehicle->update($validated);

        return redirect()->route('vehicles.index')->with('success', 'Vehicle updated!');
    }

    // Vehicle delete karo
    public function destroy(Vehicle $vehicle)
    {
        $this->authorize('delete', $vehicle);
        $vehicle->delete();

        return redirect()->route('vehicles.index')->with('success', 'Vehicle deleted!');
    }
}