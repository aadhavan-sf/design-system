import{n as e}from"./chunk-DnJy8xQt.js";import{t}from"./jsx-runtime-DxP0NviS.js";import{i as n,n as r,r as i,t as a}from"./LeftPanel-COY6X3I4.js";var o,s,c,l,u,d,f,p;e((()=>{n(),o=t(),{fn:s}=__STORYBOOK_MODULE_TEST__,c={title:`Organisms/Left Panel`,component:a,parameters:{layout:`fullscreen`,docs:{description:{component:`Left panel organism with block lists, fixed block areas, theme settings navigation, reusable left panel list items, and theme status chips. In the docs preview, hiding an item toggles the hidden visual state and deleting an item removes it only for the current session; refreshing restores the demo data.`}}},tags:[`autodocs`],argTypes:{type:{control:`select`,options:[`blocks`,`fixed-blocks`,`theme-settings`]},status:{control:`select`,options:[`draft`,`active`]},selectedItemId:{control:`text`}},args:{onAddBlock:s(),onBack:s(),onFooterClick:s(),onInsertBlock:s(),onItemChange:s()}},l={render:e=>(0,o.jsx)(`div`,{className:`storybook-left-panel-story-surface`,children:(0,o.jsxs)(`div`,{className:`storybook-left-panel-story-demo`,children:[(0,o.jsx)(a,{...e}),(0,o.jsx)(`p`,{className:`storybook-left-panel-story-note`,children:`Preview note: hide toggles the hidden state. Delete removes the item for this session only; refresh restores the demo list.`})]})}),args:{type:`blocks`,status:`draft`}},u={render:()=>(0,o.jsxs)(`div`,{className:`storybook-left-panel-story-surface`,children:[(0,o.jsx)(a,{type:`blocks`}),(0,o.jsx)(a,{type:`fixed-blocks`}),(0,o.jsx)(a,{type:`theme-settings`})]})},d={render:()=>(0,o.jsxs)(`div`,{className:`storybook-left-panel-item-story-grid`,children:[[`default`,`hover`,`focused`,`disabled`].map(e=>(0,o.jsx)(r,{label:`Imager Banner`,state:e},`default-${e}`)),[`default`,`hover`,`focused`,`disabled`].map(e=>(0,o.jsx)(r,{label:`Imager Banner`,pressed:!0,state:e},`pressed-${e}`))]}),parameters:{layout:`centered`}},f={render:()=>(0,o.jsxs)(`div`,{className:`storybook-left-panel-status-story-row`,children:[(0,o.jsx)(i,{status:`draft`}),(0,o.jsx)(i,{status:`active`})]}),parameters:{layout:`centered`}},l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  render: args => <div className="storybook-left-panel-story-surface">
      <div className="storybook-left-panel-story-demo">
        <LeftPanel {...args} />
        <p className="storybook-left-panel-story-note">
          Preview note: hide toggles the hidden state. Delete removes the item for this session only; refresh restores the demo list.
        </p>
      </div>
    </div>,
  args: {
    type: 'blocks',
    status: 'draft'
  }
}`,...l.parameters?.docs?.source}}},u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  render: () => <div className="storybook-left-panel-story-surface">
      <LeftPanel type="blocks" />
      <LeftPanel type="fixed-blocks" />
      <LeftPanel type="theme-settings" />
    </div>
}`,...u.parameters?.docs?.source}}},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  render: () => <div className="storybook-left-panel-item-story-grid">
      {['default', 'hover', 'focused', 'disabled'].map(state => <LeftPanelItem key={\`default-\${state}\`} label="Imager Banner" state={state} />)}
      {['default', 'hover', 'focused', 'disabled'].map(state => <LeftPanelItem key={\`pressed-\${state}\`} label="Imager Banner" pressed state={state} />)}
    </div>,
  parameters: {
    layout: 'centered'
  }
}`,...d.parameters?.docs?.source}}},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  render: () => <div className="storybook-left-panel-status-story-row">
      <ThemeStatus status="draft" />
      <ThemeStatus status="active" />
    </div>,
  parameters: {
    layout: 'centered'
  }
}`,...f.parameters?.docs?.source}}},p=[`Playground`,`Variants`,`ItemStates`,`Status`]}))();export{d as ItemStates,l as Playground,f as Status,u as Variants,p as __namedExportsOrder,c as default};