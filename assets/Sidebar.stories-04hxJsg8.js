import{n as e}from"./chunk-DnJy8xQt.js";import{t}from"./jsx-runtime-DxP0NviS.js";import{n,r,t as i}from"./Sidebar-y6YYuBmd.js";var a=e((()=>{})),o,s,c,l,u,d,f;e((()=>{r(),a(),o=t(),{fn:s}=__STORYBOOK_MODULE_TEST__,c={title:`Organisms/Sidebar`,component:i,parameters:{layout:`fullscreen`,docs:{description:{component:`Sidebar organism with expanded and collapsed layouts, reusable sidebar menu items, active/focus/disabled states, store switcher, account area, and quick actions.`}}},tags:[`autodocs`],argTypes:{type:{control:`select`,options:[`expanded`,`collapsed`]},activeItemId:{control:`text`},sections:{control:`object`}},args:{onItemChange:s(),onPreview:s(),onLogout:s()}},l={render:e=>(0,o.jsx)(`div`,{className:`storybook-sidebar-story-surface`,children:(0,o.jsx)(i,{...e})}),args:{type:`expanded`,activeItemId:`active-theme`}},u={render:()=>(0,o.jsxs)(`div`,{className:`storybook-sidebar-story-surface`,children:[(0,o.jsx)(i,{type:`expanded`}),(0,o.jsx)(i,{type:`collapsed`})]})},d={render:()=>(0,o.jsxs)(`div`,{className:`storybook-sidebar-story-states`,children:[[`default`,`hover`,`focused`,`disabled`].map(e=>(0,o.jsx)(n,{icon:`drag`,label:`Custom Blocks #1`,state:e},`expanded-default-${e}`)),[`default`,`hover`,`focused`,`disabled`].map(e=>(0,o.jsx)(n,{icon:`drag`,label:`Custom Blocks #1`,pressed:!0,state:e},`expanded-pressed-${e}`)),[`default`,`hover`,`focused`,`disabled`].map(e=>(0,o.jsx)(n,{icon:`drag`,label:`Custom Blocks #1`,state:e,type:`collapsed`},`collapsed-default-${e}`)),[`default`,`hover`,`focused`,`disabled`].map(e=>(0,o.jsx)(n,{icon:`drag`,label:`Custom Blocks #1`,pressed:!0,state:e,type:`collapsed`},`collapsed-pressed-${e}`))]}),parameters:{layout:`centered`}},l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  render: args => <div className="storybook-sidebar-story-surface">
      <Sidebar {...args} />
    </div>,
  args: {
    type: 'expanded',
    activeItemId: 'active-theme'
  }
}`,...l.parameters?.docs?.source}}},u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  render: () => <div className="storybook-sidebar-story-surface">
      <Sidebar type="expanded" />
      <Sidebar type="collapsed" />
    </div>
}`,...u.parameters?.docs?.source}}},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  render: () => <div className="storybook-sidebar-story-states">
      {['default', 'hover', 'focused', 'disabled'].map(state => <SidebarItem key={\`expanded-default-\${state}\`} icon="drag" label="Custom Blocks #1" state={state} />)}
      {['default', 'hover', 'focused', 'disabled'].map(state => <SidebarItem key={\`expanded-pressed-\${state}\`} icon="drag" label="Custom Blocks #1" pressed state={state} />)}
      {['default', 'hover', 'focused', 'disabled'].map(state => <SidebarItem key={\`collapsed-default-\${state}\`} icon="drag" label="Custom Blocks #1" state={state} type="collapsed" />)}
      {['default', 'hover', 'focused', 'disabled'].map(state => <SidebarItem key={\`collapsed-pressed-\${state}\`} icon="drag" label="Custom Blocks #1" pressed state={state} type="collapsed" />)}
    </div>,
  parameters: {
    layout: 'centered'
  }
}`,...d.parameters?.docs?.source}}},f=[`Playground`,`Variants`,`ItemStates`]}))();export{d as ItemStates,l as Playground,u as Variants,f as __namedExportsOrder,c as default};