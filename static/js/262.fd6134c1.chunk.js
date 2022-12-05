"use strict";(self.webpackChunkreact_developer_way_blogging=self.webpackChunkreact_developer_way_blogging||[]).push([[262,333],{5486:function(n,e,i){i.d(e,{Z:function(){return f}});var r,t,o,a,s=i(1413),l=i(5987),d=i(168),c=(i(2791),i(6031)),p=i(3504),u=i(184),h=c.ZP.div(r||(r=(0,d.Z)(["\n  width: ",";\n  height: ",";\n  border: "," solid white;\n  border-top: "," solid transparent;\n  border-bottom: "," solid transparent;\n  border-radius: 100rem;\n  display: inline-block;\n  animation: spinner 1s infinite linear;\n  @keyframes spinner {\n    100% {\n      transform: rotate(360deg);\n    }\n  }\n"])),(function(n){return n.size}),(function(n){return n.size}),(function(n){return n.borderSize}),(function(n){return n.borderSize}),(function(n){return n.borderSize})),m=function(n){var e=n.size,i=void 0===e?"40px":e,r=n.borderSize,t=void 0===r?"5px":r;return(0,u.jsx)(h,{size:i,borderSize:t})},x=["type","onClick","children","kind"],g=c.ZP.button(t||(t=(0,d.Z)(["\n  cursor: pointer;\n  padding: 0 25px;\n  line-height: 1;\n  border-radius: 8px;\n  font-weight: 600;\n  font-size: 18px;\n  height: ",";\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  ",";\n  ",";\n  &:disabled {\n    opacity: 0.5;\n    pointer-events: none;\n  }\n"])),(function(n){return n.height||"66px"}),(function(n){return"secondary"===n.kind&&(0,c.iv)(o||(o=(0,d.Z)(["\n      color: ",";\n      background-color: white;\n    "])),(function(n){return n.theme.primary}))}),(function(n){return"primary"===n.kind&&(0,c.iv)(a||(a=(0,d.Z)(["\n      color: white;\n      background-image: linear-gradient(\n        to right bottom,\n        ",",\n        ","\n      );\n    "])),(function(n){return n.theme.primary}),(function(n){return n.theme.secondary}))})),f=function(n){var e=n.type,i=void 0===e?"button":e,r=n.onClick,t=void 0===r?function(){}:r,o=n.children,a=n.kind,d=void 0===a?"primary":a,c=(0,l.Z)(n,x),h=c.isLoading,f=c.to,v=h?(0,u.jsx)(m,{}):o;return""!==f&&"string"===typeof f?(0,u.jsx)(p.OL,{to:f,style:{display:"inline-block"},children:(0,u.jsx)(g,(0,s.Z)((0,s.Z)({type:i,kind:d},c),{},{children:v}))}):(0,u.jsx)(g,(0,s.Z)((0,s.Z)({type:i,kind:d,onClick:t},c),{},{children:v}))}},102:function(n,e,i){i.d(e,{z:function(){return r.Z}});var r=i(5486)},262:function(n,e,i){i.r(e),i.d(e,{default:function(){return k}});var r,t,o,a=i(168),s=(i(2791),i(6871)),l=i(6031),d=i(1665),c=i(8080),p=i(3504),u=i(102),h=i(184),m=l.ZP.div(r||(r=(0,a.Z)(["\n  background-color: white;\n  padding: 20px;\n  border-bottom: 1px solid #eee;\n  display: flex;\n  justify-content: space-between;\n  gap: 20px;\n  .logo {\n    display: flex;\n    align-items: center;\n    gap: 20px;\n    font-size: 18px;\n    font-weight: 600;\n    img {\n      max-width: 40px;\n    }\n  }\n  .header-avatar {\n    width: 52px;\n    height: 52px;\n    img {\n      width: 100%;\n      height: 100%;\n      object-fit: cover;\n      border-radius: 100rem;\n    }\n  }\n  .header-right {\n    display: flex;\n    align-items: center;\n    gap: 20px;\n  }\n"]))),x=function(){var n=(0,d.a)().userInfo,e=(0,s.s0)();return(0,h.jsxs)(m,{children:[(0,h.jsxs)(p.OL,{to:"/",className:"logo",children:[(0,h.jsx)("img",{srcSet:"/coding.png 2x",alt:"monkey-blogging",className:"logo"}),(0,h.jsx)("span",{className:"hidden lg:inline-block",children:"Developer way"})]}),(0,h.jsxs)("div",{className:"header-right",children:[(0,h.jsx)(u.z,{to:"/manage/add-post",className:"header-button",height:"52px",children:"Write new post"}),(0,h.jsx)("button",{className:"header-avatar",onClick:function(){return e("/profile",{state:{email:null===n||void 0===n?void 0:n.email}})},children:(0,h.jsx)("img",{src:null===n||void 0===n?void 0:n.avatar,alt:""})})]})]})},g=i(289),f=i(1453),v=l.ZP.div(t||(t=(0,a.Z)(["\n  width: 300px;\n  background: #ffffff;\n  box-shadow: 10px 10px 20px rgba(218, 213, 213, 0.15);\n  border-radius: 12px;\n  .sidebar-logo {\n    display: flex;\n    align-items: center;\n    font-weight: 600;\n    gap: 0 20px;\n    img {\n      max-width: 40px;\n    }\n    margin-bottom: 20px;\n    padding: 20px 20px 0;\n  }\n  .menu-item {\n    display: flex;\n    align-items: center;\n    gap: 20px;\n    padding: 14px 20px;\n    font-weight: 500;\n    color: ",";\n    margin-bottom: 20px;\n    cursor: pointer;\n    &.active,\n    &:hover {\n      background: #f1fbf7;\n      color: "," !important;\n    }\n  }\n  @media screen and (max-width: 768px) {\n    width: 100px;\n\n    .menu-text {\n      display: none;\n    }\n  }\n"])),(function(n){return n.theme.gray80}),(function(n){return n.theme.primary})),b=[{title:"Dashboard",url:"/dashboard",icon:(0,h.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",className:"w-6 h-6",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:"2",children:(0,h.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"})})},{title:"Post",url:"/manage/post",icon:(0,h.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",className:"w-6 h-6",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:"2",children:(0,h.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"})})},{title:"Category",url:"/manage/category",icon:(0,h.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",className:"w-6 h-6",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:"2",children:(0,h.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"})})},{title:"User",url:"/manage/user",icon:(0,h.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",className:"w-6 h-6",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:"2",children:(0,h.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"})})},{title:"Logout",url:"/",icon:(0,h.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",className:"w-6 h-6",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:"2",children:(0,h.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"})}),onClick:function(){return(0,g.w7)(f.I)}}],w=function(){return(0,h.jsx)(v,{className:"sidebar",children:b.map((function(n){return n.onClick?(0,h.jsxs)(p.OL,{to:n.url,className:"menu-item",onClick:n.onClick,children:[(0,h.jsx)("span",{className:"menu-icon",children:n.icon}),(0,h.jsx)("span",{className:"menu-text",children:n.title})]},n.title):(0,h.jsxs)(p.OL,{to:n.url,className:"menu-item",children:[(0,h.jsx)("span",{className:"menu-icon",children:n.icon}),(0,h.jsx)("span",{className:"menu-text",children:n.title})]},n.title)}))})},j=l.ZP.div(o||(o=(0,a.Z)(["\n  max-width: 1600px;\n  margin: 0 auto;\n  .dashboard {\n    &-main {\n      display: grid;\n      grid-template-columns: 300px minmax(0, 1fr);\n      padding: 40px 20px;\n      gap: 0 40px;\n      align-items: start;\n    }\n  }\n  @media screen and (max-width: 768px) {\n    .dashboard {\n      &-main {\n        display: grid;\n        grid-template-columns: 100px minmax(0, 1fr);\n        padding: 20px 10px;\n        gap: 0 20px;\n        align-items: start;\n      }\n    }\n  }\n"]))),k=function(n){n.children;return(0,d.a)().userInfo?(0,h.jsxs)(j,{children:[(0,h.jsx)(x,{}),(0,h.jsxs)("div",{className:"dashboard-main",children:[(0,h.jsx)(w,{}),(0,h.jsx)("div",{className:"dashboard-children",children:(0,h.jsx)(s.j3,{})})]})]}):(0,h.jsx)(c.default,{})}},8080:function(n,e,i){i.r(e);var r,t=i(168),o=(i(2791),i(3504)),a=i(6031),s=i(184),l=a.ZP.div(r||(r=(0,t.Z)(["\n  height: 100vh;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex-direction: column;\n  .logo {\n    display: inline-block;\n    margin-bottom: 40px;\n    width: 150px;\n  }\n  .heading {\n    font-weight: bold;\n    font-size: 40px;\n    margin-bottom: 20px;\n  }\n  .back {\n    display: inline-block;\n    padding: 15px 30px;\n    border-radius: 8px;\n    color: #fff;\n    background-color: ",";\n    font-weight: 500;\n  }\n"])),(function(n){return n.theme.primary}));e.default=function(){return(0,s.jsxs)(l,{children:[(0,s.jsx)(o.OL,{to:"/",children:(0,s.jsx)("img",{srcSet:"/logo.png ",alt:"Developerway-blogging",className:"logo"})}),(0,s.jsx)("h1",{className:"heading",children:"Oops! Page bot found"}),(0,s.jsx)(o.OL,{to:"/",className:"back",children:"Back to home"})]})}},5987:function(n,e,i){i.d(e,{Z:function(){return t}});var r=i(3366);function t(n,e){if(null==n)return{};var i,t,o=(0,r.Z)(n,e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(n);for(t=0;t<a.length;t++)i=a[t],e.indexOf(i)>=0||Object.prototype.propertyIsEnumerable.call(n,i)&&(o[i]=n[i])}return o}},3366:function(n,e,i){function r(n,e){if(null==n)return{};var i,r,t={},o=Object.keys(n);for(r=0;r<o.length;r++)i=o[r],e.indexOf(i)>=0||(t[i]=n[i]);return t}i.d(e,{Z:function(){return r}})}}]);
//# sourceMappingURL=262.fd6134c1.chunk.js.map