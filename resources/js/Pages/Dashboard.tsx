import { useEffect, useRef } from 'react';
import { Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

interface Booking {
    id: number;
    booking_ref: string;
    status: string;
    total_price: number;
    scheduled_at: string;
    service: { name: string };
    vehicle: { make: string; model: string };
}

interface Stats {
    total_bookings: number;
    pending_bookings: number;
    completed_bookings: number;
    total_spent: number;
    total_vehicles: number;
    member_since: string;
}

interface Props {
    stats: Stats;
    recentBookings: Booking[];
    monthlyData: Record<string, number>;
    userName: string;
}

const STATUS_COLORS: Record<string, string> = {
    pending:   'rgba(251,191,36,0.15)',
    completed: 'rgba(34,197,94,0.15)',
    cancelled: 'rgba(239,68,68,0.15)',
};
const STATUS_TEXT: Record<string, string> = {
    pending:   '#fbbf24',
    completed: '#22c55e',
    cancelled: '#ef4444',
};

export default function Dashboard({ stats, recentBookings, monthlyData, userName }: Props) {
    const chartRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        if (!chartRef.current) return;

        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.1/chart.umd.min.js';
        script.onload = () => {
            const Chart = (window as any).Chart;
            const labels = Object.keys(monthlyData);
            const values = Object.values(monthlyData);

            new Chart(chartRef.current, {
                type: 'line',
                data: {
                    labels,
                    datasets: [{
                        label: 'Bookings',
                        data: values,
                        borderColor: '#38bdf8',
                        backgroundColor: 'rgba(56,189,248,0.08)',
                        borderWidth: 2,
                        fill: true,
                        tension: 0.4,
                        pointBackgroundColor: '#38bdf8',
                        pointRadius: 4,
                    }],
                },
                options: {
                    responsive: true,
                    plugins: {
                        legend: { display: false },
                        tooltip: {
                            backgroundColor: 'rgba(4,7,15,0.9)',
                            titleColor: '#eef4ff',
                            bodyColor: '#8896aa',
                            borderColor: 'rgba(56,189,248,0.2)',
                            borderWidth: 1,
                        },
                    },
                    scales: {
                        x: { grid: { color: 'rgba(255,255,255,0.04)' }, ticks: { color: '#8896aa' } },
                        y: { grid: { color: 'rgba(255,255,255,0.04)' }, ticks: { color: '#8896aa', stepSize: 1 } },
                    },
                },
            });
        };
        document.head.appendChild(script);
    }, [monthlyData]);

    const greeting = () => {
        const h = new Date().getHours();
        if (h < 12) return 'Good Morning';
        if (h < 17) return 'Good Afternoon';
        return 'Good Evening';
    };

    return (
        <AuthenticatedLayout header={
                <h2 style={{ 
                    fontFamily: "'Syne', sans-serif", 
                    fontWeight: 700, 
                    fontSize: '1.1rem',
                    background: 'linear-gradient(130deg, #dbeafe, #38bdf8, #22d3ee)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                }}>
                    🚗 Dashboard
                </h2>
            }>
            <Head title="Dashboard" />

            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=Outfit:wght@300;400;500;600&display=swap');

                .dash-root {
                    min-height: calc(100vh - 65px);
                    background: #04070f;
                    padding: 32px 24px;
                    font-family: 'Outfit', sans-serif;
                    color: #eef4ff;
                }
                .dash-con { max-width: 1180px; margin: 0 auto; }

                /* Greeting */
                .greeting { margin-bottom: 32px; }
                .greeting-sub { font-size: 0.82rem; color: #8896aa; margin-bottom: 4px; }
                .greeting-name { font-family: 'Syne', sans-serif; font-size: clamp(1.6rem, 3vw, 2.2rem); font-weight: 800; }
                .greeting-name span {
                    background: linear-gradient(130deg, #dbeafe, #38bdf8, #22d3ee);
                    -webkit-background-clip: text; -webkit-text-fill-color: transparent;
                }

                /* Stats grid */
                .stats-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 16px; margin-bottom: 28px; }
                .stat-card {
                    background: rgba(255,255,255,0.03);
                    border: 1px solid rgba(255,255,255,0.07);
                    border-radius: 18px; padding: 20px;
                    transition: border-color 0.3s, transform 0.3s;
                }
                .stat-card:hover { border-color: rgba(56,189,248,0.25); transform: translateY(-3px); }
                .stat-icon { font-size: 1.6rem; margin-bottom: 12px; }
                .stat-val { font-family: 'Syne', sans-serif; font-size: 1.8rem; font-weight: 800; color: #fff; line-height: 1; margin-bottom: 4px; }
                .stat-label { font-size: 0.78rem; color: #8896aa; font-weight: 400; }

                /* Quick actions */
                .qa-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 12px; margin-bottom: 28px; }
                .qa-btn {
                    display: flex; flex-direction: column; align-items: center; gap: 8px;
                    background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.07);
                    border-radius: 16px; padding: 18px 12px; text-decoration: none;
                    color: #eef4ff; transition: all 0.25s; cursor: pointer;
                }
                .qa-btn:hover { border-color: rgba(56,189,248,0.3); background: rgba(56,189,248,0.06); transform: translateY(-2px); }
                .qa-btn.primary { background: linear-gradient(135deg, rgba(14,165,233,0.15), rgba(34,211,238,0.08)); border-color: rgba(56,189,248,0.25); }
                .qa-icon { font-size: 1.5rem; }
                .qa-label { font-size: 0.78rem; font-weight: 500; color: #8896aa; text-align: center; }

                /* Chart card */
                .chart-card {
                    background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.07);
                    border-radius: 18px; padding: 24px; margin-bottom: 28px;
                }
                .card-title { font-family: 'Syne', sans-serif; font-size: 1rem; font-weight: 700; margin-bottom: 18px; color: #fff; }

                /* Bookings */
                .bookings-card {
                    background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.07);
                    border-radius: 18px; padding: 24px;
                }
                .booking-row {
                    display: flex; align-items: center; justify-content: space-between;
                    padding: 14px 0; border-bottom: 1px solid rgba(255,255,255,0.04);
                    gap: 12px; flex-wrap: wrap;
                }
                .booking-row:last-child { border-bottom: none; }
                .booking-ref { font-family: 'Syne', sans-serif; font-size: 0.82rem; font-weight: 700; color: #38bdf8; }
                .booking-info { font-size: 0.78rem; color: #8896aa; margin-top: 2px; }
                .status-badge { font-size: 0.68rem; font-weight: 700; padding: 4px 10px; border-radius: 50px; text-transform: uppercase; letter-spacing: 0.06em; }
                .booking-price { font-family: 'Syne', sans-serif; font-size: 0.95rem; font-weight: 700; color: #fff; }
                .empty-state { text-align: center; padding: 40px; color: #8896aa; font-size: 0.9rem; }

                /* Member badge */
                .member-badge {
                    display: inline-flex; align-items: center; gap: 6px;
                    background: rgba(56,189,248,0.07); border: 1px solid rgba(56,189,248,0.15);
                    border-radius: 50px; padding: 4px 12px; font-size: 0.72rem; color: #38bdf8;
                    margin-bottom: 6px;
                }

                @media (max-width: 640px) {
                    .dash-root { padding: 20px 16px; }
                    .stats-grid { grid-template-columns: 1fr 1fr; }
                }
            `}</style>

            <div className="dash-root">
                <div className="dash-con">

                    {/* Greeting */}
                    <div className="greeting">
                        <div className="member-badge">
                            ✦ Member since {stats.member_since}
                        </div>
                        <div className="greeting-sub">{greeting()},</div>
                        <div className="greeting-name">
                            Welcome back, <span>{userName.split(' ')[0]}</span> 👋
                        </div>
                    </div>

                    {/* Stats */}
                    <div className="stats-grid">
                        {[
                            { icon: '📋', val: stats.total_bookings,    label: 'Total Bookings' },
                            { icon: '⏳', val: stats.pending_bookings,  label: 'Pending' },
                            { icon: '✅', val: stats.completed_bookings,label: 'Completed' },
                            { icon: '💰', val: `$${Number(stats.total_spent).toFixed(2)}`, label: 'Total Spent' },
                            { icon: '🚗', val: stats.total_vehicles,    label: 'My Vehicles' },
                        ].map((s) => (
                            <div key={s.label} className="stat-card">
                                <div className="stat-icon">{s.icon}</div>
                                <div className="stat-val">{s.val}</div>
                                <div className="stat-label">{s.label}</div>
                            </div>
                        ))}
                    </div>

                    {/* Quick Actions */}
                    <div style={{ marginBottom: 10 }}>
                        <div className="card-title">Quick Actions</div>
                    </div>
                    <div className="qa-grid" style={{ marginBottom: 28 }}>
                        {[
                            { icon: '🤖', label: 'AI Booking',   href: '/ai-chat',  primary: true },
                            { icon: '📋', label: 'Book Manually', href: '/bookings', primary: false },
                            { icon: '🚗', label: 'Add Vehicle',   href: '/vehicles', primary: false },
                            { icon: '🛠️', label: 'Services',      href: '/services', primary: false },
                            { icon: '📊', label: 'My Bookings',   href: '/bookings', primary: false },
                            { icon: '👤', label: 'Profile',       href: '/profile',  primary: false },
                        ].map((a) => (
                            <Link key={a.label} href={a.href} className={`qa-btn ${a.primary ? 'primary' : ''}`}>
                                <span className="qa-icon">{a.icon}</span>
                                <span className="qa-label">{a.label}</span>
                            </Link>
                        ))}
                    </div>

                    {/* Chart */}
                    <div className="chart-card">
                        <div className="card-title">📈 Booking Activity (Last 6 Months)</div>
                        {Object.keys(monthlyData).length > 0 ? (
                            <canvas ref={chartRef} height={80} />
                        ) : (
                            <div className="empty-state">No booking data yet — make your first booking! 🚗</div>
                        )}
                    </div>

                    {/* Recent Bookings */}
                    <div className="bookings-card">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 }}>
                            <div className="card-title" style={{ marginBottom: 0 }}>🕐 Recent Bookings</div>
                            <Link href="/bookings" style={{ fontSize: '0.78rem', color: '#38bdf8', textDecoration: 'none' }}>
                                View all →
                            </Link>
                        </div>

                        {recentBookings.length === 0 ? (
                            <div className="empty-state">
                                No bookings yet!{' '}
                                <Link href="/ai-chat" style={{ color: '#38bdf8' }}>Book your first wash →</Link>
                            </div>
                        ) : recentBookings.map((b) => (
                            <div key={b.id} className="booking-row">
                                <div>
                                    <div className="booking-ref">{b.booking_ref}</div>
                                    <div className="booking-info">
                                        {b.service?.name} · {b.vehicle?.make} {b.vehicle?.model}
                                    </div>
                                    <div className="booking-info">
                                        {new Date(b.scheduled_at).toLocaleDateString('en-US', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' })}
                                    </div>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                    <span className="status-badge" style={{ background: STATUS_COLORS[b.status] || 'rgba(255,255,255,0.08)', color: STATUS_TEXT[b.status] || '#8896aa' }}>
                                        {b.status}
                                    </span>
                                    <div className="booking-price">${Number(b.total_price).toFixed(2)}</div>
                                    <Link href={`/bookings/${b.id}`} style={{ fontSize: '0.75rem', color: '#38bdf8', textDecoration: 'none', border: '1px solid rgba(56,189,248,0.2)', padding: '4px 10px', borderRadius: 50 }}>
                                        View →
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>

                </div>
            </div>
        </AuthenticatedLayout>
    );
}