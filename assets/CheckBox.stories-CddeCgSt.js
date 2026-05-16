import{a as e,n as t}from"./chunk-DnJy8xQt.js";import{a as n}from"./iframe-D5FjZg2q.js";import{t as r}from"./jsx-runtime-DxP0NviS.js";import{t as i}from"./prop-types-CoCJfGF0.js";import{c as a,d as o,t as s}from"./index.es-CNClfFgw.js";var c=t((()=>{}));function l({size:e=`sm`,state:t=`default`,pressed:n,indeterminate:r,defaultPressed:i=!1,defaultIndeterminate:s=!1,onPressedChange:c,onIndeterminateChange:l,onClick:u,className:p,...m}){let[h,g]=(0,d.useState)(i),[_,v]=(0,d.useState)(s),y=typeof n==`boolean`,b=typeof r==`boolean`,x=y?n:h,S=b?r:_,C=x||S,w=t===`disabled`,T=e=>{if(w)return;let t=S?!0:!x;y||g(t),b||v(!1),c?.(t),l?.(!1),u?.(e)},E=e===`mid`?14:12;return(0,f.jsx)(`button`,{type:`button`,role:`checkbox`,"aria-checked":S?`mixed`:x,disabled:w,className:[`storybook-checkbox`,`storybook-checkbox--${e}`,`storybook-checkbox--${t}`,C&&`storybook-checkbox--active`,S&&`storybook-checkbox--indeterminate`,p].filter(Boolean).join(` `),...m,onClick:T,children:(0,f.jsx)(`span`,{className:`storybook-checkbox__icon`,children:S?(0,f.jsx)(a,{size:E,weight:`bold`}):(0,f.jsx)(o,{size:E,weight:`bold`})})})}var u,d,f,p=t((()=>{u=e(i(),1),d=e(n(),1),s(),c(),f=r(),l.propTypes={size:u.default.oneOf([`sm`,`mid`]),state:u.default.oneOf([`default`,`hover`,`focus`,`disabled`]),pressed:u.default.bool,indeterminate:u.default.bool,defaultPressed:u.default.bool,defaultIndeterminate:u.default.bool,onPressedChange:u.default.func,onIndeterminateChange:u.default.func,onClick:u.default.func,className:u.default.string},l.__docgenInfo={description:``,methods:[],displayName:`CheckBox`,props:{size:{defaultValue:{value:`'sm'`,computed:!1},description:``,type:{name:`enum`,value:[{value:`'sm'`,computed:!1},{value:`'mid'`,computed:!1}]},required:!1},state:{defaultValue:{value:`'default'`,computed:!1},description:``,type:{name:`enum`,value:[{value:`'default'`,computed:!1},{value:`'hover'`,computed:!1},{value:`'focus'`,computed:!1},{value:`'disabled'`,computed:!1}]},required:!1},defaultPressed:{defaultValue:{value:`false`,computed:!1},description:``,type:{name:`bool`},required:!1},defaultIndeterminate:{defaultValue:{value:`false`,computed:!1},description:``,type:{name:`bool`},required:!1},pressed:{description:``,type:{name:`bool`},required:!1},indeterminate:{description:``,type:{name:`bool`},required:!1},onPressedChange:{description:``,type:{name:`func`},required:!1},onIndeterminateChange:{description:``,type:{name:`func`},required:!1},onClick:{description:``,type:{name:`func`},required:!1},className:{description:``,type:{name:`string`},required:!1}}}}));function m(e){let[t,n]=(0,h.useState)(!!e.pressed),[r,i]=(0,h.useState)(!!e.indeterminate);return(0,g.jsx)(l,{...e,pressed:t,indeterminate:r,onPressedChange:t=>{n(t),e.onPressedChange?.(t)},onIndeterminateChange:e=>{i(e)}})}var h,g,_,v,y,b,x,S;t((()=>{h=e(n(),1),p(),g=r(),_=[`default`,`hover`,`focus`,`disabled`],v={title:`Atoms/Check Box`,component:l,parameters:{layout:`centered`},tags:[`autodocs`],argTypes:{state:{control:`select`,options:_},size:{control:`select`,options:[`sm`,`mid`]},pressed:{control:`boolean`},indeterminate:{control:`boolean`}}},y={render:e=>(0,g.jsx)(m,{...e},`${e.pressed}-${e.indeterminate}`),args:{state:`default`,size:`sm`,pressed:!1,indeterminate:!1}},b={render:()=>(0,g.jsxs)(`div`,{className:`checkbox-story-row`,children:[(0,g.jsx)(l,{size:`sm`}),(0,g.jsx)(l,{size:`sm`,defaultPressed:!0}),(0,g.jsx)(l,{size:`sm`,defaultIndeterminate:!0}),(0,g.jsx)(l,{size:`mid`}),(0,g.jsx)(l,{size:`mid`,defaultPressed:!0}),(0,g.jsx)(l,{size:`mid`,defaultIndeterminate:!0})]})},x={render:()=>(0,g.jsx)(`div`,{className:`checkbox-story-stack`,children:_.map(e=>(0,g.jsxs)(`div`,{className:`checkbox-story-row`,children:[(0,g.jsx)(l,{size:`sm`,state:e}),(0,g.jsx)(l,{size:`sm`,state:e,defaultPressed:!0}),(0,g.jsx)(l,{size:`sm`,state:e,defaultIndeterminate:!0}),(0,g.jsx)(l,{size:`mid`,state:e}),(0,g.jsx)(l,{size:`mid`,state:e,defaultPressed:!0}),(0,g.jsx)(l,{size:`mid`,state:e,defaultIndeterminate:!0})]},e))})},y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  render: args => <CheckBoxPlayground key={\`\${args.pressed}-\${args.indeterminate}\`} {...args} />,
  args: {
    state: 'default',
    size: 'sm',
    pressed: false,
    indeterminate: false
  }
}`,...y.parameters?.docs?.source}}},b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  render: () => <div className="checkbox-story-row">
      <CheckBox size="sm" />
      <CheckBox size="sm" defaultPressed />
      <CheckBox size="sm" defaultIndeterminate />
      <CheckBox size="mid" />
      <CheckBox size="mid" defaultPressed />
      <CheckBox size="mid" defaultIndeterminate />
    </div>
}`,...b.parameters?.docs?.source}}},x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  render: () => <div className="checkbox-story-stack">
      {states.map(state => <div key={state} className="checkbox-story-row">
          <CheckBox size="sm" state={state} />
          <CheckBox size="sm" state={state} defaultPressed />
          <CheckBox size="sm" state={state} defaultIndeterminate />
          <CheckBox size="mid" state={state} />
          <CheckBox size="mid" state={state} defaultPressed />
          <CheckBox size="mid" state={state} defaultIndeterminate />
        </div>)}
    </div>
}`,...x.parameters?.docs?.source}}},S=[`Playground`,`Sizes`,`States`]}))();export{y as Playground,b as Sizes,x as States,S as __namedExportsOrder,v as default};