import{a as e,n as t}from"./chunk-DnJy8xQt.js";import{t as n}from"./jsx-runtime-DxP0NviS.js";import{t as r}from"./prop-types-CoCJfGF0.js";var i=t((()=>{})),a,o,s,c=t((()=>{a=e(r(),1),i(),o=n(),s=({variant:e=`primary`,size:t=`small`,label:n,className:r,...i})=>(0,o.jsx)(`button`,{type:`button`,className:[`storybook-button`,`storybook-button--${e}`,`storybook-button--${t}`,r].filter(Boolean).join(` `),...i,children:n}),s.propTypes={variant:a.default.oneOf([`primary`,`secondary`,`tertiary`,`destructive`]),size:a.default.oneOf([`small`,`medium`,`large`,`xlarge`]),label:a.default.string.isRequired,className:a.default.string,onClick:a.default.func},s.__docgenInfo={description:`Primary UI component for user interaction`,methods:[],displayName:`Button`,props:{variant:{defaultValue:{value:`'primary'`,computed:!1},description:`Button visual style`,type:{name:`enum`,value:[{value:`'primary'`,computed:!1},{value:`'secondary'`,computed:!1},{value:`'tertiary'`,computed:!1},{value:`'destructive'`,computed:!1}]},required:!1},size:{defaultValue:{value:`'small'`,computed:!1},description:`How large should the button be?`,type:{name:`enum`,value:[{value:`'small'`,computed:!1},{value:`'medium'`,computed:!1},{value:`'large'`,computed:!1},{value:`'xlarge'`,computed:!1}]},required:!1},label:{description:`Button contents`,type:{name:`string`},required:!0},className:{description:`Additional class names`,type:{name:`string`},required:!1},onClick:{description:`Optional click handler`,type:{name:`func`},required:!1}}}})),l,u,d,f,p,m,h,g,_;t((()=>{c(),l=n(),{fn:u}=__STORYBOOK_MODULE_TEST__,d={title:`Design System/Components/Button`,component:s,parameters:{layout:`centered`},tags:[`autodocs`],argTypes:{variant:{control:`select`,options:[`primary`,`secondary`,`tertiary`,`destructive`]},size:{control:`select`,options:[`small`,`medium`,`large`,`xlarge`]},disabled:{control:`boolean`}},args:{onClick:u()}},f={args:{variant:`primary`,size:`small`,label:`Button CTA`}},p={render:()=>(0,l.jsxs)(`div`,{style:{display:`flex`,flexWrap:`wrap`,gap:`var(--spacing_3)`},children:[(0,l.jsx)(s,{variant:`primary`,size:`medium`,label:`Primary`}),(0,l.jsx)(s,{variant:`secondary`,size:`medium`,label:`Secondary`}),(0,l.jsx)(s,{variant:`tertiary`,size:`medium`,label:`Button CTA`}),(0,l.jsx)(s,{variant:`destructive`,size:`medium`,label:`Destructive`})]})},m={render:()=>(0,l.jsxs)(`div`,{style:{display:`flex`,flexWrap:`wrap`,alignItems:`center`,gap:`var(--spacing_3)`},children:[(0,l.jsx)(s,{variant:`primary`,size:`small`,label:`Small`}),(0,l.jsx)(s,{variant:`primary`,size:`medium`,label:`Medium`}),(0,l.jsx)(s,{variant:`primary`,size:`large`,label:`Large`}),(0,l.jsx)(s,{variant:`primary`,size:`xlarge`,label:`Xlarge`})]})},h={args:{variant:`primary`,size:`medium`,label:`Disabled`,disabled:!0}},g={render:()=>(0,l.jsxs)(`div`,{style:{display:`flex`,flexWrap:`wrap`,gap:`var(--spacing_4)`},children:[(0,l.jsx)(s,{variant:`primary`,size:`medium`,label:`Primary focus`,className:`storybook-button--focus`}),(0,l.jsx)(s,{variant:`destructive`,size:`medium`,label:`Destructive focus`,className:`storybook-button--focus`})]})},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  args: {
    variant: 'primary',
    size: 'small',
    label: 'Button CTA'
  }
}`,...f.parameters?.docs?.source}}},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    flexWrap: 'wrap',
    gap: 'var(--spacing_3)'
  }}>
      <Button variant="primary" size="medium" label="Primary" />
      <Button variant="secondary" size="medium" label="Secondary" />
      <Button variant="tertiary" size="medium" label="Button CTA" />
      <Button variant="destructive" size="medium" label="Destructive" />
    </div>
}`,...p.parameters?.docs?.source}}},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: 'var(--spacing_3)'
  }}>
      <Button variant="primary" size="small" label="Small" />
      <Button variant="primary" size="medium" label="Medium" />
      <Button variant="primary" size="large" label="Large" />
      <Button variant="primary" size="xlarge" label="Xlarge" />
    </div>
}`,...m.parameters?.docs?.source}}},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  args: {
    variant: 'primary',
    size: 'medium',
    label: 'Disabled',
    disabled: true
  }
}`,...h.parameters?.docs?.source}}},g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    flexWrap: 'wrap',
    gap: 'var(--spacing_4)'
  }}>
      <Button variant="primary" size="medium" label="Primary focus" className="storybook-button--focus" />
      <Button variant="destructive" size="medium" label="Destructive focus" className="storybook-button--focus" />
    </div>
}`,...g.parameters?.docs?.source}}},_=[`Primary`,`Variants`,`Sizes`,`Disabled`,`Focus`]}))();export{h as Disabled,g as Focus,f as Primary,m as Sizes,p as Variants,_ as __namedExportsOrder,d as default};