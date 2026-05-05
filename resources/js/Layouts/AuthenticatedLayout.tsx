import Dropdown from '@/Components/Dropdown';
import { Link, usePage } from '@inertiajs/react';
import { PropsWithChildren, ReactNode, useState } from 'react';

export default function Authenticated({
    header,
    children,
}: PropsWithChildren<{ header?: ReactNode }>) {
    const user = usePage().props.auth.user;
    const [menuOpen, setMenuOpen] = useState(false);
const [theme, setTheme] = useState(
    typeof window !== 'undefined'
        ? (document.documentElement.getAttribute('data-theme') || 'dark')
        : 'dark'
);

    const NAV_LINKS = [
        { label: '🏠 Dashboard',  href: route('dashboard'),       active: route().current('dashboard') },
        { label: '✨ Services',   href: route('services.index'),  active: route().current('services.index') },
        { label: '🚗 Vehicles',   href: route('vehicles.index'),  active: route().current('vehicles.index') },
        { label: '📋 Bookings',   href: route('bookings.index'),  active: route().current('bookings.index') },
        { label: '🤖 AI Booking', href: route('ai.chat'),         active: route().current('ai.chat') },
    ];

    return (
        <div style={{ minHeight: '100vh', background: '#04070f', fontFamily: "'Outfit', sans-serif" }}>

            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=Outfit:wght@300;400;500;600&display=swap');

                .auth-nav {
                    position: sticky; top: 0; z-index: 999;
                    background: rgba(4,7,15,0.92);
                    backdrop-filter: blur(24px);
                    -webkit-backdrop-filter: blur(24px);
                    border-bottom: 1px solid rgba(255,255,255,0.07);
                }
                .auth-nav-inner {
                    max-width: 1280px; margin: 0 auto;
                    padding: 0 24px;
                    display: flex; align-items: center;
                    justify-content: space-between;
                    height: 64px;
                }
                .auth-logo {
                    display: flex; align-items: center; gap: 8px;
                    text-decoration: none;
                    font-family: 'Syne', sans-serif;
                    font-weight: 800; font-size: 1.2rem;
                    background: linear-gradient(130deg, #dbeafe, #38bdf8, #22d3ee);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                }
                .auth-nav-links {
                    display: flex; align-items: center; gap: 4px;
                }
                .auth-nav-link {
                    color: #8896aa; font-size: 0.85rem; font-weight: 500;
                    text-decoration: none; padding: 7px 14px; border-radius: 10px;
                    transition: all 0.2s; white-space: nowrap;
                }
                .auth-nav-link:hover { color: #eef4ff; background: rgba(255,255,255,0.05); }
                .auth-nav-link.active { color: #38bdf8; background: rgba(56,189,248,0.08); }

                .auth-user-btn {
                    display: flex; align-items: center; gap: 8px;
                    background: rgba(255,255,255,0.04);
                    border: 1px solid rgba(255,255,255,0.08);
                    border-radius: 50px; padding: 6px 14px 6px 6px;
                    cursor: pointer; color: #eef4ff;
                    font-size: 0.85rem; font-weight: 500;
                    transition: all 0.2s; font-family: 'Outfit', sans-serif;
                }
                .auth-user-btn:hover { border-color: rgba(56,189,248,0.25); background: rgba(56,189,248,0.06); }
                .auth-avatar {
                    width: 30px; height: 30px; border-radius: 50%;
                    background: linear-gradient(135deg, #0ea5e9, #22d3ee);
                    display: flex; align-items: center; justify-content: center;
                    font-size: 0.75rem; font-weight: 800; color: #000;
                    font-family: 'Syne', sans-serif; flex-shrink: 0;
                }

                /* Hamburger */
                .hamburger {
                    display: none; flex-direction: column; gap: 5px;
                    background: none; border: none; cursor: pointer; padding: 4px;
                }
                .hamburger span {
                    display: block; width: 22px; height: 2px;
                    background: #eef4ff; border-radius: 2px; transition: all 0.3s;
                }
                .mobile-menu {
                    display: none; position: fixed;
                    top: 64px; left: 0; right: 0;
                    background: rgba(4,7,15,0.98);
                    backdrop-filter: blur(24px);
                    border-bottom: 1px solid rgba(255,255,255,0.07);
                    padding: 16px 24px; z-index: 998;
                    flex-direction: column; gap: 4px;
                }
                .mobile-menu.open { display: flex; }
                .mobile-nav-link {
                    color: #8896aa; font-size: 0.95rem; font-weight: 500;
                    text-decoration: none; padding: 12px 14px; border-radius: 10px;
                    transition: all 0.2s; display: block;
                }
                .mobile-nav-link:hover { color: #eef4ff; background: rgba(255,255,255,0.05); }
                .mobile-nav-link.active { color: #38bdf8; background: rgba(56,189,248,0.08); }

                /* Header */
                .auth-header {
                    background: rgba(255,255,255,0.02);
                    border-bottom: 1px solid rgba(255,255,255,0.05);
                    padding: 16px 24px;
                }
                .auth-header-inner {
                    max-width: 1280px; margin: 0 auto;
                    color: rgba(238,244,255,0.7);
                    font-size: 0.9rem; font-weight: 500;
                }

                /* Dropdown override */
                .auth-dropdown {
                    position: relative;
                }

                @media (max-width: 768px) {
                    .auth-nav-links { display: none !important; }
                    .hamburger { display: flex !important; }
                    .auth-user-btn-wrap { display: none !important; }
                }
            `}</style>

            {/* NAV */}
            <nav className="auth-nav">
                <div className="auth-nav-inner">

                    {/* Logo */}
                    <Link href="/" className="auth-logo">
                        🚗 SparkWash
                    </Link>

                    {/* Desktop Links */}
                    <div className="auth-nav-links">
                        {NAV_LINKS.map((l) => (
                            <Link
                                key={l.label}
                                href={l.href}
                                className={`auth-nav-link ${l.active ? 'active' : ''}`}
                            >
                                {l.label}
                            </Link>
                        ))}
                    </div>

                    {/* User Dropdown */}
                    <div className="auth-user-btn-wrap" style={{ display: 'flex', alignItems: 'center' }}>
                        <Dropdown>
                            <Dropdown.Trigger>
                                <button className="auth-user-btn" type="button">
                                    <div className="auth-avatar">
                                        {user.name.charAt(0).toUpperCase()}
                                    </div>
                                    {user.name}
                                    <svg width="12" height="12" viewBox="0 0 20 20" fill="#8896aa">
                                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                    </svg>
                                </button>
                            </Dropdown.Trigger>
                            <Dropdown.Content>
                              <Dropdown.Link href={route('profile.edit')}>
                                    <span style={{color: '#38bdf8'}}>👤</span> Profile
                                </Dropdown.Link>
                                <Dropdown.Link href={route('dashboard')}>
                                    <span style={{color: '#38bdf8'}}>🏠</span> Dashboard
                                </Dropdown.Link>
                                <Dropdown.Link href={route('logout')} method="post" as="button">
                                    <span style={{color: '#38bdf8'}}>🚪</span> Log Out
                                </Dropdown.Link>
                            </Dropdown.Content>
                        </Dropdown>
                    </div>

                    {/* Hamburger */}
                    <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
                        <span style={{ transform: menuOpen ? 'rotate(45deg) translateY(7px)' : 'none' }} />
                        <span style={{ opacity: menuOpen ? 0 : 1 }} />
                        <span style={{ transform: menuOpen ? 'rotate(-45deg) translateY(-7px)' : 'none' }} />
                    </button>
                </div>
            </nav>

            {/* Mobile Menu */}
            <div className={`mobile-menu${menuOpen ? ' open' : ''}`}>
                {NAV_LINKS.map((l) => (
                    <Link
                        key={l.label}
                        href={l.href}
                        className={`mobile-nav-link ${l.active ? 'active' : ''}`}
                        onClick={() => setMenuOpen(false)}
                    >
                        {l.label}
                    </Link>
                ))}
                <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', marginTop: 8, paddingTop: 12 }}>
                    <div style={{ color: '#eef4ff', fontSize: '0.9rem', fontWeight: 600, padding: '4px 14px' }}>{user.name}</div>
                    <div style={{ color: '#8896aa', fontSize: '0.78rem', padding: '2px 14px 10px' }}>{user.email}</div>
                    <Link href={route('profile.edit')} className="mobile-nav-link" onClick={() => setMenuOpen(false)}>👤 Profile</Link>
                    <Link href={route('logout')} method="post" as="button" className="mobile-nav-link" onClick={() => setMenuOpen(false)}>🚪 Log Out</Link>
                </div>
            </div>

            {/* Header */}
            {header && (
                <div className="auth-header">
                    <div className="auth-header-inner">{header}</div>
                </div>
            )}

            {/* Main */}
            <main style={{ background: '#04070f' }}>
                {children}
            </main>
        </div>
    );
}