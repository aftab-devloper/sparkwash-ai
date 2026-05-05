import { Head, Link } from "@inertiajs/react";

const TEAM = [
    { name: "Ahmed Raza", role: "Founder & CEO", avatar: "AR", desc: "10+ years in auto detailing. Built SparkWash from a single bay to Karachi's #1 car wash platform." },
    { name: "Sana Malik", role: "Head of Operations", avatar: "SM", desc: "Ensures every booking runs on time. Obsessed with customer satisfaction." },
    { name: "Bilal Khan", role: "Lead Technician", avatar: "BK", desc: "Master detailer certified in ceramic coating and paint correction." },
];

const VALUES = [
    { icon: "💎", title: "Quality First", desc: "Every wash passes our 47-point quality checklist before your car leaves our bay." },
    { icon: "⚡", title: "Speed & Efficiency", desc: "Book in 30 seconds, serviced on time. We respect your schedule." },
    { icon: "🌱", title: "Eco-Friendly", desc: "Biodegradable products and water recycling systems at every station." },
    { icon: "🤖", title: "AI-Powered", desc: "Llama-3 AI assistant makes booking effortless — no forms, just conversation." },
];

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Syne:wght@700;800&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
:root{--bg:#0d1117;--bg2:#111827;--surf:rgba(255,255,255,0.04);--bdr:rgba(255,255,255,0.08);--bdr-g:rgba(56,189,248,0.28);--blue:#38bdf8;--cyan:#22d3ee;--deep:#0ea5e9;--text:#f0f6ff;--muted:#8896aa}
html{scroll-behavior:smooth}
body{background:var(--bg);color:var(--text);font-family:'Plus Jakarta Sans',sans-serif;overflow-x:hidden;line-height:1.6}
.syne{font-family:'Syne',sans-serif}
.gt{background:linear-gradient(130deg,var(--blue),var(--cyan));-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
.glass{background:var(--surf);border:1px solid var(--bdr);backdrop-filter:blur(16px);border-radius:16px;transition:all .25s}
.glass:hover{border-color:var(--bdr-g);box-shadow:0 8px 32px rgba(14,165,233,0.1);transform:translateY(-3px)}
.btn-p{display:inline-flex;align-items:center;gap:8px;background:linear-gradient(135deg,var(--deep),var(--cyan));color:#fff;font-weight:700;font-size:.9rem;padding:12px 26px;border-radius:50px;border:none;cursor:pointer;text-decoration:none;box-shadow:0 4px 20px rgba(14,165,233,.25);transition:all .2s}
.btn-p:hover{transform:translateY(-2px);box-shadow:0 8px 28px rgba(14,165,233,.4);color:#fff}
.sw-nav{position:fixed;top:0;left:0;right:0;z-index:999;padding:14px 0;background:rgba(13,17,23,.92);backdrop-filter:blur(20px);border-bottom:1px solid var(--bdr)}
.sw-con{max-width:1160px;margin:0 auto;padding:0 24px}
.sw-sec{padding:80px 0}
.sw-label{font-size:.7rem;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:var(--blue);display:block;margin-bottom:12px}
.orb{position:absolute;border-radius:50%;filter:blur(80px);pointer-events:none}
.nav-a{color:var(--muted);font-size:.85rem;text-decoration:none;padding:6px 12px;border-radius:8px;transition:color .2s}
.nav-a:hover{color:var(--blue)}
.nav-a.active{color:var(--blue);font-weight:600}
::-webkit-scrollbar{width:5px}::-webkit-scrollbar-track{background:var(--bg)}::-webkit-scrollbar-thumb{background:rgba(14,165,233,.2);border-radius:3px}
@media(max-width:768px){.two-col,.team-grid{grid-template-columns:1fr !important}.values-grid,.stats-grid{grid-template-columns:1fr 1fr !important}.ft-inner{flex-direction:column !important;text-align:center;gap:16px !important}.nav-links{display:none !important}}
@media(max-width:480px){.values-grid{grid-template-columns:1fr !important}}
`;

export default function About() {
    return (
        <>
            <Head title="About Us — SparkWash" />
            <style>{CSS}</style>

            {/* ── Nav ── */}
            <nav className="sw-nav">
                <div className="sw-con" style={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
                    <Link href="/" style={{ display:"flex", alignItems:"center", gap:8, textDecoration:"none" }}>
                        <span style={{ fontSize:20 }}>🚗</span>
                        <span className="syne" style={{ fontSize:"1.2rem", fontWeight:800, color:"var(--text)" }}>Spark<span style={{ color:"var(--blue)" }}>Wash</span></span>
                    </Link>
                    <div className="nav-links" style={{ display:"flex", gap:4, alignItems:"center" }}>
                        <Link href="/about"   className="nav-a active">About</Link>
                        <Link href="/contact" className="nav-a">Contact</Link>
                        <Link href="/privacy" className="nav-a">Privacy</Link>
                        <Link href="/terms"   className="nav-a">Terms</Link>
                        <Link href={route("login")}    className="nav-a" style={{ marginLeft:8 }}>Sign In</Link>
                        <Link href={route("register")} className="btn-p" style={{ padding:"8px 18px", fontSize:".85rem", marginLeft:4 }}>Book Now ✦</Link>
                    </div>
                </div>
            </nav>

            {/* ── Hero ── */}
            <section style={{ paddingTop:140, paddingBottom:70, position:"relative", overflow:"hidden" }}>
                <div className="orb" style={{ width:500, height:500, background:"radial-gradient(circle,rgba(56,189,248,.08),transparent)", top:"-10%", left:"-10%" }} />
                <div className="sw-con" style={{ position:"relative", zIndex:1, textAlign:"center" }}>
                    <span className="sw-label">About SparkWash</span>
                    <h1 className="syne" style={{ fontSize:"clamp(2.2rem,5vw,3.6rem)", fontWeight:800, lineHeight:1.12, marginBottom:18 }}>
                        Karachi's Most Trusted<br /><span className="gt">Car Wash Platform</span>
                    </h1>
                    <p style={{ color:"var(--muted)", fontSize:"1rem", lineHeight:1.75, maxWidth:520, margin:"0 auto 44px" }}>
                        Founded in 2020, SparkWash has transformed how Karachi's car owners maintain their vehicles — combining professional detailing with AI-powered booking technology.
                    </p>
                    <div className="stats-grid" style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:14, maxWidth:680, margin:"0 auto" }}>
                        {[{val:"12K+",label:"Cars Washed"},{val:"98%",label:"Satisfaction"},{val:"5 yrs",label:"Experience"},{val:"3",label:"Locations"}].map(s=>(
                            <div key={s.label} className="glass" style={{ padding:"20px 12px", textAlign:"center" }}>
                                <div className="syne gt" style={{ fontSize:"1.9rem", fontWeight:800 }}>{s.val}</div>
                                <div style={{ fontSize:".75rem", color:"var(--muted)", marginTop:4 }}>{s.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Story ── */}
            <section className="sw-sec" style={{ background:"var(--bg2)" }}>
                <div className="sw-con">
                    <div className="two-col" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:56, alignItems:"center" }}>
                        <div>
                            <span className="sw-label">Our Story</span>
                            <h2 className="syne" style={{ fontSize:"clamp(1.7rem,3vw,2.4rem)", fontWeight:800, marginBottom:18 }}>
                                Started with one bay,<br /><span className="gt">now serving thousands.</span>
                            </h2>
                            <p style={{ color:"var(--muted)", lineHeight:1.8, marginBottom:14, fontSize:".93rem" }}>
                                SparkWash started in 2020 with a single wash bay in North Nazimabad, Karachi. Our founder had one simple vision — give every car owner access to professional-grade detailing without the hassle.
                            </p>
                            <p style={{ color:"var(--muted)", lineHeight:1.8, fontSize:".93rem" }}>
                                In 2024, we launched Pakistan's first AI-powered car wash booking platform — book, pay, and track in under 30 seconds using natural language.
                            </p>
                        </div>
                        <div style={{ borderRadius:20, overflow:"hidden", border:"1px solid var(--bdr)" }}>
                            <img src="https://images.unsplash.com/photo-1607860108855-64acf2078ed9?w=700&q=80" alt="SparkWash facility" style={{ width:"100%", height:320, objectFit:"cover", display:"block" }} />
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Values ── */}
            <section className="sw-sec">
                <div className="sw-con">
                    <div style={{ textAlign:"center", marginBottom:48 }}>
                        <span className="sw-label">Our Values</span>
                        <h2 className="syne" style={{ fontSize:"clamp(1.7rem,3vw,2.4rem)", fontWeight:800 }}>What drives <span className="gt">everything we do.</span></h2>
                    </div>
                    <div className="values-grid" style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:18 }}>
                        {VALUES.map(v=>(
                            <div key={v.title} className="glass" style={{ padding:"28px 20px", textAlign:"center" }}>
                                <div style={{ fontSize:"2.2rem", marginBottom:14 }}>{v.icon}</div>
                                <h3 className="syne" style={{ fontSize:"1rem", fontWeight:700, marginBottom:10 }}>{v.title}</h3>
                                <p style={{ fontSize:".82rem", color:"var(--muted)", lineHeight:1.65 }}>{v.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Team ── */}
            <section className="sw-sec" style={{ background:"var(--bg2)" }}>
                <div className="sw-con">
                    <div style={{ textAlign:"center", marginBottom:48 }}>
                        <span className="sw-label">Our Team</span>
                        <h2 className="syne" style={{ fontSize:"clamp(1.7rem,3vw,2.4rem)", fontWeight:800 }}>The people behind <span className="gt">the sparkle.</span></h2>
                    </div>
                    <div className="team-grid" style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:20 }}>
                        {TEAM.map(m=>(
                            <div key={m.name} className="glass" style={{ padding:"28px 22px", textAlign:"center" }}>
                                <div style={{ width:60, height:60, borderRadius:"50%", background:"linear-gradient(135deg,#0ea5e9,#22d3ee)", display:"flex", alignItems:"center", justifyContent:"center", fontWeight:800, fontSize:"1rem", color:"#fff", margin:"0 auto 16px", fontFamily:"'Syne',sans-serif" }}>{m.avatar}</div>
                                <h3 className="syne" style={{ fontSize:"1rem", fontWeight:700, marginBottom:4 }}>{m.name}</h3>
                                <div style={{ fontSize:".72rem", color:"var(--blue)", fontWeight:600, marginBottom:12, letterSpacing:".05em", textTransform:"uppercase" }}>{m.role}</div>
                                <p style={{ fontSize:".82rem", color:"var(--muted)", lineHeight:1.65 }}>{m.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── CTA ── */}
            <section className="sw-sec" style={{ textAlign:"center" }}>
                <div className="sw-con">
                    <h2 className="syne" style={{ fontSize:"clamp(1.8rem,3.5vw,2.8rem)", fontWeight:800, marginBottom:14 }}>Ready to experience <span className="gt">SparkWash?</span></h2>
                    <p style={{ color:"var(--muted)", marginBottom:28, fontSize:".95rem" }}>Book your first wash — takes under 30 seconds.</p>
                    <Link href={route("register")} className="btn-p" style={{ padding:"14px 34px" }}>🚗 Book Now</Link>
                </div>
            </section>

            {/* ── Footer ── */}
            <footer style={{ borderTop:"1px solid var(--bdr)", padding:"28px 0", background:"var(--bg)" }}>
                <div className="sw-con ft-inner" style={{ display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:14 }}>
                    <span className="syne" style={{ fontWeight:800 }}>Spark<span style={{ color:"var(--blue)" }}>Wash</span></span>
                    <div style={{ display:"flex", gap:18 }}>
                        {["about","contact","privacy","terms"].map(l=>(
                            <Link key={l} href={`/${l}`} style={{ color:"var(--muted)", fontSize:".82rem", textDecoration:"none", textTransform:"capitalize" }}>{l}</Link>
                        ))}
                    </div>
                    <span style={{ color:"var(--muted)", fontSize:".75rem" }}>© 2026 SparkWash · <span style={{ color:"var(--blue)", fontWeight:600 }}>Aftab Solangi</span></span>
                </div>
            </footer>
        </>
    );
}