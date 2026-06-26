import{n as e}from"./chunk-DnJy8xQt.js";import{t}from"./jsx-runtime-DxP0NviS.js";import{i as n,n as r,r as i,t as a}from"./SettingsPanel-4paV_24i.js";var o,s,c,l,u,d,f,p,m;e((()=>{n(),o=t(),{fn:s}=__STORYBOOK_MODULE_TEST__,c=`h-[846px] w-[284px] shrink-0`,l={title:`Organisms/Settings Panel`,component:a,parameters:{layout:`fullscreen`,docs:{description:{component:`Settings panel organism with reusable menu panel items, help action, warning indicators, and App Settings/App Distribution variants from Figma.`}}},tags:[`autodocs`],argTypes:{type:{control:`select`,options:[`app-settings`,`app-distribution`]},showHelp:{control:`boolean`},activeLabel:{control:`text`},items:{control:`object`},warningLabels:{control:`object`},betaLabels:{control:`object`}},args:{onHelpClick:s(),onItemChange:s()}},u={render:e=>(0,o.jsx)(`div`,{className:`flex min-h-screen items-start justify-center bg-neutral-100 p-6`,children:(0,o.jsx)(`div`,{className:c,children:(0,o.jsx)(a,{...e})})}),args:{type:`app-settings`,showHelp:!0}},d={render:()=>(0,o.jsxs)(`div`,{className:`flex min-h-screen items-start justify-center gap-8 bg-neutral-100 p-6`,children:[(0,o.jsx)(`div`,{className:c,children:(0,o.jsx)(a,{type:`app-settings`})}),(0,o.jsx)(`div`,{className:c,children:(0,o.jsx)(a,{type:`app-distribution`})})]})},f={render:()=>(0,o.jsxs)(`div`,{className:`flex flex-col gap-4 p-5`,children:[(0,o.jsx)(i,{label:`Manage Stores`,showBeta:!0,showIcon:!1}),(0,o.jsx)(i,{label:`Store Switcher`,pressed:!0,showBeta:!0,showIcon:!1}),(0,o.jsx)(r,{})]}),parameters:{layout:`centered`}},p={render:()=>(0,o.jsxs)(`div`,{className:`grid grid-cols-[repeat(2,285px)] gap-x-[86px] gap-y-[68px] p-5`,children:[[`default`,`hover`,`focused`,`disabled`].map(e=>(0,o.jsx)(i,{label:`Label`,showIcon:!0,state:e},`unpressed-${e}`)),[`default`,`hover`,`focused`,`disabled`].map(e=>(0,o.jsx)(i,{label:`Label`,pressed:!0,showIcon:!0,state:e},`pressed-${e}`))]}),parameters:{layout:`centered`}},u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  render: args => <div className="flex min-h-screen items-start justify-center bg-neutral-100 p-6">
      <div className={panelFrameClassName}>
        <SettingsPanel {...args} />
      </div>
    </div>,
  args: {
    type: 'app-settings',
    showHelp: true
  }
}`,...u.parameters?.docs?.source}}},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex min-h-screen items-start justify-center gap-8 bg-neutral-100 p-6">
      <div className={panelFrameClassName}>
        <SettingsPanel type="app-settings" />
      </div>
      <div className={panelFrameClassName}>
        <SettingsPanel type="app-distribution" />
      </div>
    </div>
}`,...d.parameters?.docs?.source}}},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex flex-col gap-4 p-5">
      <SettingsPanelItem label="Manage Stores" showBeta showIcon={false} />
      <SettingsPanelItem label="Store Switcher" pressed showBeta showIcon={false} />
      <SettingsPanelBetaTag />
    </div>,
  parameters: {
    layout: 'centered'
  }
}`,...f.parameters?.docs?.source}}},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  render: () => <div className="grid grid-cols-[repeat(2,285px)] gap-x-[86px] gap-y-[68px] p-5">
      {['default', 'hover', 'focused', 'disabled'].map(state => <SettingsPanelItem key={\`unpressed-\${state}\`} label="Label" showIcon state={state} />)}
      {['default', 'hover', 'focused', 'disabled'].map(state => <SettingsPanelItem key={\`pressed-\${state}\`} label="Label" pressed showIcon state={state} />)}
    </div>,
  parameters: {
    layout: 'centered'
  }
}`,...p.parameters?.docs?.source}}},m=[`Playground`,`Variants`,`BetaTag`,`MenuItemStates`]}))();export{f as BetaTag,p as MenuItemStates,u as Playground,d as Variants,m as __namedExportsOrder,l as default};