import{a as e,n as t}from"./chunk-DnJy8xQt.js";import{a as n}from"./iframe-CJsyicl5.js";import{t as r}from"./jsx-runtime-DxP0NviS.js";import{n as i,t as a}from"./RadioButton-DK0GRqL9.js";function o(e){let[t,n]=(0,s.useState)(!!e.pressed);return(0,c.jsx)(a,{...e,pressed:t,onPressedChange:t=>{n(t),e.onPressedChange?.(t)}})}var s,c,l,u,d,f,p,m;t((()=>{s=e(n(),1),i(),c=r(),l=[`default`,`hover`,`focus`,`disabled`],u={title:`Atoms/Radio Button`,component:a,parameters:{layout:`centered`,docs:{description:{component:"Standalone radio control. Use the controlled `pressed` prop in production. The component does not persist selection across refresh — load and save the selected value in the parent (API, form state, block settings). Storybook Playground uses local state for demo purposes only."}}},tags:[`autodocs`],argTypes:{state:{control:`select`,options:l},size:{control:`select`,options:[`sm`,`mid`]},pressed:{control:`boolean`}}},d={render:e=>(0,c.jsx)(o,{...e},`${e.pressed}`),args:{state:`default`,size:`sm`,pressed:!1}},f={render:()=>(0,c.jsxs)(`div`,{className:`flex items-center gap-12`,children:[(0,c.jsx)(a,{size:`sm`}),(0,c.jsx)(a,{size:`sm`,defaultPressed:!0}),(0,c.jsx)(a,{size:`mid`}),(0,c.jsx)(a,{size:`mid`,defaultPressed:!0})]})},p={render:()=>(0,c.jsx)(`div`,{className:`flex flex-col gap-8`,children:l.map(e=>(0,c.jsxs)(`div`,{className:`flex items-center gap-12`,children:[(0,c.jsx)(a,{size:`sm`,state:e}),(0,c.jsx)(a,{size:`sm`,state:e,defaultPressed:!0}),(0,c.jsx)(a,{size:`mid`,state:e}),(0,c.jsx)(a,{size:`mid`,state:e,defaultPressed:!0})]},e))})},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  render: args => <RadioPlayground key={\`\${args.pressed}\`} {...args} />,
  args: {
    state: 'default',
    size: 'sm',
    pressed: false
  }
}`,...d.parameters?.docs?.source}}},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex items-center gap-12">
      <RadioButton size="sm" />
      <RadioButton size="sm" defaultPressed />
      <RadioButton size="mid" />
      <RadioButton size="mid" defaultPressed />
    </div>
}`,...f.parameters?.docs?.source}}},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex flex-col gap-8">
      {states.map(state => <div key={state} className="flex items-center gap-12">
          <RadioButton size="sm" state={state} />
          <RadioButton size="sm" state={state} defaultPressed />
          <RadioButton size="mid" state={state} />
          <RadioButton size="mid" state={state} defaultPressed />
        </div>)}
    </div>
}`,...p.parameters?.docs?.source}}},m=[`Playground`,`Sizes`,`States`]}))();export{d as Playground,f as Sizes,p as States,m as __namedExportsOrder,u as default};