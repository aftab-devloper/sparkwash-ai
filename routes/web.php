<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ServiceController;
use App\Http\Controllers\BookingController;
use App\Http\Controllers\VehicleController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\InvoiceController;
use App\Http\Controllers\ReviewController;
use App\Http\Controllers\AiChatController;
use App\Http\Controllers\DashboardController;

// ── Public Routes (login nahi chahiye) ───────────────────────────────────────

Route::get('/', function () {
    return Inertia::render('Welcome');
});

Route::get('/about',   fn() => Inertia::render('About'))->name('about');
Route::get('/contact', fn() => Inertia::render('Contact'))->name('contact');
Route::get('/privacy', fn() => Inertia::render('Privacy'))->name('privacy');
Route::get('/terms',   fn() => Inertia::render('Terms'))->name('terms');

// ── Auth Routes (Breeze) ──────────────────────────────────────────────────────

require __DIR__.'/auth.php';

// ── AI Chat (auth required, verified nahi) ────────────────────────────────────

Route::middleware(['auth'])->group(function () {
    Route::get('/ai-chat',  [AiChatController::class, 'index'])->name('ai.chat');
    Route::post('/ai-chat', [AiChatController::class, 'chat'])->name('ai.chat.send');
});

// ── Protected Routes (login + verified) ──────────────────────────────────────

Route::middleware(['auth', 'verified'])->group(function () {

    // Dashboard
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

    // Profile
    Route::get('/profile',    [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile',  [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // Services
    Route::resource('services', ServiceController::class)->only(['index', 'show']);

    // Vehicles
    Route::resource('vehicles', VehicleController::class)->only(['index', 'store', 'update', 'destroy']);

    // Bookings
    Route::resource('bookings', BookingController::class)->only(['index', 'store', 'show', 'destroy']);

    // Payments
    Route::get('/bookings/{booking}/checkout', [PaymentController::class, 'checkout'])->name('payment.checkout');
    Route::get('/bookings/{booking}/success',  [PaymentController::class, 'success'])->name('payment.success');

    // Invoice
    Route::get('/bookings/{booking}/invoice', [InvoiceController::class, 'download'])->name('invoice.download');

    // Reviews
    Route::post('/bookings/{booking}/review', [ReviewController::class, 'store'])->name('reviews.store');

});