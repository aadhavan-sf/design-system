import{n as e}from"./chunk-DnJy8xQt.js";import{t}from"./jsx-runtime-DxP0NviS.js";import{n,t as r}from"./Chip-C988VNhP.js";var i,a,o,s,c,l,u,d;e((()=>{n(),i=t(),a={title:`Molecules/Chip`,component:r,parameters:{layout:`centered`,docs:{description:{component:`Chip atom covering display chips and interactive chip buttons from Figma, with size, icon, shape, border, active, and state controls.`}}},tags:[`autodocs`],argTypes:{type:{control:`select`,options:[`chip`,`button`]},size:{control:`select`,options:[`sm`,`md`,`lg`]},shape:{control:`select`,options:[`pill`,`rounded`]},icon:{control:`select`,options:[`none`,`right`,`left`,`both`,`avatar-left`,`avatar-right`,`icon-only`]},state:{control:`select`,options:[`default`,`hover`,`focused`,`disabled`]},border:{control:`boolean`},active:{control:`boolean`},defaultActive:{control:`boolean`}}},o={args:{type:`chip`,label:`Label`,size:`sm`,shape:`pill`,icon:`none`,border:!1,defaultActive:!1,state:`default`}},s={args:{type:`button`,label:`Label`,size:`md`,shape:`pill`,icon:`right`,defaultActive:!1,state:`default`}},c={render:()=>{let e=[`none`,`right`,`left`,`both`,`avatar-left`,`avatar-right`,`icon-only`];return(0,i.jsx)(`div`,{className:`chip-story-stack`,children:[`pill`,`rounded`].map(t=>(0,i.jsxs)(`div`,{className:`chip-story-grid`,children:[e.map(e=>[`sm`,`md`,`lg`].map(n=>(0,i.jsx)(r,{border:!1,icon:e,shape:t,size:n},`${t}-${e}-${n}`))),e.map(e=>[`sm`,`md`,`lg`].map(n=>(0,i.jsx)(r,{border:!0,icon:e,shape:t,size:n},`${t}-${e}-${n}-bordered`)))]},t))})}},l={render:()=>(0,i.jsx)(`div`,{className:`chip-story-stack`,children:[`none`,`right`,`left`,`icon-only`].map(e=>(0,i.jsxs)(`div`,{className:`chip-story-row`,children:[[`sm`,`md`,`lg`].map(t=>(0,i.jsx)(r,{type:`button`,icon:e,size:t},`${e}-${t}`)),[`sm`,`md`,`lg`].map(t=>(0,i.jsx)(r,{type:`button`,active:!0,icon:e,size:t},`${e}-${t}-active`))]},e))})},u={render:()=>(0,i.jsx)(`div`,{className:`chip-story-stack`,children:[`default`,`hover`,`focused`,`disabled`].map(e=>(0,i.jsxs)(`div`,{className:`chip-story-row`,children:[(0,i.jsx)(r,{type:`button`,state:e}),(0,i.jsx)(r,{type:`button`,active:!0,state:e}),(0,i.jsx)(r,{type:`button`,icon:`right`,state:e}),(0,i.jsx)(r,{type:`button`,active:!0,icon:`right`,state:e}),(0,i.jsx)(r,{type:`button`,icon:`left`,state:e}),(0,i.jsx)(r,{type:`button`,active:!0,icon:`left`,state:e}),(0,i.jsx)(r,{type:`button`,icon:`icon-only`,state:e}),(0,i.jsx)(r,{type:`button`,active:!0,icon:`icon-only`,state:e})]},e))})},o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    type: 'chip',
    label: 'Label',
    size: 'sm',
    shape: 'pill',
    icon: 'none',
    border: false,
    defaultActive: false,
    state: 'default'
  }
}`,...o.parameters?.docs?.source}}},s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    type: 'button',
    label: 'Label',
    size: 'md',
    shape: 'pill',
    icon: 'right',
    defaultActive: false,
    state: 'default'
  }
}`,...s.parameters?.docs?.source}}},c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  render: () => {
    const icons = ['none', 'right', 'left', 'both', 'avatar-left', 'avatar-right', 'icon-only'];
    return <div className="chip-story-stack">
        {['pill', 'rounded'].map(shape => <div className="chip-story-grid" key={shape}>
            {icons.map(icon => ['sm', 'md', 'lg'].map(size => <Chip key={\`\${shape}-\${icon}-\${size}\`} border={false} icon={icon} shape={shape} size={size} />))}
            {icons.map(icon => ['sm', 'md', 'lg'].map(size => <Chip key={\`\${shape}-\${icon}-\${size}-bordered\`} border icon={icon} shape={shape} size={size} />))}
          </div>)}
      </div>;
  }
}`,...c.parameters?.docs?.source}}},l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  render: () => <div className="chip-story-stack">
      {['none', 'right', 'left', 'icon-only'].map(icon => <div className="chip-story-row" key={icon}>
          {['sm', 'md', 'lg'].map(size => <Chip key={\`\${icon}-\${size}\`} type="button" icon={icon} size={size} />)}
          {['sm', 'md', 'lg'].map(size => <Chip key={\`\${icon}-\${size}-active\`} type="button" active icon={icon} size={size} />)}
        </div>)}
    </div>
}`,...l.parameters?.docs?.source}}},u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  render: () => <div className="chip-story-stack">
      {['default', 'hover', 'focused', 'disabled'].map(state => <div className="chip-story-row" key={state}>
          <Chip type="button" state={state} />
          <Chip type="button" active state={state} />
          <Chip type="button" icon="right" state={state} />
          <Chip type="button" active icon="right" state={state} />
          <Chip type="button" icon="left" state={state} />
          <Chip type="button" active icon="left" state={state} />
          <Chip type="button" icon="icon-only" state={state} />
          <Chip type="button" active icon="icon-only" state={state} />
        </div>)}
    </div>
}`,...u.parameters?.docs?.source}}},d=[`Playground`,`InteractiveChipButton`,`ChipVariants`,`ChipButtons`,`ButtonStates`]}))();export{u as ButtonStates,l as ChipButtons,c as ChipVariants,s as InteractiveChipButton,o as Playground,d as __namedExportsOrder,a as default};