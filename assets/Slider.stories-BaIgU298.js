import{a as e,n as t}from"./chunk-DnJy8xQt.js";import{a as n}from"./iframe-BQTwm-GU.js";import{t as r}from"./jsx-runtime-DxP0NviS.js";import{t as i}from"./Typography-DXUEOnBH.js";import{t as a}from"./Typography-Dujv08q4.js";function o(e){return e.filter(Boolean).join(` `)}function s(e,t={}){if(e!==void 0)return t[e]??e}function c(e,t,n){return Math.min(Math.max(Number(e),t),n)}function l(e,t,n){return n===t?0:(e-t)/(n-t)*100}function u(e){return e===`top`||e===`floating-top`?`top`:e===`bottom`||e===`floating-bottom`?`bottom`:`none`}function d({value:e,position:t}){return t===`none`?null:t===`floating-bottom`||t===`floating-top`?(0,m.jsxs)(`div`,{className:o([`absolute left-1/2 inline-flex -translate-x-1/2 items-center drop-shadow-[0_4px_4px_rgba(0,0,0,0.1)]`,t===`floating-top`&&`bottom-8 flex-col`,t===`floating-bottom`&&`top-8 flex-col-reverse`]),"aria-hidden":`true`,children:[(0,m.jsx)(i,{as:`span`,variant:`text-sm`,weight:`medium`,color:`var(--neutral_800)`,className:`box-border inline-flex h-9 min-w-10 items-center justify-center whitespace-nowrap rounded-2 bg-neutral-00 px-3 py-2`,children:e}),(0,m.jsx)(`span`,{className:`h-2 w-4 overflow-hidden text-neutral-00`,children:(0,m.jsx)(`span`,{className:o([`mx-auto block h-3 w-3 rotate-45 bg-current`,t===`floating-top`?`-mt-[7px]`:`mt-[3px]`])})})]}):(0,m.jsx)(i,{as:`span`,variant:`text-md`,weight:`medium`,color:`var(--neutral_800)`,className:o([`absolute left-1/2 -translate-x-1/2 whitespace-nowrap`,t===`top`&&`bottom-9`,t===`bottom`&&`top-9`]),"aria-hidden":`true`,children:e})}function f({min:e=0,max:t=100,step:n=1,value:r,defaultValue:i=25,startValue:a,endValue:f,defaultStartValue:h=25,defaultEndValue:g=50,mode:_,state:v,style:y=`classic`,labelPosition:b,label:x,disabled:S=!1,className:C,onChange:w,onRangeChange:T,...E}){let D=s(_??v,{Normal:`single`,Difference:`range`,normal:`single`,difference:`range`})??`single`,O=s(y,{Classic:`classic`,Dotted:`dotted`}),k=s(b??x,{None:`none`,Bottom:`bottom`,Top:`top`,"Floating Bottom":`floating-bottom`,"Floating Top":`floating-top`})??`none`,[A,j]=(0,p.useState)(i),[M,N]=(0,p.useState)([h,g]),[P,F]=(0,p.useState)(null),I=D===`range`,L=c(r??A,e,t),R=(0,p.useMemo)(()=>{let n=c(a??M[0],e,t),r=c(f??M[1],e,t);return[Math.min(n,r),Math.max(n,r)]},[f,M,t,e,a]),z=I?l(R[0],e,t):0,B=l(I?R[1]:L,e,t),V=(0,p.useMemo)(()=>Array.from({length:9},(e,t)=>t*12.5),[]),H=u(k),U=n=>{let r=c(n.target.value,e,t);j(r),w?.(r)},W=n=>{let r=[Math.min(c(n.target.value,e,t),R[1]),R[1]];N(r),T?.(r)},G=n=>{let r=Math.max(c(n.target.value,e,t),R[0]),i=[R[0],r];N(i),T?.(i)};return(0,m.jsx)(`div`,{className:o([`w-80 text-neutral-800`,(H===`top`||H===`bottom`)&&`py-8`,H===`top`&&`pt-10`,H===`bottom`&&`pb-10`,S&&`opacity-55`,C]),...E,children:(0,m.jsxs)(`div`,{className:`relative h-6 w-80 rounded-2`,children:[(0,m.jsx)(`div`,{className:o([`absolute inset-x-0 top-1 h-4 rounded-6 bg-neutral-100`,S&&`bg-neutral-50`])}),O===`dotted`&&(0,m.jsx)(`div`,{className:`pointer-events-none absolute inset-x-2 top-1/2 z-[1] h-[6px] -translate-y-1/2`,"aria-hidden":`true`,children:V.map(e=>(0,m.jsx)(`span`,{className:o([`absolute top-0 h-[6px] w-[6px] -translate-x-1/2 rounded-full bg-neutral-400`,e>=z&&e<=B&&`bg-neutral-00`]),style:{left:`${e}%`}},e))}),(0,m.jsx)(`div`,{className:o([`absolute top-1 h-4 rounded-6 bg-primary-400`,S&&`bg-primary-100`]),style:{left:`${z}%`,width:`${B-z}%`}}),I?(0,m.jsxs)(m.Fragment,{children:[(0,m.jsxs)(`div`,{className:o([`pointer-events-none absolute top-1/2 z-[3] h-6 w-6 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-solid border-primary-400 bg-neutral-00 shadow-md`,S&&`border-primary-100 shadow-xs`,P===`start`&&`shadow-slider-focus`]),style:{left:`${z}%`},children:[O===`dotted`&&(0,m.jsx)(`span`,{className:o([`absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary-400`,S&&`bg-primary-100`])}),(0,m.jsx)(d,{value:R[0],position:k})]}),(0,m.jsxs)(`div`,{className:o([`pointer-events-none absolute top-1/2 z-[3] h-6 w-6 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-solid border-primary-400 bg-neutral-00 shadow-md`,S&&`border-primary-100 shadow-xs`,P===`end`&&`shadow-slider-focus`]),style:{left:`${B}%`},children:[O===`dotted`&&(0,m.jsx)(`span`,{className:o([`absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary-400`,S&&`bg-primary-100`])}),(0,m.jsx)(d,{value:R[1],position:k})]}),(0,m.jsx)(`input`,{"aria-label":`Minimum value`,className:`absolute inset-0 z-[6] m-0 h-full w-full cursor-pointer opacity-0 disabled:cursor-not-allowed focus-visible:outline-none`,disabled:S,max:t,min:e,step:n,type:`range`,value:R[0],onChange:W,onBlur:()=>F(null),onFocus:()=>F(`start`)}),(0,m.jsx)(`input`,{"aria-label":`Maximum value`,className:`absolute inset-0 z-[7] m-0 h-full w-full cursor-pointer opacity-0 disabled:cursor-not-allowed focus-visible:outline-none`,disabled:S,max:t,min:e,step:n,type:`range`,value:R[1],onChange:G,onBlur:()=>F(null),onFocus:()=>F(`end`)})]}):(0,m.jsxs)(m.Fragment,{children:[(0,m.jsxs)(`div`,{className:o([`pointer-events-none absolute top-1/2 z-[3] h-6 w-6 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-solid border-primary-400 bg-neutral-00 shadow-md`,S&&`border-primary-100 shadow-xs`,P===`single`&&`shadow-slider-focus`]),style:{left:`${B}%`},children:[O===`dotted`&&(0,m.jsx)(`span`,{className:o([`absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary-400`,S&&`bg-primary-100`])}),(0,m.jsx)(d,{value:L,position:k})]}),(0,m.jsx)(`input`,{"aria-label":`Slider value`,className:`absolute inset-0 z-[5] m-0 h-full w-full cursor-pointer opacity-0 disabled:cursor-not-allowed focus-visible:outline-none`,disabled:S,max:t,min:e,step:n,type:`range`,value:L,onChange:U,onBlur:()=>F(null),onFocus:()=>F(`single`)})]})]})})}var p,m,h=t((()=>{p=e(n(),1),a(),m=r(),f.__docgenInfo={description:``,methods:[],displayName:`Slider`,props:{min:{required:!1,tsType:{name:`number`},description:``,defaultValue:{value:`0`,computed:!1}},max:{required:!1,tsType:{name:`number`},description:``,defaultValue:{value:`100`,computed:!1}},step:{required:!1,tsType:{name:`number`},description:``,defaultValue:{value:`1`,computed:!1}},value:{required:!1,tsType:{name:`number`},description:``},defaultValue:{required:!1,tsType:{name:`number`},description:``,defaultValue:{value:`25`,computed:!1}},startValue:{required:!1,tsType:{name:`number`},description:``},endValue:{required:!1,tsType:{name:`number`},description:``},defaultStartValue:{required:!1,tsType:{name:`number`},description:``,defaultValue:{value:`25`,computed:!1}},defaultEndValue:{required:!1,tsType:{name:`number`},description:``,defaultValue:{value:`50`,computed:!1}},mode:{required:!1,tsType:{name:`union`,raw:`'single' | 'range' | 'normal' | 'difference' | 'Normal' | 'Difference'`,elements:[{name:`literal`,value:`'single'`},{name:`literal`,value:`'range'`},{name:`literal`,value:`'normal'`},{name:`literal`,value:`'difference'`},{name:`literal`,value:`'Normal'`},{name:`literal`,value:`'Difference'`}]},description:``},state:{required:!1,tsType:{name:`union`,raw:`'Normal' | 'Difference' | 'normal' | 'difference'`,elements:[{name:`literal`,value:`'Normal'`},{name:`literal`,value:`'Difference'`},{name:`literal`,value:`'normal'`},{name:`literal`,value:`'difference'`}]},description:``},style:{required:!1,tsType:{name:`union`,raw:`'classic' | 'dotted' | 'Classic' | 'Dotted'`,elements:[{name:`literal`,value:`'classic'`},{name:`literal`,value:`'dotted'`},{name:`literal`,value:`'Classic'`},{name:`literal`,value:`'Dotted'`}]},description:``,defaultValue:{value:`'classic'`,computed:!1}},labelPosition:{required:!1,tsType:{name:`union`,raw:`| 'none'
| 'bottom'
| 'top'
| 'floating-bottom'
| 'floating-top'
| 'None'
| 'Bottom'
| 'Top'
| 'Floating Bottom'
| 'Floating Top'`,elements:[{name:`literal`,value:`'none'`},{name:`literal`,value:`'bottom'`},{name:`literal`,value:`'top'`},{name:`literal`,value:`'floating-bottom'`},{name:`literal`,value:`'floating-top'`},{name:`literal`,value:`'None'`},{name:`literal`,value:`'Bottom'`},{name:`literal`,value:`'Top'`},{name:`literal`,value:`'Floating Bottom'`},{name:`literal`,value:`'Floating Top'`}]},description:``},label:{required:!1,tsType:{name:`union`,raw:`| 'none'
| 'bottom'
| 'top'
| 'floating-bottom'
| 'floating-top'
| 'None'
| 'Bottom'
| 'Top'
| 'Floating Bottom'
| 'Floating Top'`,elements:[{name:`literal`,value:`'none'`},{name:`literal`,value:`'bottom'`},{name:`literal`,value:`'top'`},{name:`literal`,value:`'floating-bottom'`},{name:`literal`,value:`'floating-top'`},{name:`literal`,value:`'None'`},{name:`literal`,value:`'Bottom'`},{name:`literal`,value:`'Top'`},{name:`literal`,value:`'Floating Bottom'`},{name:`literal`,value:`'Floating Top'`}]},description:``},disabled:{required:!1,tsType:{name:`boolean`},description:``,defaultValue:{value:`false`,computed:!1}},onChange:{required:!1,tsType:{name:`signature`,type:`function`,raw:`(value: number) => void`,signature:{arguments:[{type:{name:`number`},name:`value`}],return:{name:`void`}}},description:``},onRangeChange:{required:!1,tsType:{name:`signature`,type:`function`,raw:`(range: [number, number]) => void`,signature:{arguments:[{type:{name:`tuple`,raw:`[number, number]`,elements:[{name:`number`},{name:`number`}]},name:`range`}],return:{name:`void`}}},description:``}},composes:[`Omit`]}})),g=t((()=>{})),_,v,y,b,x,S,C,w;t((()=>{h(),g(),_=r(),{useArgs:v}=__STORYBOOK_MODULE_PREVIEW_API__,y={title:`Molecules/Slider`,component:f,parameters:{layout:`centered`,docs:{description:{component:`Slider atom with classic and dotted styles, single-value and range modes, and Figma label placements.`}}},tags:[`autodocs`],argTypes:{style:{control:`select`,options:[`classic`,`dotted`]},mode:{control:`select`,options:[`single`,`range`]},labelPosition:{control:`select`,options:[`none`,`bottom`,`top`,`floating-bottom`,`floating-top`]},disabled:{control:`boolean`},value:{control:`number`},startValue:{control:`number`},endValue:{control:`number`}}},b={render:e=>{let[{endValue:t,startValue:n,value:r},i]=v();return(0,_.jsx)(f,{...e,endValue:t,startValue:n,value:r,onChange:e=>i({value:e}),onRangeChange:e=>i({startValue:e[0],endValue:e[1]})})},args:{style:`classic`,mode:`single`,labelPosition:`none`,value:25,startValue:25,endValue:50,disabled:!1}},x={render:()=>(0,_.jsxs)(`div`,{className:`slider-story-stack`,children:[(0,_.jsxs)(`div`,{className:`slider-story-row`,children:[(0,_.jsx)(f,{value:25}),(0,_.jsx)(f,{value:50}),(0,_.jsx)(f,{value:75}),(0,_.jsx)(f,{value:100})]}),(0,_.jsxs)(`div`,{className:`slider-story-row`,children:[(0,_.jsx)(f,{value:25,labelPosition:`bottom`}),(0,_.jsx)(f,{value:50,labelPosition:`bottom`}),(0,_.jsx)(f,{value:75,labelPosition:`top`}),(0,_.jsx)(f,{value:100,labelPosition:`top`})]}),(0,_.jsxs)(`div`,{className:`slider-story-row`,children:[(0,_.jsx)(f,{value:25,labelPosition:`floating-bottom`}),(0,_.jsx)(f,{value:50,labelPosition:`floating-bottom`}),(0,_.jsx)(f,{value:75,labelPosition:`floating-top`}),(0,_.jsx)(f,{value:100,labelPosition:`floating-top`})]})]})},S={render:()=>(0,_.jsxs)(`div`,{className:`slider-story-stack`,children:[(0,_.jsxs)(`div`,{className:`slider-story-row`,children:[(0,_.jsx)(f,{style:`dotted`,value:25}),(0,_.jsx)(f,{style:`dotted`,value:50}),(0,_.jsx)(f,{style:`dotted`,value:75}),(0,_.jsx)(f,{style:`dotted`,value:100})]}),(0,_.jsxs)(`div`,{className:`slider-story-row`,children:[(0,_.jsx)(f,{style:`dotted`,value:25,labelPosition:`bottom`}),(0,_.jsx)(f,{style:`dotted`,value:50,labelPosition:`bottom`}),(0,_.jsx)(f,{style:`dotted`,value:75,labelPosition:`top`}),(0,_.jsx)(f,{style:`dotted`,value:100,labelPosition:`top`})]}),(0,_.jsxs)(`div`,{className:`slider-story-row`,children:[(0,_.jsx)(f,{style:`dotted`,value:25,labelPosition:`floating-bottom`}),(0,_.jsx)(f,{style:`dotted`,value:50,labelPosition:`floating-bottom`}),(0,_.jsx)(f,{style:`dotted`,value:75,labelPosition:`floating-top`}),(0,_.jsx)(f,{style:`dotted`,value:100,labelPosition:`floating-top`})]})]})},C={render:()=>(0,_.jsxs)(`div`,{className:`slider-story-row`,children:[(0,_.jsxs)(`div`,{className:`slider-story-column`,children:[(0,_.jsx)(f,{mode:`range`,startValue:25,endValue:50}),(0,_.jsx)(f,{mode:`range`,startValue:25,endValue:75,labelPosition:`bottom`}),(0,_.jsx)(f,{mode:`range`,startValue:25,endValue:100,labelPosition:`floating-top`})]}),(0,_.jsxs)(`div`,{className:`slider-story-column`,children:[(0,_.jsx)(f,{mode:`range`,style:`dotted`,startValue:25,endValue:50}),(0,_.jsx)(f,{mode:`range`,style:`dotted`,startValue:25,endValue:75,labelPosition:`bottom`}),(0,_.jsx)(f,{mode:`range`,style:`dotted`,startValue:25,endValue:100,labelPosition:`floating-top`})]})]})},b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  render: args => {
    const [{
      endValue,
      startValue,
      value
    }, updateArgs] = useArgs();
    return <Slider {...args} endValue={endValue} startValue={startValue} value={value} onChange={nextValue => updateArgs({
      value: nextValue
    })} onRangeChange={nextRange => updateArgs({
      startValue: nextRange[0],
      endValue: nextRange[1]
    })} />;
  },
  args: {
    style: 'classic',
    mode: 'single',
    labelPosition: 'none',
    value: 25,
    startValue: 25,
    endValue: 50,
    disabled: false
  }
}`,...b.parameters?.docs?.source}}},x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  render: () => <div className="slider-story-stack">
      <div className="slider-story-row">
        <Slider value={25} />
        <Slider value={50} />
        <Slider value={75} />
        <Slider value={100} />
      </div>
      <div className="slider-story-row">
        <Slider value={25} labelPosition="bottom" />
        <Slider value={50} labelPosition="bottom" />
        <Slider value={75} labelPosition="top" />
        <Slider value={100} labelPosition="top" />
      </div>
      <div className="slider-story-row">
        <Slider value={25} labelPosition="floating-bottom" />
        <Slider value={50} labelPosition="floating-bottom" />
        <Slider value={75} labelPosition="floating-top" />
        <Slider value={100} labelPosition="floating-top" />
      </div>
    </div>
}`,...x.parameters?.docs?.source}}},S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  render: () => <div className="slider-story-stack">
      <div className="slider-story-row">
        <Slider style="dotted" value={25} />
        <Slider style="dotted" value={50} />
        <Slider style="dotted" value={75} />
        <Slider style="dotted" value={100} />
      </div>
      <div className="slider-story-row">
        <Slider style="dotted" value={25} labelPosition="bottom" />
        <Slider style="dotted" value={50} labelPosition="bottom" />
        <Slider style="dotted" value={75} labelPosition="top" />
        <Slider style="dotted" value={100} labelPosition="top" />
      </div>
      <div className="slider-story-row">
        <Slider style="dotted" value={25} labelPosition="floating-bottom" />
        <Slider style="dotted" value={50} labelPosition="floating-bottom" />
        <Slider style="dotted" value={75} labelPosition="floating-top" />
        <Slider style="dotted" value={100} labelPosition="floating-top" />
      </div>
    </div>
}`,...S.parameters?.docs?.source}}},C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
  render: () => <div className="slider-story-row">
      <div className="slider-story-column">
        <Slider mode="range" startValue={25} endValue={50} />
        <Slider mode="range" startValue={25} endValue={75} labelPosition="bottom" />
        <Slider mode="range" startValue={25} endValue={100} labelPosition="floating-top" />
      </div>
      <div className="slider-story-column">
        <Slider mode="range" style="dotted" startValue={25} endValue={50} />
        <Slider mode="range" style="dotted" startValue={25} endValue={75} labelPosition="bottom" />
        <Slider mode="range" style="dotted" startValue={25} endValue={100} labelPosition="floating-top" />
      </div>
    </div>
}`,...C.parameters?.docs?.source}}},w=[`Playground`,`Classic`,`Dotted`,`Range`]}))();export{x as Classic,S as Dotted,b as Playground,C as Range,w as __namedExportsOrder,y as default};