import{a as e,n as t}from"./chunk-DnJy8xQt.js";import{a as n}from"./iframe-CQYpxMa_.js";import{t as r}from"./jsx-runtime-DxP0NviS.js";import{L as i,V as a,d as o,lt as s,m as c,t as l,u}from"./index.es-CNLrxhXh.js";import{t as d}from"./Typography-U8lT9V-o.js";import{t as f}from"./Typography-D-456NUn.js";var p=t((()=>{}));function m(e){return e.filter(Boolean).join(` `)}function h(e,t={}){return t[e]??e}function g(e,t=`regular`){let n={"aria-hidden":!0,className:`storybook-top-nav-item__icon`,size:18,weight:t};switch(e){case`cart`:return(0,b.jsx)(c,{...n});case`home`:return(0,b.jsx)(i,{...n});case`plp`:case`squares`:return(0,b.jsx)(o,{...n});case`tag`:return(0,b.jsx)(u,{...n});default:return(0,b.jsx)(a,{...n})}}function _({label:e=`Theme Settings`,icon:t=`gear`,pressed:n=!1,state:r=`default`,className:i,onClick:a}){let o=h(r,{Default:`default`,Hover:`hover`,Focused:`focused`,Disabled:`disabled`}),s=o===`disabled`;return(0,b.jsxs)(`button`,{type:`button`,disabled:s,"aria-current":n?`page`:void 0,className:m([`storybook-top-nav-item`,`storybook-top-nav-item--${o}`,n&&`storybook-top-nav-item--pressed`,i]),onClick:s?void 0:a,children:[g(t,n?`fill`:`regular`),(0,b.jsx)(d,{as:`span`,variant:`text-sm`,weight:n?`semibold`:`medium`,color:`currentColor`,className:`storybook-top-nav-item__label`,children:e})]})}function v({items:e=x,activeIndex:t=1,className:n,onItemChange:r}){let[i,a]=(0,y.useState)(t),o=(e,t)=>{a(t),r?.(e,t)};return(0,b.jsx)(`nav`,{"aria-label":`Top navigation`,className:m([`storybook-top-nav`,n]),children:e.map((e,t)=>{let n=typeof e==`string`?{label:e}:e,r=t===i;return(0,b.jsxs)(`div`,{className:`storybook-top-nav__segment`,children:[t>0&&(0,b.jsx)(s,{"aria-hidden":`true`,className:`storybook-top-nav__separator`,size:20,weight:`regular`}),(0,b.jsx)(_,{icon:n.icon??`gear`,label:n.label,pressed:r,state:n.disabled?`disabled`:n.state??`default`,onClick:()=>o(n,t)})]},`${n.label}-${t}`)})})}var y,b,x,S=t((()=>{y=e(n(),1),l(),f(),p(),b=r(),x=[{label:`Theme Settings`,icon:`gear`},{label:`Home`,icon:`home`},{label:`PLP`,icon:`plp`},{label:`PDP`,icon:`tag`},{label:`Cart`,icon:`cart`}],_.__docgenInfo={description:``,methods:[],displayName:`TopNavigationItem`,props:{className:{required:!1,tsType:{name:`string`},description:``},icon:{required:!1,tsType:{name:`union`,raw:`'cart' | 'gear' | 'home' | 'plp' | 'squares' | 'tag'`,elements:[{name:`literal`,value:`'cart'`},{name:`literal`,value:`'gear'`},{name:`literal`,value:`'home'`},{name:`literal`,value:`'plp'`},{name:`literal`,value:`'squares'`},{name:`literal`,value:`'tag'`}]},description:``,defaultValue:{value:`'gear'`,computed:!1}},label:{required:!1,tsType:{name:`string`},description:``,defaultValue:{value:`'Theme Settings'`,computed:!1}},onClick:{required:!1,tsType:{name:`signature`,type:`function`,raw:`() => void`,signature:{arguments:[],return:{name:`void`}}},description:``},pressed:{required:!1,tsType:{name:`boolean`},description:``,defaultValue:{value:`false`,computed:!1}},state:{required:!1,tsType:{name:`union`,raw:`| 'default'
| 'hover'
| 'focused'
| 'disabled'
| 'Default'
| 'Hover'
| 'Focused'
| 'Disabled'`,elements:[{name:`literal`,value:`'default'`},{name:`literal`,value:`'hover'`},{name:`literal`,value:`'focused'`},{name:`literal`,value:`'disabled'`},{name:`literal`,value:`'Default'`},{name:`literal`,value:`'Hover'`},{name:`literal`,value:`'Focused'`},{name:`literal`,value:`'Disabled'`}]},description:``,defaultValue:{value:`'default'`,computed:!1}}}},v.__docgenInfo={description:``,methods:[],displayName:`TopNavigation`,props:{activeIndex:{required:!1,tsType:{name:`number`},description:``,defaultValue:{value:`1`,computed:!1}},className:{required:!1,tsType:{name:`string`},description:``},items:{required:!1,tsType:{name:`Array`,elements:[{name:`union`,raw:`string | TopNavigationItemConfig`,elements:[{name:`string`},{name:`signature`,type:`object`,raw:`{
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
| 'Disabled'`,elements:[{name:`literal`,value:`'default'`},{name:`literal`,value:`'hover'`},{name:`literal`,value:`'focused'`},{name:`literal`,value:`'disabled'`},{name:`literal`,value:`'Default'`},{name:`literal`,value:`'Hover'`},{name:`literal`,value:`'Focused'`},{name:`literal`,value:`'Disabled'`}],required:!1}}]}},name:`item`},{type:{name:`number`},name:`index`}],return:{name:`void`}}},description:``}}}}));export{_ as n,S as r,v as t};