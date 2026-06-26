import{n as e}from"./chunk-DnJy8xQt.js";import{t}from"./jsx-runtime-DxP0NviS.js";import{c as n,l as r,o as i,r as a,s as o}from"./blocks-Dik4g04O.js";import{n as s,t as c}from"./Typography-VHhF8HGF.js";function l(e){let t=e.as??`p`,n=e.variant??`text-xs`,r=e.weight??`regular`,i=typeof e.children==`string`?e.children:`The quick brown fox jumps over the lazy dog.`;return`<Text
  as="${t}"
  variant="${n}"
  weight="${r}"${e.className?`\n  className="${e.className}"`:``}
>
  ${i}
</Text>`}function u(e){let[t,n]=e.split(`-`);return`${t===`display`?`Display`:`Text`} ${n}`}function d(){return(0,f.jsx)(`div`,{className:`flex flex-col gap-6`,children:p.map(e=>(0,f.jsxs)(`div`,{className:`flex flex-col items-start gap-2 border-b border-neutral-100 pb-4`,children:[(0,f.jsxs)(c,{as:`div`,variant:e,weight:`regular`,children:[u(e),` / Regular`]}),(0,f.jsx)(`code`,{children:`${h[e]} font-normal`})]},e))})}var f,p,m,h,g,_,v,y;e((()=>{r(),s(),f=t(),p=[`display-2xl`,`display-xl`,`display-lg`,`display-md`,`display-sm`,`display-xs`,`text-xl`,`text-lg`,`text-md`,`text-sm`,`text-xs`],m=[`regular`,`medium`,`semibold`,`bold`],h={"display-2xl":`text-ds-display-2xl`,"display-xl":`text-ds-display-xl`,"display-lg":`text-ds-display-lg`,"display-md":`text-ds-display-md`,"display-sm":`text-ds-display-sm`,"display-xs":`text-ds-display-xs`,"text-xl":`text-ds-text-xl`,"text-lg":`text-ds-text-lg`,"text-md":`text-ds-text-md`,"text-sm":`text-ds-text-sm`,"text-xs":`text-ds-text-xs`},g={title:`Foundations/Typography`,component:c,parameters:{layout:`padded`,docs:{page:()=>(0,f.jsxs)(f.Fragment,{children:[(0,f.jsx)(n,{}),(0,f.jsx)(o,{}),(0,f.jsx)(a,{}),(0,f.jsx)(i,{children:`Typography Scale`}),(0,f.jsx)(d,{})]})}},tags:[`autodocs`],argTypes:{variant:{control:`select`,options:p},weight:{control:`select`,options:m},as:{control:`select`,options:[`p`,`span`,`div`,`h1`,`h2`,`h3`]},color:{table:{disable:!0}},className:{control:`text`},children:{control:`text`}}},_={render:e=>(0,f.jsx)(c,{...e}),args:{as:`p`,variant:`text-xs`,weight:`regular`,children:`The quick brown fox jumps over the lazy dog.`},parameters:{docs:{source:{transform:(e,t)=>l(t.args)}}}},v={render:()=>(0,f.jsx)(d,{})},_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  render: args => <Text {...args} />,
  args: {
    as: 'p',
    variant: 'text-xs',
    weight: 'regular',
    children: 'The quick brown fox jumps over the lazy dog.'
  },
  parameters: {
    docs: {
      source: {
        transform: (_code: string, context: {
          args: Parameters<typeof getComponentSource>[0];
        }) => getComponentSource(context.args)
      }
    }
  }
}`,..._.parameters?.docs?.source}}},v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  render: () => <TypographyScale />
}`,...v.parameters?.docs?.source}}},y=[`Playground`,`Scale`]}))();export{_ as Playground,v as Scale,y as __namedExportsOrder,g as default};