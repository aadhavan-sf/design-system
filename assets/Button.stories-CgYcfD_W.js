import{a as e,n as t}from"./chunk-DnJy8xQt.js";import{t as n}from"./jsx-runtime-DxP0NviS.js";import{t as r}from"./prop-types-CoCJfGF0.js";import{i,t as a}from"./index.es-DCIEdG-z.js";var o=t((()=>{})),s,c,l,u=t((()=>{s=e(r(),1),a(),o(),c=n(),l=({hierarchy:e=`primary`,destructive:t=!1,icon:n=`none`,state:r=`default`,size:a=`small`,label:o,className:s,...l})=>{let u=(0,c.jsx)(i,{size:20,weight:`regular`,color:`currentColor`}),d=n===`only`;return(0,c.jsx)(`button`,{type:`button`,disabled:r===`disabled`,className:[`storybook-button`,`storybook-button--${e}`,t&&`storybook-button--destructive`,`storybook-button--${a}`,d&&`storybook-button--icon-only`,r===`focus`&&`storybook-button--focus`,s].filter(Boolean).join(` `),...l,children:(0,c.jsxs)(`span`,{className:`storybook-button__content`,children:[(n===`left`||n===`only`)&&(0,c.jsx)(`span`,{className:`storybook-button__icon--left`,children:u}),!d&&(0,c.jsx)(`span`,{className:`storybook-button__label`,children:o}),n===`right`&&(0,c.jsx)(`span`,{className:`storybook-button__icon--right`,children:u})]})})},l.propTypes={hierarchy:s.default.oneOf([`primary`,`secondary`,`link-grey`,`link-color`]),destructive:s.default.bool,icon:s.default.oneOf([`none`,`left`,`right`,`only`]),state:s.default.oneOf([`default`,`focus`,`disabled`]),size:s.default.oneOf([`small`,`medium`,`large`,`xlarge`]),label:s.default.string,className:s.default.string,onClick:s.default.func},l.__docgenInfo={description:`Primary UI component for user interaction`,methods:[],displayName:`Button`,props:{hierarchy:{defaultValue:{value:`'primary'`,computed:!1},description:``,type:{name:`enum`,value:[{value:`'primary'`,computed:!1},{value:`'secondary'`,computed:!1},{value:`'link-grey'`,computed:!1},{value:`'link-color'`,computed:!1}]},required:!1},destructive:{defaultValue:{value:`false`,computed:!1},description:``,type:{name:`bool`},required:!1},icon:{defaultValue:{value:`'none'`,computed:!1},description:``,type:{name:`enum`,value:[{value:`'none'`,computed:!1},{value:`'left'`,computed:!1},{value:`'right'`,computed:!1},{value:`'only'`,computed:!1}]},required:!1},state:{defaultValue:{value:`'default'`,computed:!1},description:``,type:{name:`enum`,value:[{value:`'default'`,computed:!1},{value:`'focus'`,computed:!1},{value:`'disabled'`,computed:!1}]},required:!1},size:{defaultValue:{value:`'small'`,computed:!1},description:``,type:{name:`enum`,value:[{value:`'small'`,computed:!1},{value:`'medium'`,computed:!1},{value:`'large'`,computed:!1},{value:`'xlarge'`,computed:!1}]},required:!1},label:{description:``,type:{name:`string`},required:!1},className:{description:``,type:{name:`string`},required:!1},onClick:{description:``,type:{name:`func`},required:!1}}}})),d,f,p,m,h,g,_,v,y,b,x,S,C,w;t((()=>{u(),d=n(),{fn:f}=__STORYBOOK_MODULE_TEST__,p={title:`Design System/Components/Button`,component:l,parameters:{layout:`centered`},tags:[`autodocs`],argTypes:{hierarchy:{control:`select`,options:[`primary`,`secondary`,`link-grey`,`link-color`]},size:{control:`select`,options:[`small`,`medium`,`large`,`xlarge`]},icon:{control:`select`,options:[`none`,`left`,`right`,`only`]},destructive:{control:`boolean`},state:{control:`select`,options:[`default`,`focus`,`disabled`]}},args:{onClick:f()}},m={args:{hierarchy:`primary`,size:`small`,icon:`none`,destructive:!1,state:`default`,label:`Button CTA`}},h={render:()=>(0,d.jsxs)(`div`,{style:{display:`flex`,flexWrap:`wrap`,gap:`var(--spacing_3)`},children:[(0,d.jsx)(l,{hierarchy:`primary`,size:`medium`,label:`Primary`}),(0,d.jsx)(l,{hierarchy:`secondary`,size:`medium`,label:`Secondary`}),(0,d.jsx)(l,{hierarchy:`link-grey`,size:`medium`,label:`Link Grey`}),(0,d.jsx)(l,{hierarchy:`link-color`,size:`medium`,label:`Link Color`})]})},g={render:()=>(0,d.jsxs)(`div`,{style:{display:`flex`,flexWrap:`wrap`,gap:`var(--spacing_5)`,alignItems:`center`},children:[(0,d.jsx)(l,{hierarchy:`primary`,destructive:!0,size:`medium`,label:`Primary`}),(0,d.jsx)(l,{hierarchy:`link-color`,destructive:!0,size:`medium`,label:`Link`})]})},_={render:()=>(0,d.jsxs)(`div`,{style:{display:`flex`,flexWrap:`wrap`,alignItems:`center`,gap:`var(--spacing_3)`},children:[(0,d.jsx)(l,{hierarchy:`primary`,size:`small`,label:`Small`}),(0,d.jsx)(l,{hierarchy:`primary`,size:`medium`,label:`Medium`}),(0,d.jsx)(l,{hierarchy:`primary`,size:`large`,label:`Large`}),(0,d.jsx)(l,{hierarchy:`primary`,size:`xlarge`,label:`Xlarge`})]})},v={render:()=>(0,d.jsxs)(`div`,{style:{display:`flex`,flexWrap:`wrap`,alignItems:`center`,gap:`var(--spacing_3)`},children:[(0,d.jsx)(l,{hierarchy:`primary`,size:`medium`,label:`Left Icon`,icon:`left`}),(0,d.jsx)(l,{hierarchy:`primary`,size:`medium`,label:`Right Icon`,icon:`right`}),(0,d.jsx)(l,{hierarchy:`primary`,size:`medium`,icon:`only`})]})},y={render:()=>(0,d.jsxs)(`div`,{style:{display:`flex`,flexWrap:`wrap`,gap:`var(--spacing_4)`},children:[(0,d.jsx)(l,{hierarchy:`primary`,size:`medium`,label:`Primary Focus`,state:`focus`}),(0,d.jsx)(l,{hierarchy:`secondary`,size:`medium`,label:`Secondary Focus`,state:`focus`}),(0,d.jsx)(l,{hierarchy:`primary`,destructive:!0,size:`medium`,label:`Destructive Focus`,state:`focus`})]})},b={args:{hierarchy:`primary`,size:`medium`,label:`Button CTA`,icon:`left`}},x={args:{hierarchy:`primary`,size:`medium`,label:`Button CTA`,icon:`right`}},S={args:{hierarchy:`primary`,size:`medium`,icon:`only`}},C={render:()=>(0,d.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:`24px`},children:[(0,d.jsxs)(`div`,{style:{display:`flex`,gap:`16px`,flexWrap:`wrap`},children:[(0,d.jsx)(l,{hierarchy:`primary`,size:`small`,label:`Small`,state:`disabled`}),(0,d.jsx)(l,{hierarchy:`primary`,size:`medium`,label:`Medium`,state:`disabled`}),(0,d.jsx)(l,{hierarchy:`primary`,size:`large`,label:`Large`,state:`disabled`}),(0,d.jsx)(l,{hierarchy:`primary`,size:`xlarge`,label:`Xlarge`,state:`disabled`})]}),(0,d.jsxs)(`div`,{style:{display:`flex`,gap:`16px`,flexWrap:`wrap`},children:[(0,d.jsx)(l,{hierarchy:`primary`,size:`medium`,label:`Left Icon`,icon:`left`,state:`disabled`}),(0,d.jsx)(l,{hierarchy:`primary`,size:`medium`,label:`Right Icon`,icon:`right`,state:`disabled`}),(0,d.jsx)(l,{hierarchy:`primary`,size:`medium`,icon:`only`,state:`disabled`})]}),(0,d.jsxs)(`div`,{style:{display:`flex`,gap:`16px`,flexWrap:`wrap`,alignItems:`center`},children:[(0,d.jsx)(l,{hierarchy:`primary`,destructive:!0,size:`medium`,label:`Button CTA`,state:`disabled`}),(0,d.jsx)(l,{hierarchy:`link-color`,destructive:!0,size:`medium`,label:`Button CTA`,state:`disabled`})]})]})},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  args: {
    hierarchy: 'primary',
    size: 'small',
    icon: 'none',
    destructive: false,
    state: 'default',
    label: 'Button CTA'
  }
}`,...m.parameters?.docs?.source}}},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
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
}`,...h.parameters?.docs?.source}}},g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    flexWrap: 'wrap',
    gap: 'var(--spacing_5)',
    alignItems: 'center'
  }}>
      <Button hierarchy="primary" destructive size="medium" label="Primary" />

      <Button hierarchy="link-color" destructive size="medium" label="Link" />
    </div>
}`,...g.parameters?.docs?.source}}},_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
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
}`,..._.parameters?.docs?.source}}},v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
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
}`,...v.parameters?.docs?.source}}},y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    flexWrap: 'wrap',
    gap: 'var(--spacing_4)'
  }}>
      <Button hierarchy="primary" size="medium" label="Primary Focus" state="focus" />

      <Button hierarchy="secondary" size="medium" label="Secondary Focus" state="focus" />

      <Button hierarchy="primary" destructive size="medium" label="Destructive Focus" state="focus" />
    </div>
}`,...y.parameters?.docs?.source}}},b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  args: {
    hierarchy: 'primary',
    size: 'medium',
    label: 'Button CTA',
    icon: 'left'
  }
}`,...b.parameters?.docs?.source}}},x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  args: {
    hierarchy: 'primary',
    size: 'medium',
    label: 'Button CTA',
    icon: 'right'
  }
}`,...x.parameters?.docs?.source}}},S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  args: {
    hierarchy: 'primary',
    size: 'medium',
    icon: 'only'
  }
}`,...S.parameters?.docs?.source}}},C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
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
}`,...C.parameters?.docs?.source}}},w=[`Playground`,`Variants`,`DestructiveVariants`,`Sizes`,`Icons`,`Focus`,`PrimaryWithLeftIcon`,`PrimaryWithRightIcon`,`PrimaryIconOnly`,`DisabledStates`]}))();export{g as DestructiveVariants,C as DisabledStates,y as Focus,v as Icons,m as Playground,S as PrimaryIconOnly,b as PrimaryWithLeftIcon,x as PrimaryWithRightIcon,_ as Sizes,h as Variants,w as __namedExportsOrder,p as default};