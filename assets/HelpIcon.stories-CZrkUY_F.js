import{n as e}from"./chunk-DnJy8xQt.js";import{t}from"./jsx-runtime-DxP0NviS.js";import{n,t as r}from"./HelpIcon-uA4VBfuy.js";var i,a,o,s,c,l,u,d,f;e((()=>{n(),i=t(),a=[`Top no arrow`,`Top arrow`,`Top left`,`Top right`,`Bottom`,`Left`,`Right`],o={title:`Molecules/Tooltip`,component:r,parameters:{layout:`centered`},tags:[`autodocs`],argTypes:{open:{control:`boolean`},supportingText:{control:`boolean`},tooltip:{control:`select`,options:a},title:{control:`text`},description:{control:`text`}}},s={args:{open:!1,supportingText:!1,tooltip:`Top no arrow`,title:`This is a tooltip`},render:e=>(0,i.jsx)(`div`,{style:{padding:180},children:(0,i.jsx)(r,{...e})})},c={render:()=>(0,i.jsx)(`div`,{className:`help-icon-story-grid`,children:a.map(e=>(0,i.jsx)(r,{tooltip:e},e))})},l={args:{supportingText:!0,tooltip:`Top arrow`},render:e=>(0,i.jsx)(`div`,{style:{padding:180},children:(0,i.jsx)(r,{...e})})},u={render:()=>(0,i.jsx)(`div`,{className:`help-icon-story-stack`,children:a.map(e=>(0,i.jsx)(`div`,{className:`help-icon-story-row`,children:(0,i.jsx)(r,{open:!0,tooltip:e})},e))})},d={render:()=>(0,i.jsx)(`div`,{className:`help-icon-story-stack help-icon-story-stack--wide`,children:a.map(e=>(0,i.jsx)(`div`,{className:`help-icon-story-row`,children:(0,i.jsx)(r,{open:!0,supportingText:!0,tooltip:e})},e))})},s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    open: false,
    supportingText: false,
    tooltip: 'Top no arrow',
    title: 'This is a tooltip'
  },
  render: args => <div style={{
    padding: 180
  }}>
      <HelpIcon {...args} />
    </div>
}`,...s.parameters?.docs?.source}}},c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  render: () => <div className="help-icon-story-grid">
      {placements.map(placement => <HelpIcon key={placement} tooltip={placement} />)}
    </div>
}`,...c.parameters?.docs?.source}}},l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: {
    supportingText: true,
    tooltip: 'Top arrow'
  },
  render: args => <div style={{
    padding: 180
  }}>
      <HelpIcon {...args} />
    </div>
}`,...l.parameters?.docs?.source}}},u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  render: () => <div className="help-icon-story-stack">
      {placements.map(placement => <div key={placement} className="help-icon-story-row">
          <HelpIcon open tooltip={placement} />
        </div>)}
    </div>
}`,...u.parameters?.docs?.source}}},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  render: () => <div className="help-icon-story-stack help-icon-story-stack--wide">
      {placements.map(placement => <div key={placement} className="help-icon-story-row">
          <HelpIcon open supportingText tooltip={placement} />
        </div>)}
    </div>
}`,...d.parameters?.docs?.source}}},f=[`Playground`,`Closed`,`HoverInteraction`,`OpenWithoutSupportingText`,`OpenWithSupportingText`]}))();export{c as Closed,l as HoverInteraction,d as OpenWithSupportingText,u as OpenWithoutSupportingText,s as Playground,f as __namedExportsOrder,o as default};