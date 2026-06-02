import{n as e}from"./chunk-DnJy8xQt.js";import{t}from"./jsx-runtime-DxP0NviS.js";import{n,t as r}from"./Button-BnJ-OlkP.js";var i,a,o,s,c,l,u,d,f,p,m,h,g,_;e((()=>{n(),i=t(),{fn:a}=__STORYBOOK_MODULE_TEST__,o={title:`Molecules/Buttons`,component:r,parameters:{layout:`centered`},tags:[`autodocs`],argTypes:{hierarchy:{control:`select`,options:[`primary`,`secondary`,`link-grey`,`link-color`]},size:{control:`select`,options:[`small`,`medium`,`large`,`xlarge`]},icon:{control:`select`,options:[`none`,`left`,`right`,`only`]},destructive:{control:`boolean`},state:{control:`select`,options:[`default`,`focus`,`disabled`]}},args:{onClick:a()}},s={args:{hierarchy:`primary`,size:`small`,icon:`none`,destructive:!1,state:`default`,label:`Button CTA`}},c={render:()=>(0,i.jsxs)(`div`,{style:{display:`flex`,flexWrap:`wrap`,gap:`var(--spacing_3)`},children:[(0,i.jsx)(r,{hierarchy:`primary`,size:`medium`,label:`Primary`}),(0,i.jsx)(r,{hierarchy:`secondary`,size:`medium`,label:`Secondary`}),(0,i.jsx)(r,{hierarchy:`link-grey`,size:`medium`,label:`Link Grey`}),(0,i.jsx)(r,{hierarchy:`link-color`,size:`medium`,label:`Link Color`})]})},l={render:()=>(0,i.jsxs)(`div`,{style:{display:`flex`,flexWrap:`wrap`,gap:`var(--spacing_5)`,alignItems:`center`},children:[(0,i.jsx)(r,{hierarchy:`primary`,destructive:!0,size:`medium`,label:`Primary`}),(0,i.jsx)(r,{hierarchy:`link-color`,destructive:!0,size:`medium`,label:`Link`})]})},u={render:()=>(0,i.jsxs)(`div`,{style:{display:`flex`,flexWrap:`wrap`,alignItems:`center`,gap:`var(--spacing_3)`},children:[(0,i.jsx)(r,{hierarchy:`primary`,size:`small`,label:`Small`}),(0,i.jsx)(r,{hierarchy:`primary`,size:`medium`,label:`Medium`}),(0,i.jsx)(r,{hierarchy:`primary`,size:`large`,label:`Large`}),(0,i.jsx)(r,{hierarchy:`primary`,size:`xlarge`,label:`Xlarge`})]})},d={render:()=>(0,i.jsxs)(`div`,{style:{display:`flex`,flexWrap:`wrap`,alignItems:`center`,gap:`var(--spacing_3)`},children:[(0,i.jsx)(r,{hierarchy:`primary`,size:`medium`,label:`Left Icon`,icon:`left`}),(0,i.jsx)(r,{hierarchy:`primary`,size:`medium`,label:`Right Icon`,icon:`right`}),(0,i.jsx)(r,{hierarchy:`primary`,size:`medium`,icon:`only`})]})},f={render:()=>(0,i.jsxs)(`div`,{style:{display:`flex`,flexWrap:`wrap`,gap:`var(--spacing_4)`},children:[(0,i.jsx)(r,{hierarchy:`primary`,size:`medium`,label:`Primary Focus`,state:`focus`}),(0,i.jsx)(r,{hierarchy:`secondary`,size:`medium`,label:`Secondary Focus`,state:`focus`}),(0,i.jsx)(r,{hierarchy:`primary`,destructive:!0,size:`medium`,label:`Destructive Focus`,state:`focus`})]})},p={args:{hierarchy:`primary`,size:`medium`,label:`Button CTA`,icon:`left`}},m={args:{hierarchy:`primary`,size:`medium`,label:`Button CTA`,icon:`right`}},h={args:{hierarchy:`primary`,size:`medium`,icon:`only`}},g={render:()=>(0,i.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:`24px`},children:[(0,i.jsxs)(`div`,{style:{display:`flex`,gap:`16px`,flexWrap:`wrap`},children:[(0,i.jsx)(r,{hierarchy:`primary`,size:`small`,label:`Small`,state:`disabled`}),(0,i.jsx)(r,{hierarchy:`primary`,size:`medium`,label:`Medium`,state:`disabled`}),(0,i.jsx)(r,{hierarchy:`primary`,size:`large`,label:`Large`,state:`disabled`}),(0,i.jsx)(r,{hierarchy:`primary`,size:`xlarge`,label:`Xlarge`,state:`disabled`})]}),(0,i.jsxs)(`div`,{style:{display:`flex`,gap:`16px`,flexWrap:`wrap`},children:[(0,i.jsx)(r,{hierarchy:`primary`,size:`medium`,label:`Left Icon`,icon:`left`,state:`disabled`}),(0,i.jsx)(r,{hierarchy:`primary`,size:`medium`,label:`Right Icon`,icon:`right`,state:`disabled`}),(0,i.jsx)(r,{hierarchy:`primary`,size:`medium`,icon:`only`,state:`disabled`})]}),(0,i.jsxs)(`div`,{style:{display:`flex`,gap:`16px`,flexWrap:`wrap`,alignItems:`center`},children:[(0,i.jsx)(r,{hierarchy:`primary`,destructive:!0,size:`medium`,label:`Button CTA`,state:`disabled`}),(0,i.jsx)(r,{hierarchy:`link-color`,destructive:!0,size:`medium`,label:`Button CTA`,state:`disabled`})]})]})},s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    hierarchy: 'primary',
    size: 'small',
    icon: 'none',
    destructive: false,
    state: 'default',
    label: 'Button CTA'
  }
}`,...s.parameters?.docs?.source}}},c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    flexWrap: 'wrap',
    gap: 'var(--spacing_3)'
  }}>
      <Button hierarchy="primary" size="medium" label="Primary" />

      <Button hierarchy="secondary" size="medium" label="Secondary" />

      <Button hierarchy="link-grey" size="medium" label="Link Grey" />

      <Button hierarchy="link-color" size="medium" label="Link Color" />
    </div>
}`,...c.parameters?.docs?.source}}},l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    flexWrap: 'wrap',
    gap: 'var(--spacing_5)',
    alignItems: 'center'
  }}>
      <Button hierarchy="primary" destructive size="medium" label="Primary" />

      <Button hierarchy="link-color" destructive size="medium" label="Link" />
    </div>
}`,...l.parameters?.docs?.source}}},u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: 'var(--spacing_3)'
  }}>
      <Button hierarchy="primary" size="small" label="Small" />
      <Button hierarchy="primary" size="medium" label="Medium" />
      <Button hierarchy="primary" size="large" label="Large" />
      <Button hierarchy="primary" size="xlarge" label="Xlarge" />
    </div>
}`,...u.parameters?.docs?.source}}},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: 'var(--spacing_3)'
  }}>
      <Button hierarchy="primary" size="medium" label="Left Icon" icon="left" />

      <Button hierarchy="primary" size="medium" label="Right Icon" icon="right" />

      <Button hierarchy="primary" size="medium" icon="only" />
    </div>
}`,...d.parameters?.docs?.source}}},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    flexWrap: 'wrap',
    gap: 'var(--spacing_4)'
  }}>
      <Button hierarchy="primary" size="medium" label="Primary Focus" state="focus" />

      <Button hierarchy="secondary" size="medium" label="Secondary Focus" state="focus" />

      <Button hierarchy="primary" destructive size="medium" label="Destructive Focus" state="focus" />
    </div>
}`,...f.parameters?.docs?.source}}},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  args: {
    hierarchy: 'primary',
    size: 'medium',
    label: 'Button CTA',
    icon: 'left'
  }
}`,...p.parameters?.docs?.source}}},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  args: {
    hierarchy: 'primary',
    size: 'medium',
    label: 'Button CTA',
    icon: 'right'
  }
}`,...m.parameters?.docs?.source}}},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  args: {
    hierarchy: 'primary',
    size: 'medium',
    icon: 'only'
  }
}`,...h.parameters?.docs?.source}}},g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    flexDirection: 'column',
    gap: '24px'
  }}>
      <div style={{
      display: 'flex',
      gap: '16px',
      flexWrap: 'wrap'
    }}>
        <Button hierarchy="primary" size="small" label="Small" state="disabled" />

        <Button hierarchy="primary" size="medium" label="Medium" state="disabled" />

        <Button hierarchy="primary" size="large" label="Large" state="disabled" />

        <Button hierarchy="primary" size="xlarge" label="Xlarge" state="disabled" />
      </div>

      <div style={{
      display: 'flex',
      gap: '16px',
      flexWrap: 'wrap'
    }}>
        <Button hierarchy="primary" size="medium" label="Left Icon" icon="left" state="disabled" />

        <Button hierarchy="primary" size="medium" label="Right Icon" icon="right" state="disabled" />

        <Button hierarchy="primary" size="medium" icon="only" state="disabled" />
      </div>

      <div style={{
      display: 'flex',
      gap: '16px',
      flexWrap: 'wrap',
      alignItems: 'center'
    }}>
        <Button hierarchy="primary" destructive size="medium" label="Button CTA" state="disabled" />

        <Button hierarchy="link-color" destructive size="medium" label="Button CTA" state="disabled" />
      </div>
    </div>
}`,...g.parameters?.docs?.source}}},_=[`Playground`,`Variants`,`DestructiveVariants`,`Sizes`,`Icons`,`Focus`,`PrimaryWithLeftIcon`,`PrimaryWithRightIcon`,`PrimaryIconOnly`,`DisabledStates`]}))();export{l as DestructiveVariants,g as DisabledStates,f as Focus,d as Icons,s as Playground,h as PrimaryIconOnly,p as PrimaryWithLeftIcon,m as PrimaryWithRightIcon,u as Sizes,c as Variants,_ as __namedExportsOrder,o as default};