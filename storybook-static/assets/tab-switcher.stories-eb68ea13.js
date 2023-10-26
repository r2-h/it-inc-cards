import{j as l}from"./jsx-runtime-ffb262ed.js";import{T as M}from"./typography-313b96cd.js";import{_ as b}from"./extends-98964cd2.js";import{r as c}from"./index-76fb7be0.js";import{$ as N,b as A,d as x,e as _}from"./index-e3557324.js";import{$ as V,a as j,b as L}from"./index-47a24c4a.js";import{a as P,b as z}from"./index-55cd777a.js";import"./_commonjsHelpers-de833af9.js";import"./index-d3ea75b5.js";const C="Tabs",[F,be]=N(C,[V]),R=V(),[G,I]=F(C),k=c.forwardRef((e,o)=>{const{__scopeTabs:r,value:t,onValueChange:s,defaultValue:i,orientation:a="horizontal",dir:p,activationMode:m="automatic",...v}=e,d=P(p),[n,D]=A({prop:t,onChange:s,defaultProp:i});return c.createElement(G,{scope:r,baseId:z(),value:n,onValueChange:D,orientation:a,dir:d,activationMode:m},c.createElement(x.div,b({dir:d,"data-orientation":a},v,{ref:o})))}),q="TabsList",K=c.forwardRef((e,o)=>{const{__scopeTabs:r,loop:t=!0,...s}=e,i=I(q,r),a=R(r);return c.createElement(j,b({asChild:!0},a,{orientation:i.orientation,dir:i.dir,loop:t}),c.createElement(x.div,b({role:"tablist","aria-orientation":i.orientation},s,{ref:o})))}),B="TabsTrigger",O=c.forwardRef((e,o)=>{const{__scopeTabs:r,value:t,disabled:s=!1,...i}=e,a=I(B,r),p=R(r),m=H(a.baseId,t),v=J(a.baseId,t),d=t===a.value;return c.createElement(L,b({asChild:!0},p,{focusable:!s,active:d}),c.createElement(x.button,b({type:"button",role:"tab","aria-selected":d,"aria-controls":v,"data-state":d?"active":"inactive","data-disabled":s?"":void 0,disabled:s,id:m},i,{ref:o,onMouseDown:_(e.onMouseDown,n=>{!s&&n.button===0&&n.ctrlKey===!1?a.onValueChange(t):n.preventDefault()}),onKeyDown:_(e.onKeyDown,n=>{[" ","Enter"].includes(n.key)&&a.onValueChange(t)}),onFocus:_(e.onFocus,()=>{const n=a.activationMode!=="manual";!d&&!s&&n&&a.onValueChange(t)})})))});function H(e,o){return`${e}-trigger-${o}`}function J(e,o){return`${e}-content-${o}`}const Q=k,U=K,W=O,X="_tabsRoot_6zd31_1",Y="_tabsList_6zd31_1",Z="_tabsTrigger_6zd31_1",ee="_title_6zd31_12",f={tabsRoot:X,tabsList:Y,tabsTrigger:Z,title:ee},g=({defaultValue:e="tab1",disabled:o,tabs:r})=>l.jsx(Q,{className:f.tabsRoot,defaultValue:e,children:l.jsx(U,{className:f.tabsList,children:r.map(t=>l.jsx(W,{className:f.tabsTrigger,disabled:o,value:t.value,children:l.jsx(M,{className:f.title,variant:"body1",children:t.title})},t.value))})});try{g.displayName="Tab",g.__docgenInfo={description:"",displayName:"Tab",props:{defaultValue:{defaultValue:{value:"tab1"},description:"",name:"defaultValue",required:!1,type:{name:"string"}},disabled:{defaultValue:null,description:"",name:"disabled",required:!1,type:{name:"boolean"}},tabs:{defaultValue:null,description:"",name:"tabs",required:!0,type:{name:"TabsType[]"}}}}}catch{}const le={component:g,tags:["autodocs"],title:"Components/Tab"},u={args:{tabs:[{title:"Switcher",value:"a"},{title:"Switcher",value:"c"},{title:"Switcher",value:"v"}]}},$={args:{disabled:!0,tabs:[{title:"Switcher",value:"a"},{title:"Switcher",value:"c"},{title:"Switcher",value:"v"}]}};var T,h,S;u.parameters={...u.parameters,docs:{...(T=u.parameters)==null?void 0:T.docs,source:{originalSource:`{
  args: {
    tabs: [{
      title: 'Switcher',
      value: 'a'
    }, {
      title: 'Switcher',
      value: 'c'
    }, {
      title: 'Switcher',
      value: 'v'
    }]
  }
}`,...(S=(h=u.parameters)==null?void 0:h.docs)==null?void 0:S.source}}};var w,y,E;$.parameters={...$.parameters,docs:{...(w=$.parameters)==null?void 0:w.docs,source:{originalSource:`{
  args: {
    disabled: true,
    tabs: [{
      title: 'Switcher',
      value: 'a'
    }, {
      title: 'Switcher',
      value: 'c'
    }, {
      title: 'Switcher',
      value: 'v'
    }]
  }
}`,...(E=(y=$.parameters)==null?void 0:y.docs)==null?void 0:E.source}}};const fe=["Default","Disabled"];export{u as Default,$ as Disabled,fe as __namedExportsOrder,le as default};
//# sourceMappingURL=tab-switcher.stories-eb68ea13.js.map
