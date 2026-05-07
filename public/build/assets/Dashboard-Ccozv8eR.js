import{j as e}from"./app-DpZcsFn3.js";import{d as s,H as b,L as i}from"./inertia-vendor-BUuu6l78.js";import{A as p}from"./AuthenticatedLayout-BHG2AXfG.js";import"./transition-D2F97HgT.js";const f={pending:"rgba(251,191,36,0.15)",completed:"rgba(34,197,94,0.15)",cancelled:"rgba(239,68,68,0.15)"},x={pending:"#fbbf24",completed:"#22c55e",cancelled:"#ef4444"};function v({stats:r,recentBookings:n,monthlyData:o,userName:l}){const t=s.useRef(null);s.useEffect(()=>{if(!t.current)return;const a=document.createElement("script");a.src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.1/chart.umd.min.js",a.onload=()=>{const c=window.Chart,g=Object.keys(o),m=Object.values(o);new c(t.current,{type:"line",data:{labels:g,datasets:[{label:"Bookings",data:m,borderColor:"#38bdf8",backgroundColor:"rgba(56,189,248,0.08)",borderWidth:2,fill:!0,tension:.4,pointBackgroundColor:"#38bdf8",pointRadius:4}]},options:{responsive:!0,plugins:{legend:{display:!1},tooltip:{backgroundColor:"rgba(4,7,15,0.9)",titleColor:"#eef4ff",bodyColor:"#8896aa",borderColor:"rgba(56,189,248,0.2)",borderWidth:1}},scales:{x:{grid:{color:"rgba(255,255,255,0.04)"},ticks:{color:"#8896aa"}},y:{grid:{color:"rgba(255,255,255,0.04)"},ticks:{color:"#8896aa",stepSize:1}}}}})},document.head.appendChild(a)},[o]);const d=()=>{const a=new Date().getHours();return a<12?"Good Morning":a<17?"Good Afternoon":"Good Evening"};return e.jsxs(p,{header:e.jsx("h2",{style:{fontFamily:"'Syne', sans-serif",fontWeight:700,fontSize:"1.1rem",background:"linear-gradient(130deg, #dbeafe, #38bdf8, #22d3ee)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",backgroundClip:"text"},children:"🚗 Dashboard"}),children:[e.jsx(b,{title:"Dashboard"}),e.jsx("style",{children:`
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
            `}),e.jsx("div",{className:"dash-root",children:e.jsxs("div",{className:"dash-con",children:[e.jsxs("div",{className:"greeting",children:[e.jsxs("div",{className:"member-badge",children:["✦ Member since ",r.member_since]}),e.jsxs("div",{className:"greeting-sub",children:[d(),","]}),e.jsxs("div",{className:"greeting-name",children:["Welcome back, ",e.jsx("span",{children:l.split(" ")[0]})," 👋"]})]}),e.jsx("div",{className:"stats-grid",children:[{icon:"📋",val:r.total_bookings,label:"Total Bookings"},{icon:"⏳",val:r.pending_bookings,label:"Pending"},{icon:"✅",val:r.completed_bookings,label:"Completed"},{icon:"💰",val:`$${Number(r.total_spent).toFixed(2)}`,label:"Total Spent"},{icon:"🚗",val:r.total_vehicles,label:"My Vehicles"}].map(a=>e.jsxs("div",{className:"stat-card",children:[e.jsx("div",{className:"stat-icon",children:a.icon}),e.jsx("div",{className:"stat-val",children:a.val}),e.jsx("div",{className:"stat-label",children:a.label})]},a.label))}),e.jsx("div",{style:{marginBottom:10},children:e.jsx("div",{className:"card-title",children:"Quick Actions"})}),e.jsx("div",{className:"qa-grid",style:{marginBottom:28},children:[{icon:"🤖",label:"AI Booking",href:"/ai-chat",primary:!0},{icon:"📋",label:"Book Manually",href:"/bookings",primary:!1},{icon:"🚗",label:"Add Vehicle",href:"/vehicles",primary:!1},{icon:"🛠️",label:"Services",href:"/services",primary:!1},{icon:"📊",label:"My Bookings",href:"/bookings",primary:!1},{icon:"👤",label:"Profile",href:"/profile",primary:!1}].map(a=>e.jsxs(i,{href:a.href,className:`qa-btn ${a.primary?"primary":""}`,children:[e.jsx("span",{className:"qa-icon",children:a.icon}),e.jsx("span",{className:"qa-label",children:a.label})]},a.label))}),e.jsxs("div",{className:"chart-card",children:[e.jsx("div",{className:"card-title",children:"📈 Booking Activity (Last 6 Months)"}),Object.keys(o).length>0?e.jsx("canvas",{ref:t,height:80}):e.jsx("div",{className:"empty-state",children:"No booking data yet — make your first booking! 🚗"})]}),e.jsxs("div",{className:"bookings-card",children:[e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:18},children:[e.jsx("div",{className:"card-title",style:{marginBottom:0},children:"🕐 Recent Bookings"}),e.jsx(i,{href:"/bookings",style:{fontSize:"0.78rem",color:"#38bdf8",textDecoration:"none"},children:"View all →"})]}),n.length===0?e.jsxs("div",{className:"empty-state",children:["No bookings yet!"," ",e.jsx(i,{href:"/ai-chat",style:{color:"#38bdf8"},children:"Book your first wash →"})]}):n.map(a=>e.jsxs("div",{className:"booking-row",children:[e.jsxs("div",{children:[e.jsx("div",{className:"booking-ref",children:a.booking_ref}),e.jsxs("div",{className:"booking-info",children:[a.service?.name," · ",a.vehicle?.make," ",a.vehicle?.model]}),e.jsx("div",{className:"booking-info",children:new Date(a.scheduled_at).toLocaleDateString("en-US",{weekday:"short",day:"numeric",month:"short",year:"numeric"})})]}),e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:12},children:[e.jsx("span",{className:"status-badge",style:{background:f[a.status]||"rgba(255,255,255,0.08)",color:x[a.status]||"#8896aa"},children:a.status}),e.jsxs("div",{className:"booking-price",children:["$",Number(a.total_price).toFixed(2)]}),e.jsx(i,{href:`/bookings/${a.id}`,style:{fontSize:"0.75rem",color:"#38bdf8",textDecoration:"none",border:"1px solid rgba(56,189,248,0.2)",padding:"4px 10px",borderRadius:50},children:"View →"})]})]},a.id))]})]})})]})}export{v as default};
