import{j as e}from"./app-DpZcsFn3.js";import{e as h,H as m,f}from"./inertia-vendor-BUuu6l78.js";import{A as x}from"./AuthenticatedLayout-BHG2AXfG.js";import"./transition-D2F97HgT.js";function y({vehicles:o}){const{data:s,setData:l,post:n,processing:t,errors:i,reset:d}=h({make:"",model:"",year:"",plate_no:"",color:""}),c=a=>{a.preventDefault(),n(route("vehicles.store"),{onSuccess:()=>{d();const r=localStorage.getItem("sparkbot_messages");r&&(localStorage.setItem("sparkbot_resume",r),setTimeout(()=>{window.location.href="/ai-chat"},100))}})},p=a=>{confirm("Delete this vehicle?")&&f.delete(route("vehicles.destroy",a))};return e.jsxs(x,{header:e.jsx("h2",{style:{fontFamily:"'Syne', sans-serif",fontWeight:700,fontSize:"1.1rem",background:"linear-gradient(130deg, #dbeafe, #38bdf8, #22d3ee)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",backgroundClip:"text"},children:"🚗 My Vehicles"}),children:[e.jsx(m,{title:"My Vehicles"}),e.jsx("style",{children:`
                @import url('https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=Outfit:wght@300;400;500;600&display=swap');

                .veh-root {
                    min-height: calc(100vh - 65px);
                    background: #04070f;
                    padding: 40px 24px;
                    font-family: 'Outfit', sans-serif;
                    color: #eef4ff;
                }
                .veh-con { max-width: 1180px; margin: 0 auto; display: flex; flex-direction: column; gap: 28px; }

                .veh-card {
                    background: rgba(255,255,255,0.03);
                    border: 1px solid rgba(255,255,255,0.07);
                    border-radius: 20px; padding: 28px;
                }
                .veh-card-title {
                    font-family: 'Syne', sans-serif;
                    font-size: 1rem; font-weight: 700;
                    color: #eef4ff; margin-bottom: 24px;
                    display: flex; align-items: center; gap: 8px;
                }

                /* Form */
                .veh-form { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
                .veh-field { display: flex; flex-direction: column; gap: 6px; }
                .veh-label { font-size: 0.78rem; font-weight: 600; color: #8896aa; letter-spacing: 0.04em; text-transform: uppercase; }
                .veh-input {
                    background: rgba(255,255,255,0.04);
                    border: 1px solid rgba(255,255,255,0.08);
                    border-radius: 10px; padding: 10px 14px;
                    color: #eef4ff; font-size: 0.9rem;
                    font-family: 'Outfit', sans-serif;
                    outline: none; transition: all 0.2s;
                }
                .veh-input::placeholder { color: #4b5e72; }
                .veh-input:focus {
                    border-color: rgba(56,189,248,0.4);
                    background: rgba(56,189,248,0.04);
                    box-shadow: 0 0 0 3px rgba(56,189,248,0.06);
                }
                .veh-error { font-size: 0.72rem; color: #ef4444; margin-top: 2px; }

                .veh-btn {
                    width: 100%; padding: 12px;
                    background: linear-gradient(135deg, #0ea5e9, #22d3ee);
                    border: none; border-radius: 12px;
                    color: #000; font-weight: 700;
                    font-family: 'Syne', sans-serif; font-size: 0.9rem;
                    cursor: pointer; transition: all 0.25s;
                    box-shadow: 0 0 24px rgba(56,189,248,0.2);
                }
                .veh-btn:hover { transform: translateY(-1px); box-shadow: 0 0 36px rgba(56,189,248,0.35); }
                .veh-btn:disabled { opacity: 0.5; cursor: not-allowed; transform: none; }

                /* Vehicle cards */
                .veh-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 16px; }
                .veh-item {
                    background: rgba(255,255,255,0.02);
                    border: 1px solid rgba(255,255,255,0.06);
                    border-radius: 16px; padding: 18px;
                    display: flex; align-items: center; gap: 14px;
                    transition: all 0.25s; position: relative;
                }
                .veh-item:hover {
                    border-color: rgba(56,189,248,0.2);
                    background: rgba(56,189,248,0.03);
                    transform: translateY(-2px);
                }
                .veh-item-icon {
                    width: 48px; height: 48px; border-radius: 14px;
                    background: rgba(56,189,248,0.1);
                    display: flex; align-items: center; justify-content: center;
                    font-size: 1.4rem; flex-shrink: 0;
                }
                .veh-item-name {
                    font-family: 'Syne', sans-serif;
                    font-weight: 700; font-size: 0.95rem; color: #eef4ff;
                }
                .veh-item-plate {
                    font-size: 0.78rem; color: #38bdf8;
                    margin-top: 2px; font-weight: 500;
                }
                .veh-item-color {
                    font-size: 0.72rem; color: #8896aa; margin-top: 2px;
                }
                .veh-delete {
                    position: absolute; top: 12px; right: 12px;
                    background: rgba(239,68,68,0.08);
                    border: 1px solid rgba(239,68,68,0.15);
                    border-radius: 8px; padding: 4px 8px;
                    color: #ef4444; font-size: 0.72rem;
                    cursor: pointer; transition: all 0.2s;
                    font-family: 'Outfit', sans-serif;
                }
                .veh-delete:hover { background: rgba(239,68,68,0.15); }

                .veh-empty {
                    text-align: center; padding: 40px;
                    color: #8896aa; font-size: 0.9rem;
                }

                @media (max-width: 640px) {
                    .veh-root { padding: 20px 16px; }
                    .veh-form { grid-template-columns: 1fr; }
                }
            `}),e.jsx("div",{className:"veh-root",children:e.jsxs("div",{className:"veh-con",children:[e.jsxs("div",{className:"veh-card",children:[e.jsx("div",{className:"veh-card-title",children:"➕ Add New Vehicle"}),e.jsx("form",{onSubmit:c,children:e.jsxs("div",{className:"veh-form",children:[[{label:"Make",key:"make",placeholder:"Honda, Toyota..."},{label:"Model",key:"model",placeholder:"Civic, Corolla..."},{label:"Year",key:"year",placeholder:"2024"},{label:"Plate No",key:"plate_no",placeholder:"ABC-123"},{label:"Color",key:"color",placeholder:"White, Black..."}].map(a=>e.jsxs("div",{className:"veh-field",children:[e.jsx("label",{className:"veh-label",children:a.label}),e.jsx("input",{type:a.key==="year"?"number":"text",value:s[a.key],onChange:r=>l(a.key,r.target.value),className:"veh-input",placeholder:a.placeholder}),i[a.key]&&e.jsx("span",{className:"veh-error",children:i[a.key]})]},a.key)),e.jsx("div",{className:"veh-field",style:{justifyContent:"flex-end"},children:e.jsx("button",{type:"submit",disabled:t,className:"veh-btn",children:t?"Adding...":"+ Add Vehicle"})})]})})]}),e.jsxs("div",{className:"veh-card",children:[e.jsxs("div",{className:"veh-card-title",children:["🚗 My Cars (",o.length,")"]}),o.length===0?e.jsx("div",{className:"veh-empty",children:"No vehicles added yet — add your first car above! 🚗"}):e.jsx("div",{className:"veh-grid",children:o.map(a=>e.jsxs("div",{className:"veh-item",children:[e.jsx("div",{className:"veh-item-icon",children:"🚙"}),e.jsxs("div",{style:{flex:1},children:[e.jsxs("div",{className:"veh-item-name",children:[a.year," ",a.make," ",a.model]}),e.jsx("div",{className:"veh-item-plate",children:a.plate_no}),a.color&&e.jsxs("div",{className:"veh-item-color",children:["🎨 ",a.color]})]}),e.jsx("button",{className:"veh-delete",onClick:()=>p(a.id),children:"🗑 Delete"})]},a.id))})]})]})})]})}export{y as default};
