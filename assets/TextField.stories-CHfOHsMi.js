import{a as e,n as t}from"./chunk-DnJy8xQt.js";import{a as n}from"./iframe-D2v4_9JU.js";import{t as r}from"./jsx-runtime-DxP0NviS.js";import{t as i}from"./prop-types-CoCJfGF0.js";import{n as a,t as o}from"./index.es-Cvtg6n-d.js";var s=t((()=>{})),c,l,u,d,f=t((()=>{c=e(i(),1),o(),l=e(n(),1),s(),u=r(),d=({state:e=`default`,label:t=!0,astriks:n=!1,tooltip:r=!1,labelText:i=`Label`,placeholder:o=`Placeholder text`,helperText:s=`Info text comes here`,errorText:c=`Error text comes here`,disabled:d=!1,...f})=>{let[p,m]=(0,l.useState)(``),h=e===`disabled`||d;return(0,u.jsxs)(`div`,{className:`storybook-textfield`,children:[t&&(0,u.jsxs)(`div`,{className:`storybook-textfield__label-wrapper`,children:[(0,u.jsx)(`label`,{className:`storybook-textfield__label`,htmlFor:`textfield`,children:i}),r&&(0,u.jsx)(a,{size:16,weight:`regular`,className:`storybook-textfield__tooltip`}),n&&(0,u.jsx)(`span`,{className:`storybook-textfield__astriks`,children:`*`})]}),(0,u.jsx)(`input`,{id:`textfield`,type:`text`,value:p,disabled:h,placeholder:o,"aria-invalid":e===`error`,"aria-disabled":h,"aria-describedby":e===`info`?`textfield-helper`:e===`error`?`textfield-error`:void 0,className:[`storybook-textfield__input`,`storybook-textfield--${e}`,p&&`storybook-textfield--filled`].filter(Boolean).join(` `),onChange:e=>m(e.target.value),...f}),e===`info`&&(0,u.jsx)(`span`,{id:`textfield-helper`,className:`storybook-textfield__helper`,children:s}),e===`error`&&(0,u.jsx)(`span`,{id:`textfield-error`,className:`storybook-textfield__error`,children:c})]})},d.propTypes={state:c.default.oneOf([`default`,`active`,`filled`,`info`,`error`,`disabled`]),label:c.default.bool,astriks:c.default.bool,tooltip:c.default.bool,labelText:c.default.string,placeholder:c.default.string,helperText:c.default.string,errorText:c.default.string,disabled:c.default.bool},d.__docgenInfo={description:``,methods:[],displayName:`TextField`,props:{state:{defaultValue:{value:`'default'`,computed:!1},description:``,type:{name:`enum`,value:[{value:`'default'`,computed:!1},{value:`'active'`,computed:!1},{value:`'filled'`,computed:!1},{value:`'info'`,computed:!1},{value:`'error'`,computed:!1},{value:`'disabled'`,computed:!1}]},required:!1},label:{defaultValue:{value:`true`,computed:!1},description:``,type:{name:`bool`},required:!1},astriks:{defaultValue:{value:`false`,computed:!1},description:``,type:{name:`bool`},required:!1},tooltip:{defaultValue:{value:`false`,computed:!1},description:``,type:{name:`bool`},required:!1},labelText:{defaultValue:{value:`'Label'`,computed:!1},description:``,type:{name:`string`},required:!1},placeholder:{defaultValue:{value:`'Placeholder text'`,computed:!1},description:``,type:{name:`string`},required:!1},helperText:{defaultValue:{value:`'Info text comes here'`,computed:!1},description:``,type:{name:`string`},required:!1},errorText:{defaultValue:{value:`'Error text comes here'`,computed:!1},description:``,type:{name:`string`},required:!1},disabled:{defaultValue:{value:`false`,computed:!1},description:``,type:{name:`bool`},required:!1}}}})),p,m,h,g,_;t((()=>{f(),p=r(),m={title:`Design System/Components/Text fields`,component:d,parameters:{layout:`centered`},tags:[`autodocs`],argTypes:{type:{control:`select`,options:[`input`]},state:{control:`select`,description:`Accessibility and interaction states`,options:[`default`,`active`,`filled`,`info`,`error`,`disabled`]},label:{control:`boolean`},astriks:{control:`boolean`},tooltip:{control:`boolean`}}},h={args:{type:`input`,state:`default`,label:!0,astriks:!0,tooltip:!0,labelText:`Label`,placeholder:`Placeholder text`}},g={render:()=>(0,p.jsxs)(`div`,{style:{display:`flex`,gap:`40px`,flexWrap:`wrap`},children:[(0,p.jsx)(d,{state:`default`,label:!0,astriks:!0,tooltip:!0}),(0,p.jsx)(d,{state:`active`,label:!0,astriks:!0,tooltip:!0}),(0,p.jsx)(d,{state:`filled`,label:!0,astriks:!0,tooltip:!0}),(0,p.jsx)(d,{state:`info`,label:!0,astriks:!0,tooltip:!0}),(0,p.jsx)(d,{state:`error`,label:!0,astriks:!0,tooltip:!0}),(0,p.jsx)(d,{state:`disabled`,label:!0,astriks:!0,tooltip:!0})]})},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  args: {
    type: 'input',
    state: 'default',
    label: true,
    astriks: true,
    tooltip: true,
    labelText: 'Label',
    placeholder: 'Placeholder text'
  }
}`,...h.parameters?.docs?.source}}},g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    gap: '40px',
    flexWrap: 'wrap'
  }}>
  
        <TextField state="default" label astriks tooltip />
  
        <TextField state="active" label astriks tooltip />
  
        <TextField state="filled" label astriks tooltip />
  
        <TextField state="info" label astriks tooltip />
  
        <TextField state="error" label astriks tooltip />
  
        <TextField state="disabled" label astriks tooltip />
  
      </div>
}`,...g.parameters?.docs?.source}}},_=[`Playground`,`InputFieldStates`]}))();export{g as InputFieldStates,h as Playground,_ as __namedExportsOrder,m as default};