import{a as e,n as t}from"./chunk-DnJy8xQt.js";import{a as n}from"./iframe-CQYpxMa_.js";import{t as r}from"./jsx-runtime-DxP0NviS.js";var i=t((()=>{}));function a({size:e=`sm`,state:t=`default`,pressed:n,defaultPressed:r=!1,onPressedChange:i,onClick:a,className:c,...l}){let[u,d]=(0,o.useState)(r),f=typeof n==`boolean`,p=f?n:u,m=t===`disabled`,h=e=>{if(m)return;let t=!p;f||d(t),i?.(t),a?.(e)};return(0,s.jsx)(`button`,{type:`button`,role:`switch`,"aria-checked":p,disabled:m,className:[`storybook-toggle`,`storybook-toggle--${e}`,`storybook-toggle--${t}`,p&&`storybook-toggle--pressed`,c].filter(Boolean).join(` `),...l,onClick:h,children:(0,s.jsx)(`span`,{className:`storybook-toggle__thumb`})})}var o,s,c=t((()=>{o=e(n(),1),i(),s=r(),a.__docgenInfo={description:``,methods:[],displayName:`Toggle`,props:{size:{required:!1,tsType:{name:`union`,raw:`'sm' | 'mid'`,elements:[{name:`literal`,value:`'sm'`},{name:`literal`,value:`'mid'`}]},description:``,defaultValue:{value:`'sm'`,computed:!1}},state:{required:!1,tsType:{name:`union`,raw:`'default' | 'hover' | 'focus' | 'disabled'`,elements:[{name:`literal`,value:`'default'`},{name:`literal`,value:`'hover'`},{name:`literal`,value:`'focus'`},{name:`literal`,value:`'disabled'`}]},description:``,defaultValue:{value:`'default'`,computed:!1}},pressed:{required:!1,tsType:{name:`boolean`},description:``},defaultPressed:{required:!1,tsType:{name:`boolean`},description:``,defaultValue:{value:`false`,computed:!1}},onPressedChange:{required:!1,tsType:{name:`signature`,type:`function`,raw:`(pressed: boolean) => void`,signature:{arguments:[{type:{name:`boolean`},name:`pressed`}],return:{name:`void`}}},description:``},onClick:{required:!1,tsType:{name:`signature`,type:`function`,raw:`(event: MouseEvent<HTMLButtonElement>) => void`,signature:{arguments:[{type:{name:`MouseEvent`,elements:[{name:`HTMLButtonElement`}],raw:`MouseEvent<HTMLButtonElement>`},name:`event`}],return:{name:`void`}}},description:``}},composes:[`Omit`]}}));function l(e){let[t,n]=(0,u.useState)(!!e.pressed);return(0,d.jsx)(a,{...e,pressed:t,onPressedChange:t=>{n(t),e.onPressedChange?.(t)}})}var u,d,f,p,m,h,g,_;t((()=>{u=e(n(),1),c(),d=r(),f=[`default`,`hover`,`focus`,`disabled`],p={title:`Atoms/Toggle`,component:a,parameters:{layout:`centered`},tags:[`autodocs`],argTypes:{state:{control:`select`,options:f},size:{control:`select`,options:[`sm`,`mid`]},pressed:{control:`boolean`}}},m={render:e=>(0,d.jsx)(l,{...e},`${e.pressed}`),args:{state:`default`,size:`sm`,pressed:!1}},h={render:()=>(0,d.jsxs)(`div`,{className:`toggle-story-row`,children:[(0,d.jsx)(a,{size:`sm`}),(0,d.jsx)(a,{size:`sm`,defaultPressed:!0}),(0,d.jsx)(a,{size:`mid`}),(0,d.jsx)(a,{size:`mid`,defaultPressed:!0})]})},g={render:()=>(0,d.jsx)(`div`,{className:`toggle-story-stack`,children:f.map(e=>(0,d.jsxs)(`div`,{className:`toggle-story-row`,children:[(0,d.jsx)(a,{size:`sm`,state:e}),(0,d.jsx)(a,{size:`sm`,state:e,defaultPressed:!0}),(0,d.jsx)(a,{size:`mid`,state:e}),(0,d.jsx)(a,{size:`mid`,state:e,defaultPressed:!0})]},e))})},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  render: args => <TogglePlayground key={\`\${args.pressed}\`} {...args} />,
  args: {
    state: 'default',
    size: 'sm',
    pressed: false
  }
}`,...m.parameters?.docs?.source}}},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  render: () => <div className="toggle-story-row">
      <Toggle size="sm" />
      <Toggle size="sm" defaultPressed />
      <Toggle size="mid" />
      <Toggle size="mid" defaultPressed />
    </div>
}`,...h.parameters?.docs?.source}}},g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  render: () => <div className="toggle-story-stack">
      {states.map(state => <div key={state} className="toggle-story-row">
          <Toggle size="sm" state={state} />
          <Toggle size="sm" state={state} defaultPressed />
          <Toggle size="mid" state={state} />
          <Toggle size="mid" state={state} defaultPressed />
        </div>)}
    </div>
}`,...g.parameters?.docs?.source}}},_=[`Playground`,`Sizes`,`States`]}))();export{m as Playground,h as Sizes,g as States,_ as __namedExportsOrder,p as default};