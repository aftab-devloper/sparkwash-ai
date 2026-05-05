import { Head, useForm, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import ReviewForm from '@/Components/ReviewForm';

interface Service {
    id: number;
    name: string;
    price: number;
}

interface Vehicle {
    id: number;
    make: string;
    model: string;
    plate_no: string;
}

interface Review {
    id: number;
    rating: number;
    comment: string | null;
}

interface Booking {
    id: number;
    booking_ref: string;
    scheduled_at: string;
    status: string;
    total_price: number;
    notes: string;
    service: Service;
    vehicle: Vehicle;
    review: Review | null;
}

interface Props {
    bookings: Booking[];
    services: Service[];
    vehicles: Vehicle[];
}

const STATUS_COLORS: Record<string, { bg: string; color: string }> = {
    pending:   { bg: 'rgba(251,191,36,0.12)',  color: '#fbbf24' },
    confirmed: { bg: 'rgba(34,197,94,0.12)',   color: '#22c55e' },
    completed: { bg: 'rgba(56,189,248,0.12)',  color: '#38bdf8' },
    cancelled: { bg: 'rgba(239,68,68,0.12)',   color: '#ef4444' },
};

const TIME_SLOTS = ['09:00','10:00','11:00','12:00','13:00','14:00','15:00','16:00','17:00'];

export default function Index({ bookings, services, vehicles }: Props) {
    const { data, setData, post, processing, errors, reset } = useForm({
        service_id:   '',
        vehicle_id:   '',
        booking_date: '',
        booking_time: '',
        notes:        '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('bookings.store'), { onSuccess: () => reset() });
    };

    return (
        <AuthenticatedLayout header={
            <h2 style={{
                fontFamily: "'Syne', sans-serif",
                fontWeight: 700, fontSize: '1.1rem',
                background: 'linear-gradient(130deg, #dbeafe, #38bdf8, #22d3ee)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
            }}>
                📋 My Bookings
            </h2>
        }>
            <Head title="My Bookings" />

            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=Outfit:wght@300;400;500;600&display=swap');

                .bk-root {
                    min-height: calc(100vh - 65px);
                    background: #04070f;
                    padding: 40px 24px;
                    font-family: 'Outfit', sans-serif;
                    color: #eef4ff;
                }
                .bk-con { max-width: 1180px; margin: 0 auto; display: flex; flex-direction: column; gap: 28px; }

                .bk-card {
                    background: rgba(255,255,255,0.03);
                    border: 1px solid rgba(255,255,255,0.07);
                    border-radius: 20px; padding: 28px;
                }
                .bk-card-title {
                    font-family: 'Syne', sans-serif;
                    font-size: 1rem; font-weight: 700;
                    color: #eef4ff; margin-bottom: 24px;
                }

                /* Form */
                .bk-form { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
                .bk-field { display: flex; flex-direction: column; gap: 6px; }
                .bk-field.full { grid-column: 1 / -1; }
                .bk-label { font-size: 0.78rem; font-weight: 600; color: #8896aa; letter-spacing: 0.04em; text-transform: uppercase; }
                .bk-input, .bk-select, .bk-textarea {
                    background: rgba(255,255,255,0.04);
                    border: 1px solid rgba(255,255,255,0.08);
                    border-radius: 10px; padding: 10px 14px;
                    color: #eef4ff; font-size: 0.9rem;
                    font-family: 'Outfit', sans-serif;
                    outline: none; transition: all 0.2s;
                    width: 100%;
                }
                .bk-select option { background: #0a1628; color: #eef4ff; }
                .bk-input::placeholder, .bk-textarea::placeholder { color: #4b5e72; }
                .bk-input:focus, .bk-select:focus, .bk-textarea:focus {
                    border-color: rgba(56,189,248,0.4);
                    background: rgba(56,189,248,0.04);
                    box-shadow: 0 0 0 3px rgba(56,189,248,0.06);
                }
                .bk-textarea { resize: vertical; min-height: 80px; }
                .bk-error { font-size: 0.72rem; color: #ef4444; }

                .bk-submit {
                    width: 100%; padding: 13px;
                    background: linear-gradient(135deg, #0ea5e9, #22d3ee);
                    border: none; border-radius: 12px;
                    color: #000; font-weight: 700;
                    font-family: 'Syne', sans-serif; font-size: 0.9rem;
                    cursor: pointer; transition: all 0.25s;
                    box-shadow: 0 0 24px rgba(56,189,248,0.2);
                }
                .bk-submit:hover { transform: translateY(-1px); box-shadow: 0 0 36px rgba(56,189,248,0.35); }
                .bk-submit:disabled { opacity: 0.5; cursor: not-allowed; transform: none; }

                /* Warning */
                .bk-warning {
                    background: rgba(251,191,36,0.08);
                    border: 1px solid rgba(251,191,36,0.2);
                    border-radius: 12px; padding: 14px 18px;
                    font-size: 0.875rem; color: #fbbf24;
                }

                /* Booking items */
                .bk-item {
                    background: rgba(255,255,255,0.02);
                    border: 1px solid rgba(255,255,255,0.06);
                    border-radius: 16px; padding: 20px;
                    margin-bottom: 14px; transition: all 0.25s;
                }
                .bk-item:last-child { margin-bottom: 0; }
                .bk-item:hover { border-color: rgba(56,189,248,0.15); background: rgba(56,189,248,0.02); }

                .bk-item-top { display: flex; justify-content: space-between; align-items: flex-start; gap: 16px; flex-wrap: wrap; }
                .bk-ref { font-family: 'Syne', sans-serif; font-size: 0.78rem; color: #38bdf8; font-weight: 700; margin-bottom: 4px; }
                .bk-service-name { font-family: 'Syne', sans-serif; font-size: 1rem; font-weight: 700; color: #eef4ff; margin-bottom: 6px; }
                .bk-meta { font-size: 0.82rem; color: #8896aa; margin-bottom: 3px; }

                .bk-right { display: flex; flex-direction: column; align-items: flex-end; gap: 8px; }
                .bk-price { font-family: 'Syne', sans-serif; font-size: 1.4rem; font-weight: 800; color: #eef4ff; }
                .bk-status {
                    font-size: 0.68rem; font-weight: 700;
                    padding: 4px 12px; border-radius: 50px;
                    text-transform: uppercase; letter-spacing: 0.08em;
                }
                .bk-actions { display: flex; gap: 8px; flex-wrap: wrap; }
                .bk-btn {
                    font-size: 0.78rem; font-weight: 600;
                    padding: 7px 14px; border-radius: 10px;
                    text-decoration: none; transition: all 0.2s;
                    display: inline-flex; align-items: center; gap: 5px;
                    font-family: 'Outfit', sans-serif;
                }
                .bk-btn.pay {
                    background: linear-gradient(135deg, #0ea5e9, #22d3ee);
                    color: #000;
                }
                .bk-btn.pay:hover { transform: translateY(-1px); box-shadow: 0 4px 16px rgba(56,189,248,0.3); }
                .bk-btn.invoice {
                    background: rgba(255,255,255,0.05);
                    border: 1px solid rgba(255,255,255,0.1);
                    color: #eef4ff;
                }
                .bk-btn.invoice:hover { border-color: rgba(56,189,248,0.3); color: #38bdf8; }

                /* Review */
                .bk-review {
                    margin-top: 14px;
                    border-top: 1px solid rgba(255,255,255,0.05);
                    padding-top: 14px;
                }
                .bk-review-done {
                    display: flex; align-items: center; gap: 10px;
                    background: rgba(251,191,36,0.08);
                    border: 1px solid rgba(251,191,36,0.15);
                    border-radius: 10px; padding: 10px 14px;
                    font-size: 0.82rem; color: #8896aa;
                }
                .bk-stars { color: #fbbf24; letter-spacing: 2px; }

                .bk-empty { text-align: center; padding: 40px; color: #8896aa; font-size: 0.9rem; }

                @media (max-width: 640px) {
                    .bk-root { padding: 20px 16px; }
                    .bk-form { grid-template-columns: 1fr; }
                    .bk-item-top { flex-direction: column; }
                    .bk-right { align-items: flex-start; }
                }
            `}</style>

            <div className="bk-root">
                <div className="bk-con">

                    {/* New Booking Form */}
                    <div className="bk-card">
                        <div className="bk-card-title">✨ Book a Wash</div>

                        {vehicles.length === 0 ? (
                            <div className="bk-warning">
                                ⚠️ Please{' '}
                                <Link href={route('vehicles.index')} style={{ color: '#fbbf24', fontWeight: 700 }}>
                                    add a vehicle
                                </Link>{' '}
                                first before booking.
                            </div>
                        ) : (
                            <form onSubmit={submit}>
                                <div className="bk-form">
                                    {/* Service */}
                                    <div className="bk-field">
                                        <label className="bk-label">Service</label>
                                        <select className="bk-select" value={data.service_id} onChange={e => setData('service_id', e.target.value)}>
                                            <option value="">Select a service</option>
                                            {services.map(s => (
                                                <option key={s.id} value={s.id}>{s.name} — ${s.price}</option>
                                            ))}
                                        </select>
                                        {errors.service_id && <span className="bk-error">{errors.service_id}</span>}
                                    </div>

                                    {/* Vehicle */}
                                    <div className="bk-field">
                                        <label className="bk-label">Vehicle</label>
                                        <select className="bk-select" value={data.vehicle_id} onChange={e => setData('vehicle_id', e.target.value)}>
                                            <option value="">Select a vehicle</option>
                                            {vehicles.map(v => (
                                                <option key={v.id} value={v.id}>{v.make} {v.model} — {v.plate_no}</option>
                                            ))}
                                        </select>
                                        {errors.vehicle_id && <span className="bk-error">{errors.vehicle_id}</span>}
                                    </div>

                                    {/* Date */}
                                    <div className="bk-field">
                                        <label className="bk-label">Date</label>
                                        <input type="date" className="bk-input" value={data.booking_date} onChange={e => setData('booking_date', e.target.value)} />
                                        {errors.booking_date && <span className="bk-error">{errors.booking_date}</span>}
                                    </div>

                                    {/* Time */}
                                    <div className="bk-field">
                                        <label className="bk-label">Time Slot</label>
                                        <select className="bk-select" value={data.booking_time} onChange={e => setData('booking_time', e.target.value)}>
                                            <option value="">Select time</option>
                                            {TIME_SLOTS.map(t => <option key={t} value={t}>{t}</option>)}
                                        </select>
                                        {errors.booking_time && <span className="bk-error">{errors.booking_time}</span>}
                                    </div>

                                    {/* Notes */}
                                    <div className="bk-field full">
                                        <label className="bk-label">Notes (optional)</label>
                                        <textarea className="bk-textarea" value={data.notes} onChange={e => setData('notes', e.target.value)} placeholder="Any special instructions..." />
                                    </div>

                                    {/* Submit */}
                                    <div className="bk-field full">
                                        <button type="submit" disabled={processing} className="bk-submit">
                                            {processing ? 'Booking...' : '✓ Confirm Booking'}
                                        </button>
                                    </div>
                                </div>
                            </form>
                        )}
                    </div>

                    {/* Booking History */}
                    <div className="bk-card">
                        <div className="bk-card-title">🕐 Booking History ({bookings.length})</div>

                        {bookings.length === 0 ? (
                            <div className="bk-empty">
                                No bookings yet!{' '}
                                <Link href={route('ai.chat')} style={{ color: '#38bdf8' }}>
                                    Book with AI →
                                </Link>
                            </div>
                        ) : bookings.map((b) => {
                            const sc = STATUS_COLORS[b.status] || { bg: 'rgba(255,255,255,0.08)', color: '#8896aa' };
                            return (
                                <div key={b.id} className="bk-item">
                                    <div className="bk-item-top">
                                        <div>
                                            <div className="bk-ref">{b.booking_ref}</div>
                                            <div className="bk-service-name">{b.service.name}</div>
                                            <div className="bk-meta">🚗 {b.vehicle.make} {b.vehicle.model} · {b.vehicle.plate_no}</div>
                                            <div className="bk-meta">📅 {new Date(b.scheduled_at).toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' })}</div>
                                        </div>
                                        <div className="bk-right">
                                            <div className="bk-price">${Number(b.total_price).toFixed(2)}</div>
                                            <span className="bk-status" style={{ background: sc.bg, color: sc.color }}>
                                                {b.status}
                                            </span>
                                            <div className="bk-actions">
                                                {b.status === 'pending' && (
                                                    <Link href={route('payment.checkout', b.id)} className="bk-btn pay">
                                                        💳 Pay Now
                                                    </Link>
                                                )}
                                                {(b.status === 'confirmed' || b.status === 'completed') && (
                                                    <a href={route('invoice.download', b.id)} className="bk-btn invoice" target="_blank">
                                                        📄 Invoice
                                                    </a>
                                                )}
                                                <Link href={route('bookings.show', b.id)} className="bk-btn invoice">
                                                    View →
                                                </Link>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Review */}
                                    {b.status === 'completed' && (
                                        <div className="bk-review">
                                            {b.review ? (
                                                <div className="bk-review-done">
                                                    <span>Your rating:</span>
                                                    <span className="bk-stars">
                                                        {[1,2,3,4,5].map(s => (
                                                            <span key={s} style={{ color: s <= b.review!.rating ? '#fbbf24' : 'rgba(255,255,255,0.15)' }}>★</span>
                                                        ))}
                                                    </span>
                                                    {b.review.comment && (
                                                        <span style={{ fontStyle: 'italic' }}>"{b.review.comment}"</span>
                                                    )}
                                                </div>
                                            ) : (
                                                <ReviewForm bookingId={b.id} />
                                            )}
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>

                </div>
            </div>
        </AuthenticatedLayout>
    );
}