import{n as e}from"./chunk-DnJy8xQt.js";import{t}from"./jsx-runtime-DxP0NviS.js";import{n,r,t as i}from"./TopNavigation-BHvdkb5t.js";var a,o,s,c,l,u,d;e((()=>{r(),a=t(),{fn:o}=__STORYBOOK_MODULE_TEST__,s={title:`Organisms/Top Navigation`,component:i,parameters:{layout:`fullscreen`,docs:{description:{component:`Top navigation organism with pill navigation items, separators, active states, and item state matrix from Figma.`}}},tags:[`autodocs`],argTypes:{activeIndex:{control:`number`},items:{control:`object`}},args:{onItemChange:o()}},c={render:e=>(0,a.jsx)(`div`,{className:`top-navigation-story-surface`,children:(0,a.jsx)(i,{...e})}),args:{activeIndex:1,items:[{label:`Theme Settings`,icon:`gear`},{label:`Home`,icon:`home`},{label:`PLP`,icon:`plp`},{label:`PDP`,icon:`tag`},{label:`Cart`,icon:`cart`}]}},l={render:()=>(0,a.jsx)(`div`,{className:`top-navigation-story-surface`,children:(0,a.jsx)(i,{})})},u={render:()=>(0,a.jsxs)(`div`,{className:`top-navigation-item-story-grid`,children:[[`default`,`hover`,`focused`,`disabled`].map(e=>(0,a.jsx)(n,{label:`Theme Settings`,state:e},`unpressed-${e}`)),[`default`,`hover`,`focused`,`disabled`].map(e=>(0,a.jsx)(n,{label:`Theme Settings`,pressed:!0,state:e},`pressed-${e}`))]}),parameters:{layout:`centered`}},c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  render: args => <div className="top-navigation-story-surface">
      <TopNavigation {...args} />
    </div>,
  args: {
    activeIndex: 1,
    items: [{
      label: 'Theme Settings',
      icon: 'gear'
    }, {
      label: 'Home',
      icon: 'home'
    }, {
      label: 'PLP',
      icon: 'plp'
    }, {
      label: 'PDP',
      icon: 'tag'
    }, {
      label: 'Cart',
      icon: 'cart'
    }]
  }
}`,...c.parameters?.docs?.source}}},l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  render: () => <div className="top-navigation-story-surface">
      <TopNavigation />
    </div>
}`,...l.parameters?.docs?.source}}},u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  render: () => <div className="top-navigation-item-story-grid">
      {(['default', 'hover', 'focused', 'disabled'] satisfies TopNavigationItemState[]).map(state => <TopNavigationItem key={\`unpressed-\${state}\`} label="Theme Settings" state={state} />)}
      {(['default', 'hover', 'focused', 'disabled'] satisfies TopNavigationItemState[]).map(state => <TopNavigationItem key={\`pressed-\${state}\`} label="Theme Settings" pressed state={state} />)}
    </div>,
  parameters: {
    layout: 'centered'
  }
}`,...u.parameters?.docs?.source}}},d=[`Playground`,`Variant`,`ItemStates`]}))();export{u as ItemStates,c as Playground,l as Variant,d as __namedExportsOrder,s as default};