import{j as u}from"./jsx-runtime-ffb262ed.js";function l(e){var a,n,t="";if(typeof e=="string"||typeof e=="number")t+=e;else if(typeof e=="object")if(Array.isArray(e))for(a=0;a<e.length;a++)e[a]&&(n=l(e[a]))&&(t&&(t+=" "),t+=n);else for(a in e)e[a]&&(t&&(t+=" "),t+=a);return t}function i(){for(var e,a,n=0,t="";n<arguments.length;)(e=arguments[n++])&&(a=l(e))&&(t&&(t+=" "),t+=a);return t}const _="_large_1rzu2_1",c="_h1_1rzu2_8",p="_h2_1rzu2_15",y="_h3_1rzu2_22",d="_body1_1rzu2_29",m="_body2_1rzu2_36",v="_subtitle1_1rzu2_43",b="_subtitle2_1rzu2_50",f="_caption_1rzu2_57",h="_overline_1rzu2_64",g="_link1_1rzu2_71",z="_link2_1rzu2_80",k={large:_,h1:c,h2:p,h3:y,body1:d,body2:m,subtitle1:v,subtitle2:b,caption:f,overline:h,link1:g,link2:z},r=e=>{const{as:a="span",className:n,variant:t="body1",...s}=e,o=i(k[t],n);return u.jsx(a,{className:o,...s})};try{r.displayName="Typography",r.__docgenInfo={description:"",displayName:"Typography",props:{as:{defaultValue:null,description:"",name:"as",required:!1,type:{name:"ElementType"}},className:{defaultValue:null,description:"",name:"className",required:!1,type:{name:"string"}},variant:{defaultValue:null,description:"",name:"variant",required:!1,type:{name:"enum",value:[{value:'"caption"'},{value:'"h1"'},{value:'"h2"'},{value:'"h3"'},{value:'"body1"'},{value:'"body2"'},{value:'"large"'},{value:'"link1"'},{value:'"link2"'},{value:'"overline"'},{value:'"subtitle1"'},{value:'"subtitle2"'}]}}}}}catch{}export{r as T,i as c};
//# sourceMappingURL=typography-313b96cd.js.map