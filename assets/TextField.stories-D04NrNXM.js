import{n as e}from"./chunk-DnJy8xQt.js";import{t}from"./jsx-runtime-DxP0NviS.js";import{t as n}from"./Typography-VHhF8HGF.js";import{t as r}from"./Typography-CHZPSMKC.js";import{d as i,r as a,s as o}from"./DropdownField-CMwY4u-S.js";import{n as s,t as c}from"./TextField-DKRPV705.js";var l,u,d,f,p,m,h,g,_,v,y,b,x,S,C,w,T,E;e((()=>{s(),r(),i(),l=t(),u=[`Phoenix Baker`,`Olivia Rhye`,`Lana Steiner`,`Demi Wilkinson`,`Candice Wu`,`Natali Craig`,`Drew Cano`],d=[{label:`Phoenix Baker`,value:`Phoenix Baker`},{label:`Olivia Rhye`,value:`Olivia Rhye`,active:!0},{label:`Lana Steiner`,value:`Lana Steiner`,state:`disabled`},{label:`Remove option`,value:`Remove option`,state:`destructive`}],f={label:!0,astriks:!0,tooltip:!0,labelText:`Label`,tooltipPlacement:`Top arrow`,options:u},p=[`default`,`active`,`filled`,`info`,`error`,`disabled`],m=[...a],h={title:`Molecules/Text Fields`,component:c,parameters:{layout:`centered`,docs:{description:{component:`Text fields match the Supernova Figma component set and cover input, dropdown, color, date, search, paragraph, mobile number, and multiselect variants.`}}},tags:[`autodocs`],argTypes:{type:{control:`select`,options:m,labels:o},state:{control:`select`,options:p},label:{control:`boolean`},astriks:{control:`boolean`},required:{control:`boolean`},tooltip:{control:`boolean`},tooltipOpen:{control:`boolean`},tooltipPlacement:{control:`select`,options:[`Top no arrow`,`Top arrow`,`Top left`,`Top right`,`Bottom`,`Left`,`Right`]},tooltipSupportingText:{control:`boolean`},tooltipTitle:{control:`text`},tooltipDescription:{control:`text`},withIcon:{control:`boolean`},dropdownListVariant:{control:`select`,options:[`icon-left`,`checkbox-left`,`radio-left`,`toggle-right`,`icon-right`,`check-right`,`text`]},dropdownListItems:{control:`object`},datePickerType:{control:`select`,options:[`single-date`,`month`,`year`,`date-range`,`dual-dates`,`with-presets`]},datePickerProps:{control:`object`},defaultSelectedOptions:{control:`object`},selectedOptions:{control:`object`}}},g={render:e=>(0,l.jsx)(c,{...e},`${e.type}-${e.state}`),args:{type:`input-fields`,state:`default`,...f,tooltipOpen:!1}},_={render:()=>(0,l.jsx)(`div`,{className:`grid grid-cols-[repeat(3,296px)] items-start gap-10`,children:p.map(e=>(0,l.jsx)(c,{type:`input-fields`,state:e,...f},e))})},v={render:()=>(0,l.jsx)(`div`,{className:`grid grid-cols-[repeat(3,296px)] items-start gap-10`,children:p.map(e=>(0,l.jsx)(`div`,{className:e===`active`?`min-h-[360px]`:void 0,children:(0,l.jsx)(c,{type:`dropdown-field`,state:e,...f})},e))})},y={render:()=>(0,l.jsx)(`div`,{className:`grid grid-cols-[repeat(3,296px)] items-start gap-10`,children:p.map(e=>(0,l.jsx)(`div`,{className:e===`active`?`min-h-[360px]`:void 0,children:(0,l.jsx)(c,{type:`multiselect-field-one-line`,state:e,...f})},e))})},b={render:()=>(0,l.jsx)(`div`,{className:`grid grid-cols-[repeat(3,296px)] items-start gap-10`,children:m.map(e=>(0,l.jsxs)(`div`,{className:`flex flex-col gap-3`,children:[(0,l.jsx)(n,{as:`p`,variant:`text-sm`,weight:`semibold`,className:`m-0 text-ds-text-sm font-semibold text-neutral-900`,children:o[e]}),(0,l.jsx)(c,{type:e,state:`default`,label:e!==`search-fields`,astriks:!0,tooltip:!0,labelText:`Label`,options:u})]},e))})},x={render:()=>(0,l.jsx)(`div`,{className:`grid grid-cols-[repeat(3,296px)] items-start gap-10`,children:p.map(e=>(0,l.jsx)(c,{type:`search-fields`,state:e,label:!1},e))})},S={render:()=>(0,l.jsx)(`div`,{className:`grid grid-cols-[repeat(3,296px)] items-start gap-10`,children:p.map(e=>(0,l.jsx)(c,{type:`text-area`,state:e,...f},e))})},C={render:e=>(0,l.jsx)(c,{...e},`${e.type}-${e.state}`),args:{type:`color-dropdown`,state:`default`,...f}},w={render:e=>(0,l.jsx)(`div`,{className:e.state===`active`?`min-h-[360px]`:void 0,children:(0,l.jsx)(c,{...e},`${e.type}-${e.state}`)}),args:{type:`dropdown-field`,state:`default`,withIcon:!0,...f}},T={render:e=>(0,l.jsx)(`div`,{className:e.state===`active`?`min-h-[360px]`:void 0,children:(0,l.jsx)(c,{...e},`${e.dropdownListVariant}-${e.state}`)}),args:{type:`dropdown-field`,state:`default`,dropdownListVariant:`icon-left`,dropdownListItems:d,...f}},g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  render: args => <TextField key={\`\${args.type}-\${args.state}\`} {...args} />,
  args: {
    type: 'input-fields',
    state: 'default',
    ...commonProps,
    tooltipOpen: false
  }
}`,...g.parameters?.docs?.source}}},_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  render: () => <div className="grid grid-cols-[repeat(3,296px)] items-start gap-10">
      {fieldStates.map(state => <TextField key={state} type="input-fields" state={state} {...commonProps} />)}
    </div>
}`,..._.parameters?.docs?.source}}},v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  render: () => <div className="grid grid-cols-[repeat(3,296px)] items-start gap-10">
      {fieldStates.map(state => <div key={state} className={state === 'active' ? 'min-h-[360px]' : undefined}>
          <TextField type="dropdown-field" state={state} {...commonProps} />
        </div>)}
    </div>
}`,...v.parameters?.docs?.source}}},y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  render: () => <div className="grid grid-cols-[repeat(3,296px)] items-start gap-10">
      {fieldStates.map(state => <div key={state} className={state === 'active' ? 'min-h-[360px]' : undefined}>
          <TextField type="multiselect-field-one-line" state={state} {...commonProps} />
        </div>)}
    </div>
}`,...y.parameters?.docs?.source}}},b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  render: () => <div className="grid grid-cols-[repeat(3,296px)] items-start gap-10">
      {fieldTypes.map(type => <div key={type} className="flex flex-col gap-3">
          <Text as="p" variant="text-sm" weight="semibold" className="m-0 text-ds-text-sm font-semibold text-neutral-900">
            {fieldTypeLabels[type]}
          </Text>
          <TextField type={type} state="default" label={type !== 'search-fields'} astriks tooltip labelText="Label" options={dropdownOptions} />
        </div>)}
    </div>
}`,...b.parameters?.docs?.source}}},x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  render: () => <div className="grid grid-cols-[repeat(3,296px)] items-start gap-10">
      {fieldStates.map(state => <TextField key={state} type="search-fields" state={state} label={false} />)}
    </div>
}`,...x.parameters?.docs?.source}}},S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  render: () => <div className="grid grid-cols-[repeat(3,296px)] items-start gap-10">
      {fieldStates.map(state => <TextField key={state} type="text-area" state={state} {...commonProps} />)}
    </div>
}`,...S.parameters?.docs?.source}}},C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
  render: args => <TextField key={\`\${args.type}-\${args.state}\`} {...args} />,
  args: {
    type: 'color-dropdown',
    state: 'default',
    ...commonProps
  }
}`,...C.parameters?.docs?.source}}},w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  render: args => <div className={args.state === 'active' ? 'min-h-[360px]' : undefined}>
      <TextField key={\`\${args.type}-\${args.state}\`} {...args} />
    </div>,
  args: {
    type: 'dropdown-field',
    state: 'default',
    withIcon: true,
    ...commonProps
  }
}`,...w.parameters?.docs?.source}}},T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{
  render: args => <div className={args.state === 'active' ? 'min-h-[360px]' : undefined}>
      <TextField key={\`\${args.dropdownListVariant}-\${args.state}\`} {...args} />
    </div>,
  args: {
    type: 'dropdown-field',
    state: 'default',
    dropdownListVariant: 'icon-left',
    dropdownListItems: styledDropdownItems,
    ...commonProps
  }
}`,...T.parameters?.docs?.source}}},E=[`Playground`,`InputFieldStates`,`DropdownFieldStates`,`MultiselectOneLineFieldStates`,`FieldTypes`,`SearchStates`,`ParagraphStates`,`ColorPicker`,`DropdownWithIcons`,`DropdownListCustomization`]}))();export{C as ColorPicker,v as DropdownFieldStates,T as DropdownListCustomization,w as DropdownWithIcons,b as FieldTypes,_ as InputFieldStates,y as MultiselectOneLineFieldStates,S as ParagraphStates,g as Playground,x as SearchStates,E as __namedExportsOrder,h as default};