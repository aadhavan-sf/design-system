import{a as e,n as t}from"./chunk-DnJy8xQt.js";import{a as n}from"./iframe-DTRKKPfd.js";import{t as r}from"./jsx-runtime-DxP0NviS.js";import{n as i,t as a}from"./CheckBox-BUU9zyYJ.js";function o(e){let[t,n]=(0,s.useState)(!!e.pressed),[r,i]=(0,s.useState)(!!e.indeterminate);return(0,c.jsx)(a,{...e,pressed:t,indeterminate:r,onPressedChange:t=>{n(t),e.onPressedChange?.(t)},onIndeterminateChange:e=>{i(e)}})}var s,c,l,u,d,f,p,m;t((()=>{s=e(n(),1),i(),c=r(),l=[`default`,`hover`,`focus`,`disabled`],u={title:`Atoms/Check Box`,component:a,parameters:{layout:`centered`},tags:[`autodocs`],argTypes:{state:{control:`select`,options:l},size:{control:`select`,options:[`sm`,`mid`]},pressed:{control:`boolean`},indeterminate:{control:`boolean`}}},d={render:e=>(0,c.jsx)(o,{...e},`${e.pressed}-${e.indeterminate}`),args:{state:`default`,size:`sm`,pressed:!1,indeterminate:!1}},f={render:()=>(0,c.jsxs)(`div`,{className:`checkbox-story-row`,children:[(0,c.jsx)(a,{size:`sm`}),(0,c.jsx)(a,{size:`sm`,defaultPressed:!0}),(0,c.jsx)(a,{size:`sm`,defaultIndeterminate:!0}),(0,c.jsx)(a,{size:`mid`}),(0,c.jsx)(a,{size:`mid`,defaultPressed:!0}),(0,c.jsx)(a,{size:`mid`,defaultIndeterminate:!0})]})},p={render:()=>(0,c.jsx)(`div`,{className:`checkbox-story-stack`,children:l.map(e=>(0,c.jsxs)(`div`,{className:`checkbox-story-row`,children:[(0,c.jsx)(a,{size:`sm`,state:e}),(0,c.jsx)(a,{size:`sm`,state:e,defaultPressed:!0}),(0,c.jsx)(a,{size:`sm`,state:e,defaultIndeterminate:!0}),(0,c.jsx)(a,{size:`mid`,state:e}),(0,c.jsx)(a,{size:`mid`,state:e,defaultPressed:!0}),(0,c.jsx)(a,{size:`mid`,state:e,defaultIndeterminate:!0})]},e))})},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  render: args => <CheckBoxPlayground key={\`\${args.pressed}-\${args.indeterminate}\`} {...args} />,
  args: {
    state: 'default',
    size: 'sm',
    pressed: false,
    indeterminate: false
  }
}`,...d.parameters?.docs?.source}}},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  render: () => <div className="checkbox-story-row">
      <CheckBox size="sm" />
      <CheckBox size="sm" defaultPressed />
      <CheckBox size="sm" defaultIndeterminate />
      <CheckBox size="mid" />
      <CheckBox size="mid" defaultPressed />
      <CheckBox size="mid" defaultIndeterminate />
    </div>
}`,...f.parameters?.docs?.source}}},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
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
}`,...p.parameters?.docs?.source}}},m=[`Playground`,`Sizes`,`States`]}))();export{d as Playground,f as Sizes,p as States,m as __namedExportsOrder,u as default};