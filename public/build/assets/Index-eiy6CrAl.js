import{j as e}from"./app-DpZcsFn3.js";import{d as m,f,e as h,H as u,L as p}from"./inertia-vendor-BUuu6l78.js";import{A as k}from"./AuthenticatedLayout-BHG2AXfG.js";import"./transition-D2F97HgT.js";function v({bookingId:n}){const[r,l]=m.useState(0),[o,t]=m.useState(0),[d,c]=m.useState(""),[s,b]=m.useState(!1),x=["","Poor","Fair","Good","Very Good","Excellent"],a=()=>{r!==0&&(b(!0),f.post(`/bookings/${n}/review`,{rating:r,comment:d},{onFinish:()=>b(!1)}))};return e.jsxs("div",{className:"mt-3 space-y-3 rounded-lg border border-dashed border-gray-300 p-4",children:[e.jsx("p",{className:"text-sm font-medium text-gray-700",children:"⭐ Leave a Review"}),e.jsxs("div",{className:"flex items-center gap-1",children:[[1,2,3,4,5].map(i=>e.jsx("button",{type:"button",onClick:()=>l(i),onMouseEnter:()=>t(i),onMouseLeave:()=>t(0),className:"text-3xl focus:outline-none transition-transform hover:scale-110",children:e.jsx("span",{className:i<=(o||r)?"text-yellow-400":"text-gray-300",children:"★"})},i)),r>0&&e.jsx("span",{className:"ml-2 text-sm font-medium text-gray-600",children:x[r]})]}),e.jsx("textarea",{value:d,onChange:i=>c(i.target.value),placeholder:"Share your experience... (optional)",rows:3,className:`w-full rounded-lg border border-gray-300 px-3 py-2 text-sm\r
                           focus:outline-none focus:ring-2 focus:ring-blue-500`}),e.jsx("button",{onClick:a,disabled:r===0||s,className:`rounded-lg bg-blue-600 px-4 py-2 text-sm text-white\r
                           hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50\r
                           transition-colors`,children:s?"Submitting...":"Submit Review"})]})}const j={pending:{bg:"rgba(251,191,36,0.12)",color:"#fbbf24"},confirmed:{bg:"rgba(34,197,94,0.12)",color:"#22c55e"},completed:{bg:"rgba(56,189,248,0.12)",color:"#38bdf8"},cancelled:{bg:"rgba(239,68,68,0.12)",color:"#ef4444"}},y=["09:00","10:00","11:00","12:00","13:00","14:00","15:00","16:00","17:00"];function z({bookings:n,services:r,vehicles:l}){const{data:o,setData:t,post:d,processing:c,errors:s,reset:b}=h({service_id:"",vehicle_id:"",booking_date:"",booking_time:"",notes:""}),x=a=>{a.preventDefault(),d(route("bookings.store"),{onSuccess:()=>b()})};return e.jsxs(k,{header:e.jsx("h2",{style:{fontFamily:"'Syne', sans-serif",fontWeight:700,fontSize:"1.1rem",background:"linear-gradient(130deg, #dbeafe, #38bdf8, #22d3ee)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",backgroundClip:"text"},children:"📋 My Bookings"}),children:[e.jsx(u,{title:"My Bookings"}),e.jsx("style",{children:`
                @import url('https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=Outfit:wght@300;400;500;600&display=swap');

                .bk-root {
                    min-height: calc(100vh - 65px);
                    background: #04070f;
                    padding: 40px 24px;
                    font-family: 'Outfit', sans-serif;
                    color: #eef4ff;
                }
                .bk-con { max-width: 1180px; margin: 0 auto; display: flex; flex-direction: column; gap: 28px; }

                .bk-card {
                    background: rgba(255,255,255,0.03);
                    border: 1px solid rgba(255,255,255,0.07);
                    border-radius: 20px; padding: 28px;
                }
                .bk-card-title {
                    font-family: 'Syne', sans-serif;
                    font-size: 1rem; font-weight: 700;
                    color: #eef4ff; margin-bottom: 24px;
                }

                /* Form */
                .bk-form { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
                .bk-field { display: flex; flex-direction: column; gap: 6px; }
                .bk-field.full { grid-column: 1 / -1; }
                .bk-label { font-size: 0.78rem; font-weight: 600; color: #8896aa; letter-spacing: 0.04em; text-transform: uppercase; }
                .bk-input, .bk-select, .bk-textarea {
                    background: rgba(255,255,255,0.04);
                    border: 1px solid rgba(255,255,255,0.08);
                    border-radius: 10px; padding: 10px 14px;
                    color: #eef4ff; font-size: 0.9rem;
                    font-family: 'Outfit', sans-serif;
                    outline: none; transition: all 0.2s;
                    width: 100%;
                }
                .bk-select option { background: #0a1628; color: #eef4ff; }
                .bk-input::placeholder, .bk-textarea::placeholder { color: #4b5e72; }
                .bk-input:focus, .bk-select:focus, .bk-textarea:focus {
                    border-color: rgba(56,189,248,0.4);
                    background: rgba(56,189,248,0.04);
                    box-shadow: 0 0 0 3px rgba(56,189,248,0.06);
                }
                .bk-textarea { resize: vertical; min-height: 80px; }
                .bk-error { font-size: 0.72rem; color: #ef4444; }

                .bk-submit {
                    width: 100%; padding: 13px;
                    background: linear-gradient(135deg, #0ea5e9, #22d3ee);
                    border: none; border-radius: 12px;
                    color: #000; font-weight: 700;
                    font-family: 'Syne', sans-serif; font-size: 0.9rem;
                    cursor: pointer; transition: all 0.25s;
                    box-shadow: 0 0 24px rgba(56,189,248,0.2);
                }
                .bk-submit:hover { transform: translateY(-1px); box-shadow: 0 0 36px rgba(56,189,248,0.35); }
                .bk-submit:disabled { opacity: 0.5; cursor: not-allowed; transform: none; }

                /* Warning */
                .bk-warning {
                    background: rgba(251,191,36,0.08);
                    border: 1px solid rgba(251,191,36,0.2);
                    border-radius: 12px; padding: 14px 18px;
                    font-size: 0.875rem; color: #fbbf24;
                }

                /* Booking items */
                .bk-item {
                    background: rgba(255,255,255,0.02);
                    border: 1px solid rgba(255,255,255,0.06);
                    border-radius: 16px; padding: 20px;
                    margin-bottom: 14px; transition: all 0.25s;
                }
                .bk-item:last-child { margin-bottom: 0; }
                .bk-item:hover { border-color: rgba(56,189,248,0.15); background: rgba(56,189,248,0.02); }

                .bk-item-top { display: flex; justify-content: space-between; align-items: flex-start; gap: 16px; flex-wrap: wrap; }
                .bk-ref { font-family: 'Syne', sans-serif; font-size: 0.78rem; color: #38bdf8; font-weight: 700; margin-bottom: 4px; }
                .bk-service-name { font-family: 'Syne', sans-serif; font-size: 1rem; font-weight: 700; color: #eef4ff; margin-bottom: 6px; }
                .bk-meta { font-size: 0.82rem; color: #8896aa; margin-bottom: 3px; }

                .bk-right { display: flex; flex-direction: column; align-items: flex-end; gap: 8px; }
                .bk-price { font-family: 'Syne', sans-serif; font-size: 1.4rem; font-weight: 800; color: #eef4ff; }
                .bk-status {
                    font-size: 0.68rem; font-weight: 700;
                    padding: 4px 12px; border-radius: 50px;
                    text-transform: uppercase; letter-spacing: 0.08em;
                }
                .bk-actions { display: flex; gap: 8px; flex-wrap: wrap; }
                .bk-btn {
                    font-size: 0.78rem; font-weight: 600;
                    padding: 7px 14px; border-radius: 10px;
                    text-decoration: none; transition: all 0.2s;
                    display: inline-flex; align-items: center; gap: 5px;
                    font-family: 'Outfit', sans-serif;
                }
                .bk-btn.pay {
                    background: linear-gradient(135deg, #0ea5e9, #22d3ee);
                    color: #000;
                }
                .bk-btn.pay:hover { transform: translateY(-1px); box-shadow: 0 4px 16px rgba(56,189,248,0.3); }
                .bk-btn.invoice {
                    background: rgba(255,255,255,0.05);
                    border: 1px solid rgba(255,255,255,0.1);
                    color: #eef4ff;
                }
                .bk-btn.invoice:hover { border-color: rgba(56,189,248,0.3); color: #38bdf8; }

                /* Review */
                .bk-review {
                    margin-top: 14px;
                    border-top: 1px solid rgba(255,255,255,0.05);
                    padding-top: 14px;
                }
                .bk-review-done {
                    display: flex; align-items: center; gap: 10px;
                    background: rgba(251,191,36,0.08);
                    border: 1px solid rgba(251,191,36,0.15);
                    border-radius: 10px; padding: 10px 14px;
                    font-size: 0.82rem; color: #8896aa;
                }
                .bk-stars { color: #fbbf24; letter-spacing: 2px; }

                .bk-empty { text-align: center; padding: 40px; color: #8896aa; font-size: 0.9rem; }

                @media (max-width: 640px) {
                    .bk-root { padding: 20px 16px; }
                    .bk-form { grid-template-columns: 1fr; }
                    .bk-item-top { flex-direction: column; }
                    .bk-right { align-items: flex-start; }
                }
            `}),e.jsx("div",{className:"bk-root",children:e.jsxs("div",{className:"bk-con",children:[e.jsxs("div",{className:"bk-card",children:[e.jsx("div",{className:"bk-card-title",children:"✨ Book a Wash"}),l.length===0?e.jsxs("div",{className:"bk-warning",children:["⚠️ Please"," ",e.jsx(p,{href:route("vehicles.index"),style:{color:"#fbbf24",fontWeight:700},children:"add a vehicle"})," ","first before booking."]}):e.jsx("form",{onSubmit:x,children:e.jsxs("div",{className:"bk-form",children:[e.jsxs("div",{className:"bk-field",children:[e.jsx("label",{className:"bk-label",children:"Service"}),e.jsxs("select",{className:"bk-select",value:o.service_id,onChange:a=>t("service_id",a.target.value),children:[e.jsx("option",{value:"",children:"Select a service"}),r.map(a=>e.jsxs("option",{value:a.id,children:[a.name," — $",a.price]},a.id))]}),s.service_id&&e.jsx("span",{className:"bk-error",children:s.service_id})]}),e.jsxs("div",{className:"bk-field",children:[e.jsx("label",{className:"bk-label",children:"Vehicle"}),e.jsxs("select",{className:"bk-select",value:o.vehicle_id,onChange:a=>t("vehicle_id",a.target.value),children:[e.jsx("option",{value:"",children:"Select a vehicle"}),l.map(a=>e.jsxs("option",{value:a.id,children:[a.make," ",a.model," — ",a.plate_no]},a.id))]}),s.vehicle_id&&e.jsx("span",{className:"bk-error",children:s.vehicle_id})]}),e.jsxs("div",{className:"bk-field",children:[e.jsx("label",{className:"bk-label",children:"Date"}),e.jsx("input",{type:"date",className:"bk-input",value:o.booking_date,onChange:a=>t("booking_date",a.target.value)}),s.booking_date&&e.jsx("span",{className:"bk-error",children:s.booking_date})]}),e.jsxs("div",{className:"bk-field",children:[e.jsx("label",{className:"bk-label",children:"Time Slot"}),e.jsxs("select",{className:"bk-select",value:o.booking_time,onChange:a=>t("booking_time",a.target.value),children:[e.jsx("option",{value:"",children:"Select time"}),y.map(a=>e.jsx("option",{value:a,children:a},a))]}),s.booking_time&&e.jsx("span",{className:"bk-error",children:s.booking_time})]}),e.jsxs("div",{className:"bk-field full",children:[e.jsx("label",{className:"bk-label",children:"Notes (optional)"}),e.jsx("textarea",{className:"bk-textarea",value:o.notes,onChange:a=>t("notes",a.target.value),placeholder:"Any special instructions..."})]}),e.jsx("div",{className:"bk-field full",children:e.jsx("button",{type:"submit",disabled:c,className:"bk-submit",children:c?"Booking...":"✓ Confirm Booking"})})]})})]}),e.jsxs("div",{className:"bk-card",children:[e.jsxs("div",{className:"bk-card-title",children:["🕐 Booking History (",n.length,")"]}),n.length===0?e.jsxs("div",{className:"bk-empty",children:["No bookings yet!"," ",e.jsx(p,{href:route("ai.chat"),style:{color:"#38bdf8"},children:"Book with AI →"})]}):n.map(a=>{const i=j[a.status]||{bg:"rgba(255,255,255,0.08)",color:"#8896aa"};return e.jsxs("div",{className:"bk-item",children:[e.jsxs("div",{className:"bk-item-top",children:[e.jsxs("div",{children:[e.jsx("div",{className:"bk-ref",children:a.booking_ref}),e.jsx("div",{className:"bk-service-name",children:a.service.name}),e.jsxs("div",{className:"bk-meta",children:["🚗 ",a.vehicle.make," ",a.vehicle.model," · ",a.vehicle.plate_no]}),e.jsxs("div",{className:"bk-meta",children:["📅 ",new Date(a.scheduled_at).toLocaleString("en-US",{dateStyle:"medium",timeStyle:"short"})]})]}),e.jsxs("div",{className:"bk-right",children:[e.jsxs("div",{className:"bk-price",children:["$",Number(a.total_price).toFixed(2)]}),e.jsx("span",{className:"bk-status",style:{background:i.bg,color:i.color},children:a.status}),e.jsxs("div",{className:"bk-actions",children:[a.status==="pending"&&e.jsx(p,{href:route("payment.checkout",a.id),className:"bk-btn pay",children:"💳 Pay Now"}),(a.status==="confirmed"||a.status==="completed")&&e.jsx("a",{href:route("invoice.download",a.id),className:"bk-btn invoice",target:"_blank",children:"📄 Invoice"}),e.jsx(p,{href:route("bookings.show",a.id),className:"bk-btn invoice",children:"View →"})]})]})]}),a.status==="completed"&&e.jsx("div",{className:"bk-review",children:a.review?e.jsxs("div",{className:"bk-review-done",children:[e.jsx("span",{children:"Your rating:"}),e.jsx("span",{className:"bk-stars",children:[1,2,3,4,5].map(g=>e.jsx("span",{style:{color:g<=a.review.rating?"#fbbf24":"rgba(255,255,255,0.15)"},children:"★"},g))}),a.review.comment&&e.jsxs("span",{style:{fontStyle:"italic"},children:['"',a.review.comment,'"']})]}):e.jsx(v,{bookingId:a.id})})]},a.id)})]})]})})]})}export{z as default};
