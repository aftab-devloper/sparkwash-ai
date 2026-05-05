import { Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

interface Props {
    booking: {
        id: number;
        booking_ref: string;
        total_price: number;
        scheduled_at: string;
        status: string;
        service: { name: string };
    };
}

export default function Success({ booking }: Props) {
    return (
        <AuthenticatedLayout header={
            <h2 style={{ color: '#ffffff', fontSize: '20px', fontWeight: '600', margin: 0 }}>
                ✅ Payment Successful
            </h2>
        }>
            <Head title="Payment Successful — SparkWash" />

            <div style={{
                minHeight: '100vh',
                background: 'linear-gradient(135deg, #0a0a0f 0%, #0d1b2a 50%, #0a0a0f 100%)',
                padding: '40px 16px',
                position: 'relative',
                overflow: 'hidden',
            }}>

                {/* Background Orbs */}
                <div style={{
                    position: 'absolute', top: '10%', left: '5%',
                    width: '300px', height: '300px', borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(0,200,100,0.12) 0%, transparent 70%)',
                    filter: 'blur(40px)', pointerEvents: 'none',
                    animation: 'pulse 4s ease-in-out infinite',
                }} />
                <div style={{
                    position: 'absolute', bottom: '10%', right: '5%',
                    width: '250px', height: '250px', borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(0,149,255,0.1) 0%, transparent 70%)',
                    filter: 'blur(40px)', pointerEvents: 'none',
                    animation: 'pulse 4s ease-in-out infinite 2s',
                }} />

                {/* Confetti Particles */}
                {[...Array(8)].map((_, i) => (
                    <div key={i} style={{
                        position: 'absolute',
                        width: `${5 + i}px`, height: `${5 + i}px`,
                        borderRadius: i % 2 === 0 ? '50%' : '2px',
                        background: i % 3 === 0
                            ? 'rgba(0,200,100,0.5)'
                            : i % 3 === 1
                            ? 'rgba(0,149,255,0.5)'
                            : 'rgba(255,200,0,0.4)',
                        top: `${10 + i * 10}%`,
                        left: `${5 + i * 12}%`,
                        animation: `float ${2 + i * 0.5}s ease-in-out infinite alternate`,
                        boxShadow: `0 0 10px currentColor`,
                    }} />
                ))}

                {/* Main Card */}
                <div style={{
                    maxWidth: '480px',
                    margin: '0 auto',
                    background: 'rgba(255,255,255,0.04)',
                    backdropFilter: 'blur(30px)',
                    WebkitBackdropFilter: 'blur(30px)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '24px',
                    padding: '48px 40px',
                    boxShadow: '0 25px 50px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.1)',
                    position: 'relative', zIndex: 10,
                    textAlign: 'center',
                }}>

                    {/* Animated Success Icon */}
                    <div style={{
                        position: 'relative',
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: '24px',
                    }}>
                        {/* Glow Ring */}
                        <div style={{
                            position: 'absolute',
                            width: '100px', height: '100px',
                            borderRadius: '50%',
                            background: 'radial-gradient(circle, rgba(0,200,100,0.3) 0%, transparent 70%)',
                            animation: 'ping 1.5s ease-out infinite',
                        }} />
                        <div style={{
                            width: '80px', height: '80px',
                            borderRadius: '50%',
                            background: 'linear-gradient(135deg, #00c864, #00ff88)',
                            display: 'flex', alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '36px',
                            boxShadow: '0 8px 30px rgba(0,200,100,0.5)',
                            animation: 'scaleIn 0.5s ease-out',
                            position: 'relative', zIndex: 1,
                        }}>
                            ✓
                        </div>
                    </div>

                    {/* Title */}
                    <h2 style={{
                        fontSize: '28px', fontWeight: '700',
                        color: '#ffffff', margin: '0 0 8px',
                        letterSpacing: '-0.5px',
                    }}>
                        Payment Successful!
                    </h2>
                    <p style={{
                        color: 'rgba(255,255,255,0.45)',
                        fontSize: '15px', margin: '0 0 32px',
                    }}>
                        🎉 Your SparkWash booking is confirmed
                    </p>

                    {/* Booking Details Card */}
                    <div style={{
                        background: 'rgba(255,255,255,0.05)',
                        border: '1px solid rgba(255,255,255,0.08)',
                        borderRadius: '16px',
                        padding: '24px',
                        marginBottom: '28px',
                        textAlign: 'left',
                    }}>
                        <h3 style={{
                            color: 'rgba(255,255,255,0.7)',
                            fontSize: '13px', fontWeight: '600',
                            letterSpacing: '1px',
                            textTransform: 'uppercase',
                            margin: '0 0 16px',
                        }}>
                            Booking Details
                        </h3>

                        {[
                            { label: 'Booking Ref', value: booking.booking_ref, mono: true },
                            { label: 'Service', value: booking.service.name },
                            { label: 'Date & Time', value: new Date(booking.scheduled_at).toLocaleString() },
                        ].map((item, idx) => (
                            <div key={idx} style={{
                                display: 'flex', justifyContent: 'space-between',
                                alignItems: 'center',
                                padding: '10px 0',
                                borderBottom: idx < 2 ? '1px solid rgba(255,255,255,0.06)' : 'none',
                            }}>
                                <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '13px' }}>
                                    {item.label}
                                </span>
                                <span style={{
                                    color: 'rgba(255,255,255,0.85)',
                                    fontSize: '13px', fontWeight: '500',
                                    fontFamily: item.mono ? 'monospace' : 'inherit',
                                    letterSpacing: item.mono ? '0.5px' : 'normal',
                                }}>
                                    {item.value}
                                </span>
                            </div>
                        ))}

                        {/* Amount Row — Special */}
                        <div style={{
                            display: 'flex', justifyContent: 'space-between',
                            alignItems: 'center', padding: '14px 0 0',
                            marginTop: '4px',
                            borderTop: '1px solid rgba(255,255,255,0.06)',
                        }}>
                            <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '13px' }}>
                                Amount Paid
                            </span>
                            <span style={{
                                fontSize: '22px', fontWeight: '700',
                                background: 'linear-gradient(135deg, #00c864, #00ff88)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                            }}>
                                ${booking.total_price}
                            </span>
                        </div>

                        {/* Status Badge */}
                        <div style={{
                            display: 'flex', justifyContent: 'space-between',
                            alignItems: 'center', padding: '10px 0 0',
                        }}>
                            <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '13px' }}>
                                Status
                            </span>
                            <span style={{
                                background: 'rgba(0,200,100,0.15)',
                                border: '1px solid rgba(0,200,100,0.3)',
                                color: '#00c864',
                                fontSize: '12px', fontWeight: '600',
                                padding: '4px 12px', borderRadius: '20px',
                                textTransform: 'capitalize',
                                letterSpacing: '0.3px',
                            }}>
                                ● {booking.status}
                            </span>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div style={{ display: 'flex', gap: '12px' }}>
                        <Link
                            href={route('bookings.index')}
                            style={{
                                flex: 1,
                                padding: '14px',
                                background: 'linear-gradient(135deg, #0095ff 0%, #00d4ff 100%)',
                                borderRadius: '12px',
                                color: '#ffffff',
                                fontSize: '14px', fontWeight: '600',
                                textDecoration: 'none',
                                textAlign: 'center',
                                boxShadow: '0 8px 25px rgba(0,149,255,0.35)',
                                transition: 'all 0.2s ease',
                                display: 'block',
                            }}
                            onMouseEnter={(e) => {
                                (e.currentTarget).style.transform = 'translateY(-1px)';
                                (e.currentTarget).style.boxShadow = '0 12px 30px rgba(0,149,255,0.45)';
                            }}
                            onMouseLeave={(e) => {
                                (e.currentTarget).style.transform = 'translateY(0)';
                                (e.currentTarget).style.boxShadow = '0 8px 25px rgba(0,149,255,0.35)';
                            }}
                        >
                            📋 My Bookings
                        </Link>
                        <Link
                            href={route('dashboard')}
                            style={{
                                flex: 1,
                                padding: '14px',
                                background: 'rgba(255,255,255,0.07)',
                                border: '1px solid rgba(255,255,255,0.12)',
                                borderRadius: '12px',
                                color: 'rgba(255,255,255,0.75)',
                                fontSize: '14px', fontWeight: '600',
                                textDecoration: 'none',
                                textAlign: 'center',
                                transition: 'all 0.2s ease',
                                display: 'block',
                            }}
                            onMouseEnter={(e) => {
                                (e.currentTarget).style.background = 'rgba(255,255,255,0.12)';
                                (e.currentTarget).style.color = '#ffffff';
                            }}
                            onMouseLeave={(e) => {
                                (e.currentTarget).style.background = 'rgba(255,255,255,0.07)';
                                (e.currentTarget).style.color = 'rgba(255,255,255,0.75)';
                            }}
                        >
                            🏠 Dashboard
                        </Link>
                    </div>

                    {/* Footer note */}
                    <p style={{
                        marginTop: '20px',
                        color: 'rgba(255,255,255,0.25)',
                        fontSize: '12px',
                    }}>
                        📧 Confirmation email sent to your inbox
                    </p>
                </div>
            </div>

            <style>{`
                @keyframes pulse {
                    0%, 100% { transform: scale(1); opacity: 0.8; }
                    50% { transform: scale(1.1); opacity: 1; }
                }
                @keyframes float {
                    0% { transform: translateY(0px) rotate(0deg); opacity: 0.5; }
                    100% { transform: translateY(-25px) rotate(180deg); opacity: 0.9; }
                }
                @keyframes ping {
                    0% { transform: scale(0.8); opacity: 0.8; }
                    100% { transform: scale(1.6); opacity: 0; }
                }
                @keyframes scaleIn {
                    0% { transform: scale(0); opacity: 0; }
                    70% { transform: scale(1.1); }
                    100% { transform: scale(1); opacity: 1; }
                }
            `}</style>
        </AuthenticatedLayout>
    );
}