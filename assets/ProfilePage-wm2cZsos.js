import{r,u as d,j as e}from"./index-BeKpJH4j.js";import{a as u}from"./index-DW_MHI2K.js";const f="/assets/beautiful-EXPLfzvI.jpg",p=()=>{const[a,o]=r.useState(null),n=d();r.useEffect(()=>{(async()=>{var t;try{const s="jwmedlock@icloud.com",c=localStorage.getItem("token"),l=await u.get(`/api/users/get/${s}`,{headers:{Authorization:`Bearer ${c}`}});o(l.data)}catch(s){console.error("Error fetching data:",((t=s.response)==null?void 0:t.data)||s)}})()},[]);const i=()=>{localStorage.removeItem("token"),n("/login")};return a?e.jsxs("div",{className:"profile-page",children:[e.jsx("div",{className:"banner-background"}),e.jsxs("div",{className:"profile-container",children:[e.jsx("img",{className:"pfp",src:f,alt:"Profile"}),e.jsxs("div",{className:"profile-info-section",children:[e.jsx("h1",{children:"My Profile"}),e.jsxs("div",{className:"profile-information",children:[e.jsxs("p",{children:["Username: ",e.jsx("strong",{children:a.name})]}),e.jsxs("p",{children:["Location: ",e.jsx("strong",{children:"Athens, GA"})]})]}),e.jsx("button",{onClick:i,className:"signout-button",children:"Sign Out"})]})]})]}):e.jsx("div",{children:"Loading..."})};export{p as default};
