import{n as e}from"./chunk-DnJy8xQt.js";import{t}from"./jsx-runtime-DxP0NviS.js";import{t as n}from"./Typography-U8lT9V-o.js";import{t as r}from"./Typography-D-456NUn.js";import{a as i,i as a,n as o,r as s,t as c}from"./TextField-BRHQvK_2.js";var l,u,d,f,p,m,h,g,_,v,y,b,x,S,C,w,T;e((()=>{o(),r(),i(),l=t(),u=[`Phoenix Baker`,`Olivia Rhye`,`Lana Steiner`,`Demi Wilkinson`,`Candice Wu`,`Natali Craig`,`Drew Cano`],d=[{label:`Phoenix Baker`,value:`Phoenix Baker`},{label:`Olivia Rhye`,value:`Olivia Rhye`,active:!0},{label:`Lana Steiner`,value:`Lana Steiner`,state:`disabled`},{label:`Remove option`,value:`Remove option`,state:`destructive`}],f={label:!0,astriks:!0,tooltip:!0,labelText:`Label`,tooltipPlacement:`Top arrow`,options:u},p=[`default`,`active`,`filled`,`info`,`error`,`disabled`],m=[...s],h={title:`Molecules/Text Fields`,component:c,parameters:{layout:`centered`,docs:{description:{component:`Text fields match the Supernova Figma component set and cover input, dropdown, color, date, search, paragraph, mobile number, and multiselect variants.`}}},tags:[`autodocs`],argTypes:{type:{control:`select`,options:m,labels:a},state:{control:`select`,options:p},label:{control:`boolean`},astriks:{control:`boolean`},required:{control:`boolean`},tooltip:{control:`boolean`},tooltipOpen:{control:`boolean`},tooltipPlacement:{control:`select`,options:[`Top no arrow`,`Top arrow`,`Top left`,`Top right`,`Bottom`,`Left`,`Right`]},tooltipSupportingText:{control:`boolean`},tooltipTitle:{control:`text`},tooltipDescription:{control:`text`},withIcon:{control:`boolean`},dropdownListVariant:{control:`select`,options:[`icon-left`,`checkbox-left`,`radio-left`,`toggle-right`,`icon-right`,`check-right`,`text`]},dropdownListItems:{control:`object`},datePickerType:{control:`select`,options:[`single-date`,`month`,`year`,`date-range`,`with-presets`,`dual-dates`]},datePickerProps:{control:`object`},defaultSelectedOptions:{control:`object`},selectedOptions:{control:`object`}}},g={render:e=>(0,l.jsx)(c,{...e},`${e.type}-${e.state}`),args:{type:`input-fields`,state:`default`,...f,tooltipOpen:!1}},_={render:()=>(0,l.jsx)(`div`,{className:`textfield-story-grid`,children:p.map(e=>(0,l.jsx)(c,{type:`input-fields`,state:e,...f},e))})},v={render:()=>(0,l.jsx)(`div`,{className:`textfield-story-grid`,children:p.map(e=>(0,l.jsx)(c,{type:`dropdown-field`,state:e,...f},e))})},y={render:()=>(0,l.jsx)(`div`,{className:`textfield-story-grid`,children:m.map(e=>(0,l.jsxs)(`div`,{className:`textfield-story-item`,children:[(0,l.jsx)(n,{as:`p`,variant:`text-sm`,weight:`semibold`,className:`textfield-story-label`,children:a[e]}),(0,l.jsx)(c,{type:e,state:`default`,label:e!==`search-fields`,astriks:!0,tooltip:!0,labelText:`Label`,options:u})]},e))})},b={render:()=>(0,l.jsx)(`div`,{className:`textfield-story-grid`,children:p.map(e=>(0,l.jsx)(c,{type:`search-fields`,state:e,label:!1},e))})},x={render:()=>(0,l.jsx)(`div`,{className:`textfield-story-grid`,children:p.map(e=>(0,l.jsx)(c,{type:`text-area`,state:e,...f},e))})},S={render:e=>(0,l.jsx)(c,{...e},`${e.type}-${e.state}`),args:{type:`color-dropdown`,state:`default`,...f}},C={render:e=>(0,l.jsx)(c,{...e},`${e.type}-${e.state}`),args:{type:`dropdown-field`,state:`default`,withIcon:!0,...f}},w={render:e=>(0,l.jsx)(c,{...e},`${e.dropdownListVariant}-${e.state}`),args:{type:`dropdown-field`,state:`default`,dropdownListVariant:`icon-left`,dropdownListItems:d,...f}},g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  render: args => <TextField key={\`\${args.type}-\${args.state}\`} {...args} />,
  args: {
    type: 'input-fields',
    state: 'default',
    ...commonProps,
    tooltipOpen: false
  }
}`,...g.parameters?.docs?.source}}},_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  render: () => <div className="textfield-story-grid">
      {fieldStates.map(state => <TextField key={state} type="input-fields" state={state} {...commonProps} />)}
    </div>
}`,..._.parameters?.docs?.source}}},v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  render: () => <div className="textfield-story-grid">
      {fieldStates.map(state => <TextField key={state} type="dropdown-field" state={state} {...commonProps} />)}
    </div>
}`,...v.parameters?.docs?.source}}},y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  render: () => <div className="textfield-story-grid">
      {fieldTypes.map(type => <div key={type} className="textfield-story-item">
          <Text as="p" variant="text-sm" weight="semibold" className="textfield-story-label">
            {fieldTypeLabels[type]}
          </Text>
          <TextField type={type} state="default" label={type !== 'search-fields'} astriks tooltip labelText="Label" options={dropdownOptions} />
        </div>)}
    </div>
}`,...y.parameters?.docs?.source}}},b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  render: () => <div className="textfield-story-grid">
      {fieldStates.map(state => <TextField key={state} type="search-fields" state={state} label={false} />)}
    </div>
}`,...b.parameters?.docs?.source}}},x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  render: () => <div className="textfield-story-grid">
      {fieldStates.map(state => <TextField key={state} type="text-area" state={state} {...commonProps} />)}
    </div>
}`,...x.parameters?.docs?.source}}},S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  render: args => <TextField key={\`\${args.type}-\${args.state}\`} {...args} />,
  args: {
    type: 'color-dropdown',
    state: 'default',
    ...commonProps
  }
}`,...S.parameters?.docs?.source}}},C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
  render: args => <TextField key={\`\${args.type}-\${args.state}\`} {...args} />,
  args: {
    type: 'dropdown-field',
    state: 'default',
    withIcon: true,
    ...commonProps
  }
}`,...C.parameters?.docs?.source}}},w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  render: args => <TextField key={\`\${args.dropdownListVariant}-\${args.state}\`} {...args} />,
  args: {
    type: 'dropdown-field',
    state: 'default',
    dropdownListVariant: 'icon-left',
    dropdownListItems: styledDropdownItems,
    ...commonProps
  }
}`,...w.parameters?.docs?.source}}},T=[`Playground`,`InputFieldStates`,`DropdownFieldStates`,`FieldTypes`,`SearchStates`,`ParagraphStates`,`ColorPicker`,`DropdownWithIcons`,`DropdownListCustomization`]}))();export{S as ColorPicker,v as DropdownFieldStates,w as DropdownListCustomization,C as DropdownWithIcons,y as FieldTypes,_ as InputFieldStates,x as ParagraphStates,g as Playground,b as SearchStates,T as __namedExportsOrder,h as default};