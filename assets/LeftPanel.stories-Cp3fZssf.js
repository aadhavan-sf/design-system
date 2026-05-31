import{n as e}from"./chunk-DnJy8xQt.js";import{t}from"./jsx-runtime-DxP0NviS.js";import{i as n,n as r,r as i,t as a}from"./LeftPanel-DP-_Gvcm.js";var o=e((()=>{})),s,c,l,u,d,f,p,m;e((()=>{n(),o(),s=t(),{fn:c}=__STORYBOOK_MODULE_TEST__,l={title:`Organisms/Left Panel`,component:a,parameters:{layout:`fullscreen`,docs:{description:{component:`Left panel organism with block lists, fixed block areas, theme settings navigation, reusable left panel list items, and theme status chips. In the docs preview, hiding an item toggles the hidden visual state and deleting an item removes it only for the current session; refreshing restores the demo data.`}}},tags:[`autodocs`],argTypes:{type:{control:`select`,options:[`blocks`,`fixed-blocks`,`theme-settings`]},status:{control:`select`,options:[`draft`,`active`]},selectedItemId:{control:`text`}},args:{onAddBlock:c(),onBack:c(),onFooterClick:c(),onInsertBlock:c(),onItemChange:c()}},u={render:e=>(0,s.jsx)(`div`,{className:`storybook-left-panel-story-surface`,children:(0,s.jsxs)(`div`,{className:`storybook-left-panel-story-demo`,children:[(0,s.jsx)(a,{...e}),(0,s.jsx)(`p`,{className:`storybook-left-panel-story-note`,children:`Preview note: hide toggles the hidden state. Delete removes the item for this session only; refresh restores the demo list.`})]})}),args:{type:`blocks`,status:`draft`}},d={render:()=>(0,s.jsxs)(`div`,{className:`storybook-left-panel-story-surface`,children:[(0,s.jsx)(a,{type:`blocks`}),(0,s.jsx)(a,{type:`fixed-blocks`}),(0,s.jsx)(a,{type:`theme-settings`})]})},f={render:()=>(0,s.jsxs)(`div`,{className:`storybook-left-panel-item-story-grid`,children:[[`default`,`hover`,`focused`,`disabled`].map(e=>(0,s.jsx)(r,{label:`Imager Banner`,state:e},`default-${e}`)),[`default`,`hover`,`focused`,`disabled`].map(e=>(0,s.jsx)(r,{label:`Imager Banner`,pressed:!0,state:e},`pressed-${e}`))]}),parameters:{layout:`centered`}},p={render:()=>(0,s.jsxs)(`div`,{className:`storybook-left-panel-status-story-row`,children:[(0,s.jsx)(i,{status:`draft`}),(0,s.jsx)(i,{status:`active`})]}),parameters:{layout:`centered`}},u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
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
}`,...u.parameters?.docs?.source}}},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  render: () => <div className="storybook-left-panel-story-surface">
      <LeftPanel type="blocks" />
      <LeftPanel type="fixed-blocks" />
      <LeftPanel type="theme-settings" />
    </div>
}`,...d.parameters?.docs?.source}}},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  render: () => <div className="storybook-left-panel-item-story-grid">
      {['default', 'hover', 'focused', 'disabled'].map(state => <LeftPanelItem key={\`default-\${state}\`} label="Imager Banner" state={state} />)}
      {['default', 'hover', 'focused', 'disabled'].map(state => <LeftPanelItem key={\`pressed-\${state}\`} label="Imager Banner" pressed state={state} />)}
    </div>,
  parameters: {
    layout: 'centered'
  }
}`,...f.parameters?.docs?.source}}},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  render: () => <div className="storybook-left-panel-status-story-row">
      <ThemeStatus status="draft" />
      <ThemeStatus status="active" />
    </div>,
  parameters: {
    layout: 'centered'
  }
}`,...p.parameters?.docs?.source}}},m=[`Playground`,`Variants`,`ItemStates`,`Status`]}))();export{f as ItemStates,u as Playground,p as Status,d as Variants,m as __namedExportsOrder,l as default};