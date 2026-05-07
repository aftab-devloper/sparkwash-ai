import{j as e}from"./app-DpZcsFn3.js";import{H as s,L as n}from"./inertia-vendor-BUuu6l78.js";import{A as o}from"./AuthenticatedLayout-BHG2AXfG.js";import"./transition-D2F97HgT.js";const d={"Basic Wash":"🚿","Premium Wash":"✨","Deluxe Detail":"💎"};function f({services:i}){return e.jsxs(o,{header:e.jsx("h2",{style:{fontFamily:"'Syne', sans-serif",fontWeight:700,fontSize:"1.1rem",background:"linear-gradient(130deg, #dbeafe, #38bdf8, #22d3ee)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",backgroundClip:"text"},children:"✨ Our Services"}),children:[e.jsx(s,{title:"Services"}),e.jsx("style",{children:`
                @import url('https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=Outfit:wght@300;400;500;600&display=swap');

                .svc-root {
                    min-height: calc(100vh - 65px);
                    background: #04070f;
                    padding: 40px 24px;
                    font-family: 'Outfit', sans-serif;
                }
                .svc-con { max-width: 1180px; margin: 0 auto; }

                .svc-heading {
                    margin-bottom: 40px;
                }
                .svc-label {
                    font-size: 0.72rem; font-weight: 700;
                    letter-spacing: 0.14em; text-transform: uppercase;
                    color: #38bdf8; margin-bottom: 10px; display: block;
                }
                .svc-title {
                    font-family: 'Syne', sans-serif;
                    font-size: clamp(1.8rem, 3vw, 2.6rem);
                    font-weight: 800; color: #eef4ff; line-height: 1.15;
                }
                .svc-title span {
                    background: linear-gradient(130deg, #dbeafe, #38bdf8, #22d3ee);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                }

                .svc-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
                    gap: 24px;
                }

                .svc-card {
                    background: rgba(255,255,255,0.03);
                    border: 1px solid rgba(255,255,255,0.07);
                    border-radius: 20px;
                    padding: 28px;
                    position: relative;
                    transition: all 0.3s;
                    overflow: hidden;
                }
                .svc-card:hover {
                    border-color: rgba(56,189,248,0.3);
                    background: rgba(56,189,248,0.04);
                    transform: translateY(-4px);
                    box-shadow: 0 0 40px rgba(56,189,248,0.08), 0 16px 40px rgba(0,0,0,0.3);
                }
                .svc-card.featured {
                    border-color: rgba(56,189,248,0.25);
                    background: linear-gradient(135deg, rgba(14,165,233,0.08), rgba(34,211,238,0.03));
                }
                .svc-card.featured::before {
                    content: '';
                    position: absolute; inset: -100%;
                    background: conic-gradient(from 0deg, transparent, rgba(56,189,248,0.05) 60deg, transparent 120deg);
                    animation: spin 9s linear infinite;
                }
                @keyframes spin { to { transform: rotate(360deg); } }

                .featured-badge {
                    position: absolute; top: -1px; right: 24px;
                    background: linear-gradient(135deg, #0ea5e9, #22d3ee);
                    color: #000; font-size: 0.65rem; font-weight: 800;
                    padding: 4px 14px; border-radius: 0 0 12px 12px;
                    font-family: 'Syne', sans-serif; letter-spacing: 0.06em;
                }

                .svc-icon {
                    width: 56px; height: 56px; border-radius: 16px;
                    background: rgba(56,189,248,0.1);
                    display: flex; align-items: center; justify-content: center;
                    font-size: 1.6rem; margin-bottom: 20px;
                    position: relative; z-index: 1;
                }
                .svc-card.featured .svc-icon {
                    background: rgba(56,189,248,0.18);
                }

                .svc-name {
                    font-family: 'Syne', sans-serif;
                    font-size: 1.25rem; font-weight: 700;
                    color: #eef4ff; margin-bottom: 10px;
                    position: relative; z-index: 1;
                }
                .svc-desc {
                    font-size: 0.875rem; color: #8896aa;
                    line-height: 1.65; margin-bottom: 24px;
                    font-weight: 300; position: relative; z-index: 1;
                }
                .svc-price-row {
                    display: flex; align-items: flex-end;
                    justify-content: space-between; margin-bottom: 24px;
                    position: relative; z-index: 1;
                }
                .svc-price {
                    font-family: 'Syne', sans-serif;
                    font-size: 2.4rem; font-weight: 800;
                    background: linear-gradient(130deg, #dbeafe, #38bdf8);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                    line-height: 1;
                }
                .svc-price-sub {
                    font-size: 0.78rem; color: #8896aa; margin-left: 4px;
                }
                .svc-duration {
                    display: flex; align-items: center; gap: 5px;
                    font-size: 0.8rem; color: #8896aa;
                    background: rgba(255,255,255,0.04);
                    border: 1px solid rgba(255,255,255,0.06);
                    padding: 6px 12px; border-radius: 50px;
                }

                .svc-btn {
                    display: block; width: 100%; text-align: center;
                    padding: 13px; border-radius: 12px;
                    font-size: 0.875rem; font-weight: 700;
                    font-family: 'Syne', sans-serif;
                    text-decoration: none; transition: all 0.25s;
                    position: relative; z-index: 1;
                }
                .svc-btn.primary {
                    background: linear-gradient(135deg, #0ea5e9, #22d3ee);
                    color: #000;
                    box-shadow: 0 0 24px rgba(56,189,248,0.25);
                }
                .svc-btn.primary:hover {
                    transform: translateY(-1px);
                    box-shadow: 0 0 40px rgba(56,189,248,0.4);
                }
                .svc-btn.secondary {
                    background: rgba(255,255,255,0.04);
                    border: 1px solid rgba(255,255,255,0.1);
                    color: #eef4ff;
                }
                .svc-btn.secondary:hover {
                    border-color: rgba(56,189,248,0.3);
                    background: rgba(56,189,248,0.06);
                    color: #38bdf8;
                }

                @media (max-width: 640px) {
                    .svc-root { padding: 24px 16px; }
                    .svc-grid { grid-template-columns: 1fr; }
                }
            `}),e.jsx("div",{className:"svc-root",children:e.jsxs("div",{className:"svc-con",children:[e.jsxs("div",{className:"svc-heading",children:[e.jsx("span",{className:"svc-label",children:"Our Services"}),e.jsxs("h1",{className:"svc-title",children:["Choose your ",e.jsx("span",{children:"perfect wash."})]})]}),e.jsx("div",{className:"svc-grid",children:i.map((r,t)=>{const a=t===1;return e.jsxs("div",{className:`svc-card ${a?"featured":""}`,children:[a&&e.jsx("div",{className:"featured-badge",children:"✦ MOST POPULAR"}),e.jsx("div",{className:"svc-icon",children:d[r.name]||"🚗"}),e.jsx("div",{className:"svc-name",children:r.name}),e.jsx("div",{className:"svc-desc",children:r.description||"Professional car wash service with premium products and attention to detail."}),e.jsxs("div",{className:"svc-price-row",children:[e.jsxs("div",{children:[e.jsxs("span",{className:"svc-price",children:["$",r.price]}),e.jsx("span",{className:"svc-price-sub",children:"/visit"})]}),e.jsxs("div",{className:"svc-duration",children:["⏱ ",r.duration_minutes," mins"]})]}),e.jsx(n,{href:route("ai.chat"),className:`svc-btn ${a?"primary":"secondary"}`,children:a?"🤖 Book with AI":"Book Now →"})]},r.id)})})]})})]})}export{f as default};
