import { Head, Link } from "@inertiajs/react";
import { useState } from "react";

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Syne:wght@700;800&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
:root{--bg:#0d1117;--bg2:#111827;--surf:rgba(255,255,255,0.04);--bdr:rgba(255,255,255,0.08);--bdr-g:rgba(56,189,248,0.28);--blue:#38bdf8;--cyan:#22d3ee;--deep:#0ea5e9;--text:#f0f6ff;--muted:#8896aa;--green:#22c55e}
html{scroll-behavior:smooth}
body{background:var(--bg);color:var(--text);font-family:'Plus Jakarta Sans',sans-serif;overflow-x:hidden;line-height:1.6}
.syne{font-family:'Syne',sans-serif}
.gt{background:linear-gradient(130deg,var(--blue),var(--cyan));-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
.glass{background:var(--surf);border:1px solid var(--bdr);backdrop-filter:blur(16px);border-radius:16px}
.btn-p{display:inline-flex;align-items:center;gap:8px;background:linear-gradient(135deg,var(--deep),var(--cyan));color:#fff;font-weight:700;font-size:.9rem;padding:12px 26px;border-radius:50px;border:none;cursor:pointer;text-decoration:none;box-shadow:0 4px 20px rgba(14,165,233,.25);transition:all .2s;width:100%;justify-content:center}
.btn-p:hover{transform:translateY(-2px);box-shadow:0 8px 28px rgba(14,165,233,.4);color:#fff}
.sw-nav{position:fixed;top:0;left:0;right:0;z-index:999;padding:14px 0;background:rgba(13,17,23,.92);backdrop-filter:blur(20px);border-bottom:1px solid var(--bdr)}
.sw-con{max-width:1160px;margin:0 auto;padding:0 24px}
.sw-label{font-size:.7rem;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:var(--blue);display:block;margin-bottom:12px}
.orb{position:absolute;border-radius:50%;filter:blur(80px);pointer-events:none}
.nav-a{color:var(--muted);font-size:.85rem;text-decoration:none;padding:6px 12px;border-radius:8px;transition:color .2s}
.nav-a:hover,.nav-a.active{color:var(--blue);font-weight:600}
.inp{width:100%;background:rgba(255,255,255,0.04);border:1px solid var(--bdr);border-radius:10px;padding:12px 16px;color:var(--text);font-family:'Plus Jakarta Sans',sans-serif;font-size:.9rem;outline:none;transition:border-color .2s}
.inp:focus{border-color:var(--blue)}
.inp::placeholder{color:var(--muted)}
::-webkit-scrollbar{width:5px}::-webkit-scrollbar-track{background:var(--bg)}::-webkit-scrollbar-thumb{background:rgba(14,165,233,.2);border-radius:3px}
@media(max-width:900px){.contact-grid{grid-template-columns:1fr !important}.info-cards{grid-template-columns:1fr 1fr !important}}
@media(max-width:560px){.info-cards{grid-template-columns:1fr !important}.ft-inner{flex-direction:column !important;text-align:center;gap:16px !important}.nav-links{display:none !important}}
`;

export default function Contact() {
    const [sent, setSent] = useState(false);
    const [form, setForm] = useState({ name:"", email:"", phone:"", service:"", message:"" });

    return (
        <>
            <Head title="Contact Us — SparkWash" />
            <style>{CSS}</style>

            {/* Nav */}
            <nav className="sw-nav">
                <div className="sw-con" style={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
                    <Link href="/" style={{ display:"flex", alignItems:"center", gap:8, textDecoration:"none" }}>
                        <span style={{ fontSize:20 }}>🚗</span>
                        <span className="syne" style={{ fontSize:"1.2rem", fontWeight:800, color:"var(--text)" }}>Spark<span style={{ color:"var(--blue)" }}>Wash</span></span>
                    </Link>
                    <div className="nav-links" style={{ display:"flex", gap:4, alignItems:"center" }}>
                        <Link href="/about"   className="nav-a">About</Link>
                        <Link href="/contact" className="nav-a active">Contact</Link>
                        <Link href="/privacy" className="nav-a">Privacy</Link>
                        <Link href="/terms"   className="nav-a">Terms</Link>
                        <Link href={route("login")}    className="nav-a" style={{ marginLeft:8 }}>Sign In</Link>
                        <Link href={route("register")} className="btn-p" style={{ padding:"8px 18px", fontSize:".85rem", width:"auto", marginLeft:4 }}>Book Now ✦</Link>
                    </div>
                </div>
            </nav>

            {/* Hero */}
            <section style={{ paddingTop:130, paddingBottom:40, position:"relative", overflow:"hidden", textAlign:"center" }}>
                <div className="orb" style={{ width:450, height:450, background:"radial-gradient(circle,rgba(56,189,248,.08),transparent)", top:"-10%", left:"-5%" }} />
                <div className="sw-con" style={{ position:"relative", zIndex:1 }}>
                    <span className="sw-label">Get In Touch</span>
                    <h1 className="syne" style={{ fontSize:"clamp(2.2rem,5vw,3.5rem)", fontWeight:800, lineHeight:1.12, marginBottom:16 }}>
                        We'd love to <span className="gt">hear from you.</span>
                    </h1>
                    <p style={{ color:"var(--muted)", fontSize:"1rem", lineHeight:1.75, maxWidth:460, margin:"0 auto" }}>
                        Have a question or want to book? Our team responds within 1 hour during business hours.
                    </p>
                </div>
            </section>

            {/* Info Cards */}
            <section style={{ padding:"20px 0 50px" }}>
                <div className="sw-con">
                    <div className="info-cards" style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:14, marginBottom:40 }}>
                        {[
                            { icon:"📍", title:"Address", lines:["North Nazimabad,","Gulberg Mall, Karachi"] },
                            { icon:"📞", title:"Phone",   lines:["0313-0004595","Mon–Sat, 8am–8pm"] },
                            { icon:"✉️", title:"Email",   lines:["info@sparkwash.pk","support@sparkwash.pk"] },
                            { icon:"🕐", title:"Hours",   lines:["Mon–Sat: 8am – 8pm","Sunday: 9am – 6pm"] },
                        ].map(c=>(
                            <div key={c.title} className="glass" style={{ padding:"22px 18px", textAlign:"center", transition:"all .25s", cursor:"default" }}
                                onMouseOver={e=>{const el=e.currentTarget as HTMLElement;el.style.borderColor="rgba(56,189,248,0.28)";el.style.transform="translateY(-3px)"}}
                                onMouseOut={e=>{const el=e.currentTarget as HTMLElement;el.style.borderColor="rgba(255,255,255,0.08)";el.style.transform="translateY(0)"}}>
                                <div style={{ fontSize:"1.8rem", marginBottom:10 }}>{c.icon}</div>
                                <div className="syne" style={{ fontWeight:700, fontSize:".9rem", marginBottom:8 }}>{c.title}</div>
                                {c.lines.map(l=><div key={l} style={{ fontSize:".8rem", color:"var(--muted)", lineHeight:1.7 }}>{l}</div>)}
                            </div>
                        ))}
                    </div>

                    {/* Form + Map */}
                    <div className="contact-grid" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:24 }}>

                        {/* Form */}
                        <div className="glass" style={{ padding:"32px 28px" }}>
                            <h2 className="syne" style={{ fontSize:"1.4rem", fontWeight:800, marginBottom:6 }}>Send a Message</h2>
                            <p style={{ color:"var(--muted)", fontSize:".85rem", marginBottom:24 }}>We reply within 1 business hour.</p>

                            {sent ? (
                                <div style={{ textAlign:"center", padding:"36px 20px" }}>
                                    <div style={{ fontSize:"3rem", marginBottom:14 }}>✅</div>
                                    <h3 className="syne" style={{ fontSize:"1.15rem", fontWeight:700, marginBottom:8 }}>Message Sent!</h3>
                                    <p style={{ color:"var(--muted)", fontSize:".88rem" }}>We'll reply within 1 business hour. Thank you!</p>
                                </div>
                            ) : (
                                <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
                                    <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
                                        <div>
                                            <label style={{ fontSize:".76rem", color:"var(--muted)", fontWeight:600, marginBottom:5, display:"block" }}>Full Name *</label>
                                            <input className="inp" placeholder="Ahmed Khan" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} />
                                        </div>
                                        <div>
                                            <label style={{ fontSize:".76rem", color:"var(--muted)", fontWeight:600, marginBottom:5, display:"block" }}>Phone</label>
                                            <input className="inp" placeholder="0313-0004595" value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})} />
                                        </div>
                                    </div>
                                    <div>
                                        <label style={{ fontSize:".76rem", color:"var(--muted)", fontWeight:600, marginBottom:5, display:"block" }}>Email *</label>
                                        <input className="inp" type="email" placeholder="ahmed@email.com" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} />
                                    </div>
                                   <div>
                                        <label style={{ fontSize:".76rem", color:"var(--muted)", fontWeight:600, marginBottom:5, display:"block" }}>Service</label>
                                        <select 
                                            className="inp" 
                                            value={form.service} 
                                            onChange={e=>setForm({...form,service:e.target.value})} 
                                            style={{ 
                                                cursor:"pointer",
                                                color: form.service ? "var(--text)" : "var(--muted)",
                                            }}
                                        >
                                            <option value=""        style={{ background:"#1e293b", color:"#f0f6ff" }}>Select a service...</option>
                                            <option value="basic"   style={{ background:"#1e293b", color:"#f0f6ff" }}>Basic Wash — $9.99</option>
                                            <option value="premium" style={{ background:"#1e293b", color:"#f0f6ff" }}>Premium Wash — $19.99</option>
                                            <option value="deluxe"  style={{ background:"#1e293b", color:"#f0f6ff" }}>Deluxe Detail — $39.99</option>
                                            <option value="inquiry" style={{ background:"#1e293b", color:"#f0f6ff" }}>General Inquiry</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label style={{ fontSize:".76rem", color:"var(--muted)", fontWeight:600, marginBottom:5, display:"block" }}>Message *</label>
                                        <textarea className="inp" placeholder="Tell us how we can help..." rows={4} value={form.message} onChange={e=>setForm({...form,message:e.target.value})} style={{ resize:"vertical", minHeight:90 }} />
                                    </div>
                                    <button className="btn-p" onClick={()=>setSent(true)} style={{ marginTop:4 }}>📨 Send Message</button>
                                </div>
                            )}
                        </div>

                        {/* Map + Quick Contact */}
                        <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
                            <div style={{ borderRadius:16, overflow:"hidden", border:"1px solid var(--bdr)", flex:1, minHeight:300 }}>
                                <iframe
                                    title="SparkWash Location"
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3618.5!2d67.0322!3d24.9408!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3eb33e7c00000001%3A0x0!2sNorth+Nazimabad%2C+Karachi!5e0!3m2!1sen!2s!4v1700000000!5m2!1sen!2s"
                                    width="100%" height="100%"
                                    style={{ border:0, display:"block", minHeight:300, filter:"invert(90%) hue-rotate(180deg)" }}
                                    allowFullScreen loading="lazy"
                                />
                            </div>
                            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
                                <a href="https://wa.me/923130004595" target="_blank" rel="noopener noreferrer"
                                    style={{ display:"flex", alignItems:"center", gap:10, background:"rgba(37,211,102,0.08)", border:"1px solid rgba(37,211,102,0.2)", borderRadius:14, padding:"14px 16px", textDecoration:"none", transition:"background .2s" }}
                                    onMouseOver={e=>(e.currentTarget.style.background="rgba(37,211,102,0.14)")}
                                    onMouseOut={e=>(e.currentTarget.style.background="rgba(37,211,102,0.08)")}>
                                    <span style={{ fontSize:"1.5rem" }}>💬</span>
                                    <div>
                                        <div className="syne" style={{ fontWeight:700, fontSize:".82rem", color:"#22c55e" }}>WhatsApp</div>
                                        <div style={{ fontSize:".7rem", color:"var(--muted)" }}>Chat instantly</div>
                                    </div>
                                </a>
                                <a href="tel:+923130004595"
                                    style={{ display:"flex", alignItems:"center", gap:10, background:"rgba(56,189,248,0.06)", border:"1px solid rgba(56,189,248,0.18)", borderRadius:14, padding:"14px 16px", textDecoration:"none", transition:"background .2s" }}
                                    onMouseOver={e=>(e.currentTarget.style.background="rgba(56,189,248,0.12)")}
                                    onMouseOut={e=>(e.currentTarget.style.background="rgba(56,189,248,0.06)")}>
                                    <span style={{ fontSize:"1.5rem" }}>📞</span>
                                    <div>
                                        <div className="syne" style={{ fontWeight:700, fontSize:".82rem", color:"var(--blue)" }}>Call Us</div>
                                        <div style={{ fontSize:".7rem", color:"var(--muted)" }}>0313-0004595</div>
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
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