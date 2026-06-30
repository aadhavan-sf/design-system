import{n as e}from"./chunk-DnJy8xQt.js";import{t}from"./jsx-runtime-DxP0NviS.js";import{n,r,t as i}from"./Sidebar-D2eNzoMb.js";var a,o,s,c,l,u;e((()=>{r(),a=t(),{fn:o}=__STORYBOOK_MODULE_TEST__,s={title:`Organisms/Sidebar`,component:i,parameters:{layout:`fullscreen`,docs:{description:{component:`Sidebar organism with reusable sidebar menu items, active/focus/disabled states, store switcher, account area, and quick actions.`}}},tags:[`autodocs`],argTypes:{activeItemId:{control:`text`},sections:{control:`object`}},args:{onItemChange:o(),onPreview:o(),onLogout:o()}},c={render:e=>(0,a.jsx)(`div`,{className:`flex min-h-screen items-start justify-center bg-neutral-100 p-8`,children:(0,a.jsx)(`div`,{className:`h-dvh w-[216px]`,children:(0,a.jsx)(i,{...e})})}),args:{activeItemId:`active-theme`}},l={render:()=>(0,a.jsxs)(`div`,{className:`grid grid-cols-[max-content_max-content] gap-x-16 gap-y-5 p-5`,children:[[`default`,`hover`,`focused`,`disabled`].map(e=>(0,a.jsx)(n,{icon:`drag`,label:`Custom Blocks #1`,state:e},`default-${e}`)),[`default`,`hover`,`focused`,`disabled`].map(e=>(0,a.jsx)(n,{icon:`drag`,label:`Custom Blocks #1`,pressed:!0,state:e},`pressed-${e}`))]}),parameters:{layout:`centered`}},c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  render: args => <div className="flex min-h-screen items-start justify-center bg-neutral-100 p-8">
      <div className="h-dvh w-[216px]">
        <Sidebar {...args} />
      </div>
    </div>,
  args: {
    activeItemId: 'active-theme'
  }
}`,...c.parameters?.docs?.source}}},l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  render: () => <div className="grid grid-cols-[max-content_max-content] gap-x-16 gap-y-5 p-5">
      {['default', 'hover', 'focused', 'disabled'].map(state => <SidebarItem key={\`default-\${state}\`} icon="drag" label="Custom Blocks #1" state={state} />)}
      {['default', 'hover', 'focused', 'disabled'].map(state => <SidebarItem key={\`pressed-\${state}\`} icon="drag" label="Custom Blocks #1" pressed state={state} />)}
    </div>,
  parameters: {
    layout: 'centered'
  }
}`,...l.parameters?.docs?.source}}},u=[`Playground`,`ItemStates`]}))();export{l as ItemStates,c as Playground,u as __namedExportsOrder,s as default};