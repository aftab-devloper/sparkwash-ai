import { useEffect, useRef, useState } from "react";
import { Head, Link } from "@inertiajs/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ─── Data ────────────────────────────────────────────────────────────────────

const SERVICES = [
    {
        name: "Basic Wash",
        price: "$9.99",
        duration: "30 min",
        icon: "🚿",
        img: "https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?w=600&q=80",
        features: ["Exterior Wash", "Rinse & Dry", "Window Wipe", "Tire Spray"],
        highlight: false,
    },
    {
        name: "Premium Wash",
        price: "$19.99",
        duration: "60 min",
        icon: "✨",
        img: "https://images.unsplash.com/photo-1607860108855-64acf2078ed9?w=600&q=80",
        features: ["Everything in Basic", "Interior Vacuum", "Dashboard Polish", "Air Freshener"],
        highlight: true,
    },
    {
        name: "Deluxe Detail",
        price: "$39.99",
        duration: "120 min",
        icon: "💎",
        img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
        features: ["Everything in Premium", "Hand Wax & Polish", "Leather Conditioning", "Engine Bay Clean"],
        highlight: false,
    },
];

const STEPS = [
    { step: "01", icon: "🤖", title: "Chat with AI", desc: "Tell our Llama-3 AI when & what service you need — in plain English. No forms." },
    { step: "02", icon: "📅", title: "Pick a Slot", desc: "Choose from real-time available slots. Add your vehicle details in seconds." },
    { step: "03", icon: "💳", title: "Pay Securely", desc: "Stripe-powered checkout. Instant confirmation + QR code sent to your email." },
    { step: "04", icon: "🚗", title: "Sit Back", desc: "Track your booking live. Rate us after — your feedback shapes our service." },
];

const TESTIMONIALS = [
    { name: "Sarah M.", car: "Tesla Model S", avatar: "SM", rating: 5, comment: "Absolutely incredible! My car looks showroom-fresh every time. SparkWash is the only place I trust with my Tesla." },
    { name: "James K.", car: "BMW M3", avatar: "JK", rating: 5, comment: "The AI booking assistant is a game changer. Booked my slot in 30 seconds while on a call. Pure brilliance." },
    { name: "Priya D.", car: "Audi Q7", avatar: "PD", rating: 5, comment: "Premium service at competitive prices. The Deluxe Detail completely transformed my SUV. Highly recommended!" },
];

const STATS = [
    { value: 12000, suffix: "+", label: "Cars Washed" },
    { value: 98,    suffix: "%", label: "Satisfaction Rate" },
    { value: 30,    suffix: "s", label: "Avg Booking Time" },
    { value: 5,     suffix: " yrs", label: "In Business" },
];

const NAV_LINKS = [
    { label: "Services",   href: "#services"     },
    { label: "How It Works", href: "#how-it-works" },
    { label: "About Us",   href: "/about"        },
    { label: "Contact Us",    href: "/contact"      },
];

// ─── Main Component ───────────────────────────────────────────────────────────

export default function Welcome() {
    const heroTitleRef  = useRef<HTMLHeadingElement>(null);
    const heroSubRef    = useRef<HTMLParagraphElement>(null);
    const heroBadgeRef  = useRef<HTMLDivElement>(null);
    const heroCtaRef    = useRef<HTMLDivElement>(null);
    const heroBadgesRef = useRef<HTMLDivElement>(null);
    const carRef        = useRef<HTMLDivElement>(null);
    const card1Ref      = useRef<HTMLDivElement>(null);
    const card2Ref      = useRef<HTMLDivElement>(null);
    const navRef        = useRef<HTMLElement>(null);

    const [menuOpen, setMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    // Navbar scroll effect
    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 60);
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    useEffect(() => {
        const tl = gsap.timeline({ delay: 0.1 });

        tl.fromTo(heroBadgeRef.current,
            { y: 20, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" }
        )
        .fromTo(heroTitleRef.current,
            { y: 50, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.9, ease: "power3.out" },
            "-=0.3"
        )
        .fromTo(heroSubRef.current,
            { y: 30, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.7, ease: "power2.out" },
            "-=0.5"
        )
        .fromTo(heroCtaRef.current,
            { y: 20, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" },
            "-=0.4"
        )
        .fromTo(heroBadgesRef.current,
            { y: 15, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" },
            "-=0.3"
        )
        .fromTo(carRef.current,
            { x: 80, opacity: 0 },
            { x: 0, opacity: 1, duration: 1, ease: "power3.out" },
            "-=0.9"
        )
        .fromTo([card1Ref.current, card2Ref.current],
            { scale: 0.8, opacity: 0 },
            { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(1.5)", stagger: 0.15 },
            "-=0.5"
        );

        // Car floating
        gsap.to(carRef.current, {
            y: -16, duration: 3, ease: "sine.inOut", yoyo: true, repeat: -1,
        });

        // Cards subtle rotate
        gsap.to(card1Ref.current, { rotate: 2,  duration: 4,   ease: "sine.inOut", yoyo: true, repeat: -1 });
        gsap.to(card2Ref.current, { rotate: -2, duration: 3.5, ease: "sine.inOut", yoyo: true, repeat: -1 });

        // Scroll reveals
        gsap.utils.toArray<HTMLElement>(".sw-reveal").forEach((el) => {
            gsap.fromTo(el,
                { y: 45, opacity: 0 },
                {
                    y: 0, opacity: 1, duration: 0.8, ease: "power2.out",
                    scrollTrigger: { trigger: el, start: "top 87%", toggleActions: "play none none none" },
                }
            );
        });

        gsap.utils.toArray<HTMLElement>(".sw-stagger").forEach((el, i) => {
            gsap.fromTo(el,
                { y: 55, opacity: 0, scale: 0.96 },
                {
                    y: 0, opacity: 1, scale: 1, duration: 0.65, delay: i * 0.12, ease: "back.out(1.3)",
                    scrollTrigger: { trigger: el, start: "top 88%", toggleActions: "play none none none" },
                }
            );
        });

        // Counter animation
        document.querySelectorAll<HTMLElement>("[data-count]").forEach((el) => {
            const target = parseInt(el.dataset.count || "0");
            const suffix = el.dataset.suffix || "";
            const obj = { val: 0 };
            gsap.to(obj, {
                val: target, duration: 2.2, ease: "power2.out",
                onUpdate: () => { el.textContent = Math.round(obj.val).toLocaleString() + suffix; },
                scrollTrigger: { trigger: el, start: "top 85%", once: true },
            });
        });

        return () => { ScrollTrigger.getAll().forEach((t) => t.kill()); };
    }, []);

    return (
        <>
            <Head title="SparkWash — AI-Powered Car Washing" />

            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=Outfit:wght@300;400;500;600&display=swap');

                *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

                :root {
                    --bg:    #04070f;
                    --surf:  rgba(255,255,255,0.035);
                    --bdr:   rgba(255,255,255,0.07);
                    --bdr-g: rgba(56,189,248,0.28);
                    --blue:  #38bdf8;
                    --cyan:  #22d3ee;
                    --deep:  #0ea5e9;
                    --text:  #eef4ff;
                    --muted: #8896aa;
                    --glow:  rgba(56,189,248,0.13);
                    --green: #22c55e;
                    --gold:  #fbbf24;
                }

                html { scroll-behavior: smooth; }

                body {
                    background: var(--bg);
                    color: var(--text);
                    font-family: 'Outfit', sans-serif;
                    overflow-x: hidden;
                    line-height: 1.6;
                }

                body::after {
                    content: '';
                    position: fixed; inset: 0;
                    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.035'/%3E%3C/svg%3E");
                    pointer-events: none; z-index: 9998; opacity: 0.45;
                }

                .syne { font-family: 'Syne', sans-serif; }

                .gt {
                    background: linear-gradient(130deg, #dbeafe 0%, #38bdf8 45%, #22d3ee 100%);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                }

                .glass {
                    background: var(--surf);
                    border: 1px solid var(--bdr);
                    backdrop-filter: blur(24px);
                    -webkit-backdrop-filter: blur(24px);
                    border-radius: 20px;
                    transition: border-color 0.3s, box-shadow 0.3s, transform 0.3s;
                }
                .glass:hover {
                    border-color: var(--bdr-g);
                    box-shadow: 0 0 40px var(--glow), 0 16px 48px rgba(0,0,0,0.35);
                    transform: translateY(-4px);
                }

                .orb {
                    position: absolute; border-radius: 50%;
                    filter: blur(90px); pointer-events: none; z-index: 0;
                }

                .btn-p {
                    display: inline-flex; align-items: center; gap: 8px;
                    background: linear-gradient(135deg, var(--deep), var(--cyan));
                    color: #000; font-weight: 700;
                    font-family: 'Syne', sans-serif; font-size: 0.92rem;
                    letter-spacing: 0.01em; padding: 13px 30px;
                    border-radius: 50px; border: none; cursor: pointer;
                    text-decoration: none;
                    box-shadow: 0 0 28px rgba(56,189,248,0.3), 0 4px 16px rgba(0,0,0,0.25);
                    transition: transform 0.25s, box-shadow 0.25s;
                }
                .btn-p:hover {
                    transform: translateY(-2px) scale(1.03);
                    box-shadow: 0 0 48px rgba(56,189,248,0.5), 0 8px 28px rgba(0,0,0,0.35);
                }

                .btn-g {
                    display: inline-flex; align-items: center; gap: 8px;
                    background: transparent; color: var(--text); font-weight: 500;
                    font-family: 'Syne', sans-serif; font-size: 0.92rem;
                    padding: 12px 26px; border-radius: 50px;
                    border: 1px solid var(--bdr); cursor: pointer; text-decoration: none;
                    transition: border-color 0.25s, color 0.25s, background 0.25s;
                }
                .btn-g:hover { border-color: var(--blue); color: var(--blue); background: rgba(56,189,248,0.06); }

                /* ── NAV ── */
                .sw-nav {
                    position: fixed; top: 0; left: 0; right: 0; z-index: 999;
                    padding: 16px 0;
                    background: rgba(4,7,15,0.82);
                    backdrop-filter: blur(24px);
                    -webkit-backdrop-filter: blur(24px);
                    border-bottom: 1px solid var(--bdr);
                    transition: padding 0.3s, box-shadow 0.3s;
                }
                .sw-nav.scrolled {
                    padding: 11px 0;
                    box-shadow: 0 4px 30px rgba(0,0,0,0.4);
                }
                .nav-link {
                    color: var(--muted); font-size: 0.875rem; font-weight: 500;
                    text-decoration: none; padding: 6px 2px;
                    border-bottom: 2px solid transparent;
                    transition: color 0.2s, border-color 0.2s;
                }
                .nav-link:hover { color: var(--blue); border-bottom-color: var(--blue); }

                /* Mobile menu */
                .hamburger {
                    display: none; flex-direction: column; gap: 5px;
                    background: none; border: none; cursor: pointer; padding: 4px;
                }
                .hamburger span {
                    display: block; width: 22px; height: 2px;
                    background: var(--text); border-radius: 2px;
                    transition: all 0.3s;
                }
                .mobile-menu {
                    display: none; position: fixed; top: 62px; left: 0; right: 0;
                    background: rgba(4,7,15,0.97); backdrop-filter: blur(24px);
                    border-bottom: 1px solid var(--bdr);
                    padding: 18px 24px; z-index: 998;
                    flex-direction: column; gap: 4px;
                }
                .mobile-menu.open { display: flex; }
                .mobile-nav-link {
                    color: var(--muted); font-size: 1rem; font-weight: 500;
                    text-decoration: none; padding: 12px 0;
                    border-bottom: 1px solid var(--bdr);
                    transition: color 0.2s;
                }
                .mobile-nav-link:hover { color: var(--blue); }

                /* ── SERVICE IMAGE ── */
                .svc-img {
                    width: 100%; height: 160px; object-fit: cover;
                    border-radius: 12px; margin-bottom: 18px;
                    border: 1px solid var(--bdr);
                    transition: transform 0.4s ease;
                }
                .glass:hover .svc-img { transform: scale(1.03); }
                .svc-img-wrap { overflow: hidden; border-radius: 12px; margin-bottom: 18px; }

                /* ── HERO IMAGE ── */
                .hero-img {
                    width: 100%; border-radius: 20px;
                    border: 1px solid var(--bdr);
                    box-shadow: 0 0 60px rgba(56,189,248,0.15), 0 30px 60px rgba(0,0,0,0.5);
                }

                .sw-sec  { padding: 100px 0; position: relative; }
                .sw-con  { max-width: 1180px; margin: 0 auto; padding: 0 24px; }
                .sw-label {
                    display: inline-block; font-size: 0.72rem; font-weight: 700;
                    letter-spacing: 0.14em; text-transform: uppercase;
                    color: var(--blue); margin-bottom: 14px;
                }

                .hl-card {
                    background: linear-gradient(135deg, rgba(14,165,233,0.1), rgba(34,211,238,0.05)) !important;
                    border-color: rgba(56,189,248,0.35) !important;
                    overflow: hidden;
                }
                .hl-card::before {
                    content: ''; position: absolute; inset: -100%;
                    background: conic-gradient(from 0deg, transparent 0deg, rgba(56,189,248,0.06) 60deg, transparent 120deg);
                    animation: hl-spin 9s linear infinite;
                }
                @keyframes hl-spin { to { transform: rotate(360deg); } }

                .pdot {
                    width: 7px; height: 7px; background: var(--green);
                    border-radius: 50%; flex-shrink: 0;
                    animation: pdot-a 2s ease-in-out infinite;
                }
                @keyframes pdot-a {
                    0%,100% { box-shadow: 0 0 0 0 rgba(34,197,94,0.6); }
                    50%     { box-shadow: 0 0 0 7px rgba(34,197,94,0); }
                }

                .wa {
                    position: fixed; bottom: 26px; right: 26px;
                    width: 56px; height: 56px; background: #25d366;
                    border-radius: 50%; display: flex; align-items: center;
                    justify-content: center; font-size: 26px; z-index: 9997;
                    box-shadow: 0 4px 20px rgba(37,211,102,0.4); text-decoration: none;
                    animation: wa-f 3s ease-in-out infinite;
                    transition: transform 0.25s, box-shadow 0.25s;
                }
                .wa:hover { transform: scale(1.12); box-shadow: 0 6px 30px rgba(37,211,102,0.6); }
                @keyframes wa-f { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-7px)} }

                ::-webkit-scrollbar { width: 5px; }
                ::-webkit-scrollbar-track { background: var(--bg); }
                ::-webkit-scrollbar-thumb { background: rgba(56,189,248,0.25); border-radius: 3px; }

                @media (max-width: 900px) {
                    .desktop-links { display: none !important; }
                    .hamburger     { display: flex !important; }
                    .hero-grid     { grid-template-columns: 1fr !important; text-align: center; }
                    .hero-cta      { justify-content: center !important; }
                    .hero-badges   { justify-content: center !important; }
                    .car-wrap      { display: none !important; }
                    .steps-grid    { grid-template-columns: 1fr 1fr !important; }
                    .svc-grid      { grid-template-columns: 1fr !important; max-width: 420px; margin: 0 auto; }
                    .testi-grid    { grid-template-columns: 1fr !important; }
                    .stats-grid    { grid-template-columns: 1fr 1fr !important; }
                    .ft-inner      { flex-direction: column !important; gap: 20px !important; text-align: center; }
                }
                @media (max-width: 560px) {
                    .sw-sec { padding: 70px 0; }
                    .steps-grid { grid-template-columns: 1fr !important; }
                }
            `}</style>

            {/* ── Nav ─────────────────────────────────────────────────────── */}
            <nav ref={navRef} className={`sw-nav${scrolled ? " scrolled" : ""}`}>
                <div className="sw-con" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>

                    {/* Logo */}
                    <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
                        <span style={{ fontSize: 26 }}>🚗</span>
                        <span className="syne gt" style={{ fontSize: "1.35rem", fontWeight: 800 }}>SparkWash</span>
                        <div style={{ display: "flex", alignItems: "center", gap: 6, background: "rgba(34,197,94,0.08)", border: "1px solid rgba(34,197,94,0.18)", borderRadius: 20, padding: "3px 10px", marginLeft: 4 }}>
                            <div className="pdot" />
                            <span style={{ fontSize: "0.68rem", color: "var(--green)", fontWeight: 700, letterSpacing: "0.06em" }}>LIVE</span>
                        </div>
                    </Link>

                    {/* Desktop links */}
                    <div className="desktop-links" style={{ display: "flex", alignItems: "center", gap: 32 }}>
                        {NAV_LINKS.map((l) => (
                            <a key={l.label} href={l.href} className="nav-link">{l.label}</a>
                        ))}
                    </div>

                    {/* Desktop CTA */}
                    <div className="desktop-links" style={{ display: "flex", gap: 8, alignItems: "center" }}>
                        <Link href={route("login")}    className="btn-g" style={{ padding: "9px 20px", fontSize: "0.875rem" }}>Sign In</Link>
                        <Link href={route("register")} className="btn-p" style={{ padding: "9px 20px", fontSize: "0.875rem" }}>Book Now ✦</Link>
                    </div>

                    {/* Hamburger */}
                    <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
                        <span style={{ transform: menuOpen ? "rotate(45deg) translateY(7px)" : "none" }} />
                        <span style={{ opacity: menuOpen ? 0 : 1 }} />
                        <span style={{ transform: menuOpen ? "rotate(-45deg) translateY(-7px)" : "none" }} />
                    </button>
                </div>
            </nav>

            {/* Mobile Menu */}
            <div className={`mobile-menu${menuOpen ? " open" : ""}`}>
                {NAV_LINKS.map((l) => (
                    <a key={l.label} href={l.href} className="mobile-nav-link" onClick={() => setMenuOpen(false)}>
                        {l.label}
                    </a>
                ))}
                <div style={{ display: "flex", gap: 10, marginTop: 12 }}>
                    <Link href={route("login")}    className="btn-g" style={{ flex: 1, justifyContent: "center", padding: "11px 0" }}>Sign In</Link>
                    <Link href={route("register")} className="btn-p" style={{ flex: 1, justifyContent: "center", padding: "11px 0" }}>Book Now</Link>
                </div>
            </div>

            {/* ── Hero ────────────────────────────────────────────────────── */}
            <section style={{ minHeight: "100vh", display: "flex", alignItems: "center", position: "relative", overflow: "hidden", paddingTop: 100 }}>
                <div className="orb" style={{ width: 650, height: 650, background: "radial-gradient(circle, rgba(56,189,248,0.1), transparent)", top: "5%", left: "-15%" }} />
                <div className="orb" style={{ width: 420, height: 420, background: "radial-gradient(circle, rgba(34,211,238,0.07), transparent)", bottom: "5%", right: "0%" }} />
                <div className="orb" style={{ width: 280, height: 280, background: "radial-gradient(circle, rgba(14,165,233,0.09), transparent)", top: "35%", right: "25%" }} />

                <div className="sw-con" style={{ position: "relative", zIndex: 1, padding: "60px 24px", width: "100%" }}>
                    <div className="hero-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 56, alignItems: "center" }}>

                        {/* Left */}
                        <div>
                            <div ref={heroBadgeRef} style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(56,189,248,0.07)", border: "1px solid rgba(56,189,248,0.18)", borderRadius: 50, padding: "5px 14px", marginBottom: 26, opacity: 0 }}>
                                <span style={{ color: "var(--blue)", fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.08em" }}>✦ AI-POWERED CAR WASH BOOKING</span>
                            </div>

                            <h1 ref={heroTitleRef} className="syne" style={{ fontSize: "clamp(2.6rem, 5vw, 4rem)", fontWeight: 800, lineHeight: 1.1, marginBottom: 22, opacity: 0 }}>
                                Your Car Deserves{" "}
                                <span className="gt">Showroom&#8209;Grade</span>{" "}
                                Clean.
                            </h1>

                            <p ref={heroSubRef} style={{ fontSize: "1.08rem", color: "var(--muted)", lineHeight: 1.75, marginBottom: 34, maxWidth: 460, opacity: 0 }}>
                                Book a professional wash in under{" "}
                                <strong style={{ color: "var(--text)", fontWeight: 500 }}>30 seconds</strong>. Our Llama&#8209;3 AI assistant handles scheduling, payments &amp; reminders — so you don't have to.
                            </p>

                            <div ref={heroCtaRef} className="hero-cta" style={{ display: "flex", gap: 12, flexWrap: "wrap", opacity: 0 }}>
                            <Link href={route("ai.chat")} className="btn-p">🤖 Chat with AI Assistant</Link>
                                <a href="#services" className="btn-g">View Services →</a>
                            </div>

                            <div ref={heroBadgesRef} className="hero-badges" style={{ display: "flex", gap: 24, marginTop: 40, flexWrap: "wrap", opacity: 0 }}>
                                {[
                                    { icon: "⚡", text: "30-sec booking" },
                                    { icon: "🔒", text: "Stripe secure" },
                                    { icon: "📧", text: "Instant email" },
                                    { icon: "⭐", text: "4.9/5 rated" },
                                ].map((b) => (
                                    <div key={b.text} style={{ display: "flex", alignItems: "center", gap: 7 }}>
                                        <span style={{ fontSize: "0.95rem" }}>{b.icon}</span>
                                        <span style={{ fontSize: "0.8rem", color: "var(--muted)", fontWeight: 500 }}>{b.text}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Right — Hero Image + Floating Cards */}
                        <div className="car-wrap" ref={carRef} style={{ position: "relative", opacity: 0 }}>
                            {/* Glow behind image */}
                            <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 70% 50% at 50% 60%, rgba(56,189,248,0.12), transparent)", borderRadius: "20px", pointerEvents: "none", zIndex: 0 }} />

                            {/* Hero car wash image */}
                            <img
                                src="https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&q=85"
                                alt="Premium car wash"
                                className="hero-img"
                                style={{ position: "relative", zIndex: 1 }}
                            />

                            {/* Shadow under image */}
                            <div style={{ width: "70%", height: 20, background: "radial-gradient(ellipse, rgba(56,189,248,0.2), transparent)", filter: "blur(12px)", margin: "-4px auto 0", position: "relative", zIndex: 0 }} />

                            {/* Card 1 — Rating */}
                            <div ref={card1Ref} className="glass" style={{ position: "absolute", top: "8%", left: "-10%", padding: "12px 16px", borderRadius: 16, display: "flex", alignItems: "center", gap: 10, minWidth: 155, opacity: 0, zIndex: 2 }}>
                                <span style={{ fontSize: "1.5rem" }}>⭐</span>
                                <div>
                                    <div className="syne" style={{ fontWeight: 700, fontSize: "0.92rem" }}>4.9 / 5.0</div>
                                    <div style={{ fontSize: "0.68rem", color: "var(--muted)" }}>1,200+ reviews</div>
                                </div>
                            </div>

                            {/* Card 2 — Booking confirmed */}
                            <div ref={card2Ref} className="glass" style={{ position: "absolute", bottom: "10%", right: "-10%", padding: "12px 16px", borderRadius: 16, display: "flex", alignItems: "center", gap: 10, opacity: 0, zIndex: 2 }}>
                                <span style={{ fontSize: "1.3rem" }}>✅</span>
                                <div>
                                    <div className="syne" style={{ fontWeight: 700, fontSize: "0.82rem" }}>Booking Confirmed</div>
                                    <div style={{ fontSize: "0.66rem", color: "var(--green)" }}>BK-A7F3K2 · Sat 2:30 PM</div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* ── Stats ───────────────────────────────────────────────────── */}
            <div style={{ background: "rgba(56,189,248,0.025)", borderTop: "1px solid var(--bdr)", borderBottom: "1px solid var(--bdr)", padding: "44px 0" }}>
                <div className="sw-con">
                    <div className="stats-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, textAlign: "center" }}>
                        {STATS.map((s) => (
                            <div key={s.label} className="sw-reveal">
                                <div className="syne gt" style={{ fontSize: "clamp(1.9rem, 3vw, 2.7rem)", fontWeight: 800, lineHeight: 1 }}
                                    data-count={s.value} data-suffix={s.suffix}>
                                    0{s.suffix}
                                </div>
                                <div style={{ fontSize: "0.82rem", color: "var(--muted)", marginTop: 6, fontWeight: 500 }}>{s.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* ── How It Works ─────────────────────────────────────────────── */}
            <section id="how-it-works" className="sw-sec">
                <div className="sw-con">
                    <div className="sw-reveal" style={{ textAlign: "center", marginBottom: 60 }}>
                        <span className="sw-label">How It Works</span>
                        <h2 className="syne" style={{ fontSize: "clamp(1.9rem, 3.5vw, 2.9rem)", fontWeight: 800 }}>
                            Four steps to a <span className="gt">spotless car.</span>
                        </h2>
                    </div>
                    <div className="steps-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 18 }}>
                        {STEPS.map((s) => (
                            <div key={s.step} className="glass sw-stagger" style={{ padding: "30px 22px", textAlign: "center" }}>
                                <div style={{ fontSize: "2.2rem", marginBottom: 14 }}>{s.icon}</div>
                                <div style={{ fontSize: "0.68rem", letterSpacing: "0.14em", color: "var(--blue)", fontWeight: 700, marginBottom: 8 }}>STEP {s.step}</div>
                                <h3 className="syne" style={{ fontSize: "1.05rem", fontWeight: 700, marginBottom: 10 }}>{s.title}</h3>
                                <p style={{ fontSize: "0.84rem", color: "var(--muted)", lineHeight: 1.65 }}>{s.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Services ─────────────────────────────────────────────────── */}
            <section id="services" className="sw-sec" style={{ background: "linear-gradient(180deg, transparent, rgba(56,189,248,0.018), transparent)" }}>
                <div className="sw-con">
                    <div className="sw-reveal" style={{ textAlign: "center", marginBottom: 60 }}>
                        <span className="sw-label">Our Services</span>
                        <h2 className="syne" style={{ fontSize: "clamp(1.9rem, 3.5vw, 2.9rem)", fontWeight: 800 }}>
                            Choose your <span className="gt">perfect wash.</span>
                        </h2>
                        <p style={{ color: "var(--muted)", marginTop: 14, fontSize: "0.97rem", maxWidth: 480, margin: "14px auto 0" }}>
                            Professional detailing packages for every car and budget.
                        </p>
                    </div>
                    <div className="svc-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 22 }}>
                        {SERVICES.map((svc) => (
                            <div key={svc.name} className={`glass sw-stagger ${svc.highlight ? "hl-card" : ""}`} style={{ padding: "26px 26px 34px", position: "relative" }}>
                                {svc.highlight && (
                                    <div style={{ position: "absolute", top: -13, left: "50%", transform: "translateX(-50%)", background: "linear-gradient(135deg, var(--deep), var(--cyan))", color: "#000", fontSize: "0.68rem", fontWeight: 800, padding: "4px 16px", borderRadius: 20, whiteSpace: "nowrap", fontFamily: "'Syne',sans-serif", letterSpacing: "0.06em" }}>
                                        ✦ MOST POPULAR
                                    </div>
                                )}

                                {/* Service image */}
                                <div className="svc-img-wrap">
                                    <img src={svc.img} alt={svc.name} className="svc-img" />
                                </div>

                                <div style={{ fontSize: "1.6rem", marginBottom: 10 }}>{svc.icon}</div>
                                <div className="syne" style={{ fontSize: "1.25rem", fontWeight: 700, marginBottom: 8 }}>{svc.name}</div>
                                <div style={{ marginBottom: 14 }}>
                                    <span className="syne gt" style={{ fontSize: "2.4rem", fontWeight: 800 }}>{svc.price}</span>
                                    <span style={{ color: "var(--muted)", fontSize: "0.82rem", marginLeft: 4 }}>/visit</span>
                                </div>
                                <div style={{ display: "flex", alignItems: "center", gap: 6, color: "var(--muted)", fontSize: "0.8rem", marginBottom: 22 }}>
                                    <span>⏱</span> {svc.duration} estimated
                                </div>
                                <ul style={{ listStyle: "none", marginBottom: 26, display: "flex", flexDirection: "column", gap: 10 }}>
                                    {svc.features.map((f) => (
                                        <li key={f} style={{ display: "flex", alignItems: "center", gap: 9, fontSize: "0.85rem", color: "var(--muted)" }}>
                                            <span style={{ color: "var(--cyan)", fontWeight: 700 }}>✓</span> {f}
                                        </li>
                                    ))}
                                </ul>
                                <Link href={route("register")} className={svc.highlight ? "btn-p" : "btn-g"} style={{ width: "100%", justifyContent: "center", borderRadius: 12 }}>
                                    Book This Wash
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── AI Showcase ──────────────────────────────────────────────── */}
            <section className="sw-sec">
                <div className="sw-con">
                    <div className="glass sw-reveal" style={{ padding: "60px 44px", textAlign: "center", position: "relative", overflow: "hidden", background: "linear-gradient(135deg, rgba(14,165,233,0.07), rgba(34,211,238,0.03))", borderColor: "rgba(56,189,248,0.22)" }}>
                        <div className="orb" style={{ width: 360, height: 360, background: "radial-gradient(circle, rgba(56,189,248,0.1), transparent)", top: "50%", left: "50%", transform: "translate(-50%,-50%)" }} />
                        <div style={{ position: "relative", zIndex: 1 }}>
                            <div style={{ fontSize: "3rem", marginBottom: 18 }}>🤖</div>
                            <span className="sw-label">AI Booking Assistant</span>
                            <h2 className="syne" style={{ fontSize: "clamp(1.8rem, 3.2vw, 2.7rem)", fontWeight: 800, marginBottom: 16 }}>
                                Book in plain English —<br />
                                <span className="gt">no forms, no friction.</span>
                            </h2>
                            <p style={{ color: "var(--muted)", fontSize: "1rem", lineHeight: 1.7, maxWidth: 500, margin: "0 auto 36px" }}>
                                Powered by <strong style={{ color: "var(--blue)" }}>Groq + Llama-3</strong>. Just say{" "}
                                <em style={{ color: "var(--text)" }}>"Book a Premium wash for Saturday at 2 PM"</em>{" "}
                                — and it handles everything else.
                            </p>

                            {/* Chat preview */}
                            <div style={{ background: "rgba(0,0,0,0.28)", border: "1px solid var(--bdr)", borderRadius: 18, padding: "22px", maxWidth: 420, margin: "0 auto 36px", textAlign: "left" }}>
                                {[
                                    { role: "user", msg: "Book a Deluxe wash for my BMW this Sunday" },
                                    { role: "ai",   msg: "🗓 Found 3 slots on Sunday! 10 AM, 2 PM, 4 PM. Which works?" },
                                    { role: "user", msg: "2 PM please" },
                                    { role: "ai",   msg: "✅ Confirmed! BK-X9F2M1 · Sun 2 PM · $39.99. Email sent! 🎉" },
                                ].map((msg, i) => (
                                    <div key={i} style={{ display: "flex", gap: 8, marginBottom: 11, justifyContent: msg.role === "user" ? "flex-end" : "flex-start" }}>
                                        {msg.role === "ai" && <span style={{ fontSize: "1rem", flexShrink: 0 }}>🤖</span>}
                                        <div style={{
                                            background: msg.role === "user" ? "rgba(56,189,248,0.13)" : "rgba(255,255,255,0.04)",
                                            border: `1px solid ${msg.role === "user" ? "rgba(56,189,248,0.22)" : "var(--bdr)"}`,
                                            borderRadius: msg.role === "user" ? "16px 16px 4px 16px" : "16px 16px 16px 4px",
                                            padding: "8px 13px", fontSize: "0.81rem",
                                            color: msg.role === "user" ? "var(--blue)" : "var(--text)",
                                            maxWidth: 270,
                                        }}>
                                            {msg.msg}
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <Link href={route("ai.chat")} className="btn-p">Try AI Assistant Free →</Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Testimonials ─────────────────────────────────────────────── */}
            <section className="sw-sec">
                <div className="sw-con">
                    <div className="sw-reveal" style={{ textAlign: "center", marginBottom: 56 }}>
                        <span className="sw-label">Testimonials</span>
                        <h2 className="syne" style={{ fontSize: "clamp(1.9rem, 3.5vw, 2.9rem)", fontWeight: 800 }}>
                            Loved by <span className="gt">car owners.</span>
                        </h2>
                    </div>
                    <div className="testi-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 18 }}>
                        {TESTIMONIALS.map((t) => (
                            <div key={t.name} className="glass sw-stagger" style={{ padding: "26px 22px" }}>
                                <div style={{ display: "flex", gap: 3, marginBottom: 14 }}>
                                    {Array.from({ length: t.rating }).map((_, i) => (
                                        <span key={i} style={{ color: "var(--gold)", fontSize: "1rem" }}>★</span>
                                    ))}
                                </div>
                                <p style={{ fontSize: "0.875rem", color: "var(--muted)", lineHeight: 1.7, marginBottom: 20, fontStyle: "italic" }}>
                                    "{t.comment}"
                                </p>
                                <div style={{ display: "flex", alignItems: "center", gap: 11 }}>
                                    <div style={{ width: 38, height: 38, borderRadius: "50%", background: "linear-gradient(135deg, var(--deep), var(--cyan))", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: "0.8rem", color: "#000", fontFamily: "'Syne',sans-serif", flexShrink: 0 }}>
                                        {t.avatar}
                                    </div>
                                    <div>
                                        <div className="syne" style={{ fontWeight: 600, fontSize: "0.875rem" }}>{t.name}</div>
                                        <div style={{ fontSize: "0.72rem", color: "var(--muted)" }}>{t.car}</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Final CTA ────────────────────────────────────────────────── */}
            <section className="sw-sec" style={{ paddingBottom: 120 }}>
                <div className="sw-con" style={{ textAlign: "center" }}>
                    <div className="sw-reveal" style={{ maxWidth: 720, margin: "0 auto", position: "relative" }}>
                        <div className="orb" style={{ width: 400, height: 300, background: "radial-gradient(ellipse, rgba(56,189,248,0.08), transparent)", top: "50%", left: "50%", transform: "translate(-50%,-50%)" }} />
                        <h2 className="syne" style={{ fontSize: "clamp(2.1rem, 4vw, 3.4rem)", fontWeight: 800, marginBottom: 18, lineHeight: 1.15, position: "relative" }}>
                            Ready for a <span className="gt">SparkWash?</span>
                        </h2>
                        <p style={{ color: "var(--muted)", fontSize: "1rem", marginBottom: 36, lineHeight: 1.7 }}>
                            Join 12,000+ happy customers. Book your first wash today and experience the difference.
                        </p>
                        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
                            <Link href={route("register")} className="btn-p" style={{ padding: "15px 38px", fontSize: "0.97rem" }}>
                                🚗 Book My Wash Now
                            </Link>
                            <Link href={route("login")} className="btn-g" style={{ padding: "15px 30px", fontSize: "0.97rem" }}>
                                Sign In
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Footer ───────────────────────────────────────────────────── */}
            <footer style={{ borderTop: "1px solid var(--bdr)", padding: "36px 0" }}>
                <div className="sw-con ft-inner" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <span style={{ fontSize: 20 }}>🚗</span>
                        <span className="syne gt" style={{ fontSize: "1.05rem", fontWeight: 800 }}>SparkWash</span>
                    </div>
                    <div style={{ display: "flex", gap: 22, flexWrap: "wrap" }}>
                        {["About", "Contact", "Privacy", "Terms"].map((l) => (
                            <a key={l} href={`/${l.toLowerCase()}`}
                                style={{ color: "var(--muted)", fontSize: "0.85rem", textDecoration: "none", transition: "color 0.2s" }}
                                onMouseOver={(e) => ((e.target as HTMLElement).style.color = "var(--blue)")}
                                onMouseOut={(e)  => ((e.target as HTMLElement).style.color = "var(--muted)")}>
                                {l}
                            </a>
                        ))}
                    </div>
                    <div style={{ color: "var(--muted)", fontSize: "0.78rem" }}>
                        © 2026 SparkWash · Built by{" "}
                        <span style={{ color: "var(--blue)", fontWeight: 600 }}>Aftab Solangi</span>
                    </div>
                </div>
            </footer>

            {/* ── WhatsApp ─────────────────────────────────────────────────── */}
            <a href="https://wa.me/923001234567" target="_blank" rel="noopener noreferrer" className="wa" title="Chat on WhatsApp">
                💬
            </a>
        </>
    );
}