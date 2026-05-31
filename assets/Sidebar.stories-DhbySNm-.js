import{n as e}from"./chunk-DnJy8xQt.js";import{t}from"./jsx-runtime-DxP0NviS.js";import{n,r,t as i}from"./Sidebar-BVW1azO9.js";var a,o,s,c,l,u,d;e((()=>{r(),a=t(),{fn:o}=__STORYBOOK_MODULE_TEST__,s={title:`Organisms/Sidebar`,component:i,parameters:{layout:`fullscreen`,docs:{description:{component:`Sidebar organism with expanded and collapsed layouts, reusable sidebar menu items, active/focus/disabled states, store switcher, account area, and quick actions.`}}},tags:[`autodocs`],argTypes:{type:{control:`select`,options:[`expanded`,`collapsed`]},activeItemId:{control:`text`},sections:{control:`object`}},args:{onItemChange:o(),onPreview:o(),onLogout:o()}},c={render:e=>(0,a.jsx)(`div`,{className:`storybook-sidebar-story-surface`,children:(0,a.jsx)(i,{...e})}),args:{type:`expanded`,activeItemId:`active-theme`}},l={render:()=>(0,a.jsxs)(`div`,{className:`storybook-sidebar-story-surface`,children:[(0,a.jsx)(i,{type:`expanded`}),(0,a.jsx)(i,{type:`collapsed`})]})},u={render:()=>(0,a.jsxs)(`div`,{className:`storybook-sidebar-story-states`,children:[[`default`,`hover`,`focused`,`disabled`].map(e=>(0,a.jsx)(n,{icon:`drag`,label:`Custom Blocks #1`,state:e},`expanded-default-${e}`)),[`default`,`hover`,`focused`,`disabled`].map(e=>(0,a.jsx)(n,{icon:`drag`,label:`Custom Blocks #1`,pressed:!0,state:e},`expanded-pressed-${e}`)),[`default`,`hover`,`focused`,`disabled`].map(e=>(0,a.jsx)(n,{icon:`drag`,label:`Custom Blocks #1`,state:e,type:`collapsed`},`collapsed-default-${e}`)),[`default`,`hover`,`focused`,`disabled`].map(e=>(0,a.jsx)(n,{icon:`drag`,label:`Custom Blocks #1`,pressed:!0,state:e,type:`collapsed`},`collapsed-pressed-${e}`))]}),parameters:{layout:`centered`}},c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  render: args => <div className="storybook-sidebar-story-surface">
      <Sidebar {...args} />
    </div>,
  args: {
    type: 'expanded',
    activeItemId: 'active-theme'
  }
}`,...c.parameters?.docs?.source}}},l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  render: () => <div className="storybook-sidebar-story-surface">
      <Sidebar type="expanded" />
      <Sidebar type="collapsed" />
    </div>
}`,...l.parameters?.docs?.source}}},u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  render: () => <div className="storybook-sidebar-story-states">
      {['default', 'hover', 'focused', 'disabled'].map(state => <SidebarItem key={\`expanded-default-\${state}\`} icon="drag" label="Custom Blocks #1" state={state} />)}
      {['default', 'hover', 'focused', 'disabled'].map(state => <SidebarItem key={\`expanded-pressed-\${state}\`} icon="drag" label="Custom Blocks #1" pressed state={state} />)}
      {['default', 'hover', 'focused', 'disabled'].map(state => <SidebarItem key={\`collapsed-default-\${state}\`} icon="drag" label="Custom Blocks #1" state={state} type="collapsed" />)}
      {['default', 'hover', 'focused', 'disabled'].map(state => <SidebarItem key={\`collapsed-pressed-\${state}\`} icon="drag" label="Custom Blocks #1" pressed state={state} type="collapsed" />)}
    </div>,
  parameters: {
    layout: 'centered'
  }
}`,...u.parameters?.docs?.source}}},d=[`Playground`,`Variants`,`ItemStates`]}))();export{u as ItemStates,c as Playground,l as Variants,d as __namedExportsOrder,s as default};