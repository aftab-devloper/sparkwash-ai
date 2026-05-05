import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import { Head, Link, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

export default function Login({
    status,
    canResetPassword,
}: {
    status?: string;
    canResetPassword: boolean;
}) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false as boolean,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <>
            <Head title="Log in — SparkWash" />

            <div className="min-h-screen flex items-center justify-center relative overflow-hidden"
                style={{
                    background: 'linear-gradient(135deg, #0a0a0f 0%, #0d1b2a 50%, #0a0a0f 100%)',
                }}>

                {/* Animated background orbs */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div style={{
                        position: 'absolute', top: '15%', left: '10%',
                        width: '350px', height: '350px', borderRadius: '50%',
                        background: 'radial-gradient(circle, rgba(0,149,255,0.15) 0%, transparent 70%)',
                        filter: 'blur(40px)',
                        animation: 'pulse 4s ease-in-out infinite',
                    }} />
                    <div style={{
                        position: 'absolute', bottom: '15%', right: '10%',
                        width: '300px', height: '300px', borderRadius: '50%',
                        background: 'radial-gradient(circle, rgba(0,210,255,0.12) 0%, transparent 70%)',
                        filter: 'blur(40px)',
                        animation: 'pulse 4s ease-in-out infinite 2s',
                    }} />
                    <div style={{
                        position: 'absolute', top: '50%', left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: '500px', height: '500px', borderRadius: '50%',
                        background: 'radial-gradient(circle, rgba(0,100,200,0.08) 0%, transparent 70%)',
                        filter: 'blur(60px)',
                    }} />
                </div>

                {/* Floating particles */}
                {[...Array(6)].map((_, i) => (
                    <div key={i} style={{
                        position: 'absolute',
                        width: `${4 + i}px`, height: `${4 + i}px`,
                        borderRadius: '50%',
                        background: 'rgba(0, 149, 255, 0.4)',
                        top: `${15 + i * 14}%`,
                        left: `${10 + i * 15}%`,
                        animation: `float ${3 + i}s ease-in-out infinite alternate`,
                        boxShadow: '0 0 10px rgba(0,149,255,0.6)',
                    }} />
                ))}

                {/* Glass Card */}
                <div style={{
                    width: '100%', maxWidth: '440px', margin: '0 16px',
                    background: 'rgba(255,255,255,0.04)',
                    backdropFilter: 'blur(30px)',
                    WebkitBackdropFilter: 'blur(30px)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '24px',
                    padding: '48px 40px',
                    boxShadow: '0 25px 50px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.1)',
                    position: 'relative', zIndex: 10,
                }}>

                    {/* Logo + Title */}
                    <div style={{ textAlign: 'center', marginBottom: '36px' }}>
                        <div style={{
                            display: 'inline-flex', alignItems: 'center',
                            justifyContent: 'center',
                            width: '64px', height: '64px', borderRadius: '16px',
                            background: 'linear-gradient(135deg, #0095ff, #00d4ff)',
                            marginBottom: '16px',
                            boxShadow: '0 8px 25px rgba(0,149,255,0.4)',
                            fontSize: '28px',
                        }}>
                            🚗
                        </div>
                        <h1 style={{
                            fontSize: '26px', fontWeight: '700', color: '#ffffff',
                            letterSpacing: '-0.5px', margin: '0 0 6px',
                        }}>
                            Welcome Back
                        </h1>
                        <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '14px', margin: 0 }}>
                            Sign in to your SparkWash account
                        </p>
                    </div>

                    {/* Status message */}
                    {status && (
                        <div style={{
                            marginBottom: '20px', padding: '12px 16px',
                            background: 'rgba(0,200,100,0.1)',
                            border: '1px solid rgba(0,200,100,0.3)',
                            borderRadius: '10px',
                            color: '#00c864', fontSize: '13px',
                        }}>
                            {status}
                        </div>
                    )}

                    <form onSubmit={submit}>
                        {/* Email Field */}
                        <div style={{ marginBottom: '20px' }}>
                            <label style={{
                                display: 'block', color: 'rgba(255,255,255,0.7)',
                                fontSize: '13px', fontWeight: '500', marginBottom: '8px',
                                letterSpacing: '0.3px',
                            }}>
                                Email Address
                            </label>
                            <input
                                id="email" type="email" name="email"
                                value={data.email} autoComplete="username" autoFocus
                                onChange={(e) => setData('email', e.target.value)}
                                placeholder="you@example.com"
                                style={{
                                    width: '100%', padding: '13px 16px',
                                    background: 'rgba(255,255,255,0.07)',
                                    border: errors.email
                                        ? '1px solid rgba(255,80,80,0.6)'
                                        : '1px solid rgba(255,255,255,0.12)',
                                    borderRadius: '12px', color: '#ffffff',
                                    fontSize: '15px', outline: 'none',
                                    transition: 'all 0.2s ease',
                                    boxSizing: 'border-box',
                                }}
                                onFocus={(e) => {
                                    e.target.style.border = '1px solid rgba(0,149,255,0.6)';
                                    e.target.style.background = 'rgba(255,255,255,0.09)';
                                    e.target.style.boxShadow = '0 0 0 3px rgba(0,149,255,0.1)';
                                }}
                                onBlur={(e) => {
                                    e.target.style.border = '1px solid rgba(255,255,255,0.12)';
                                    e.target.style.background = 'rgba(255,255,255,0.07)';
                                    e.target.style.boxShadow = 'none';
                                }}
                            />
                            {errors.email && (
                                <p style={{ color: '#ff6b6b', fontSize: '12px', marginTop: '6px' }}>
                                    {errors.email}
                                </p>
                            )}
                        </div>

                        {/* Password Field */}
                        <div style={{ marginBottom: '20px' }}>
                            <label style={{
                                display: 'block', color: 'rgba(255,255,255,0.7)',
                                fontSize: '13px', fontWeight: '500', marginBottom: '8px',
                            }}>
                                Password
                            </label>
                            <input
                                id="password" type="password" name="password"
                                value={data.password} autoComplete="current-password"
                                onChange={(e) => setData('password', e.target.value)}
                                placeholder="••••••••"
                                style={{
                                    width: '100%', padding: '13px 16px',
                                    background: 'rgba(255,255,255,0.07)',
                                    border: errors.password
                                        ? '1px solid rgba(255,80,80,0.6)'
                                        : '1px solid rgba(255,255,255,0.12)',
                                    borderRadius: '12px', color: '#ffffff',
                                    fontSize: '15px', outline: 'none',
                                    transition: 'all 0.2s ease',
                                    boxSizing: 'border-box',
                                }}
                                onFocus={(e) => {
                                    e.target.style.border = '1px solid rgba(0,149,255,0.6)';
                                    e.target.style.background = 'rgba(255,255,255,0.09)';
                                    e.target.style.boxShadow = '0 0 0 3px rgba(0,149,255,0.1)';
                                }}
                                onBlur={(e) => {
                                    e.target.style.border = '1px solid rgba(255,255,255,0.12)';
                                    e.target.style.background = 'rgba(255,255,255,0.07)';
                                    e.target.style.boxShadow = 'none';
                                }}
                            />
                            {errors.password && (
                                <p style={{ color: '#ff6b6b', fontSize: '12px', marginTop: '6px' }}>
                                    {errors.password}
                                </p>
                            )}
                        </div>

                        {/* Remember Me + Forgot Password */}
                        <div style={{
                            display: 'flex', justifyContent: 'space-between',
                            alignItems: 'center', marginBottom: '28px',
                        }}>
                            <label style={{
                                display: 'flex', alignItems: 'center',
                                gap: '8px', cursor: 'pointer',
                            }}>
                                <Checkbox
                                    name="remember"
                                    checked={data.remember}
                                    onChange={(e) => setData('remember', (e.target.checked || false) as false)}
                                />
                                <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '13px' }}>
                                    Remember me
                                </span>
                            </label>

                            {canResetPassword && (
                                <Link
                                    href={route('password.request')}
                                    style={{
                                        color: '#0095ff', fontSize: '13px',
                                        textDecoration: 'none', fontWeight: '500',
                                    }}
                                >
                                    Forgot password?
                                </Link>
                            )}
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={processing}
                            style={{
                                width: '100%', padding: '14px',
                                background: processing
                                    ? 'rgba(0,149,255,0.5)'
                                    : 'linear-gradient(135deg, #0095ff 0%, #00d4ff 100%)',
                                border: 'none', borderRadius: '12px',
                                color: '#ffffff', fontSize: '15px',
                                fontWeight: '600', cursor: processing ? 'not-allowed' : 'pointer',
                                transition: 'all 0.2s ease',
                                boxShadow: processing ? 'none' : '0 8px 25px rgba(0,149,255,0.35)',
                                letterSpacing: '0.3px',
                            }}
                            onMouseEnter={(e) => {
                                if (!processing) {
                                    (e.target as HTMLButtonElement).style.transform = 'translateY(-1px)';
                                    (e.target as HTMLButtonElement).style.boxShadow = '0 12px 30px rgba(0,149,255,0.45)';
                                }
                            }}
                            onMouseLeave={(e) => {
                                (e.target as HTMLButtonElement).style.transform = 'translateY(0)';
                                (e.target as HTMLButtonElement).style.boxShadow = '0 8px 25px rgba(0,149,255,0.35)';
                            }}
                        >
                            {processing ? '⏳ Signing in...' : '🔐 Sign In'}
                        </button>
                    </form>

                    {/* Register Link */}
                    <div style={{
                        marginTop: '28px', textAlign: 'center',
                        color: 'rgba(255,255,255,0.4)', fontSize: '14px',
                    }}>
                        Don't have an account?{' '}
                        <Link
                            href={route('register') + (typeof window !== 'undefined' && new URLSearchParams(window.location.search).get('redirect') === 'ai' ? '?redirect=ai' : '')}
                            style={{
                                color: '#0095ff', fontWeight: '600',
                                textDecoration: 'none',
                            }}
                        >
                            Create one free →
                        </Link>
                    </div>
                </div>
            </div>

            {/* CSS Animations */}
            <style>{`
                @keyframes pulse {
                    0%, 100% { transform: scale(1); opacity: 0.8; }
                    50% { transform: scale(1.1); opacity: 1; }
                }
                @keyframes float {
                    0% { transform: translateY(0px); opacity: 0.4; }
                    100% { transform: translateY(-20px); opacity: 0.8; }
                }
                input::placeholder { color: rgba(255,255,255,0.25) !important; }
                input:-webkit-autofill {
                    -webkit-box-shadow: 0 0 0 100px rgba(13,27,42,0.95) inset !important;
                    -webkit-text-fill-color: #ffffff !important;
                }
            `}</style>
        </>
    );
}