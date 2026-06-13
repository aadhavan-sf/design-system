import{n as e}from"./chunk-DnJy8xQt.js";import{t}from"./jsx-runtime-DxP0NviS.js";import{a as n,i as r,n as i,r as a,t as o}from"./LeftPanel-FYszw4a1.js";var s,c,l,u,d,f,p,m,h,g;e((()=>{n(),s=t(),{fn:c}=__STORYBOOK_MODULE_TEST__,l=`h-[846px] w-[284px] shrink-0`,u={title:`Organisms/Left Panel`,component:o,parameters:{layout:`fullscreen`,docs:{description:{component:`Left panel organism with block lists, fixed block areas, theme settings navigation, reusable left panel list items, and theme status chips. In the docs preview, hiding an item toggles the hidden visual state and deleting an item removes it only for the current session; refreshing restores the demo data.`}}},tags:[`autodocs`],argTypes:{type:{control:`select`,options:[`blocks`,`fixed-blocks`,`theme-settings`]},status:{control:`select`,options:[`draft`,`active`]},selectedItemId:{control:`text`}},args:{onAddBlock:c(),onBack:c(),onFooterClick:c(),onInsertBlock:c(),onItemChange:c()}},d={render:e=>(0,s.jsx)(`div`,{className:`flex min-h-screen items-start justify-center bg-neutral-100 p-8`,children:(0,s.jsxs)(`div`,{className:`flex flex-col items-center gap-4`,children:[(0,s.jsx)(`div`,{className:l,children:(0,s.jsx)(o,{...e})}),(0,s.jsx)(`p`,{className:`max-w-[284px] text-center text-sm text-neutral-600`,children:`Preview note: hide toggles the hidden state. Delete removes the item for this session only; refresh restores the demo list.`})]})}),args:{type:`blocks`,status:`draft`}},f={render:()=>(0,s.jsxs)(`div`,{className:`flex min-h-screen flex-wrap items-start justify-center gap-10 bg-neutral-100 p-8`,children:[(0,s.jsx)(`div`,{className:l,children:(0,s.jsx)(o,{type:`blocks`})}),(0,s.jsx)(`div`,{className:l,children:(0,s.jsx)(o,{type:`fixed-blocks`})}),(0,s.jsx)(`div`,{className:l,children:(0,s.jsx)(o,{type:`theme-settings`})})]})},p={render:()=>(0,s.jsxs)(`div`,{className:`storybook-left-panel-item-story-grid grid grid-cols-[236px_236px] gap-x-24 gap-y-16 p-5`,children:[[`default`,`hover`,`focused`,`disabled`].map(e=>(0,s.jsx)(i,{label:`Imager Banner`,state:e},`default-${e}`)),[`default`,`hover`,`focused`,`disabled`].map(e=>(0,s.jsx)(i,{label:`Imager Banner`,pressed:!0,state:e},`pressed-${e}`))]}),parameters:{layout:`centered`}},m={render:()=>(0,s.jsxs)(`div`,{className:`grid grid-cols-[236px_236px] gap-x-16 gap-y-5 p-5`,children:[[`default`,`hover`,`focused`,`disabled`].map(e=>(0,s.jsx)(a,{label:`App Styling`,state:e},`menu-default-${e}`)),[`default`,`hover`,`focused`,`disabled`].map(e=>(0,s.jsx)(a,{label:`App Styling`,pressed:!0,state:e},`menu-pressed-${e}`))]}),parameters:{layout:`centered`}},h={render:()=>(0,s.jsxs)(`div`,{className:`flex items-center gap-4 p-5`,children:[(0,s.jsx)(r,{status:`draft`}),(0,s.jsx)(r,{status:`active`})]}),parameters:{layout:`centered`}},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  render: args => <div className="flex min-h-screen items-start justify-center bg-neutral-100 p-8">
      <div className="flex flex-col items-center gap-4">
        <div className={panelFrameClassName}>
          <LeftPanel {...args} />
        </div>
        <p className="max-w-[284px] text-center text-sm text-neutral-600">
          Preview note: hide toggles the hidden state. Delete removes the item for this session only; refresh restores the demo list.
        </p>
      </div>
    </div>,
  args: {
    type: 'blocks',
    status: 'draft'
  }
}`,...d.parameters?.docs?.source}}},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex min-h-screen flex-wrap items-start justify-center gap-10 bg-neutral-100 p-8">
      <div className={panelFrameClassName}>
        <LeftPanel type="blocks" />
      </div>
      <div className={panelFrameClassName}>
        <LeftPanel type="fixed-blocks" />
      </div>
      <div className={panelFrameClassName}>
        <LeftPanel type="theme-settings" />
      </div>
    </div>
}`,...f.parameters?.docs?.source}}},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  render: () => <div className="storybook-left-panel-item-story-grid grid grid-cols-[236px_236px] gap-x-24 gap-y-16 p-5">
      {['default', 'hover', 'focused', 'disabled'].map(state => <LeftPanelItem key={\`default-\${state}\`} label="Imager Banner" state={state} />)}
      {['default', 'hover', 'focused', 'disabled'].map(state => <LeftPanelItem key={\`pressed-\${state}\`} label="Imager Banner" pressed state={state} />)}
    </div>,
  parameters: {
    layout: 'centered'
  }
}`,...p.parameters?.docs?.source}}},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  render: () => <div className="grid grid-cols-[236px_236px] gap-x-16 gap-y-5 p-5">
      {['default', 'hover', 'focused', 'disabled'].map(state => <LeftPanelMenuItem key={\`menu-default-\${state}\`} label="App Styling" state={state} />)}
      {['default', 'hover', 'focused', 'disabled'].map(state => <LeftPanelMenuItem key={\`menu-pressed-\${state}\`} label="App Styling" pressed state={state} />)}
    </div>,
  parameters: {
    layout: 'centered'
  }
}`,...m.parameters?.docs?.source}}},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex items-center gap-4 p-5">
      <ThemeStatus status="draft" />
      <ThemeStatus status="active" />
    </div>,
  parameters: {
    layout: 'centered'
  }
}`,...h.parameters?.docs?.source}}},g=[`Playground`,`Variants`,`ItemStates`,`MenuItemStates`,`Status`]}))();export{p as ItemStates,m as MenuItemStates,d as Playground,h as Status,f as Variants,g as __namedExportsOrder,u as default};