import InputError from '@/Components/InputError';
import { Head, Link, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        phone: '',
        password: '',
        password_confirmation: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    const inputStyle = (hasError: boolean) => ({
        width: '100%', padding: '13px 16px',
        background: 'rgba(255,255,255,0.07)',
        border: hasError
            ? '1px solid rgba(255,80,80,0.6)'
            : '1px solid rgba(255,255,255,0.12)',
        borderRadius: '12px', color: '#ffffff',
        fontSize: '15px', outline: 'none',
        transition: 'all 0.2s ease',
        boxSizing: 'border-box' as const,
    });

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
        e.target.style.border = '1px solid rgba(0,149,255,0.6)';
        e.target.style.background = 'rgba(255,255,255,0.09)';
        e.target.style.boxShadow = '0 0 0 3px rgba(0,149,255,0.1)';
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        e.target.style.border = '1px solid rgba(255,255,255,0.12)';
        e.target.style.background = 'rgba(255,255,255,0.07)';
        e.target.style.boxShadow = 'none';
    };

    return (
        <>
            <Head title="Register — SparkWash" />

            <div
                className="min-h-screen flex items-center justify-center relative overflow-hidden"
                style={{
                    background: 'linear-gradient(135deg, #0a0a0f 0%, #0d1b2a 50%, #0a0a0f 100%)',
                }}
            >
                {/* Background Orbs */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div style={{
                        position: 'absolute', top: '10%', left: '8%',
                        width: '350px', height: '350px', borderRadius: '50%',
                        background: 'radial-gradient(circle, rgba(0,149,255,0.15) 0%, transparent 70%)',
                        filter: 'blur(40px)',
                        animation: 'pulse 4s ease-in-out infinite',
                    }} />
                    <div style={{
                        position: 'absolute', bottom: '10%', right: '8%',
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

                {/* Floating Particles */}
                {[...Array(6)].map((_, i) => (
                    <div key={i} style={{
                        position: 'absolute',
                        width: `${4 + i}px`, height: `${4 + i}px`,
                        borderRadius: '50%',
                        background: 'rgba(0, 149, 255, 0.4)',
                        top: `${15 + i * 13}%`,
                        left: `${8 + i * 16}%`,
                        animation: `float ${3 + i}s ease-in-out infinite alternate`,
                        boxShadow: '0 0 10px rgba(0,149,255,0.6)',
                    }} />
                ))}

                {/* Glass Card */}
                <div style={{
                    width: '100%', maxWidth: '460px', margin: '24px 16px',
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
                            ✨
                        </div>
                        <h1 style={{
                            fontSize: '26px', fontWeight: '700', color: '#ffffff',
                            letterSpacing: '-0.5px', margin: '0 0 6px',
                        }}>
                            Create Account
                        </h1>
                        <p style={{
                            color: 'rgba(255,255,255,0.45)',
                            fontSize: '14px', margin: 0,
                        }}>
                            Join SparkWash — Premium Car Care
                        </p>
                    </div>

                    <form onSubmit={submit}>

                        {/* Name */}
                        <div style={{ marginBottom: '18px' }}>
                            <label style={{
                                display: 'block', color: 'rgba(255,255,255,0.7)',
                                fontSize: '13px', fontWeight: '500',
                                marginBottom: '8px', letterSpacing: '0.3px',
                            }}>
                                Full Name
                            </label>
                            <input
                                id="name" type="text" name="name"
                                value={data.name} autoComplete="name" autoFocus
                                onChange={(e) => setData('name', e.target.value)}
                                placeholder="Ahmad Ali"
                                style={inputStyle(!!errors.name)}
                                onFocus={handleFocus}
                                onBlur={handleBlur}
                                required
                            />
                            {errors.name && (
                                <p style={{ color: '#ff6b6b', fontSize: '12px', marginTop: '6px' }}>
                                    {errors.name}
                                </p>
                            )}
                        </div>

                        {/* Email */}
                        <div style={{ marginBottom: '18px' }}>
                            <label style={{
                                display: 'block', color: 'rgba(255,255,255,0.7)',
                                fontSize: '13px', fontWeight: '500',
                                marginBottom: '8px',
                            }}>
                                Email Address
                            </label>
                            <input
                                id="email" type="email" name="email"
                                value={data.email} autoComplete="username"
                                onChange={(e) => setData('email', e.target.value)}
                                placeholder="you@example.com"
                                style={inputStyle(!!errors.email)}
                                onFocus={handleFocus}
                                onBlur={handleBlur}
                                required
                            />
                            {errors.email && (
                                <p style={{ color: '#ff6b6b', fontSize: '12px', marginTop: '6px' }}>
                                    {errors.email}
                                </p>
                            )}
                        </div>

                        {/* Phone */}
                        <div style={{ marginBottom: '18px' }}>
                            <label style={{
                                display: 'block', color: 'rgba(255,255,255,0.7)',
                                fontSize: '13px', fontWeight: '500',
                                marginBottom: '8px',
                            }}>
                                WhatsApp Number
                            </label>
                            <input
                                id="phone" type="tel" name="phone"
                                value={data.phone} autoComplete="tel"
                                onChange={(e) => setData('phone', e.target.value)}
                                placeholder="+923001234567"
                                style={inputStyle(!!errors.phone)}
                                onFocus={handleFocus}
                                onBlur={handleBlur}
                            />
                            {errors.phone && (
                                <p style={{ color: '#ff6b6b', fontSize: '12px', marginTop: '6px' }}>
                                    {errors.phone}
                                </p>
                            )}
                        </div>

                        {/* Password */}
                        <div style={{ marginBottom: '18px' }}>
                            <label style={{
                                display: 'block', color: 'rgba(255,255,255,0.7)',
                                fontSize: '13px', fontWeight: '500',
                                marginBottom: '8px',
                            }}>
                                Password
                            </label>
                            <input
                                id="password" type="password" name="password"
                                value={data.password} autoComplete="new-password"
                                onChange={(e) => setData('password', e.target.value)}
                                placeholder="Min. 8 characters"
                                style={inputStyle(!!errors.password)}
                                onFocus={handleFocus}
                                onBlur={handleBlur}
                                required
                            />
                            {errors.password && (
                                <p style={{ color: '#ff6b6b', fontSize: '12px', marginTop: '6px' }}>
                                    {errors.password}
                                </p>
                            )}
                        </div>

                        {/* Confirm Password */}
                        <div style={{ marginBottom: '28px' }}>
                            <label style={{
                                display: 'block', color: 'rgba(255,255,255,0.7)',
                                fontSize: '13px', fontWeight: '500',
                                marginBottom: '8px',
                            }}>
                                Confirm Password
                            </label>
                            <input
                                id="password_confirmation" type="password"
                                name="password_confirmation"
                                value={data.password_confirmation}
                                autoComplete="new-password"
                                onChange={(e) => setData('password_confirmation', e.target.value)}
                                placeholder="••••••••"
                                style={inputStyle(!!errors.password_confirmation)}
                                onFocus={handleFocus}
                                onBlur={handleBlur}
                                required
                            />
                            {errors.password_confirmation && (
                                <p style={{ color: '#ff6b6b', fontSize: '12px', marginTop: '6px' }}>
                                    {errors.password_confirmation}
                                </p>
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
                                fontWeight: '600',
                                cursor: processing ? 'not-allowed' : 'pointer',
                                transition: 'all 0.2s ease',
                                boxShadow: processing
                                    ? 'none'
                                    : '0 8px 25px rgba(0,149,255,0.35)',
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
                            {processing ? '⏳ Creating Account...' : '🚀 Create Account'}
                        </button>
                    </form>

                    {/* Login Link */}
                    <div style={{
                        marginTop: '28px', textAlign: 'center',
                        color: 'rgba(255,255,255,0.4)', fontSize: '14px',
                    }}>
                        Already have an account?{' '}
                        <Link
                            href={route('login')}
                            style={{
                                color: '#0095ff', fontWeight: '600',
                                textDecoration: 'none',
                            }}
                        >
                            Sign in →
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