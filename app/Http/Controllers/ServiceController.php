<?php

namespace App\Http\Controllers;

use App\Models\Service;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ServiceController extends Controller
{
    // All services list
    public function index()
    {
        $services = Service::all();

        return Inertia::render('Services/Index', [
            'services' => $services
        ]);
    }

    // Single service detail
    public function show(Service $service)
    {
        return Inertia::render('Services/Show', [
            'service' => $service
        ]);
    }
}