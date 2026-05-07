import{j as e}from"./app-DpZcsFn3.js";import{u as B,d as t,H as I,L as c}from"./inertia-vendor-BUuu6l78.js";import{A as W}from"./AuthenticatedLayout-BHG2AXfG.js";import"./transition-D2F97HgT.js";const C=["Book a Basic Wash for tomorrow","What services do you offer?","Book Premium Wash for Saturday 2PM","Book Deluxe Detail this Sunday"];function _({services:j,vehicles:g}){const{props:v}=B(),x=v.flash?.booking_confirmed,S=()=>{if(x)return[{role:"assistant",content:`🎉 Booking **${x}** confirmed!

Aapki car wash successfully book hogayi! Check your email for details. 📧

Kuch aur book karna hai ya koi sawaal hai? 😊`}];const r=localStorage.getItem("sparkbot_resume");return r?(localStorage.removeItem("sparkbot_resume"),[...JSON.parse(r),{role:"assistant",content:`✅ Vehicle add ho gaya! Ab time slot batao:

1️⃣ 9:00 AM
2️⃣ 11:00 AM
3️⃣ 2:00 PM
4️⃣ 4:00 PM
5️⃣ 6:00 PM`}]):[{role:"assistant",content:`👋 Hi! I'm **SparkBot**, your AI booking assistant!

I can help you book a car wash in seconds — just tell me:
- Which service you want
- When you'd like it
- Which car

What can I do for you today? 🚗✨`}]},[s,d]=t.useState(S),[p,b]=t.useState(""),[o,h]=t.useState(!1),[a,w]=t.useState(null),m=t.useRef(null),u=t.useRef(null);t.useEffect(()=>{m.current?.scrollIntoView({behavior:"smooth"})},[s,o]),t.useEffect(()=>{s.length>1&&localStorage.setItem("sparkbot_messages",JSON.stringify(s))},[s]);const f=async r=>{const n=(r||p).trim();if(!n||o)return;const y=[...s,{role:"user",content:n}];d(y),b(""),h(!0);try{const l=await(await fetch("/ai-chat",{method:"POST",headers:{"Content-Type":"application/json","X-CSRF-TOKEN":document.cookie.match(/XSRF-TOKEN=([^;]+)/)?.[1]??""},body:JSON.stringify({messages:y.map(i=>({role:i.role,content:i.content}))})})).json();l.error?d(i=>[...i,{role:"assistant",content:"❌ "+l.error}]):(d(i=>[...i,{role:"assistant",content:l.message}]),l.booking&&w(l.booking))}catch{d(k=>[...k,{role:"assistant",content:"❌ Connection error. Please try again."}])}finally{h(!1),u.current?.focus()}},z=r=>{r.key==="Enter"&&!r.shiftKey&&(r.preventDefault(),f())},N=r=>r.replace(/\*\*(.*?)\*\*/g,"<strong>$1</strong>").replace(/\[([^\]]+)\]\(([^)]+)\)/g,'<a href="$2" style="color:#38bdf8;font-weight:600;text-decoration:underline;">$1</a>').replace(/\n/g,"<br/>");return e.jsxs(W,{header:e.jsx("h2",{style:{fontFamily:"'Syne', sans-serif",fontWeight:700,fontSize:"1.1rem",background:"linear-gradient(130deg, #dbeafe, #38bdf8, #22d3ee)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",backgroundClip:"text"},children:"🚗 AI Booking Assistant"}),children:[e.jsx(I,{title:"AI Booking Assistant"}),e.jsx("style",{children:`
                @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600&display=swap');

                .chat-root {
                    font-family: 'Outfit', sans-serif;
                    min-height: calc(100vh - 65px);
                    background: #04070f;
                    display: flex;
                    flex-direction: column;
                    padding: 24px;
                    gap: 20px;
                }

                .chat-container {
                    max-width: 820px;
                    margin: 0 auto;
                    width: 100%;
                    display: flex;
                    flex-direction: column;
                    gap: 20px;
                    flex: 1;
                }

                .chat-header {
                    background: rgba(255,255,255,0.03);
                    border: 1px solid rgba(255,255,255,0.07);
                    border-radius: 20px;
                    padding: 20px 24px;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    backdrop-filter: blur(20px);
                }

                .chat-messages {
                    background: rgba(255,255,255,0.02);
                    border: 1px solid rgba(255,255,255,0.06);
                    border-radius: 20px;
                    padding: 24px;
                    min-height: 420px;
                    max-height: 520px;
                    overflow-y: auto;
                    display: flex;
                    flex-direction: column;
                    gap: 16px;
                    scroll-behavior: smooth;
                }
                .chat-messages::-webkit-scrollbar { width: 4px; }
                .chat-messages::-webkit-scrollbar-thumb { background: rgba(56,189,248,0.2); border-radius: 2px; }

                .bubble-wrap {
                    display: flex;
                    gap: 10px;
                    align-items: flex-start;
                }
                .bubble-wrap.user { flex-direction: row-reverse; }

                .avatar {
                    width: 34px; height: 34px;
                    border-radius: 50%;
                    display: flex; align-items: center; justify-content: center;
                    font-size: 0.85rem; font-weight: 700;
                    flex-shrink: 0;
                }
                .avatar.bot { background: linear-gradient(135deg, #0ea5e9, #22d3ee); color: #000; }
                .avatar.user { background: rgba(56,189,248,0.15); color: #38bdf8; border: 1px solid rgba(56,189,248,0.2); }

                .bubble {
                    max-width: 75%;
                    padding: 12px 16px;
                    border-radius: 18px;
                    font-size: 0.9rem;
                    line-height: 1.65;
                    color: #eef4ff;
                }
                .bubble.bot {
                    background: rgba(255,255,255,0.04);
                    border: 1px solid rgba(255,255,255,0.08);
                    border-radius: 4px 18px 18px 18px;
                }
                .bubble.user {
                    background: rgba(56,189,248,0.12);
                    border: 1px solid rgba(56,189,248,0.2);
                    border-radius: 18px 4px 18px 18px;
                    color: #bae6fd;
                }

                .typing { display: flex; gap: 5px; padding: 14px 16px; }
                .typing span {
                    width: 7px; height: 7px;
                    background: #38bdf8; border-radius: 50%;
                    animation: bounce 1.2s infinite;
                }
                .typing span:nth-child(2) { animation-delay: 0.2s; }
                .typing span:nth-child(3) { animation-delay: 0.4s; }
                @keyframes bounce {
                    0%,60%,100% { transform: translateY(0); opacity: 0.4; }
                    30% { transform: translateY(-8px); opacity: 1; }
                }

                .quick-prompts {
                    display: flex; gap: 8px; flex-wrap: wrap;
                }
                .qp-btn {
                    background: rgba(56,189,248,0.06);
                    border: 1px solid rgba(56,189,248,0.15);
                    color: #7dd3fc;
                    padding: 7px 14px; border-radius: 50px;
                    font-size: 0.78rem; font-weight: 500;
                    cursor: pointer; font-family: 'Outfit', sans-serif;
                    transition: all 0.2s;
                    white-space: nowrap;
                }
                .qp-btn:hover {
                    background: rgba(56,189,248,0.12);
                    border-color: rgba(56,189,248,0.3);
                    color: #38bdf8;
                }

                .chat-input-area {
                    background: rgba(255,255,255,0.03);
                    border: 1px solid rgba(255,255,255,0.08);
                    border-radius: 20px;
                    padding: 16px 18px;
                    display: flex;
                    gap: 12px;
                    align-items: flex-end;
                }
                .chat-input-area:focus-within {
                    border-color: rgba(56,189,248,0.3);
                    box-shadow: 0 0 0 3px rgba(56,189,248,0.06);
                }
                .chat-textarea {
                    flex: 1; background: transparent; border: none; outline: none;
                    color: #eef4ff; font-size: 0.925rem;
                    font-family: 'Outfit', sans-serif; resize: none;
                    max-height: 100px; line-height: 1.5;
                }
                .chat-textarea::placeholder { color: #4b5e72; }
                .send-btn {
                    width: 42px; height: 42px; border-radius: 50%;
                    background: linear-gradient(135deg, #0ea5e9, #22d3ee);
                    border: none; cursor: pointer;
                    display: flex; align-items: center; justify-content: center;
                    font-size: 1.1rem; flex-shrink: 0;
                    transition: transform 0.2s, opacity 0.2s;
                }
                .send-btn:disabled { opacity: 0.4; cursor: not-allowed; }
                .send-btn:not(:disabled):hover { transform: scale(1.08); }

                .booking-card {
                    background: linear-gradient(135deg, rgba(14,165,233,0.1), rgba(34,211,238,0.05));
                    border: 1px solid rgba(56,189,248,0.3);
                    border-radius: 20px;
                    padding: 24px;
                    animation: slideUp 0.4s ease;
                }
                @keyframes slideUp {
                    from { opacity: 0; transform: translateY(16px); }
                    to   { opacity: 1; transform: translateY(0); }
                }

                .info-card {
                    background: rgba(255,255,255,0.02);
                    border: 1px solid rgba(255,255,255,0.06);
                    border-radius: 16px;
                    padding: 18px;
                }
            `}),e.jsx("div",{className:"chat-root",children:e.jsxs("div",{className:"chat-container",children:[e.jsxs("div",{className:"chat-header",children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:14},children:[e.jsx("div",{style:{width:48,height:48,borderRadius:"50%",background:"linear-gradient(135deg, #0ea5e9, #22d3ee)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"1.4rem"},children:"🤖"}),e.jsxs("div",{children:[e.jsx("div",{style:{fontWeight:700,fontSize:"1.05rem",color:"#eef4ff",fontFamily:"'Outfit', sans-serif"},children:"SparkBot"}),e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:6,marginTop:2},children:[e.jsx("span",{style:{width:7,height:7,borderRadius:"50%",background:"#22c55e",display:"inline-block",boxShadow:"0 0 6px #22c55e"}}),e.jsx("span",{style:{fontSize:"0.75rem",color:"#22c55e"},children:"Online · Groq Llama-3"})]})]})]}),e.jsx(c,{href:"/bookings",style:{fontSize:"0.82rem",color:"#38bdf8",textDecoration:"none",border:"1px solid rgba(56,189,248,0.2)",padding:"7px 14px",borderRadius:50},children:"My Bookings →"})]}),e.jsxs("div",{style:{display:"grid",gridTemplateColumns:"1fr 280px",gap:20,alignItems:"start"},children:[e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:14},children:[e.jsxs("div",{className:"chat-messages",children:[s.map((r,n)=>e.jsxs("div",{className:`bubble-wrap ${r.role==="user"?"user":""}`,children:[e.jsx("div",{className:`avatar ${r.role==="user"?"user":"bot"}`,children:r.role==="user"?"👤":"🤖"}),e.jsx("div",{className:`bubble ${r.role==="user"?"user":"bot"}`,dangerouslySetInnerHTML:{__html:N(r.content)}})]},n)),o&&e.jsxs("div",{className:"bubble-wrap",children:[e.jsx("div",{className:"avatar bot",children:"🤖"}),e.jsx("div",{className:"bubble bot",children:e.jsxs("div",{className:"typing",children:[e.jsx("span",{}),e.jsx("span",{}),e.jsx("span",{})]})})]}),e.jsx("div",{ref:m})]}),e.jsx("div",{className:"quick-prompts",children:C.map(r=>e.jsx("button",{className:"qp-btn",onClick:()=>f(r),disabled:o,children:r},r))}),e.jsxs("div",{className:"chat-input-area",children:[e.jsx("textarea",{ref:u,className:"chat-textarea",placeholder:"Type your message... (Enter to send)",value:p,onChange:r=>b(r.target.value),onKeyDown:z,rows:1,disabled:o}),e.jsx("button",{className:"send-btn",onClick:()=>f(),disabled:o||!p.trim(),children:"➤"})]})]}),e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:14},children:[e.jsxs("div",{className:"info-card",children:[e.jsx("div",{style:{fontSize:"0.72rem",letterSpacing:"0.1em",color:"#38bdf8",fontWeight:700,marginBottom:12,textTransform:"uppercase"},children:"Services"}),j.map(r=>e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"8px 0",borderBottom:"1px solid rgba(255,255,255,0.04)"},children:[e.jsxs("div",{children:[e.jsx("div",{style:{fontSize:"0.82rem",color:"#eef4ff",fontWeight:500},children:r.name}),e.jsxs("div",{style:{fontSize:"0.7rem",color:"#4b5e72"},children:[r.duration_minutes," min"]})]}),e.jsxs("div",{style:{fontSize:"0.88rem",fontWeight:700,color:"#22d3ee"},children:["$",r.price]})]},r.id))]}),e.jsxs("div",{className:"info-card",children:[e.jsx("div",{style:{fontSize:"0.72rem",letterSpacing:"0.1em",color:"#38bdf8",fontWeight:700,marginBottom:12,textTransform:"uppercase"},children:"Your Vehicles"}),g.length===0?e.jsxs("div",{style:{fontSize:"0.82rem",color:"#4b5e72"},children:["No vehicles added."," ",e.jsx(c,{href:"/vehicles",style:{color:"#38bdf8"},children:"Add one →"})]}):g.map(r=>e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:8,padding:"7px 0",borderBottom:"1px solid rgba(255,255,255,0.04)"},children:[e.jsx("span",{style:{fontSize:"1rem"},children:"🚗"}),e.jsxs("div",{children:[e.jsxs("div",{style:{fontSize:"0.82rem",color:"#eef4ff",fontWeight:500},children:[r.make," ",r.model]}),e.jsx("div",{style:{fontSize:"0.7rem",color:"#4b5e72"},children:r.plate_no})]})]},r.id))]}),e.jsxs("div",{className:"info-card",children:[e.jsx("div",{style:{fontSize:"0.72rem",letterSpacing:"0.1em",color:"#38bdf8",fontWeight:700,marginBottom:10,textTransform:"uppercase"},children:"Tips"}),["Say the service name","Mention day & time","Specify your car"].map(r=>e.jsxs("div",{style:{display:"flex",gap:7,marginBottom:7,fontSize:"0.78rem",color:"#8896aa"},children:[e.jsx("span",{style:{color:"#22d3ee"},children:"✓"})," ",r]},r))]})]})]}),a&&e.jsxs("div",{className:"booking-card",children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:12,marginBottom:18},children:[e.jsx("span",{style:{fontSize:"2rem"},children:"🎉"}),e.jsxs("div",{children:[e.jsx("div",{style:{fontWeight:700,fontSize:"1.1rem",color:"#eef4ff"},children:"Booking Confirmed!"}),e.jsx("div",{style:{fontSize:"0.82rem",color:"#22c55e"},children:"Check your email for details"})]})]}),e.jsx("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:18},children:[{label:"Booking Ref",value:a.booking_ref},{label:"Service",value:a.service},{label:"Scheduled",value:a.scheduled_at},{label:"Total",value:`$${a.total_price}`}].map(r=>e.jsxs("div",{style:{background:"rgba(0,0,0,0.2)",borderRadius:10,padding:"10px 14px"},children:[e.jsx("div",{style:{fontSize:"0.68rem",color:"#4b5e72",textTransform:"uppercase",letterSpacing:"0.08em",marginBottom:3},children:r.label}),e.jsx("div",{style:{fontSize:"0.88rem",fontWeight:600,color:"#eef4ff"},children:r.value})]},r.label))}),e.jsxs("div",{style:{display:"flex",gap:10},children:[e.jsxs(c,{href:`/bookings/${a.id}/checkout`,style:{flex:1,textAlign:"center",background:"linear-gradient(135deg, #0ea5e9, #22d3ee)",color:"#000",fontWeight:700,padding:"11px",borderRadius:12,textDecoration:"none",fontSize:"0.88rem"},children:["💳 Pay Now — $",a.total_price]}),e.jsx(c,{href:`/bookings/${a.id}`,style:{flex:1,textAlign:"center",background:"rgba(255,255,255,0.05)",color:"#eef4ff",border:"1px solid rgba(255,255,255,0.1)",fontWeight:500,padding:"11px",borderRadius:12,textDecoration:"none",fontSize:"0.88rem"},children:"View Booking →"})]})]})]})})]})}export{_ as default};
