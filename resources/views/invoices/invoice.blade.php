<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Invoice {{ $booking->booking_ref }}</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            font-size: 14px;
            color: #333;
            margin: 0;
            padding: 0;
        }
        .container {
            padding: 40px;
        }
        .header {
            display: flex;
            justify-content: space-between;
            margin-bottom: 40px;
            border-bottom: 3px solid #2563eb;
            padding-bottom: 20px;
        }
        .company-name {
            font-size: 28px;
            font-weight: bold;
            color: #2563eb;
        }
        .company-tagline {
            color: #666;
            font-size: 12px;
        }
        .invoice-title {
            font-size: 22px;
            font-weight: bold;
            color: #333;
            text-align: right;
        }
        .invoice-meta {
            text-align: right;
            color: #666;
            font-size: 12px;
        }
        .section {
            margin-bottom: 30px;
        }
        .section-title {
            font-size: 12px;
            font-weight: bold;
            color: #666;
            text-transform: uppercase;
            margin-bottom: 8px;
            letter-spacing: 1px;
        }
        .info-box {
            background: #f8fafc;
            border: 1px solid #e2e8f0;
            border-radius: 8px;
            padding: 15px;
        }
        .table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 20px;
        }
        .table th {
            background: #2563eb;
            color: white;
            padding: 12px;
            text-align: left;
            font-size: 12px;
        }
        .table td {
            padding: 12px;
            border-bottom: 1px solid #e2e8f0;
        }
        .table tr:nth-child(even) {
            background: #f8fafc;
        }
        .total-box {
            background: #2563eb;
            color: white;
            padding: 15px 20px;
            border-radius: 8px;
            text-align: right;
            font-size: 18px;
            font-weight: bold;
        }
        .status-badge {
            background: #dcfce7;
            color: #166534;
            padding: 4px 12px;
            border-radius: 20px;
            font-size: 12px;
            font-weight: bold;
        }
        .footer {
            margin-top: 40px;
            padding-top: 20px;
            border-top: 1px solid #e2e8f0;
            text-align: center;
            color: #666;
            font-size: 11px;
        }
        .two-col {
            width: 48%;
            display: inline-block;
            vertical-align: top;
        }
    </style>
</head>
<body>
    <div class="container">

        {{-- Header --}}
        <div class="header">
            <div>
                <div class="company-name">💧 SparkWash</div>
                <div class="company-tagline">Professional Car Washing Service</div>
                <div class="company-tagline">sparkwash.com | support@sparkwash.com</div>
            </div>
            <div>
                <div class="invoice-title">INVOICE</div>
                <div class="invoice-meta">
                    <strong>{{ $booking->booking_ref }}</strong><br>
                    Date: {{ now()->format('M d, Y') }}<br>
                    Status: <span class="status-badge">{{ ucfirst($booking->status) }}</span>
                </div>
            </div>
        </div>

        {{-- Customer & Booking Info --}}
        <div style="margin-bottom: 30px;">
            <div class="two-col">
                <div class="section-title">Bill To</div>
                <div class="info-box">
                    <strong>{{ $booking->user->name }}</strong><br>
                    {{ $booking->user->email }}<br>
                </div>
            </div>
            <div class="two-col" style="margin-left: 4%;">
                <div class="section-title">Vehicle Info</div>
                <div class="info-box">
                    <strong>{{ $booking->vehicle->make }} {{ $booking->vehicle->model }}</strong><br>
                    Plate: {{ $booking->vehicle->plate_no }}<br>
                    Year: {{ $booking->vehicle->year ?? 'N/A' }}
                </div>
            </div>
        </div>

        {{-- Service Table --}}
        <div class="section">
            <div class="section-title">Service Details</div>
            <table class="table">
                <thead>
                    <tr>
                        <th>Service</th>
                        <th>Description</th>
                        <th>Date & Time</th>
                        <th>Amount</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><strong>{{ $booking->service->name }}</strong></td>
                        <td>{{ $booking->service->description }}</td>
                        <td>{{ \Carbon\Carbon::parse($booking->scheduled_at)->format('M d, Y h:i A') }}</td>
                        <td><strong>${{ number_format($booking->total_price, 2) }}</strong></td>
                    </tr>
                </tbody>
            </table>
        </div>

        {{-- Total --}}
        <div style="text-align: right; margin-bottom: 30px;">
            <table style="margin-left: auto; width: 300px; border-collapse: collapse;">
                <tr>
                    <td style="padding: 8px; color: #666;">Subtotal:</td>
                    <td style="padding: 8px; text-align: right;">${{ number_format($booking->total_price, 2) }}</td>
                </tr>
                <tr>
                    <td style="padding: 8px; color: #666;">Tax (0%):</td>
                    <td style="padding: 8px; text-align: right;">$0.00</td>
                </tr>
                <tr style="border-top: 2px solid #2563eb;">
                    <td style="padding: 8px; font-weight: bold; font-size: 16px;">Total:</td>
                    <td style="padding: 8px; text-align: right; font-weight: bold; font-size: 16px; color: #2563eb;">${{ number_format($booking->total_price, 2) }}</td>
                </tr>
            </table>
        </div>

        {{-- Footer --}}
        <div class="footer">
            <p>Thank you for choosing SparkWash! 💧</p>
            <p>This is a computer-generated invoice and does not require a signature.</p>
            <p>© {{ date('Y') }} SparkWash. All rights reserved.</p>
        </div>

    </div>
</body>
</html>