import{a as e,n as t}from"./chunk-DnJy8xQt.js";import{a as n}from"./iframe-BKF8TpeP.js";import{t as r}from"./jsx-runtime-DxP0NviS.js";import{t as i}from"./prop-types-CoCJfGF0.js";import{t as a}from"./Typography-DIXzYx0Y.js";import{t as o}from"./Typography-RqcT9eHm.js";var s=t((()=>{}));function c(e){return e.filter(Boolean).join(` `)}function l(e,t={}){return t[e]??e}function u(e,t,n){return Math.min(Math.max(Number(e),t),n)}function d(e,t,n){return n===t?0:(e-t)/(n-t)*100}function f(e){return e===`top`||e===`floating-top`?`top`:e===`bottom`||e===`floating-bottom`?`bottom`:`none`}function p({value:e,position:t}){return t===`none`?null:t===`floating-bottom`||t===`floating-top`?(0,_.jsxs)(`div`,{className:`storybook-slider__floating-label`,"aria-hidden":`true`,children:[(0,_.jsx)(a,{as:`span`,variant:`text-sm`,weight:`medium`,color:`var(--neutral_800)`,className:`storybook-slider__floating-label-text`,children:e}),(0,_.jsx)(`span`,{className:`storybook-slider__floating-label-arrow`})]}):(0,_.jsx)(a,{as:`span`,variant:`text-md`,weight:`medium`,color:`var(--neutral_800)`,className:`storybook-slider__value-label`,"aria-hidden":`true`,children:e})}function m({min:e=0,max:t=100,step:n=1,value:r,defaultValue:i=25,startValue:a,endValue:o,defaultStartValue:s=25,defaultEndValue:m=50,mode:g,state:v,style:y=`classic`,labelPosition:b,label:x,disabled:S=!1,className:C,onChange:w,onRangeChange:T,...E}){let D=l(g??v,{Normal:`single`,Difference:`range`,normal:`single`,difference:`range`})??`single`,O=l(y,{Classic:`classic`,Dotted:`dotted`}),k=l(b??x,{None:`none`,Bottom:`bottom`,Top:`top`,"Floating Bottom":`floating-bottom`,"Floating Top":`floating-top`})??`none`,[A,j]=(0,h.useState)(i),[M,N]=(0,h.useState)([s,m]),P=D===`range`,F=u(r??A,e,t),I=(0,h.useMemo)(()=>{let n=u(a??M[0],e,t),r=u(o??M[1],e,t);return[Math.min(n,r),Math.max(n,r)]},[o,M,t,e,a]),L=P?d(I[0],e,t):0,R=d(P?I[1]:F,e,t),z=(0,h.useMemo)(()=>Array.from({length:9},(e,t)=>t*12.5),[]),B=f(k),V=n=>{let r=u(n.target.value,e,t);j(r),w?.(r)},H=n=>{let r=[Math.min(u(n.target.value,e,t),I[1]),I[1]];N(r),T?.(r)},U=n=>{let r=Math.max(u(n.target.value,e,t),I[0]),i=[I[0],r];N(i),T?.(i)};return(0,_.jsx)(`div`,{className:c([`storybook-slider`,`storybook-slider--${O}`,`storybook-slider--${D}`,`storybook-slider--labels-${B}`,S&&`storybook-slider--disabled`,C]),...E,children:(0,_.jsxs)(`div`,{className:`storybook-slider__control`,children:[(0,_.jsx)(`div`,{className:`storybook-slider__rail`}),O===`dotted`&&(0,_.jsx)(`div`,{className:`storybook-slider__steps`,"aria-hidden":`true`,children:z.map(e=>(0,_.jsx)(`span`,{className:c([`storybook-slider__step`,e>=L&&e<=R&&`storybook-slider__step--active`]),style:{left:`${e}%`}},e))}),(0,_.jsx)(`div`,{className:`storybook-slider__progress`,style:{left:`${L}%`,width:`${R-L}%`}}),P?(0,_.jsxs)(_.Fragment,{children:[(0,_.jsx)(`div`,{className:`storybook-slider__thumb storybook-slider__thumb--start`,style:{left:`${L}%`},children:(0,_.jsx)(p,{value:I[0],position:k})}),(0,_.jsx)(`div`,{className:`storybook-slider__thumb storybook-slider__thumb--end`,style:{left:`${R}%`},children:(0,_.jsx)(p,{value:I[1],position:k})}),(0,_.jsx)(`input`,{"aria-label":`Minimum value`,className:`storybook-slider__input storybook-slider__input--start`,disabled:S,max:t,min:e,step:n,type:`range`,value:I[0],onChange:H}),(0,_.jsx)(`input`,{"aria-label":`Maximum value`,className:`storybook-slider__input storybook-slider__input--end`,disabled:S,max:t,min:e,step:n,type:`range`,value:I[1],onChange:U})]}):(0,_.jsxs)(_.Fragment,{children:[(0,_.jsx)(`div`,{className:`storybook-slider__thumb`,style:{left:`${R}%`},children:(0,_.jsx)(p,{value:F,position:k})}),(0,_.jsx)(`input`,{"aria-label":`Slider value`,className:`storybook-slider__input`,disabled:S,max:t,min:e,step:n,type:`range`,value:F,onChange:V})]})]})})}var h,g,_,v,y,b,x=t((()=>{h=e(n(),1),g=e(i(),1),o(),s(),_=r(),v=[`classic`,`dotted`],y=[`single`,`range`],b=[`none`,`bottom`,`top`,`floating-bottom`,`floating-top`],p.propTypes={value:g.default.number.isRequired,position:g.default.oneOf(b).isRequired},m.propTypes={min:g.default.number,max:g.default.number,step:g.default.number,value:g.default.number,defaultValue:g.default.number,startValue:g.default.number,endValue:g.default.number,defaultStartValue:g.default.number,defaultEndValue:g.default.number,mode:g.default.oneOf([...y,`normal`,`difference`,`Normal`,`Difference`]),state:g.default.oneOf([`Normal`,`Difference`,`normal`,`difference`]),style:g.default.oneOf([...v,`Classic`,`Dotted`]),labelPosition:g.default.oneOf([...b,`None`,`Bottom`,`Top`,`Floating Bottom`,`Floating Top`]),label:g.default.oneOf([`None`,`Bottom`,`Top`,`Floating Bottom`,`Floating Top`]),disabled:g.default.bool,className:g.default.string,onChange:g.default.func,onRangeChange:g.default.func},m.__docgenInfo={description:``,methods:[],displayName:`Slider`,props:{min:{defaultValue:{value:`0`,computed:!1},description:``,type:{name:`number`},required:!1},max:{defaultValue:{value:`100`,computed:!1},description:``,type:{name:`number`},required:!1},step:{defaultValue:{value:`1`,computed:!1},description:``,type:{name:`number`},required:!1},defaultValue:{defaultValue:{value:`25`,computed:!1},description:``,type:{name:`number`},required:!1},defaultStartValue:{defaultValue:{value:`25`,computed:!1},description:``,type:{name:`number`},required:!1},defaultEndValue:{defaultValue:{value:`50`,computed:!1},description:``,type:{name:`number`},required:!1},style:{defaultValue:{value:`'classic'`,computed:!1},description:``,type:{name:`enum`,value:[{value:`'classic'`,computed:!1},{value:`'dotted'`,computed:!1},{value:`'Classic'`,computed:!1},{value:`'Dotted'`,computed:!1}]},required:!1},disabled:{defaultValue:{value:`false`,computed:!1},description:``,type:{name:`bool`},required:!1},value:{description:``,type:{name:`number`},required:!1},startValue:{description:``,type:{name:`number`},required:!1},endValue:{description:``,type:{name:`number`},required:!1},mode:{description:``,type:{name:`enum`,value:[{value:`'single'`,computed:!1},{value:`'range'`,computed:!1},{value:`'normal'`,computed:!1},{value:`'difference'`,computed:!1},{value:`'Normal'`,computed:!1},{value:`'Difference'`,computed:!1}]},required:!1},state:{description:``,type:{name:`enum`,value:[{value:`'Normal'`,computed:!1},{value:`'Difference'`,computed:!1},{value:`'normal'`,computed:!1},{value:`'difference'`,computed:!1}]},required:!1},labelPosition:{description:``,type:{name:`enum`,value:[{value:`'none'`,computed:!1},{value:`'bottom'`,computed:!1},{value:`'top'`,computed:!1},{value:`'floating-bottom'`,computed:!1},{value:`'floating-top'`,computed:!1},{value:`'None'`,computed:!1},{value:`'Bottom'`,computed:!1},{value:`'Top'`,computed:!1},{value:`'Floating Bottom'`,computed:!1},{value:`'Floating Top'`,computed:!1}]},required:!1},label:{description:``,type:{name:`enum`,value:[{value:`'None'`,computed:!1},{value:`'Bottom'`,computed:!1},{value:`'Top'`,computed:!1},{value:`'Floating Bottom'`,computed:!1},{value:`'Floating Top'`,computed:!1}]},required:!1},className:{description:``,type:{name:`string`},required:!1},onChange:{description:``,type:{name:`func`},required:!1},onRangeChange:{description:``,type:{name:`func`},required:!1}}}})),S,C,w,T,E,D,O,k;t((()=>{x(),S=r(),{useArgs:C}=__STORYBOOK_MODULE_PREVIEW_API__,w={title:`Molecules/Slider`,component:m,parameters:{layout:`centered`,docs:{description:{component:`Slider atom with classic and dotted styles, single-value and range modes, and Figma label placements.`}}},tags:[`autodocs`],argTypes:{style:{control:`select`,options:[`classic`,`dotted`]},mode:{control:`select`,options:[`single`,`range`]},labelPosition:{control:`select`,options:[`none`,`bottom`,`top`,`floating-bottom`,`floating-top`]},disabled:{control:`boolean`},value:{control:`number`},startValue:{control:`number`},endValue:{control:`number`}}},T={render:e=>{let[{endValue:t,startValue:n,value:r},i]=C();return(0,S.jsx)(m,{...e,endValue:t,startValue:n,value:r,onChange:e=>i({value:e}),onRangeChange:e=>i({startValue:e[0],endValue:e[1]})})},args:{style:`classic`,mode:`single`,labelPosition:`none`,value:25,startValue:25,endValue:50,disabled:!1}},E={render:()=>(0,S.jsxs)(`div`,{className:`slider-story-stack`,children:[(0,S.jsxs)(`div`,{className:`slider-story-row`,children:[(0,S.jsx)(m,{value:25}),(0,S.jsx)(m,{value:50}),(0,S.jsx)(m,{value:75}),(0,S.jsx)(m,{value:100})]}),(0,S.jsxs)(`div`,{className:`slider-story-row`,children:[(0,S.jsx)(m,{value:25,labelPosition:`bottom`}),(0,S.jsx)(m,{value:50,labelPosition:`bottom`}),(0,S.jsx)(m,{value:75,labelPosition:`top`}),(0,S.jsx)(m,{value:100,labelPosition:`top`})]}),(0,S.jsxs)(`div`,{className:`slider-story-row`,children:[(0,S.jsx)(m,{value:25,labelPosition:`floating-bottom`}),(0,S.jsx)(m,{value:50,labelPosition:`floating-bottom`}),(0,S.jsx)(m,{value:75,labelPosition:`floating-top`}),(0,S.jsx)(m,{value:100,labelPosition:`floating-top`})]})]})},D={render:()=>(0,S.jsxs)(`div`,{className:`slider-story-stack`,children:[(0,S.jsxs)(`div`,{className:`slider-story-row`,children:[(0,S.jsx)(m,{style:`dotted`,value:25}),(0,S.jsx)(m,{style:`dotted`,value:50}),(0,S.jsx)(m,{style:`dotted`,value:75}),(0,S.jsx)(m,{style:`dotted`,value:100})]}),(0,S.jsxs)(`div`,{className:`slider-story-row`,children:[(0,S.jsx)(m,{style:`dotted`,value:25,labelPosition:`bottom`}),(0,S.jsx)(m,{style:`dotted`,value:50,labelPosition:`bottom`}),(0,S.jsx)(m,{style:`dotted`,value:75,labelPosition:`top`}),(0,S.jsx)(m,{style:`dotted`,value:100,labelPosition:`top`})]}),(0,S.jsxs)(`div`,{className:`slider-story-row`,children:[(0,S.jsx)(m,{style:`dotted`,value:25,labelPosition:`floating-bottom`}),(0,S.jsx)(m,{style:`dotted`,value:50,labelPosition:`floating-bottom`}),(0,S.jsx)(m,{style:`dotted`,value:75,labelPosition:`floating-top`}),(0,S.jsx)(m,{style:`dotted`,value:100,labelPosition:`floating-top`})]})]})},O={render:()=>(0,S.jsxs)(`div`,{className:`slider-story-row`,children:[(0,S.jsxs)(`div`,{className:`slider-story-column`,children:[(0,S.jsx)(m,{mode:`range`,startValue:25,endValue:50}),(0,S.jsx)(m,{mode:`range`,startValue:25,endValue:75,labelPosition:`bottom`}),(0,S.jsx)(m,{mode:`range`,startValue:25,endValue:100,labelPosition:`floating-top`})]}),(0,S.jsxs)(`div`,{className:`slider-story-column`,children:[(0,S.jsx)(m,{mode:`range`,style:`dotted`,startValue:25,endValue:50}),(0,S.jsx)(m,{mode:`range`,style:`dotted`,startValue:25,endValue:75,labelPosition:`bottom`}),(0,S.jsx)(m,{mode:`range`,style:`dotted`,startValue:25,endValue:100,labelPosition:`floating-top`})]})]})},T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{
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
}`,...T.parameters?.docs?.source}}},E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`{
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
}`,...E.parameters?.docs?.source}}},D.parameters={...D.parameters,docs:{...D.parameters?.docs,source:{originalSource:`{
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
}`,...D.parameters?.docs?.source}}},O.parameters={...O.parameters,docs:{...O.parameters?.docs,source:{originalSource:`{
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
}`,...O.parameters?.docs?.source}}},k=[`Playground`,`Classic`,`Dotted`,`Range`]}))();export{E as Classic,D as Dotted,T as Playground,O as Range,k as __namedExportsOrder,w as default};