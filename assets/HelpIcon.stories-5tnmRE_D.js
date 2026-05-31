import{n as e}from"./chunk-DnJy8xQt.js";import{t}from"./jsx-runtime-DxP0NviS.js";import{n,t as r}from"./HelpIcon-23pW8YYq.js";var i=e((()=>{})),a,o,s,c,l,u,d,f,p;e((()=>{n(),i(),a=t(),o=[`Top no arrow`,`Top arrow`,`Top left`,`Top right`,`Bottom`,`Left`,`Right`],s={title:`Molecules/Tooltip`,component:r,parameters:{layout:`centered`},tags:[`autodocs`],argTypes:{open:{control:`boolean`},supportingText:{control:`boolean`},tooltip:{control:`select`,options:o},title:{control:`text`},description:{control:`text`}}},c={args:{open:!1,supportingText:!1,tooltip:`Top no arrow`,title:`This is a tooltip`},render:e=>(0,a.jsx)(`div`,{style:{padding:180},children:(0,a.jsx)(r,{...e})})},l={render:()=>(0,a.jsx)(`div`,{className:`help-icon-story-grid`,children:o.map(e=>(0,a.jsx)(r,{tooltip:e},e))})},u={args:{supportingText:!0,tooltip:`Top arrow`},render:e=>(0,a.jsx)(`div`,{style:{padding:180},children:(0,a.jsx)(r,{...e})})},d={render:()=>(0,a.jsx)(`div`,{className:`help-icon-story-stack`,children:o.map(e=>(0,a.jsx)(`div`,{className:`help-icon-story-row`,children:(0,a.jsx)(r,{open:!0,tooltip:e})},e))})},f={render:()=>(0,a.jsx)(`div`,{className:`help-icon-story-stack help-icon-story-stack--wide`,children:o.map(e=>(0,a.jsx)(`div`,{className:`help-icon-story-row`,children:(0,a.jsx)(r,{open:!0,supportingText:!0,tooltip:e})},e))})},c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
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
}`,...c.parameters?.docs?.source}}},l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  render: () => <div className="help-icon-story-grid">
      {placements.map(placement => <HelpIcon key={placement} tooltip={placement} />)}
    </div>
}`,...l.parameters?.docs?.source}}},u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  args: {
    supportingText: true,
    tooltip: 'Top arrow'
  },
  render: args => <div style={{
    padding: 180
  }}>
      <HelpIcon {...args} />
    </div>
}`,...u.parameters?.docs?.source}}},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  render: () => <div className="help-icon-story-stack">
      {placements.map(placement => <div key={placement} className="help-icon-story-row">
          <HelpIcon open tooltip={placement} />
        </div>)}
    </div>
}`,...d.parameters?.docs?.source}}},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  render: () => <div className="help-icon-story-stack help-icon-story-stack--wide">
      {placements.map(placement => <div key={placement} className="help-icon-story-row">
          <HelpIcon open supportingText tooltip={placement} />
        </div>)}
    </div>
}`,...f.parameters?.docs?.source}}},p=[`Playground`,`Closed`,`HoverInteraction`,`OpenWithoutSupportingText`,`OpenWithSupportingText`]}))();export{l as Closed,u as HoverInteraction,f as OpenWithSupportingText,d as OpenWithoutSupportingText,c as Playground,p as __namedExportsOrder,s as default};