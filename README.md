<div align="center">

# 🚗 SparkWash — AI-Powered Car Washing Platform

<p align="center">
  <img src="https://img.shields.io/badge/Laravel-12-FF2D20?style=for-the-badge&logo=laravel&logoColor=white" />
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black" />
  <img src="https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white" />
  <img src="https://img.shields.io/badge/Inertia.js-v2-9553E9?style=for-the-badge&logo=inertia&logoColor=white" />
  <img src="https://img.shields.io/badge/Groq-Llama--3-F55036?style=for-the-badge&logo=meta&logoColor=white" />
</p>

<p align="center">
  <img src="https://img.shields.io/badge/MySQL-8-4479A1?style=for-the-badge&logo=mysql&logoColor=white" />
  <img src="https://img.shields.io/badge/Redis-7-DC382D?style=for-the-badge&logo=redis&logoColor=white" />
  <img src="https://img.shields.io/badge/Stripe-Payments-635BFF?style=for-the-badge&logo=stripe&logoColor=white" />
  <img src="https://img.shields.io/badge/Filament-v3-FDAE4B?style=for-the-badge&logo=filament&logoColor=black" />
  <img src="https://img.shields.io/badge/GSAP-Animations-88CE02?style=for-the-badge&logo=greensock&logoColor=black" />
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Status-Production_Ready-22c55e?style=for-the-badge" />
  <img src="https://img.shields.io/badge/Live_Demo-Coming_Soon-38bdf8?style=for-the-badge" />
  <img src="https://img.shields.io/badge/CV_Rating-10%2F10-gold?style=for-the-badge" />
</p>

> **SparkWash** is a full-stack, AI-powered car washing booking platform built with Laravel 12, React 19, and Groq's Llama-3. Book a professional car wash in under 30 seconds using natural language — no forms, no friction.

</div>

---

## 📸 Screenshots

> *(Screenshots coming soon — Live demo deploying to AWS)*

---

## ✨ Features

### 🤖 AI Booking Assistant
- Powered by **Groq API + Llama-3** (free tier)
- Natural language booking: *"Book a Premium wash for Saturday at 2 PM"*
- Real-time slot conflict detection (no double bookings)
- Working days: Monday–Saturday | Time slots: 10 AM – 7 PM
- Persistent chat state via localStorage
- Redirects to booking form after AI confirmation

### 💳 Payments
- **Stripe** integration with Laravel Cashier v16
- Secure checkout flow
- Instant payment confirmation
- PDF invoice generation (barryvdh/laravel-dompdf)
- Payment success email notification

### 📧 Notifications
- Booking confirmation email (Mailtrap sandbox)
- Payment success email
- Booking cancellation email
- 24-hour booking reminder (scheduled job)
- WhatsApp notifications via **Twilio**
- Queue-based (database driver) for performance

### 🛡️ Admin Panel (Filament v3)
- Full CRUD for bookings, services, users, reviews
- Staff assignment to bookings
- Booking status management
- Review moderation

### 🔐 Authentication & Authorization
- Laravel Breeze + Inertia.js
- **Spatie Permission v6** RBAC
- Roles: Admin, Staff, Customer
- Policies: VehiclePolicy, BookingPolicy
- Smart auth redirects (Book Now → Login → Back to flow)

### 🎨 UI/UX
- Apple-style **Glassmorphism** design
- **GSAP + ScrollTrigger** animations
- Dark mode toggle
- Fully responsive (mobile-first)
- **PWA** support (vite-plugin-pwa)
- Skeleton loaders
- Chart.js dashboard analytics
- Star rating system (1–5)

### 📄 Pages
- Landing page with hero, stats counter, testimonials
- Services catalog
- Vehicle management
- Booking timeline view
- Customer dashboard with stats
- About Us, Contact Us, Privacy Policy, Terms & Conditions
- Dedicated Reviews page

---

## 🏗️ Architecture

```
sparkwash/
├── app/
│   ├── Http/Controllers/
│   │   ├── ServiceController.php
│   │   ├── VehicleController.php
│   │   ├── BookingController.php
│   │   ├── PaymentController.php
│   │   ├── InvoiceController.php
│   │   ├── ReviewController.php
│   │   └── AiBookingController.php
│   ├── Models/
│   │   ├── User.php (Billable + HasRoles)
│   │   ├── Vehicle.php
│   │   ├── Service.php
│   │   ├── Booking.php
│   │   ├── Payment.php
│   │   ├── Review.php
│   │   └── TimeSlot.php
│   ├── Policies/
│   │   ├── VehiclePolicy.php
│   │   └── BookingPolicy.php
│   ├── Mail/
│   │   ├── BookingConfirmation.php
│   │   ├── PaymentSuccess.php
│   │   └── BookingCancellation.php
│   └── Filament/Resources/
│       ├── BookingResource.php
│       ├── ServiceResource.php
│       └── UserResource.php
├── resources/
│   └── js/
│       └── Pages/
│           ├── Welcome.tsx          ← Landing page (GSAP)
│           ├── Dashboard/Index.tsx  ← Stats + Chart.js
│           ├── Services/Index.tsx
│           ├── Vehicles/Index.tsx
│           ├── Bookings/Index.tsx   ← Timeline + Invoice
│           ├── Payments/
│           │   ├── Checkout.tsx
│           │   └── Success.tsx
│           ├── Reviews/Index.tsx
│           └── AI/Chat.tsx          ← SparkBot
└── database/
    ├── migrations/
    │   ├── vehicles
    │   ├── services
    │   ├── bookings
    │   ├── payments
    │   ├── reviews
    │   └── time_slots
    └── seeders/
        └── DatabaseSeeder.php
```

---

## 🗃️ Database Schema

| Table | Key Columns |
|-------|-------------|
| `users` | name, email, phone, role |
| `vehicles` | make, model, year, plate_no, color, size |
| `services` | name, description, price, duration_minutes |
| `bookings` | booking_ref, service_id, vehicle_id, scheduled_at, status, total_price |
| `payments` | booking_id, amount, method, status |
| `reviews` | booking_id, user_id, rating, comment |
| `time_slots` | date, time, is_available |

---

## 🚀 Getting Started

### Prerequisites

- PHP 8.2+
- Node.js 22+
- MySQL 8+
- Composer
- XAMPP (or Laravel Herd)

### Installation

```bash
# 1. Clone the repo
git clone https://github.com/aftab-devloper/sparkwash-ai.git
cd sparkwash-ai

# 2. Install PHP dependencies
composer install

# 3. Install Node dependencies
npm install

# 4. Environment setup
cp .env.example .env
php artisan key:generate

# 5. Configure .env
# DB_DATABASE=sparkwash
# STRIPE_KEY=your_stripe_key
# STRIPE_SECRET=your_stripe_secret
# GROQ_API_KEY=your_groq_api_key
# TWILIO_SID=your_twilio_sid
# TWILIO_TOKEN=your_twilio_token
# TWILIO_WHATSAPP_FROM=whatsapp:+14155238886

# 6. Run migrations & seed
php artisan migrate:fresh --seed

# 7. Start dev servers
php artisan serve          # Terminal 1
npm run dev               # Terminal 2
php artisan queue:work    # Terminal 3
```

### Test Accounts

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@sparkwash.com | password |
| Staff | staff@sparkwash.com | password |
| Customer | customer@sparkwash.com | password |

---

## 🔑 Environment Variables

```env
# App
APP_NAME=SparkWash
APP_URL=http://127.0.0.1:8000

# Database
DB_CONNECTION=mysql
DB_DATABASE=sparkwash

# Queue
QUEUE_CONNECTION=database

# Stripe
STRIPE_KEY=pk_test_...
STRIPE_SECRET=sk_test_...

# Groq AI
GROQ_API_KEY=gsk_...

# Twilio WhatsApp
TWILIO_SID=AC...
TWILIO_TOKEN=...
TWILIO_WHATSAPP_FROM=whatsapp:+14155238886
TWILIO_WHATSAPP_TO=whatsapp:+92...

# Mail (Mailtrap)
MAIL_MAILER=smtp
MAIL_HOST=sandbox.smtp.mailtrap.io
```

---

## 📦 Tech Stack

### Frontend
| Technology | Version | Purpose |
|-----------|---------|---------|
| React | 19 | UI framework |
| TypeScript | 5 | Type safety |
| Inertia.js | v2 | SPA routing (no API needed) |
| GSAP + ScrollTrigger | 3 | Animations |
| Chart.js | 4 | Dashboard analytics |
| Vite | 6 | Build tool + code splitting |
| vite-plugin-pwa | — | PWA support |

### Backend
| Technology | Version | Purpose |
|-----------|---------|---------|
| Laravel | 12 | PHP framework |
| MySQL | 8 | Primary database |
| Redis | 7 | Caching & queues |
| Spatie Permission | v6 | RBAC |
| Laravel Cashier | v16 | Stripe billing |
| Filament | v3 | Admin panel |
| DomPDF | v3 | PDF invoices |
| Twilio | — | WhatsApp notifications |

### AI
| Technology | Purpose |
|-----------|---------|
| Groq API | Ultra-fast inference |
| Llama-3 | Natural language understanding |
| Agentic System | Slot detection, booking creation |

---

## 🛣️ Roadmap

- [x] Phase 1 — Foundation (Laravel + React + Auth)
- [x] Phase 2 — Core Features (CRUD + Booking flow)
- [x] Phase 3 — Advanced Backend (Stripe + Filament + Emails + PDF)
- [x] Phase 4 — Premium UI + AI Assistant
- [ ] Phase 5 — DevOps & AWS Cloud *(see [README-DEVOPS.md](./README-DEVOPS.md))*

---

## 👨‍💻 Author

**Aftab Solangi**

[![GitHub](https://img.shields.io/badge/GitHub-aftab--devloper-181717?style=for-the-badge&logo=github)](https://github.com/aftab-devloper)

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

<div align="center">
  <strong>Built with ❤️ by Aftab Solangi</strong><br/>
  <sub>SparkWash — Because your car deserves showroom-grade clean.</sub>
</div>