import{a as e,n as t}from"./chunk-DnJy8xQt.js";import{a as n}from"./iframe-BQTwm-GU.js";import{t as r}from"./jsx-runtime-DxP0NviS.js";import{L as i,V as a,d as o,lt as s,m as c,t as l,u}from"./index.es-B1uMxi5A.js";import{t as d}from"./Typography-DXUEOnBH.js";import{t as f}from"./Typography-Dujv08q4.js";function p(e){return e.filter(Boolean).join(` `)}function m(e,t={}){return t[e]??e}function h(e,t=`regular`){let n={"aria-hidden":!0,className:`shrink-0`,size:18,weight:t};switch(e){case`cart`:return(0,y.jsx)(c,{...n});case`home`:return(0,y.jsx)(i,{...n});case`plp`:case`squares`:return(0,y.jsx)(o,{...n});case`tag`:return(0,y.jsx)(u,{...n});default:return(0,y.jsx)(a,{...n})}}function g({label:e=`Theme Settings`,icon:t=`gear`,pressed:n=!1,state:r=`default`,className:i,onClick:a}){let o=m(r,{Default:`default`,Hover:`hover`,Focused:`focused`,Disabled:`disabled`}),s=o===`disabled`;return(0,y.jsxs)(`button`,{type:`button`,disabled:s,"aria-current":n?`page`:void 0,className:p([`inline-flex cursor-pointer items-center justify-center gap-1 rounded-6 border-0 bg-neutral-00 px-2 py-1 font-sans text-neutral-700 transition-[background-color,color,box-shadow] duration-[160ms] enabled:hover:bg-neutral-50 focus-visible:outline-none focus-visible:shadow-focus-brand disabled:cursor-not-allowed disabled:bg-neutral-50 disabled:text-neutral-300`,o===`hover`&&`bg-neutral-50`,o===`focused`&&`bg-neutral-00 shadow-focus-brand`,n&&`bg-primary-400 text-neutral-00 enabled:hover:bg-primary-400 focus-visible:bg-primary-400`,n&&s&&`bg-primary-100 text-neutral-00`,i]),onClick:s?void 0:a,children:[h(t,n?`fill`:`regular`),(0,y.jsx)(d,{as:`span`,variant:`text-sm`,weight:n?`semibold`:`medium`,color:`currentColor`,className:`overflow-hidden text-center text-ellipsis whitespace-nowrap`,children:e})]})}function _({items:e=b,activeIndex:t=1,className:n,onItemChange:r}){let[i,a]=(0,v.useState)(t),o=(e,t)=>{a(t),r?.(e,t)};return(0,y.jsx)(`nav`,{"aria-label":`Top navigation`,className:p([`box-border inline-flex items-center gap-1 overflow-hidden rounded-6 border border-solid border-neutral-100 bg-neutral-00 px-2 py-3`,n]),children:e.map((e,t)=>{let n=typeof e==`string`?{label:e}:e,r=t===i;return(0,y.jsxs)(`div`,{className:`inline-flex shrink-0 items-center gap-1`,children:[t>0&&(0,y.jsx)(s,{"aria-hidden":`true`,className:`shrink-0 text-neutral-700`,size:20,weight:`regular`}),(0,y.jsx)(g,{icon:n.icon??`gear`,label:n.label,pressed:r,state:n.disabled?`disabled`:n.state??`default`,onClick:()=>o(n,t)})]},`${n.label}-${t}`)})})}var v,y,b,x=t((()=>{v=e(n(),1),l(),f(),y=r(),b=[{label:`Theme Settings`,icon:`gear`},{label:`Home`,icon:`home`},{label:`PLP`,icon:`plp`},{label:`PDP`,icon:`tag`},{label:`Cart`,icon:`cart`}],g.__docgenInfo={description:``,methods:[],displayName:`TopNavigationItem`,props:{className:{required:!1,tsType:{name:`string`},description:``},icon:{required:!1,tsType:{name:`union`,raw:`'cart' | 'gear' | 'home' | 'plp' | 'squares' | 'tag'`,elements:[{name:`literal`,value:`'cart'`},{name:`literal`,value:`'gear'`},{name:`literal`,value:`'home'`},{name:`literal`,value:`'plp'`},{name:`literal`,value:`'squares'`},{name:`literal`,value:`'tag'`}]},description:``,defaultValue:{value:`'gear'`,computed:!1}},label:{required:!1,tsType:{name:`string`},description:``,defaultValue:{value:`'Theme Settings'`,computed:!1}},onClick:{required:!1,tsType:{name:`signature`,type:`function`,raw:`() => void`,signature:{arguments:[],return:{name:`void`}}},description:``},pressed:{required:!1,tsType:{name:`boolean`},description:``,defaultValue:{value:`false`,computed:!1}},state:{required:!1,tsType:{name:`union`,raw:`| 'default'
| 'hover'
| 'focused'
| 'disabled'
| 'Default'
| 'Hover'
| 'Focused'
| 'Disabled'`,elements:[{name:`literal`,value:`'default'`},{name:`literal`,value:`'hover'`},{name:`literal`,value:`'focused'`},{name:`literal`,value:`'disabled'`},{name:`literal`,value:`'Default'`},{name:`literal`,value:`'Hover'`},{name:`literal`,value:`'Focused'`},{name:`literal`,value:`'Disabled'`}]},description:``,defaultValue:{value:`'default'`,computed:!1}}}},_.__docgenInfo={description:``,methods:[],displayName:`TopNavigation`,props:{activeIndex:{required:!1,tsType:{name:`number`},description:``,defaultValue:{value:`1`,computed:!1}},className:{required:!1,tsType:{name:`string`},description:``},items:{required:!1,tsType:{name:`Array`,elements:[{name:`union`,raw:`string | TopNavigationItemConfig`,elements:[{name:`string`},{name:`signature`,type:`object`,raw:`{
  label: string;
  icon?: TopNavigationIconName;
  disabled?: boolean;
  state?: TopNavigationItemState;
}`,signature:{properties:[{key:`label`,value:{name:`string`,required:!0}},{key:`icon`,value:{name:`union`,raw:`'cart' | 'gear' | 'home' | 'plp' | 'squares' | 'tag'`,elements:[{name:`literal`,value:`'cart'`},{name:`literal`,value:`'gear'`},{name:`literal`,value:`'home'`},{name:`literal`,value:`'plp'`},{name:`literal`,value:`'squares'`},{name:`literal`,value:`'tag'`}],required:!1}},{key:`disabled`,value:{name:`boolean`,required:!1}},{key:`state`,value:{name:`union`,raw:`| 'default'
| 'hover'
| 'focused'
| 'disabled'
| 'Default'
| 'Hover'
| 'Focused'
| 'Disabled'`,elements:[{name:`literal`,value:`'default'`},{name:`literal`,value:`'hover'`},{name:`literal`,value:`'focused'`},{name:`literal`,value:`'disabled'`},{name:`literal`,value:`'Default'`},{name:`literal`,value:`'Hover'`},{name:`literal`,value:`'Focused'`},{name:`literal`,value:`'Disabled'`}],required:!1}}]}}]}],raw:`Array<string | TopNavigationItemConfig>`},description:``,defaultValue:{value:`[
  { label: 'Theme Settings', icon: 'gear' },
  { label: 'Home', icon: 'home' },
  { label: 'PLP', icon: 'plp' },
  { label: 'PDP', icon: 'tag' },
  { label: 'Cart', icon: 'cart' },
]`,computed:!1}},onItemChange:{required:!1,tsType:{name:`signature`,type:`function`,raw:`(item: TopNavigationItemConfig, index: number) => void`,signature:{arguments:[{type:{name:`signature`,type:`object`,raw:`{
  label: string;
  icon?: TopNavigationIconName;
  disabled?: boolean;
  state?: TopNavigationItemState;
}`,signature:{properties:[{key:`label`,value:{name:`string`,required:!0}},{key:`icon`,value:{name:`union`,raw:`'cart' | 'gear' | 'home' | 'plp' | 'squares' | 'tag'`,elements:[{name:`literal`,value:`'cart'`},{name:`literal`,value:`'gear'`},{name:`literal`,value:`'home'`},{name:`literal`,value:`'plp'`},{name:`literal`,value:`'squares'`},{name:`literal`,value:`'tag'`}],required:!1}},{key:`disabled`,value:{name:`boolean`,required:!1}},{key:`state`,value:{name:`union`,raw:`| 'default'
| 'hover'
| 'focused'
| 'disabled'
| 'Default'
| 'Hover'
| 'Focused'
| 'Disabled'`,elements:[{name:`literal`,value:`'default'`},{name:`literal`,value:`'hover'`},{name:`literal`,value:`'focused'`},{name:`literal`,value:`'disabled'`},{name:`literal`,value:`'Default'`},{name:`literal`,value:`'Hover'`},{name:`literal`,value:`'Focused'`},{name:`literal`,value:`'Disabled'`}],required:!1}}]}},name:`item`},{type:{name:`number`},name:`index`}],return:{name:`void`}}},description:``}}}}));export{g as n,x as r,_ as t};