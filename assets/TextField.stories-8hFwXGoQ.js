import{a as e,n as t}from"./chunk-DnJy8xQt.js";import{a as n}from"./iframe-z8YQ7n4G.js";import{t as r}from"./jsx-runtime-DxP0NviS.js";import{t as i}from"./prop-types-CoCJfGF0.js";import{a,n as o,o as s,r as c,t as l}from"./index.es-DCIEdG-z.js";var u=t((()=>{})),d,f,p,m,h=t((()=>{d=e(i(),1),f=e(n(),1),l(),u(),p=r(),m=({type:e=`input`,state:t=`default`,label:n=!0,tooltip:r=!1,astriks:i=!1,labelText:l=`Label`,placeholder:u=`Placeholder text`,helperText:d=`Info text comes here`,errorText:m=`Error text comes here`,options:h=[],withIcon:g=!1,disabled:_=!1,...v})=>{let[y,b]=(0,f.useState)(``),[x,S]=(0,f.useState)(``),[C,w]=(0,f.useState)(!1),T=_||t===`disabled`,E=t===`error`,D=t===`active`,O=y.length>0||x.length>0||t===`filled`,k=[`storybook-textfield__input`,D&&`storybook-textfield__input--active`,O&&`storybook-textfield__input--filled`,E&&`storybook-textfield__input--error`,T&&`storybook-textfield__input--disabled`].filter(Boolean).join(` `),A=[`storybook-textfield__dropdown`,D&&`storybook-textfield__dropdown--active`,O&&`storybook-textfield__dropdown--filled`,E&&`storybook-textfield__dropdown--error`,T&&`storybook-textfield__dropdown--disabled`].filter(Boolean).join(` `);return(0,p.jsxs)(`div`,{className:`storybook-textfield`,children:[n&&(0,p.jsxs)(`div`,{className:`storybook-textfield__header`,children:[(0,p.jsx)(`label`,{htmlFor:`textfield`,className:`storybook-textfield__label`,children:l}),r&&(0,p.jsx)(`span`,{className:`storybook-textfield__tooltip`,children:(0,p.jsx)(c,{size:16,weight:`regular`})}),i&&(0,p.jsx)(`span`,{className:`storybook-textfield__required`,children:`*`})]}),e===`input`&&(0,p.jsx)(`input`,{id:`textfield`,type:`text`,value:y,disabled:T,placeholder:u,onChange:e=>b(e.target.value),className:k,"aria-invalid":E,"aria-disabled":T,...v}),e===`dropdown`&&(0,p.jsxs)(`div`,{className:`storybook-textfield__dropdown-wrapper`,children:[(0,p.jsxs)(`button`,{type:`button`,disabled:T,className:A,onClick:()=>w(!C),"aria-expanded":C,children:[(0,p.jsxs)(`div`,{className:`storybook-textfield__dropdown-value`,children:[g&&x&&(0,p.jsx)(o,{size:20,weight:`regular`}),(0,p.jsx)(`span`,{className:[`storybook-textfield__dropdown-text`,O&&`storybook-textfield__dropdown-text--filled`,E&&`storybook-textfield__dropdown-text--error`].filter(Boolean).join(` `),children:x||u})]}),(0,p.jsx)(`span`,{className:`storybook-textfield__dropdown-icon`,children:(0,p.jsx)(s,{size:20,weight:`regular`,className:[`storybook-textfield__dropdown-icon`,E&&`storybook-textfield__dropdown-icon--error`].filter(Boolean).join(` `)})})]}),C&&!T&&(0,p.jsx)(`div`,{className:`storybook-textfield__menu`,children:h.map(e=>{let t=x===e;return(0,p.jsxs)(`button`,{type:`button`,className:[`storybook-textfield__menu-item`,t&&`storybook-textfield__menu-item--selected`].filter(Boolean).join(` `),onClick:()=>{S(e),w(!1)},children:[(0,p.jsxs)(`div`,{className:`storybook-textfield__menu-item-left`,children:[g&&(0,p.jsx)(`span`,{className:`storybook-textfield__menu-item-icon`,children:(0,p.jsx)(o,{size:20,weight:`regular`})}),(0,p.jsx)(`span`,{children:e})]}),t&&(0,p.jsx)(`span`,{className:`storybook-textfield__menu-check`,children:(0,p.jsx)(a,{size:20,weight:`regular`})})]},e)})})]}),t===`info`&&(0,p.jsx)(`span`,{className:`storybook-textfield__helper`,children:d}),E&&(0,p.jsx)(`span`,{className:`storybook-textfield__helper storybook-textfield__helper--error`,children:m})]})},m.propTypes={type:d.default.oneOf([`input`,`dropdown`]),state:d.default.oneOf([`default`,`active`,`filled`,`info`,`error`,`disabled`]),label:d.default.bool,tooltip:d.default.bool,astriks:d.default.bool,labelText:d.default.string,placeholder:d.default.string,helperText:d.default.string,errorText:d.default.string,options:d.default.array,withIcon:d.default.bool,disabled:d.default.bool},m.__docgenInfo={description:``,methods:[],displayName:`TextField`,props:{type:{defaultValue:{value:`'input'`,computed:!1},description:``,type:{name:`enum`,value:[{value:`'input'`,computed:!1},{value:`'dropdown'`,computed:!1}]},required:!1},state:{defaultValue:{value:`'default'`,computed:!1},description:``,type:{name:`enum`,value:[{value:`'default'`,computed:!1},{value:`'active'`,computed:!1},{value:`'filled'`,computed:!1},{value:`'info'`,computed:!1},{value:`'error'`,computed:!1},{value:`'disabled'`,computed:!1}]},required:!1},label:{defaultValue:{value:`true`,computed:!1},description:``,type:{name:`bool`},required:!1},tooltip:{defaultValue:{value:`false`,computed:!1},description:``,type:{name:`bool`},required:!1},astriks:{defaultValue:{value:`false`,computed:!1},description:``,type:{name:`bool`},required:!1},labelText:{defaultValue:{value:`'Label'`,computed:!1},description:``,type:{name:`string`},required:!1},placeholder:{defaultValue:{value:`'Placeholder text'`,computed:!1},description:``,type:{name:`string`},required:!1},helperText:{defaultValue:{value:`'Info text comes here'`,computed:!1},description:``,type:{name:`string`},required:!1},errorText:{defaultValue:{value:`'Error text comes here'`,computed:!1},description:``,type:{name:`string`},required:!1},options:{defaultValue:{value:`[]`,computed:!1},description:``,type:{name:`array`},required:!1},withIcon:{defaultValue:{value:`false`,computed:!1},description:``,type:{name:`bool`},required:!1},disabled:{defaultValue:{value:`false`,computed:!1},description:``,type:{name:`bool`},required:!1}}}})),g,_,v,y,b,x,S,C,w,T,E,D,O;t((()=>{h(),g=r(),_=[`Phoenix Baker`,`Olivia Rhye`,`Lana Steiner`,`Demi Wilkinson`,`Candice Wu`,`Natali Craig`,`Drew Cano`],v={label:!0,astriks:!0,tooltip:!0,labelText:`Label`},y={title:`Design System/Components/Text fields`,component:m,parameters:{layout:`centered`},tags:[`autodocs`],argTypes:{type:{control:`select`,options:[`input`,`dropdown`]},state:{control:`select`,description:`Accessibility and interaction states`,options:[`default`,`active`,`filled`,`info`,`error`,`disabled`]},label:{control:`boolean`},astriks:{control:`boolean`},tooltip:{control:`boolean`},withIcon:{control:`boolean`}}},b={args:{type:`input`,state:`default`,...v,placeholder:`Placeholder text`}},x=[`default`,`active`,`filled`,`info`,`error`,`disabled`],S={render:()=>(0,g.jsx)(`div`,{style:{display:`grid`,gridTemplateColumns:`repeat(3, minmax(280px, 1fr))`,gap:`40px`},children:x.map(e=>(0,g.jsx)(m,{state:e,type:`input`,...v},e))})},C=[`default`,`active`,`filled`,`info`,`error`,`disabled`],w={render:()=>(0,g.jsx)(`div`,{style:{display:`grid`,gridTemplateColumns:`repeat(2, minmax(320px, 1fr))`,gap:`40px`},children:C.map(e=>(0,g.jsx)(m,{type:`dropdown`,state:e,options:_,...v},e))})},T={args:{type:`dropdown`,state:`default`,withIcon:!0,options:_,...v}},E={args:{type:`dropdown`,state:`error`,options:_,...v}},D={args:{type:`dropdown`,state:`disabled`,options:_,...v}},b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  args: {
    type: 'input',
    state: 'default',
    ...commonProps,
    placeholder: 'Placeholder text'
  }
}`,...b.parameters?.docs?.source}}},S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'grid',
    gridTemplateColumns: 'repeat(3, minmax(280px, 1fr))',
    gap: '40px'
  }}>

      {inputStates.map(state => <TextField key={state} state={state} type="input" {...commonProps} />)}

    </div>
}`,...S.parameters?.docs?.source}}},w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'grid',
    gridTemplateColumns: 'repeat(2, minmax(320px, 1fr))',
    gap: '40px'
  }}>

      {dropdownStates.map(state => <TextField key={state} type="dropdown" state={state} options={dropdownOptions} {...commonProps} />)}

    </div>
}`,...w.parameters?.docs?.source}}},T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{
  args: {
    type: 'dropdown',
    state: 'default',
    withIcon: true,
    options: dropdownOptions,
    ...commonProps
  }
}`,...T.parameters?.docs?.source}}},E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`{
  args: {
    type: 'dropdown',
    state: 'error',
    options: dropdownOptions,
    ...commonProps
  }
}`,...E.parameters?.docs?.source}}},D.parameters={...D.parameters,docs:{...D.parameters?.docs,source:{originalSource:`{
  args: {
    type: 'dropdown',
    state: 'disabled',
    options: dropdownOptions,
    ...commonProps
  }
}`,...D.parameters?.docs?.source}}},O=[`Playground`,`InputFieldStates`,`DropdownFieldStates`,`DropdownWithIcons`,`DropdownError`,`DropdownDisabled`]}))();export{D as DropdownDisabled,E as DropdownError,w as DropdownFieldStates,T as DropdownWithIcons,S as InputFieldStates,b as Playground,O as __namedExportsOrder,y as default};