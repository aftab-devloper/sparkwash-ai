import { Head, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { useState } from 'react';

interface Props {
    booking: {
        id: number;
        booking_ref: string;
        total_price: number;
        scheduled_at: string;
        service: { name: string };
    };
    clientSecret: string;
    stripeKey: string;
}

export default function Checkout({ booking, clientSecret, stripeKey }: Props) {
    const [processing, setProcessing] = useState(false);
    const [cardNumber, setCardNumber] = useState('');
    const [expiry, setExpiry] = useState('');
    const [cvc, setCvc] = useState('');

    const handlePayment = async (e: React.FormEvent) => {
        e.preventDefault();
        setProcessing(true);
        setTimeout(() => {
            router.get(route('payment.success', booking.id));
        }, 1500);
    };

    const formatCardNumber = (val: string) => {
        return val.replace(/\D/g, '').replace(/(.{4})/g, '$1 ').trim().slice(0, 19);
    };

    const formatExpiry = (val: string) => {
        return val.replace(/\D/g, '').replace(/^(\d{2})(\d)/, '$1/$2').slice(0, 5);
    };

    const inputStyle: React.CSSProperties = {
        width: '100%',
        padding: '13px 16px',
        background: 'rgba(255,255,255,0.06)',
        border: '1px solid rgba(255,255,255,0.12)',
        borderRadius: '12px',
        color: '#ffffff',
        fontSize: '15px',
        outline: 'none',
        transition: 'all 0.2s ease',
        boxSizing: 'border-box',
    };

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
        e.target.style.border = '1px solid rgba(0,149,255,0.6)';
        e.target.style.background = 'rgba(255,255,255,0.09)';
        e.target.style.boxShadow = '0 0 0 3px rgba(0,149,255,0.1)';
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        e.target.style.border = '1px solid rgba(255,255,255,0.12)';
        e.target.style.background = 'rgba(255,255,255,0.06)';
        e.target.style.boxShadow = 'none';
    };

    return (
        <AuthenticatedLayout header={
            <h2 style={{ color: '#ffffff', fontSize: '20px', fontWeight: '600', margin: 0 }}>
                💳 Checkout
            </h2>
        }>
            <Head title="Checkout — SparkWash" />

            {/* Page Background */}
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
                    background: 'radial-gradient(circle, rgba(0,149,255,0.12) 0%, transparent 70%)',
                    filter: 'blur(40px)', pointerEvents: 'none',
                    animation: 'pulse 4s ease-in-out infinite',
                }} />
                <div style={{
                    position: 'absolute', bottom: '10%', right: '5%',
                    width: '250px', height: '250px', borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(0,210,255,0.1) 0%, transparent 70%)',
                    filter: 'blur(40px)', pointerEvents: 'none',
                    animation: 'pulse 4s ease-in-out infinite 2s',
                }} />

                {/* Card */}
                <div style={{
                    maxWidth: '480px',
                    margin: '0 auto',
                    background: 'rgba(255,255,255,0.04)',
                    backdropFilter: 'blur(30px)',
                    WebkitBackdropFilter: 'blur(30px)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '24px',
                    padding: '40px',
                    boxShadow: '0 25px 50px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.1)',
                    position: 'relative', zIndex: 10,
                }}>

                    {/* Header */}
                    <div style={{ textAlign: 'center', marginBottom: '32px' }}>
                        <div style={{
                            display: 'inline-flex', alignItems: 'center',
                            justifyContent: 'center',
                            width: '60px', height: '60px', borderRadius: '16px',
                            background: 'linear-gradient(135deg, #0095ff, #00d4ff)',
                            marginBottom: '14px',
                            boxShadow: '0 8px 25px rgba(0,149,255,0.4)',
                            fontSize: '26px',
                        }}>
                            💳
                        </div>
                        <h2 style={{
                            fontSize: '24px', fontWeight: '700',
                            color: '#ffffff', margin: '0 0 6px',
                            letterSpacing: '-0.5px',
                        }}>
                            Secure Payment
                        </h2>
                        <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '14px', margin: 0 }}>
                            Complete your SparkWash booking
                        </p>
                    </div>

                    {/* Booking Summary */}
                    <div style={{
                        background: 'rgba(0,149,255,0.08)',
                        border: '1px solid rgba(0,149,255,0.2)',
                        borderRadius: '16px',
                        padding: '20px',
                        marginBottom: '20px',
                    }}>
                        <h3 style={{
                            color: '#ffffff', fontSize: '15px',
                            fontWeight: '600', margin: '0 0 14px',
                            display: 'flex', alignItems: 'center', gap: '8px',
                        }}>
                            🧾 Booking Summary
                        </h3>

                        {[
                            { label: 'Reference', value: booking.booking_ref },
                            { label: 'Service', value: booking.service.name },
                            { label: 'Date', value: new Date(booking.scheduled_at).toLocaleString() },
                        ].map((item) => (
                            <div key={item.label} style={{
                                display: 'flex', justifyContent: 'space-between',
                                alignItems: 'center', marginBottom: '8px',
                            }}>
                                <span style={{ color: 'rgba(255,255,255,0.45)', fontSize: '13px' }}>
                                    {item.label}
                                </span>
                                <span style={{ color: 'rgba(255,255,255,0.85)', fontSize: '13px', fontWeight: '500' }}>
                                    {item.value}
                                </span>
                            </div>
                        ))}

                        {/* Divider */}
                        <div style={{
                            height: '1px',
                            background: 'rgba(255,255,255,0.08)',
                            margin: '14px 0',
                        }} />

                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: '14px' }}>Total Amount</span>
                            <span style={{
                                fontSize: '24px', fontWeight: '700',
                                background: 'linear-gradient(135deg, #0095ff, #00d4ff)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                            }}>
                                ${booking.total_price}
                            </span>
                        </div>
                    </div>

                    {/* Test Mode Notice */}
                    <div style={{
                        background: 'rgba(255,200,0,0.08)',
                        border: '1px solid rgba(255,200,0,0.2)',
                        borderRadius: '12px',
                        padding: '12px 16px',
                        marginBottom: '24px',
                        fontSize: '13px',
                        color: 'rgba(255,200,0,0.9)',
                        display: 'flex', alignItems: 'center', gap: '8px',
                    }}>
                        🧪 <span>Test Mode — Use card: <strong>4242 4242 4242 4242</strong></span>
                    </div>

                    {/* Payment Form */}
                    <form onSubmit={handlePayment}>

                        {/* Card Number */}
                        <div style={{ marginBottom: '18px' }}>
                            <label style={{
                                display: 'block', color: 'rgba(255,255,255,0.7)',
                                fontSize: '13px', fontWeight: '500',
                                marginBottom: '8px', letterSpacing: '0.3px',
                            }}>
                                Card Number
                            </label>
                            <input
                                type="text"
                                placeholder="4242 4242 4242 4242"
                                value={cardNumber}
                                onChange={e => setCardNumber(formatCardNumber(e.target.value))}
                                style={inputStyle}
                                onFocus={handleFocus}
                                onBlur={handleBlur}
                                maxLength={19}
                                required
                            />
                        </div>

                        {/* Expiry + CVC */}
                        <div style={{ display: 'flex', gap: '16px', marginBottom: '28px' }}>
                            <div style={{ flex: 1 }}>
                                <label style={{
                                    display: 'block', color: 'rgba(255,255,255,0.7)',
                                    fontSize: '13px', fontWeight: '500', marginBottom: '8px',
                                }}>
                                    Expiry Date
                                </label>
                                <input
                                    type="text"
                                    placeholder="MM/YY"
                                    value={expiry}
                                    onChange={e => setExpiry(formatExpiry(e.target.value))}
                                    style={inputStyle}
                                    onFocus={handleFocus}
                                    onBlur={handleBlur}
                                    maxLength={5}
                                    required
                                />
                            </div>
                            <div style={{ flex: 1 }}>
                                <label style={{
                                    display: 'block', color: 'rgba(255,255,255,0.7)',
                                    fontSize: '13px', fontWeight: '500', marginBottom: '8px',
                                }}>
                                    CVC
                                </label>
                                <input
                                    type="text"
                                    placeholder="123"
                                    value={cvc}
                                    onChange={e => setCvc(e.target.value.replace(/\D/g, '').slice(0, 3))}
                                    style={inputStyle}
                                    onFocus={handleFocus}
                                    onBlur={handleBlur}
                                    maxLength={3}
                                    required
                                />
                            </div>
                        </div>

                        {/* Pay Button */}
                        <button
                            type="submit"
                            disabled={processing}
                            style={{
                                width: '100%', padding: '15px',
                                background: processing
                                    ? 'rgba(0,149,255,0.4)'
                                    : 'linear-gradient(135deg, #0095ff 0%, #00d4ff 100%)',
                                border: 'none', borderRadius: '12px',
                                color: '#ffffff', fontSize: '16px',
                                fontWeight: '700',
                                cursor: processing ? 'not-allowed' : 'pointer',
                                transition: 'all 0.2s ease',
                                boxShadow: processing ? 'none' : '0 8px 25px rgba(0,149,255,0.4)',
                                letterSpacing: '0.3px',
                                display: 'flex', alignItems: 'center',
                                justifyContent: 'center', gap: '8px',
                            }}
                            onMouseEnter={(e) => {
                                if (!processing) {
                                    (e.currentTarget).style.transform = 'translateY(-1px)';
                                    (e.currentTarget).style.boxShadow = '0 12px 30px rgba(0,149,255,0.5)';
                                }
                            }}
                            onMouseLeave={(e) => {
                                (e.currentTarget).style.transform = 'translateY(0)';
                                (e.currentTarget).style.boxShadow = '0 8px 25px rgba(0,149,255,0.4)';
                            }}
                        >
                            {processing ? (
                                <>
                                    <span style={{
                                        width: '18px', height: '18px',
                                        border: '2px solid rgba(255,255,255,0.3)',
                                        borderTop: '2px solid #ffffff',
                                        borderRadius: '50%',
                                        display: 'inline-block',
                                        animation: 'spin 0.8s linear infinite',
                                    }} />
                                    Processing Payment...
                                </>
                            ) : (
                                <>🔒 Pay ${booking.total_price}</>
                            )}
                        </button>

                        {/* Security Badge */}
                        <div style={{
                            marginTop: '16px', textAlign: 'center',
                            color: 'rgba(255,255,255,0.3)', fontSize: '12px',
                            display: 'flex', alignItems: 'center',
                            justifyContent: 'center', gap: '6px',
                        }}>
                            🔐 256-bit SSL Encrypted · Powered by Stripe
                        </div>
                    </form>
                </div>
            </div>

            <style>{`
                @keyframes pulse {
                    0%, 100% { transform: scale(1); opacity: 0.8; }
                    50% { transform: scale(1.1); opacity: 1; }
                }
                @keyframes spin {
                    to { transform: rotate(360deg); }
                }
                input::placeholder { color: rgba(255,255,255,0.25) !important; }
                input:-webkit-autofill {
                    -webkit-box-shadow: 0 0 0 100px rgba(13,27,42,0.95) inset !important;
                    -webkit-text-fill-color: #ffffff !important;
                }
            `}</style>
        </AuthenticatedLayout>
    );
}