import{n as e}from"./chunk-DnJy8xQt.js";import{t}from"./jsx-runtime-DxP0NviS.js";import{n,t as r}from"./DropdownList-BluKH4gw.js";var i,a,o,s,c,l,u;e((()=>{n(),i=t(),a=[`icon-left`,`checkbox-left`,`radio-left`,`toggle-right`,`icon-right`,`check-right`,`text`],o=[{label:`Head Content Editor`,value:`editor`},{label:`Head Content Editor`,value:`editor-active`,selected:!0},{label:`Head Content Editor`,value:`editor-disabled`,state:`disabled`},{label:`Remove language`,value:`remove-language`,state:`destructive`}],s={title:`Molecules/Dropdown List`,component:r,parameters:{layout:`centered`,docs:{description:{component:`Atomic dropdown list rows with icon, checkbox, radio, toggle, check-right, disabled, active, and destructive states.`}}},tags:[`autodocs`],argTypes:{variant:{control:`select`,options:a}}},c={args:{items:o,variant:`icon-left`}},l={render:()=>(0,i.jsx)(`div`,{className:`grid grid-cols-[repeat(3,240px)] items-start gap-x-16 gap-y-24`,children:a.map(e=>(0,i.jsx)(r,{items:o,variant:e},e))})},c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  args: {
    items: sampleItems,
    variant: 'icon-left'
  }
}`,...c.parameters?.docs?.source}}},l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  render: () => <div className="grid grid-cols-[repeat(3,240px)] items-start gap-x-16 gap-y-24">
      {variants.map(variant => <DropdownList key={variant} items={sampleItems} variant={variant} />)}
    </div>
}`,...l.parameters?.docs?.source}}},u=[`Playground`,`Variants`]}))();export{c as Playground,l as Variants,u as __namedExportsOrder,s as default};