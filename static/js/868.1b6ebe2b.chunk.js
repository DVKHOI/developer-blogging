"use strict";(self.webpackChunkreact_developer_way_blogging=self.webpackChunkreact_developer_way_blogging||[]).push([[868],{5486:function(n,e,r){r.d(e,{Z:function(){return m}});var t,o,i,a,l=r(1413),s=r(5987),c=r(168),d=(r(2791),r(6031)),u=r(3504),p=r(184),h=d.ZP.div(t||(t=(0,c.Z)(["\n  width: ",";\n  height: ",";\n  border: "," solid white;\n  border-top: "," solid transparent;\n  border-bottom: "," solid transparent;\n  border-radius: 100rem;\n  display: inline-block;\n  animation: spinner 1s infinite linear;\n  @keyframes spinner {\n    100% {\n      transform: rotate(360deg);\n    }\n  }\n"])),(function(n){return n.size}),(function(n){return n.size}),(function(n){return n.borderSize}),(function(n){return n.borderSize}),(function(n){return n.borderSize})),f=function(n){var e=n.size,r=void 0===e?"40px":e,t=n.borderSize,o=void 0===t?"5px":t;return(0,p.jsx)(h,{size:r,borderSize:o})},g=["type","onClick","children","kind"],x=d.ZP.button(o||(o=(0,c.Z)(["\n  cursor: pointer;\n  padding: 0 25px;\n  line-height: 1;\n  border-radius: 8px;\n  font-weight: 600;\n  font-size: 18px;\n  height: ",";\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  ",";\n  ",";\n  &:disabled {\n    opacity: 0.5;\n    pointer-events: none;\n  }\n"])),(function(n){return n.height||"66px"}),(function(n){return"secondary"===n.kind&&(0,d.iv)(i||(i=(0,c.Z)(["\n      color: ",";\n      background-color: white;\n    "])),(function(n){return n.theme.primary}))}),(function(n){return"primary"===n.kind&&(0,d.iv)(a||(a=(0,c.Z)(["\n      color: white;\n      background-image: linear-gradient(\n        to right bottom,\n        ",",\n        ","\n      );\n    "])),(function(n){return n.theme.primary}),(function(n){return n.theme.secondary}))})),m=function(n){var e=n.type,r=void 0===e?"button":e,t=n.onClick,o=void 0===t?function(){}:t,i=n.children,a=n.kind,c=void 0===a?"primary":a,d=(0,s.Z)(n,g),h=d.isLoading,m=d.to,v=h?(0,p.jsx)(f,{}):i;return""!==m&&"string"===typeof m?(0,p.jsx)(u.OL,{to:m,style:{display:"inline-block"},children:(0,p.jsx)(x,(0,l.Z)((0,l.Z)({type:r,kind:c},d),{},{children:v}))}):(0,p.jsx)(x,(0,l.Z)((0,l.Z)({type:r,kind:c,onClick:o},d),{},{children:v}))}},102:function(n,e,r){r.d(e,{z:function(){return t.Z}});var t=r(5486)},8119:function(n,e,r){var t=r(1413),o=r(5987),i=(r(2791),r(1134)),a=r(184),l=["checked","children","control","name"];e.Z=function(n){var e=n.checked,r=n.children,s=n.control,c=n.name,d=(0,o.Z)(n,l),u=(0,i.bc)({control:s,name:c,defaultValue:""}).field;return(0,a.jsxs)("label",{children:[(0,a.jsx)("input",(0,t.Z)((0,t.Z)({checked:e,type:"radio",className:"hidden-input"},u),d)),(0,a.jsxs)("div",{className:"flex items-center font-medium cursor-pointer gap-x-3",children:[(0,a.jsx)("div",{className:"w-7 h-7 rounded-full border flex items-center justify-center p-1  ".concat(e?"bg-green-600 border-primary text-white":"border-gray-200 text-transparent"),children:(0,a.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",className:"w-6 h-6",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:"2",children:(0,a.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M5 13l4 4L19 7"})})}),(0,a.jsx)("span",{children:r})]})]})}},9254:function(n,e,r){r.d(e,{Y:function(){return t.Z}});r(2791),r(184);var t=r(8119)},9501:function(n,e,r){r.d(e,{L:function(){return p}});var t=r(1413),o=r(5987),i=r(2791),a=r(885),l=r(184),s=(0,i.createContext)();function c(n){var e=(0,i.useState)(!1),r=(0,a.Z)(e,2),t=r[0],o=r[1],c={show:t,setShow:o,toggle:function(){o(!t)}};return(0,l.jsx)(s.Provider,{value:c,children:n.children})}function d(){var n=(0,i.useContext)(s);if("undefined"===typeof n)throw new Error("useDropdown must be used within DropdownProvider");return n}var u=["children"],p=function(n){var e=n.children,r=(0,o.Z)(n,u);return(0,l.jsx)(c,(0,t.Z)((0,t.Z)({},r),{},{children:(0,l.jsx)("div",{className:"relative inline-block w-full select-none",children:e})}))},h=function(n){var e=n.onClick,r=d().setShow;return(0,l.jsx)("div",{className:"z-10 flex items-center justify-between px-5 py-3 cursor-pointer hover:bg-gray-100",onClick:function(){e&&e(),r(!1)},children:n.children})},f=["placeholder"],g=function(n){var e=n.placeholder,r=(0,o.Z)(n,f),i=d().onChange;return(0,l.jsx)("div",{className:"p-2",children:(0,l.jsx)("input",(0,t.Z)({type:"text",placeholder:e,className:"p-4 outline-none w-full border border-gray-200 rounded",onChange:i},r))})},x=function(n){var e=n.placeholder,r=d(),t=r.show,o=r.toggle;return(0,l.jsxs)("div",{className:"flex items-center justify-between p-3 bg-[#E7ECF3] rounded cursor-pointer font-medium z-10",onClick:o,children:[(0,l.jsx)("span",{children:e}),(0,l.jsx)("span",{children:t?(0,l.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",className:"w-6 h-6",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:"2",children:(0,l.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M5 15l7-7 7 7"})}):(0,l.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",className:"w-6 h-6",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:"2",children:(0,l.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M19 9l-7 7-7-7"})})})]})},m=function(n){var e=n.children,r=d().show;return(0,l.jsx)(l.Fragment,{children:r&&(0,l.jsx)("div",{className:"absolute left-0 w-full bg-white shadow-sm top-full",children:e})})};p.Option=h,p.Search=g,p.Select=x,p.List=m},6356:function(n,e,r){var t,o=r(168),i=(r(2791),r(6031)),a=r(184),l=i.ZP.div(t||(t=(0,o.Z)(["\n  display: flex;\n  flex-direction: column;\n  align-items: flex-start;\n  row-gap: 20px;\n  margin-bottom: 40px;\n  z-index: 10;\n  &:last-child {\n    margin-bottom: 0;\n  }\n"])));e.Z=function(n){var e=n.children;return(0,a.jsx)(l,{children:e})}},3894:function(n,e,r){r(2791);var t=r(184);e.Z=function(n){var e=n.children;return(0,t.jsx)("div",{className:"flex flex-wrap justify-between gap-3",children:e})}},5639:function(n,e,r){r.d(e,{g:function(){return t.Z}});var t=r(6356);r(3894)},9248:function(n,e,r){var t,o=r(1413),i=r(5987),a=r(168),l=(r(2791),r(1134)),s=r(6031),c=r(184),d=["name","type","children","control"],u=s.ZP.div(t||(t=(0,a.Z)(["\n  position: relative;\n  width: 100%;\n  input {\n    padding: ",";\n    outline: none;\n    background-color: ",";\n    border-radius: 8px;\n    width: 100%;\n    font-weight: 500;\n    border: 1px solid transparent;\n    transition: all 0.2s linear;\n  }\n  input::-webkit-input-placeholder {\n    color: #84878b;\n  }\n  input::-moz-input-placeholder {\n    color: #84878b;\n  }\n  input:focus {\n    background-color: white;\n    border-color: ",";\n  }\n  .input-icon {\n    position: absolute;\n    right: 20px;\n    top: 50%;\n    transform: translateY(-50%);\n    cursor: pointer;\n  }\n"])),(function(n){return n.hasIcon?"16px 60px 16px 20px":"16px 20px"}),(function(n){return n.theme.grayLight}),(function(n){return n.theme.primary}));e.Z=function(n){var e=n.name,r=void 0===e?"":e,t=n.type,a=void 0===t?"text":t,s=n.children,p=n.control,h=(0,i.Z)(n,d),f=(0,l.bc)({name:r,control:p,defaultValue:""}).field;return(0,c.jsxs)(u,{hasIcon:!!s,children:[(0,c.jsx)("input",(0,o.Z)((0,o.Z)({id:r,type:a},f),h)),s?(0,c.jsx)("div",{className:"input-icon",children:s}):null]})}},3117:function(n,e,r){r.d(e,{I:function(){return t.Z}});var t=r(9248)},3453:function(n,e,r){var t,o=r(1413),i=r(168),a=(r(2791),r(6031)),l=r(184),s=a.ZP.label(t||(t=(0,i.Z)(["\n  color: ",";\n  font-weight: 600;\n  line-height: 30px;\n  cursor: pointer;\n"])),(function(n){return n.theme.grayDark}));e.Z=function(n){var e=n.htmlFor,r=void 0===e?"":e,t=n.children,i=n.props;return(0,l.jsx)(s,(0,o.Z)((0,o.Z)({htmlFor:r},i),{},{children:t}))}},2753:function(n,e,r){var t,o=r(168),i=(r(2791),r(6031)),a=r(184),l=i.ZP.span(t||(t=(0,o.Z)(["\n  display: inline-block;\n  padding: 10px 15px;\n  border-radius: 8px;\n  font-size: 14px;\n  font-weight: 500;\n"])));e.Z=function(n){var e=n.children,r=n.type,t="text-gray-500 bg-gray-100";switch(void 0===r?"default":r){case"success":t="text-green-500 bg-green-100";break;case"warning":t="text-orange-500 bg-orange-100";break;case"danger":t="text-red-500 bg-red-100"}return(0,a.jsx)(l,{className:t,children:e})}},4954:function(n,e,r){r.d(e,{O:function(){return o.Z},_:function(){return t.Z}});var t=r(3453),o=r(2753)},7531:function(n,e,r){var t,o=r(1413),i=r(5987),a=r(168),l=(r(2791),r(1134)),s=r(6031),c=r(184),d=["name","type","children","control"],u=s.ZP.div(t||(t=(0,a.Z)(["\n  position: relative;\n  width: 100%;\n  textarea {\n    padding: ",";\n    outline: none;\n    background-color: ",";\n    border-radius: 8px;\n    width: 100%;\n    font-weight: 500;\n    border: 1px solid transparent;\n    transition: all 0.2s linear;\n    resize: none;\n    min-height: 100px;\n  }\n  textarea::-webkit-input-placeholder {\n    color: #84878b;\n  }\n  textarea::-moz-input-placeholder {\n    color: #84878b;\n  }\n  textarea:focus {\n    background-color: white;\n    border-color: ",";\n  }\n  .input-icon {\n    position: absolute;\n    right: 20px;\n    top: 50%;\n    transform: translateY(-50%);\n    cursor: pointer;\n  }\n"])),(function(n){return n.hasIcon?"16px 60px 16px 20px":"16px 20px"}),(function(n){return n.theme.grayLight}),(function(n){return n.theme.primary}));e.Z=function(n){var e=n.name,r=void 0===e?"":e,t=n.type,a=void 0===t?"text":t,s=n.children,p=n.control,h=(0,i.Z)(n,d),f=(0,l.bc)({name:r,control:p,defaultValue:""}).field;return(0,c.jsxs)(u,{hasIcon:!!s,children:[(0,c.jsx)("textarea",(0,o.Z)((0,o.Z)({id:r,type:a},f),h)),s?(0,c.jsx)("div",{className:"input-icon",children:s}):null]})}},4961:function(n,e,r){var t=r(1413),o=r(5987),i=(r(2791),r(184)),a=["on","onClick"];e.Z=function(n){var e=n.on,r=n.onClick,l=(0,o.Z)(n,a);return(0,i.jsxs)("label",{children:[(0,i.jsx)("input",{type:"checkbox",checked:e,className:"hidden-input",onChange:function(){},onClick:r}),(0,i.jsx)("div",(0,t.Z)((0,t.Z)({className:"inline-block w-[70px] h-[42px] cursor-pointer relative rounded-full p-1 transition-all ".concat(e?"bg-green-500":"bg-gray-400")},l),{},{children:(0,i.jsx)("span",{className:"transition-all w-[34px] h-[34px] bg-white rounded-full inline-block ".concat(e?"translate-x-[28px]":"")})}))]})}},6843:function(n,e,r){var t=r(1413),o=r(5987),i=r(2791),a=r(184),l=["name","className","progress","image","handleDeleteImage"];e.Z=function(n){var e=n.name,r=n.className,s=void 0===r?"":r,c=n.progress,d=void 0===c?0:c,u=n.image,p=void 0===u?"":u,h=n.handleDeleteImage,f=void 0===h?function(){}:h,g=(0,o.Z)(n,l);return(0,a.jsxs)("label",{className:"cursor-pointer flex items-center justify-center border border-dashed w-full min-h-[200px] rounded-lg ".concat(s," relative overflow-hidden group"),children:[(0,a.jsx)("input",(0,t.Z)({type:"file",name:e,className:"hidden-input",onChange:function(){}},g)),0!==d&&!p&&(0,a.jsx)("div",{className:"absolute z-10 w-16 h-16 border-8 border-green-500 rounded-full loading border-t-transparent animate-spin"}),!p&&0===d&&(0,a.jsxs)("div",{className:"flex flex-col items-center text-center pointer-events-none",children:[(0,a.jsx)("img",{src:"/img-upload.png",alt:"upload-img",className:"max-w-[80px] mb-5"}),(0,a.jsx)("p",{className:"font-semibold",children:"Choose photo"})]}),p&&(0,a.jsxs)(i.Fragment,{children:[(0,a.jsx)("img",{src:p,className:"object-cover w-full h-full",alt:""}),(0,a.jsx)("button",{type:"button",className:"absolute z-10 flex items-center justify-center invisible w-16 h-16 text-red-500 transition-all bg-white rounded-full opacity-0 cursor-pointer group-hover:opacity-100 group-hover:visible",onClick:f,children:(0,a.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",className:"w-6 h-6",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:"2",children:(0,a.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"})})})]}),!p&&(0,a.jsx)("div",{className:"absolute bottom-0 left-0 w-10 h-1 transition-all bg-green-400 image-upload-progress",style:{width:"".concat(Math.ceil(d),"%")}})]})}},5208:function(n,e,r){var t=r(6843);e.Z=t.Z},1776:function(n,e,r){r.d(e,{Z:function(){return a}});var t=r(885),o=r(2791),i=r(4453);function a(n,e){var r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null,a=arguments.length>3&&void 0!==arguments[3]?arguments[3]:null,l=(0,i.cF)(),s=(0,o.useState)(0),c=(0,t.Z)(s,2),d=c[0],u=c[1],p=(0,o.useState)(""),h=(0,t.Z)(p,2),f=h[0],g=h[1];if(e&&n){var x=function(e){var r=e.target.files[0];m(r),r&&n("image_name",r.name)},m=function(n){var e=(0,i.iH)(l,"images/"+n.name),r=(0,i.B0)(e,n);r.on("state_changed",(function(n){var e=n.bytesTransferred/n.totalBytes*100;switch(u(e),n.state){case"paused":console.log("Upload is paused");break;case"running":console.log("Upload is running");break;default:console.log("Notthing at all")}}),(function(n){console.log("Error")}),(function(){(0,i.Jt)(r.snapshot.ref).then((function(n){console.log("File available at",n),g(n)}))}))},v=function(n){var t=(0,i.cF)(),o=(0,i.iH)(t,"images/"+(r||e("image_name")));(0,i.oq)(o).then((function(){console.log("Delete image successfully"),g(""),u(0),a&&a()})).catch((function(n){console.log("Can not delete image"),g("")}))},b=function(){g(""),u(0)};return{progress:d,image:f,setImage:g,handleSelectImage:x,handleDeleteImage:v,handleResetUpload:b}}}}}]);
//# sourceMappingURL=868.1b6ebe2b.chunk.js.map