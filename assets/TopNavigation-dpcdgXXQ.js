import{a as e,n as t}from"./chunk-DnJy8xQt.js";import{a as n}from"./iframe-CfKZaF2F.js";import{t as r}from"./jsx-runtime-DxP0NviS.js";import{L as i,V as a,d as o,lt as s,m as c,t as l,u}from"./index.es-CN4ureaI.js";import{t as d}from"./Typography-CP4itoA8.js";import{t as f}from"./Typography-BXtIOhoB.js";var p=t((()=>{}));function m(e){return e.flat().filter(Boolean).join(` `)}function h(e,t={}){return t[e]??e}function g({state:e,pressed:t,className:n}){let r=e===`disabled`;return m([`storybook-top-nav-item inline-flex items-center justify-center gap-1 rounded-6 border-0 px-2 py-1 font-sans`,`cursor-pointer transition-[background-color,color,box-shadow] duration-[160ms] ease-out focus-visible:outline-none`,t&&!r&&`text-neutral-0 hover:bg-brand-700 hover:text-neutral-0 focus-visible:bg-brand-400 focus-visible:text-neutral-0 focus-visible:shadow-none`,t&&!r&&(e===`hover`?`bg-brand-700`:`bg-brand-400`),t&&r&&`bg-brand-100 text-neutral-0`,!t&&!r&&`bg-neutral-0 text-neutral-700 hover:bg-neutral-50 focus-visible:bg-neutral-0 focus-visible:shadow-focus-brand`,!t&&r&&`cursor-not-allowed bg-neutral-50 text-neutral-300`,!t&&e===`hover`&&`bg-neutral-50`,!t&&e===`focused`&&`bg-neutral-0 shadow-focus-brand`,n])}function _(e,t=`regular`){let n={"aria-hidden":!0,className:`shrink-0`,size:18,weight:t};switch(e){case`cart`:return(0,x.jsx)(c,{...n});case`home`:return(0,x.jsx)(i,{...n});case`plp`:case`squares`:return(0,x.jsx)(o,{...n});case`tag`:return(0,x.jsx)(u,{...n});default:return(0,x.jsx)(a,{...n})}}function v({label:e=`Theme Settings`,icon:t=`gear`,pressed:n=!1,state:r=`default`,className:i,onClick:a}){let o=h(r,{Default:`default`,Hover:`hover`,Focused:`focused`,Disabled:`disabled`}),s=o===`disabled`;return(0,x.jsxs)(`button`,{type:`button`,disabled:s,"aria-current":n?`page`:void 0,className:g({state:o,pressed:n,className:i}),onClick:s?void 0:a,children:[_(t,n?`fill`:`regular`),(0,x.jsx)(d,{as:`span`,variant:`text-sm`,weight:n?`semibold`:`medium`,color:`currentColor`,className:`overflow-hidden text-center text-ellipsis whitespace-nowrap`,children:e})]})}function y({items:e=S,activeIndex:t=1,className:n,onItemChange:r}){let[i,a]=(0,b.useState)(t),o=(e,t)=>{a(t),r?.(e,t)};return(0,x.jsx)(`nav`,{"aria-label":`Top navigation`,className:m([`storybook-top-nav box-border inline-flex items-center gap-1 overflow-hidden rounded-6 border border-solid border-neutral-100 bg-neutral-0 px-2 py-3`,n]),children:e.map((e,t)=>{let n=typeof e==`string`?{label:e}:e,r=t===i;return(0,x.jsxs)(`div`,{className:`inline-flex shrink-0 items-center gap-1`,children:[t>0&&(0,x.jsx)(s,{"aria-hidden":`true`,className:`shrink-0 text-neutral-700`,size:20,weight:`regular`}),(0,x.jsx)(v,{icon:n.icon??`gear`,label:n.label,pressed:r,state:n.disabled?`disabled`:n.state??`default`,onClick:()=>o(n,t)})]},`${n.label}-${t}`)})})}var b,x,S,C=t((()=>{b=e(n(),1),l(),f(),p(),x=r(),S=[{label:`Theme Settings`,icon:`gear`},{label:`Home`,icon:`home`},{label:`PLP`,icon:`plp`},{label:`PDP`,icon:`tag`},{label:`Cart`,icon:`cart`}],v.__docgenInfo={description:``,methods:[],displayName:`TopNavigationItem`,props:{className:{required:!1,tsType:{name:`string`},description:``},icon:{required:!1,tsType:{name:`union`,raw:`'cart' | 'gear' | 'home' | 'plp' | 'squares' | 'tag'`,elements:[{name:`literal`,value:`'cart'`},{name:`literal`,value:`'gear'`},{name:`literal`,value:`'home'`},{name:`literal`,value:`'plp'`},{name:`literal`,value:`'squares'`},{name:`literal`,value:`'tag'`}]},description:``,defaultValue:{value:`'gear'`,computed:!1}},label:{required:!1,tsType:{name:`string`},description:``,defaultValue:{value:`'Theme Settings'`,computed:!1}},onClick:{required:!1,tsType:{name:`signature`,type:`function`,raw:`() => void`,signature:{arguments:[],return:{name:`void`}}},description:``},pressed:{required:!1,tsType:{name:`boolean`},description:``,defaultValue:{value:`false`,computed:!1}},state:{required:!1,tsType:{name:`union`,raw:`| 'default'
| 'hover'
| 'focused'
| 'disabled'
| 'Default'
| 'Hover'
| 'Focused'
| 'Disabled'`,elements:[{name:`literal`,value:`'default'`},{name:`literal`,value:`'hover'`},{name:`literal`,value:`'focused'`},{name:`literal`,value:`'disabled'`},{name:`literal`,value:`'Default'`},{name:`literal`,value:`'Hover'`},{name:`literal`,value:`'Focused'`},{name:`literal`,value:`'Disabled'`}]},description:``,defaultValue:{value:`'default'`,computed:!1}}}},y.__docgenInfo={description:``,methods:[],displayName:`TopNavigation`,props:{activeIndex:{required:!1,tsType:{name:`number`},description:``,defaultValue:{value:`1`,computed:!1}},className:{required:!1,tsType:{name:`string`},description:``},items:{required:!1,tsType:{name:`Array`,elements:[{name:`union`,raw:`string | TopNavigationItemConfig`,elements:[{name:`string`},{name:`signature`,type:`object`,raw:`{
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
| 'Disabled'`,elements:[{name:`literal`,value:`'default'`},{name:`literal`,value:`'hover'`},{name:`literal`,value:`'focused'`},{name:`literal`,value:`'disabled'`},{name:`literal`,value:`'Default'`},{name:`literal`,value:`'Hover'`},{name:`literal`,value:`'Focused'`},{name:`literal`,value:`'Disabled'`}],required:!1}}]}},name:`item`},{type:{name:`number`},name:`index`}],return:{name:`void`}}},description:``}}}}));export{v as n,C as r,y as t};