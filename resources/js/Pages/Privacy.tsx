import { Head, Link } from "@inertiajs/react";

const SECTIONS = [
    { title:"1. Information We Collect", content:"We collect information you provide when creating an account, making a booking, or contacting us:", bullets:["Name, email address, phone number","Vehicle info: make, model, year, plate number","Payment details — processed securely via Stripe","Booking history and service preferences","Device and usage data"] },
    { title:"2. How We Use Your Information", content:"SparkWash uses collected information to:", bullets:["Process and manage your car wash bookings","Send booking confirmations and receipts via email","Provide AI-powered booking assistance via Llama-3","Improve our services and personalize your experience","Comply with legal obligations and prevent fraud"] },
    { title:"3. Information Sharing", content:"We do not sell your data. We may share with:", bullets:["Stripe — secure payment processing","Email providers — transactional emails","AWS — secure cloud hosting","Law enforcement — when required by law"] },
    { title:"4. Data Security", content:"We implement industry-standard security including:", bullets:["SSL/TLS encryption for all data in transit","AES-256 encryption for data at rest","AWS WAF protection against attacks","Role-based access control (RBAC)","Regular security audits"] },
    { title:"5. Cookies", content:"We use cookies to maintain sessions and analyze usage. You can control cookies via browser settings. Disabling cookies may affect some features.", bullets:[] },
    { title:"6. Your Rights", content:"You have the right to:", bullets:["Access personal data we hold about you","Request correction of inaccurate data","Request deletion of your account and data","Opt out of marketing communications","Lodge a complaint with data protection authorities"] },
    { title:"7. Data Retention", content:"We retain data as long as your account is active. Booking records kept 3 years for legal purposes. Request deletion anytime by contacting us.", bullets:[] },
    { title:"8. Children's Privacy", content:"SparkWash is not for users under 18. We do not knowingly collect data from minors. Contact us immediately if you believe a minor has provided data.", bullets:[] },
    { title:"9. Policy Changes", content:"We may update this policy and will notify you via email of significant changes. Continued use constitutes acceptance.", bullets:[] },
    { title:"10. Contact", content:"Questions about this policy:", bullets:["Email: privacy@sparkwash.pk","Phone: 0313-0004595","Address: North Nazimabad, Gulberg Mall, Karachi"] },
];

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Syne:wght@700;800&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
:root{--bg:#0d1117;--bg2:#111827;--surf:rgba(255,255,255,0.04);--bdr:rgba(255,255,255,0.08);--blue:#38bdf8;--cyan:#22d3ee;--deep:#0ea5e9;--text:#f0f6ff;--muted:#8896aa}
html{scroll-behavior:smooth}
body{background:var(--bg);color:var(--text);font-family:'Plus Jakarta Sans',sans-serif;overflow-x:hidden;line-height:1.6}
.syne{font-family:'Syne',sans-serif}
.gt{background:linear-gradient(130deg,var(--blue),var(--cyan));-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
.btn-p{display:inline-flex;align-items:center;gap:8px;background:linear-gradient(135deg,var(--deep),var(--cyan));color:#fff;font-weight:700;font-size:.9rem;padding:12px 26px;border-radius:50px;border:none;cursor:pointer;text-decoration:none;transition:all .2s}
.btn-p:hover{transform:translateY(-2px);color:#fff}
.sw-nav{position:fixed;top:0;left:0;right:0;z-index:999;padding:14px 0;background:rgba(13,17,23,.92);backdrop-filter:blur(20px);border-bottom:1px solid var(--bdr)}
.sw-con{max-width:1160px;margin:0 auto;padding:0 24px}
.doc-con{max-width:760px;margin:0 auto;padding:0 24px}
.sw-label{font-size:.7rem;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:var(--blue);display:block;margin-bottom:12px}
.orb{position:absolute;border-radius:50%;filter:blur(80px);pointer-events:none}
.nav-a{color:var(--muted);font-size:.85rem;text-decoration:none;padding:6px 12px;transition:color .2s}
.nav-a:hover,.nav-a.active{color:var(--blue);font-weight:600}
h2.sh{font-family:'Syne',sans-serif;font-size:1.1rem;font-weight:700;margin:32px 0 10px;color:var(--text)}
p.sp{color:var(--muted);font-size:.88rem;line-height:1.8;margin-bottom:10px}
ul.su{color:var(--muted);font-size:.88rem;line-height:1.8;margin:0 0 12px 20px}
ul.su li{margin-bottom:5px}
.divider{height:1px;background:var(--bdr);margin:20px 0 0}
::-webkit-scrollbar{width:5px}::-webkit-scrollbar-track{background:var(--bg)}::-webkit-scrollbar-thumb{background:rgba(14,165,233,.2);border-radius:3px}
@media(max-width:560px){.ft-inner{flex-direction:column !important;text-align:center;gap:16px !important}.nav-links{display:none !important}}
`;

export default function Privacy() {
    return (
        <>
            <Head title="Privacy Policy — SparkWash" />
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
                        <Link href="/contact" className="nav-a">Contact</Link>
                        <Link href="/privacy" className="nav-a active">Privacy</Link>
                        <Link href="/terms"   className="nav-a">Terms</Link>
                        <Link href={route("login")}    className="nav-a" style={{ marginLeft:8 }}>Sign In</Link>
                        <Link href={route("register")} className="btn-p" style={{ padding:"8px 18px", fontSize:".85rem", marginLeft:4 }}>Book Now ✦</Link>
                    </div>
                </div>
            </nav>

            {/* Hero */}
            <section style={{ paddingTop:130, paddingBottom:36, position:"relative", overflow:"hidden", textAlign:"center" }}>
                <div className="orb" style={{ width:400, height:400, background:"radial-gradient(circle,rgba(56,189,248,.07),transparent)", top:"-10%", left:"10%" }} />
                <div className="doc-con" style={{ position:"relative", zIndex:1 }}>
                    <span className="sw-label">Legal</span>
                    <h1 className="syne" style={{ fontSize:"clamp(2rem,4vw,3rem)", fontWeight:800, marginBottom:12 }}>Privacy <span className="gt">Policy</span></h1>
                    <p style={{ color:"var(--muted)", fontSize:".88rem", marginBottom:6 }}>Last updated: <strong style={{ color:"var(--text)" }}>January 1, 2026</strong></p>
                    <p style={{ color:"var(--muted)", fontSize:".88rem", lineHeight:1.75, maxWidth:500, margin:"0 auto" }}>SparkWash is committed to protecting your privacy. This policy explains what data we collect, how we use it, and your rights.</p>
                </div>
            </section>

            {/* Content */}
            <section style={{ padding:"16px 0 80px" }}>
                <div className="doc-con">
                    {/* Quick Nav */}
                    <div style={{ background:"rgba(56,189,248,0.04)", border:"1px solid rgba(56,189,248,0.14)", borderRadius:14, padding:"18px 22px", marginBottom:40 }}>
                        <div style={{ fontSize:".72rem", color:"var(--blue)", fontWeight:700, letterSpacing:".08em", textTransform:"uppercase", marginBottom:10 }}>Quick Navigation</div>
                        <div style={{ display:"flex", flexWrap:"wrap", gap:"5px 18px" }}>
                            {SECTIONS.map((s,i)=>(
                                <a key={i} href={`#s${i}`} style={{ color:"var(--muted)", fontSize:".8rem", textDecoration:"none" }}
                                    onMouseOver={e=>(e.currentTarget.style.color="var(--blue)")}
                                    onMouseOut={e=>(e.currentTarget.style.color="var(--muted)")}>{s.title}</a>
                            ))}
                        </div>
                    </div>

                    {SECTIONS.map((s,i)=>(
                        <div key={i} id={`s${i}`}>
                            <h2 className="sh">{s.title}</h2>
                            {s.content && <p className="sp">{s.content}</p>}
                            {s.bullets.length>0 && <ul className="su">{s.bullets.map(b=><li key={b}>{b}</li>)}</ul>}
                            {i<SECTIONS.length-1 && <div className="divider" />}
                        </div>
                    ))}
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