import{a as e,n as t}from"./chunk-DnJy8xQt.js";import{a as n}from"./iframe-CRwkcuY8.js";import{t as r}from"./jsx-runtime-DxP0NviS.js";import{t as i}from"./Typography-U8lT9V-o.js";import{t as a}from"./Typography-D-456NUn.js";var o=t((()=>{}));function s(e){return e.filter(Boolean).join(` `)}function c(e,t={}){if(e!==void 0)return t[e]??e}function l(e,t,n){return Math.min(Math.max(Number(e),t),n)}function u(e,t,n){return n===t?0:(e-t)/(n-t)*100}function d(e){return e===`top`||e===`floating-top`?`top`:e===`bottom`||e===`floating-bottom`?`bottom`:`none`}function f({value:e,position:t}){return t===`none`?null:t===`floating-bottom`||t===`floating-top`?(0,h.jsxs)(`div`,{className:`storybook-slider__floating-label`,"aria-hidden":`true`,children:[(0,h.jsx)(i,{as:`span`,variant:`text-sm`,weight:`medium`,color:`var(--neutral_800)`,className:`storybook-slider__floating-label-text`,children:e}),(0,h.jsx)(`span`,{className:`storybook-slider__floating-label-arrow`})]}):(0,h.jsx)(i,{as:`span`,variant:`text-md`,weight:`medium`,color:`var(--neutral_800)`,className:`storybook-slider__value-label`,"aria-hidden":`true`,children:e})}function p({min:e=0,max:t=100,step:n=1,value:r,defaultValue:i=25,startValue:a,endValue:o,defaultStartValue:p=25,defaultEndValue:g=50,mode:_,state:v,style:y=`classic`,labelPosition:b,label:x,disabled:S=!1,className:C,onChange:w,onRangeChange:T,...E}){let D=c(_??v,{Normal:`single`,Difference:`range`,normal:`single`,difference:`range`})??`single`,O=c(y,{Classic:`classic`,Dotted:`dotted`}),k=c(b??x,{None:`none`,Bottom:`bottom`,Top:`top`,"Floating Bottom":`floating-bottom`,"Floating Top":`floating-top`})??`none`,[A,j]=(0,m.useState)(i),[M,N]=(0,m.useState)([p,g]),P=D===`range`,F=l(r??A,e,t),I=(0,m.useMemo)(()=>{let n=l(a??M[0],e,t),r=l(o??M[1],e,t);return[Math.min(n,r),Math.max(n,r)]},[o,M,t,e,a]),L=P?u(I[0],e,t):0,R=u(P?I[1]:F,e,t),z=(0,m.useMemo)(()=>Array.from({length:9},(e,t)=>t*12.5),[]),B=d(k),V=n=>{let r=l(n.target.value,e,t);j(r),w?.(r)},H=n=>{let r=[Math.min(l(n.target.value,e,t),I[1]),I[1]];N(r),T?.(r)},U=n=>{let r=Math.max(l(n.target.value,e,t),I[0]),i=[I[0],r];N(i),T?.(i)};return(0,h.jsx)(`div`,{className:s([`storybook-slider`,`storybook-slider--${O}`,`storybook-slider--${D}`,`storybook-slider--labels-${B}`,S&&`storybook-slider--disabled`,C]),...E,children:(0,h.jsxs)(`div`,{className:`storybook-slider__control`,children:[(0,h.jsx)(`div`,{className:`storybook-slider__rail`}),O===`dotted`&&(0,h.jsx)(`div`,{className:`storybook-slider__steps`,"aria-hidden":`true`,children:z.map(e=>(0,h.jsx)(`span`,{className:s([`storybook-slider__step`,e>=L&&e<=R&&`storybook-slider__step--active`]),style:{left:`${e}%`}},e))}),(0,h.jsx)(`div`,{className:`storybook-slider__progress`,style:{left:`${L}%`,width:`${R-L}%`}}),P?(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)(`div`,{className:`storybook-slider__thumb storybook-slider__thumb--start`,style:{left:`${L}%`},children:(0,h.jsx)(f,{value:I[0],position:k})}),(0,h.jsx)(`div`,{className:`storybook-slider__thumb storybook-slider__thumb--end`,style:{left:`${R}%`},children:(0,h.jsx)(f,{value:I[1],position:k})}),(0,h.jsx)(`input`,{"aria-label":`Minimum value`,className:`storybook-slider__input storybook-slider__input--start`,disabled:S,max:t,min:e,step:n,type:`range`,value:I[0],onChange:H}),(0,h.jsx)(`input`,{"aria-label":`Maximum value`,className:`storybook-slider__input storybook-slider__input--end`,disabled:S,max:t,min:e,step:n,type:`range`,value:I[1],onChange:U})]}):(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)(`div`,{className:`storybook-slider__thumb`,style:{left:`${R}%`},children:(0,h.jsx)(f,{value:F,position:k})}),(0,h.jsx)(`input`,{"aria-label":`Slider value`,className:`storybook-slider__input`,disabled:S,max:t,min:e,step:n,type:`range`,value:F,onChange:V})]})]})})}var m,h,g=t((()=>{m=e(n(),1),a(),o(),h=r(),p.__docgenInfo={description:``,methods:[],displayName:`Slider`,props:{min:{required:!1,tsType:{name:`number`},description:``,defaultValue:{value:`0`,computed:!1}},max:{required:!1,tsType:{name:`number`},description:``,defaultValue:{value:`100`,computed:!1}},step:{required:!1,tsType:{name:`number`},description:``,defaultValue:{value:`1`,computed:!1}},value:{required:!1,tsType:{name:`number`},description:``},defaultValue:{required:!1,tsType:{name:`number`},description:``,defaultValue:{value:`25`,computed:!1}},startValue:{required:!1,tsType:{name:`number`},description:``},endValue:{required:!1,tsType:{name:`number`},description:``},defaultStartValue:{required:!1,tsType:{name:`number`},description:``,defaultValue:{value:`25`,computed:!1}},defaultEndValue:{required:!1,tsType:{name:`number`},description:``,defaultValue:{value:`50`,computed:!1}},mode:{required:!1,tsType:{name:`union`,raw:`'single' | 'range' | 'normal' | 'difference' | 'Normal' | 'Difference'`,elements:[{name:`literal`,value:`'single'`},{name:`literal`,value:`'range'`},{name:`literal`,value:`'normal'`},{name:`literal`,value:`'difference'`},{name:`literal`,value:`'Normal'`},{name:`literal`,value:`'Difference'`}]},description:``},state:{required:!1,tsType:{name:`union`,raw:`'Normal' | 'Difference' | 'normal' | 'difference'`,elements:[{name:`literal`,value:`'Normal'`},{name:`literal`,value:`'Difference'`},{name:`literal`,value:`'normal'`},{name:`literal`,value:`'difference'`}]},description:``},style:{required:!1,tsType:{name:`union`,raw:`'classic' | 'dotted' | 'Classic' | 'Dotted'`,elements:[{name:`literal`,value:`'classic'`},{name:`literal`,value:`'dotted'`},{name:`literal`,value:`'Classic'`},{name:`literal`,value:`'Dotted'`}]},description:``,defaultValue:{value:`'classic'`,computed:!1}},labelPosition:{required:!1,tsType:{name:`union`,raw:`| 'none'
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
| 'Floating Top'`,elements:[{name:`literal`,value:`'none'`},{name:`literal`,value:`'bottom'`},{name:`literal`,value:`'top'`},{name:`literal`,value:`'floating-bottom'`},{name:`literal`,value:`'floating-top'`},{name:`literal`,value:`'None'`},{name:`literal`,value:`'Bottom'`},{name:`literal`,value:`'Top'`},{name:`literal`,value:`'Floating Bottom'`},{name:`literal`,value:`'Floating Top'`}]},description:``},disabled:{required:!1,tsType:{name:`boolean`},description:``,defaultValue:{value:`false`,computed:!1}},onChange:{required:!1,tsType:{name:`signature`,type:`function`,raw:`(value: number) => void`,signature:{arguments:[{type:{name:`number`},name:`value`}],return:{name:`void`}}},description:``},onRangeChange:{required:!1,tsType:{name:`signature`,type:`function`,raw:`(range: [number, number]) => void`,signature:{arguments:[{type:{name:`tuple`,raw:`[number, number]`,elements:[{name:`number`},{name:`number`}]},name:`range`}],return:{name:`void`}}},description:``}},composes:[`Omit`]}})),_,v,y,b,x,S,C,w;t((()=>{g(),_=r(),{useArgs:v}=__STORYBOOK_MODULE_PREVIEW_API__,y={title:`Molecules/Slider`,component:p,parameters:{layout:`centered`,docs:{description:{component:`Slider atom with classic and dotted styles, single-value and range modes, and Figma label placements.`}}},tags:[`autodocs`],argTypes:{style:{control:`select`,options:[`classic`,`dotted`]},mode:{control:`select`,options:[`single`,`range`]},labelPosition:{control:`select`,options:[`none`,`bottom`,`top`,`floating-bottom`,`floating-top`]},disabled:{control:`boolean`},value:{control:`number`},startValue:{control:`number`},endValue:{control:`number`}}},b={render:e=>{let[{endValue:t,startValue:n,value:r},i]=v();return(0,_.jsx)(p,{...e,endValue:t,startValue:n,value:r,onChange:e=>i({value:e}),onRangeChange:e=>i({startValue:e[0],endValue:e[1]})})},args:{style:`classic`,mode:`single`,labelPosition:`none`,value:25,startValue:25,endValue:50,disabled:!1}},x={render:()=>(0,_.jsxs)(`div`,{className:`slider-story-stack`,children:[(0,_.jsxs)(`div`,{className:`slider-story-row`,children:[(0,_.jsx)(p,{value:25}),(0,_.jsx)(p,{value:50}),(0,_.jsx)(p,{value:75}),(0,_.jsx)(p,{value:100})]}),(0,_.jsxs)(`div`,{className:`slider-story-row`,children:[(0,_.jsx)(p,{value:25,labelPosition:`bottom`}),(0,_.jsx)(p,{value:50,labelPosition:`bottom`}),(0,_.jsx)(p,{value:75,labelPosition:`top`}),(0,_.jsx)(p,{value:100,labelPosition:`top`})]}),(0,_.jsxs)(`div`,{className:`slider-story-row`,children:[(0,_.jsx)(p,{value:25,labelPosition:`floating-bottom`}),(0,_.jsx)(p,{value:50,labelPosition:`floating-bottom`}),(0,_.jsx)(p,{value:75,labelPosition:`floating-top`}),(0,_.jsx)(p,{value:100,labelPosition:`floating-top`})]})]})},S={render:()=>(0,_.jsxs)(`div`,{className:`slider-story-stack`,children:[(0,_.jsxs)(`div`,{className:`slider-story-row`,children:[(0,_.jsx)(p,{style:`dotted`,value:25}),(0,_.jsx)(p,{style:`dotted`,value:50}),(0,_.jsx)(p,{style:`dotted`,value:75}),(0,_.jsx)(p,{style:`dotted`,value:100})]}),(0,_.jsxs)(`div`,{className:`slider-story-row`,children:[(0,_.jsx)(p,{style:`dotted`,value:25,labelPosition:`bottom`}),(0,_.jsx)(p,{style:`dotted`,value:50,labelPosition:`bottom`}),(0,_.jsx)(p,{style:`dotted`,value:75,labelPosition:`top`}),(0,_.jsx)(p,{style:`dotted`,value:100,labelPosition:`top`})]}),(0,_.jsxs)(`div`,{className:`slider-story-row`,children:[(0,_.jsx)(p,{style:`dotted`,value:25,labelPosition:`floating-bottom`}),(0,_.jsx)(p,{style:`dotted`,value:50,labelPosition:`floating-bottom`}),(0,_.jsx)(p,{style:`dotted`,value:75,labelPosition:`floating-top`}),(0,_.jsx)(p,{style:`dotted`,value:100,labelPosition:`floating-top`})]})]})},C={render:()=>(0,_.jsxs)(`div`,{className:`slider-story-row`,children:[(0,_.jsxs)(`div`,{className:`slider-story-column`,children:[(0,_.jsx)(p,{mode:`range`,startValue:25,endValue:50}),(0,_.jsx)(p,{mode:`range`,startValue:25,endValue:75,labelPosition:`bottom`}),(0,_.jsx)(p,{mode:`range`,startValue:25,endValue:100,labelPosition:`floating-top`})]}),(0,_.jsxs)(`div`,{className:`slider-story-column`,children:[(0,_.jsx)(p,{mode:`range`,style:`dotted`,startValue:25,endValue:50}),(0,_.jsx)(p,{mode:`range`,style:`dotted`,startValue:25,endValue:75,labelPosition:`bottom`}),(0,_.jsx)(p,{mode:`range`,style:`dotted`,startValue:25,endValue:100,labelPosition:`floating-top`})]})]})},b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
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