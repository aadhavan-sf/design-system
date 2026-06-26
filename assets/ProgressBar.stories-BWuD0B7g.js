import{n as e}from"./chunk-DnJy8xQt.js";import{t}from"./jsx-runtime-DxP0NviS.js";import{n,t as r}from"./ProgressBar-CnXnAUhE.js";var i,a,o,s,c,l;e((()=>{n(),i=t(),a={title:`Molecules/Progress Bar`,component:r,parameters:{layout:`centered`},tags:[`autodocs`],argTypes:{value:{control:{type:`range`,min:0,max:100,step:1}},disabled:{control:`boolean`}},decorators:[e=>(0,i.jsx)(`div`,{className:`w-[320px]`,children:(0,i.jsx)(e,{})})]},o={args:{value:75,disabled:!1}},s={render:()=>(0,i.jsx)(`div`,{className:`flex w-[320px] flex-col gap-6`,children:[0,25,50,75,100].map(e=>(0,i.jsx)(r,{value:e},e))})},c={args:{value:75,disabled:!0}},o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    value: 75,
    disabled: false
  }
}`,...o.parameters?.docs?.source}}},s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex w-[320px] flex-col gap-6">
      {[0, 25, 50, 75, 100].map(value => <ProgressBar key={value} value={value} />)}
    </div>
}`,...s.parameters?.docs?.source}}},c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  args: {
    value: 75,
    disabled: true
  }
}`,...c.parameters?.docs?.source}}},l=[`Playground`,`Values`,`Disabled`]}))();export{c as Disabled,o as Playground,s as Values,l as __namedExportsOrder,a as default};