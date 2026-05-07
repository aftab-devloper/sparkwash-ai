import{j as e}from"./app-DpZcsFn3.js";import{d,L as l,u as x}from"./inertia-vendor-BUuu6l78.js";import{e as g}from"./transition-D2F97HgT.js";const u=d.createContext({open:!1,setOpen:()=>{},toggleOpen:()=>{}}),o=({children:a})=>{const[r,t]=d.useState(!1),n=()=>{t(s=>!s)};return e.jsx(u.Provider,{value:{open:r,setOpen:t,toggleOpen:n},children:e.jsx("div",{className:"relative",children:a})})},f=({children:a})=>{const{open:r,setOpen:t,toggleOpen:n}=d.useContext(u);return e.jsxs(e.Fragment,{children:[e.jsx("div",{onClick:n,children:a}),r&&e.jsx("div",{className:"fixed inset-0 z-40",onClick:()=>t(!1)})]})},b=({align:a="right",width:r="48",contentClasses:t="py-1 bg-gray-900",children:n})=>{const{open:s,setOpen:h}=d.useContext(u);let p="origin-top";a==="left"?p="ltr:origin-top-left rtl:origin-top-right start-0":a==="right"&&(p="ltr:origin-top-right rtl:origin-top-left end-0");let c="";return r==="48"&&(c="w-48"),e.jsx(e.Fragment,{children:e.jsx(g,{show:s,enter:"transition ease-out duration-200",enterFrom:"opacity-0 scale-95",enterTo:"opacity-100 scale-100",leave:"transition ease-in duration-75",leaveFrom:"opacity-100 scale-100",leaveTo:"opacity-0 scale-95",children:e.jsx("div",{className:`absolute z-50 mt-2 rounded-md shadow-lg ${p} ${c}`,onClick:()=>h(!1),children:e.jsx("div",{className:"rounded-md ring-1 ring-white ring-opacity-10 "+t,children:n})})})})},m=({className:a="",children:r,...t})=>e.jsx(l,{...t,className:"block w-full px-4 py-2 text-start text-sm leading-5 text-gray-200 transition duration-150 ease-in-out hover:bg-gray-700 focus:bg-gray-700 focus:outline-none "+a,children:r});o.Trigger=f;o.Content=b;o.Link=m;function j({header:a,children:r}){const t=x().props.auth.user,[n,s]=d.useState(!1),[h,p]=d.useState(typeof window<"u"&&document.documentElement.getAttribute("data-theme")||"dark"),c=[{label:"🏠 Dashboard",href:route("dashboard"),active:route().current("dashboard")},{label:"✨ Services",href:route("services.index"),active:route().current("services.index")},{label:"🚗 Vehicles",href:route("vehicles.index"),active:route().current("vehicles.index")},{label:"📋 Bookings",href:route("bookings.index"),active:route().current("bookings.index")},{label:"🤖 AI Booking",href:route("ai.chat"),active:route().current("ai.chat")}];return e.jsxs("div",{style:{minHeight:"100vh",background:"#04070f",fontFamily:"'Outfit', sans-serif"},children:[e.jsx("style",{children:`
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
            `}),e.jsx("nav",{className:"auth-nav",children:e.jsxs("div",{className:"auth-nav-inner",children:[e.jsx(l,{href:"/",className:"auth-logo",children:"🚗 SparkWash"}),e.jsx("div",{className:"auth-nav-links",children:c.map(i=>e.jsx(l,{href:i.href,className:`auth-nav-link ${i.active?"active":""}`,children:i.label},i.label))}),e.jsx("div",{className:"auth-user-btn-wrap",style:{display:"flex",alignItems:"center"},children:e.jsxs(o,{children:[e.jsx(o.Trigger,{children:e.jsxs("button",{className:"auth-user-btn",type:"button",children:[e.jsx("div",{className:"auth-avatar",children:t.name.charAt(0).toUpperCase()}),t.name,e.jsx("svg",{width:"12",height:"12",viewBox:"0 0 20 20",fill:"#8896aa",children:e.jsx("path",{fillRule:"evenodd",d:"M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z",clipRule:"evenodd"})})]})}),e.jsxs(o.Content,{children:[e.jsxs(o.Link,{href:route("profile.edit"),children:[e.jsx("span",{style:{color:"#38bdf8"},children:"👤"})," Profile"]}),e.jsxs(o.Link,{href:route("dashboard"),children:[e.jsx("span",{style:{color:"#38bdf8"},children:"🏠"})," Dashboard"]}),e.jsxs(o.Link,{href:route("logout"),method:"post",as:"button",children:[e.jsx("span",{style:{color:"#38bdf8"},children:"🚪"})," Log Out"]})]})]})}),e.jsxs("button",{className:"hamburger",onClick:()=>s(!n),children:[e.jsx("span",{style:{transform:n?"rotate(45deg) translateY(7px)":"none"}}),e.jsx("span",{style:{opacity:n?0:1}}),e.jsx("span",{style:{transform:n?"rotate(-45deg) translateY(-7px)":"none"}})]})]})}),e.jsxs("div",{className:`mobile-menu${n?" open":""}`,children:[c.map(i=>e.jsx(l,{href:i.href,className:`mobile-nav-link ${i.active?"active":""}`,onClick:()=>s(!1),children:i.label},i.label)),e.jsxs("div",{style:{borderTop:"1px solid rgba(255,255,255,0.06)",marginTop:8,paddingTop:12},children:[e.jsx("div",{style:{color:"#eef4ff",fontSize:"0.9rem",fontWeight:600,padding:"4px 14px"},children:t.name}),e.jsx("div",{style:{color:"#8896aa",fontSize:"0.78rem",padding:"2px 14px 10px"},children:t.email}),e.jsx(l,{href:route("profile.edit"),className:"mobile-nav-link",onClick:()=>s(!1),children:"👤 Profile"}),e.jsx(l,{href:route("logout"),method:"post",as:"button",className:"mobile-nav-link",onClick:()=>s(!1),children:"🚪 Log Out"})]})]}),a&&e.jsx("div",{className:"auth-header",children:e.jsx("div",{className:"auth-header-inner",children:a})}),e.jsx("main",{style:{background:"#04070f"},children:r})]})}export{j as A};
