import{a as e,n as t}from"./chunk-DnJy8xQt.js";import{a as n}from"./iframe-B22YEDhf.js";import{t as r}from"./jsx-runtime-DxP0NviS.js";import{t as i}from"./prop-types-CoCJfGF0.js";import{L as a,V as o,d as s,lt as c,m as l,t as u,u as d}from"./index.es-gHFfQTIy.js";import{t as f}from"./Typography-BF9zTSFu.js";import{t as p}from"./Typography-B5HRnYgs.js";var m=t((()=>{}));function h(e){return e.filter(Boolean).join(` `)}function g(e,t={}){return t[e]??e}function _(e,t=`regular`){let n={"aria-hidden":!0,className:`storybook-top-nav-item__icon`,size:18,weight:t};switch(e){case`cart`:return(0,S.jsx)(l,{...n});case`home`:return(0,S.jsx)(a,{...n});case`plp`:case`squares`:return(0,S.jsx)(s,{...n});case`tag`:return(0,S.jsx)(d,{...n});default:return(0,S.jsx)(o,{...n})}}function v({label:e=`Theme Settings`,icon:t=`gear`,pressed:n=!1,state:r=`default`,className:i,onClick:a}){let o=g(r,{Default:`default`,Hover:`hover`,Focused:`focused`,Disabled:`disabled`}),s=o===`disabled`;return(0,S.jsxs)(`button`,{type:`button`,disabled:s,"aria-current":n?`page`:void 0,className:h([`storybook-top-nav-item`,`storybook-top-nav-item--${o}`,n&&`storybook-top-nav-item--pressed`,i]),onClick:s?void 0:a,children:[_(t,n?`fill`:`regular`),(0,S.jsx)(f,{as:`span`,variant:`text-sm`,weight:n?`semibold`:`medium`,color:`currentColor`,className:`storybook-top-nav-item__label`,children:e})]})}function y({items:e=w,activeIndex:t=1,className:n,onItemChange:r}){let[i,a]=(0,b.useState)(t),o=(e,t)=>{a(t),r?.(e,t)};return(0,S.jsx)(`nav`,{"aria-label":`Top navigation`,className:h([`storybook-top-nav`,n]),children:e.map((e,t)=>{let n=typeof e==`string`?{label:e}:e,r=t===i;return(0,S.jsxs)(`div`,{className:`storybook-top-nav__segment`,children:[t>0&&(0,S.jsx)(c,{"aria-hidden":`true`,className:`storybook-top-nav__separator`,size:20,weight:`regular`}),(0,S.jsx)(v,{icon:n.icon??`gear`,label:n.label,pressed:r,state:n.disabled?`disabled`:n.state??`default`,onClick:()=>o(n,t)})]},`${n.label}-${t}`)})})}var b,x,S,C,w,T=t((()=>{b=e(n(),1),x=e(i(),1),u(),p(),m(),S=r(),C=[`default`,`hover`,`focused`,`disabled`],w=[{label:`Theme Settings`,icon:`gear`},{label:`Home`,icon:`home`},{label:`PLP`,icon:`plp`},{label:`PDP`,icon:`tag`},{label:`Cart`,icon:`cart`}],v.propTypes={label:x.default.string,icon:x.default.oneOf([`cart`,`gear`,`home`,`plp`,`squares`,`tag`]),pressed:x.default.bool,state:x.default.oneOf([...C,`Default`,`Hover`,`Focused`,`Disabled`]),className:x.default.string,onClick:x.default.func},y.propTypes={items:x.default.arrayOf(x.default.oneOfType([x.default.string,x.default.shape({label:x.default.string.isRequired,icon:x.default.oneOf([`cart`,`gear`,`home`,`plp`,`squares`,`tag`]),disabled:x.default.bool,state:x.default.oneOf([...C,`Default`,`Hover`,`Focused`,`Disabled`])})])),activeIndex:x.default.number,className:x.default.string,onItemChange:x.default.func},v.__docgenInfo={description:``,methods:[],displayName:`TopNavigationItem`,props:{label:{defaultValue:{value:`'Theme Settings'`,computed:!1},description:``,type:{name:`string`},required:!1},icon:{defaultValue:{value:`'gear'`,computed:!1},description:``,type:{name:`enum`,value:[{value:`'cart'`,computed:!1},{value:`'gear'`,computed:!1},{value:`'home'`,computed:!1},{value:`'plp'`,computed:!1},{value:`'squares'`,computed:!1},{value:`'tag'`,computed:!1}]},required:!1},pressed:{defaultValue:{value:`false`,computed:!1},description:``,type:{name:`bool`},required:!1},state:{defaultValue:{value:`'default'`,computed:!1},description:``,type:{name:`enum`,value:[{value:`'default'`,computed:!1},{value:`'hover'`,computed:!1},{value:`'focused'`,computed:!1},{value:`'disabled'`,computed:!1},{value:`'Default'`,computed:!1},{value:`'Hover'`,computed:!1},{value:`'Focused'`,computed:!1},{value:`'Disabled'`,computed:!1}]},required:!1},className:{description:``,type:{name:`string`},required:!1},onClick:{description:``,type:{name:`func`},required:!1}}},y.__docgenInfo={description:``,methods:[],displayName:`TopNavigation`,props:{items:{defaultValue:{value:`[
  { label: 'Theme Settings', icon: 'gear' },
  { label: 'Home', icon: 'home' },
  { label: 'PLP', icon: 'plp' },
  { label: 'PDP', icon: 'tag' },
  { label: 'Cart', icon: 'cart' },
]`,computed:!1},description:``,type:{name:`arrayOf`,value:{name:`union`,value:[{name:`string`},{name:`shape`,value:{label:{name:`string`,required:!0},icon:{name:`enum`,value:[{value:`'cart'`,computed:!1},{value:`'gear'`,computed:!1},{value:`'home'`,computed:!1},{value:`'plp'`,computed:!1},{value:`'squares'`,computed:!1},{value:`'tag'`,computed:!1}],required:!1},disabled:{name:`bool`,required:!1},state:{name:`enum`,value:[{value:`'default'`,computed:!1},{value:`'hover'`,computed:!1},{value:`'focused'`,computed:!1},{value:`'disabled'`,computed:!1},{value:`'Default'`,computed:!1},{value:`'Hover'`,computed:!1},{value:`'Focused'`,computed:!1},{value:`'Disabled'`,computed:!1}],required:!1}}}]}},required:!1},activeIndex:{defaultValue:{value:`1`,computed:!1},description:``,type:{name:`number`},required:!1},className:{description:``,type:{name:`string`},required:!1},onItemChange:{description:``,type:{name:`func`},required:!1}}}})),E,D,O,k,A,j,M;t((()=>{T(),E=r(),{fn:D}=__STORYBOOK_MODULE_TEST__,O={title:`Organisms/Top Navigation`,component:y,parameters:{layout:`fullscreen`,docs:{description:{component:`Top navigation organism with pill navigation items, separators, active states, and item state matrix from Figma.`}}},tags:[`autodocs`],argTypes:{activeIndex:{control:`number`},items:{control:`object`}},args:{onItemChange:D()}},k={render:e=>(0,E.jsx)(`div`,{className:`top-navigation-story-surface`,children:(0,E.jsx)(y,{...e})}),args:{activeIndex:1,items:[{label:`Theme Settings`,icon:`gear`},{label:`Home`,icon:`home`},{label:`PLP`,icon:`plp`},{label:`PDP`,icon:`tag`},{label:`Cart`,icon:`cart`}]}},A={render:()=>(0,E.jsx)(`div`,{className:`top-navigation-story-surface`,children:(0,E.jsx)(y,{})})},j={render:()=>(0,E.jsxs)(`div`,{className:`top-navigation-item-story-grid`,children:[[`default`,`hover`,`focused`,`disabled`].map(e=>(0,E.jsx)(v,{label:`Theme Settings`,state:e},`unpressed-${e}`)),[`default`,`hover`,`focused`,`disabled`].map(e=>(0,E.jsx)(v,{label:`Theme Settings`,pressed:!0,state:e},`pressed-${e}`))]}),parameters:{layout:`centered`}},k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`{
  render: args => <div className="top-navigation-story-surface">
      <TopNavigation {...args} />
    </div>,
  args: {
    activeIndex: 1,
    items: [{
      label: 'Theme Settings',
      icon: 'gear'
    }, {
      label: 'Home',
      icon: 'home'
    }, {
      label: 'PLP',
      icon: 'plp'
    }, {
      label: 'PDP',
      icon: 'tag'
    }, {
      label: 'Cart',
      icon: 'cart'
    }]
  }
}`,...k.parameters?.docs?.source}}},A.parameters={...A.parameters,docs:{...A.parameters?.docs,source:{originalSource:`{
  render: () => <div className="top-navigation-story-surface">
      <TopNavigation />
    </div>
}`,...A.parameters?.docs?.source}}},j.parameters={...j.parameters,docs:{...j.parameters?.docs,source:{originalSource:`{
  render: () => <div className="top-navigation-item-story-grid">
      {['default', 'hover', 'focused', 'disabled'].map(state => <TopNavigationItem key={\`unpressed-\${state}\`} label="Theme Settings" state={state} />)}
      {['default', 'hover', 'focused', 'disabled'].map(state => <TopNavigationItem key={\`pressed-\${state}\`} label="Theme Settings" pressed state={state} />)}
    </div>,
  parameters: {
    layout: 'centered'
  }
}`,...j.parameters?.docs?.source}}},M=[`Playground`,`Variant`,`ItemStates`]}))();export{j as ItemStates,k as Playground,A as Variant,M as __namedExportsOrder,O as default};