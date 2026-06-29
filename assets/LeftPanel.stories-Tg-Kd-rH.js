import{a as e,n as t}from"./chunk-DnJy8xQt.js";import{a as n}from"./iframe-BZfC6NuC.js";import{t as r}from"./jsx-runtime-DxP0NviS.js";import{t as i}from"./Popover-BzATPftD.js";import{a,i as o,n as s,o as c,r as l,t as u}from"./LeftPanel-_gYPiwyj.js";function d(e,t){return!e||t==null?null:{left:e.getBoundingClientRect().right+_,top:t}}function f({open:e,onClose:t}){return(0,p.useEffect)(()=>{if(!e)return;let n=e=>{e.key===`Escape`&&t()};return window.addEventListener(`keydown`,n),()=>{window.removeEventListener(`keydown`,n)}},[t,e]),e?(0,m.jsx)(`div`,{className:`fixed inset-0 z-40`,role:`presentation`,onClick:t}):null}var p,m,h,g,_,v,y,b,x,S,C,w;t((()=>{p=e(n(),1),c(),a(),m=r(),{fn:h}=__STORYBOOK_MODULE_TEST__,g=`h-[846px] w-[284px] shrink-0`,_=8,v={title:`Organisms/Left Panel`,component:u,parameters:{layout:`fullscreen`,docs:{description:{component:`Left panel organism with block lists, fixed block areas, theme settings navigation, reusable left panel list items, and theme status chips. In the docs preview, hiding an item toggles the hidden visual state and deleting an item removes it only for the current session; refreshing restores the demo data.`}}},tags:[`autodocs`],argTypes:{type:{control:`select`,options:[`blocks`,`fixed-blocks`,`theme-settings`]},status:{control:`select`,options:[`draft`,`active`]},selectedItemId:{control:`text`}},args:{onAddBlock:h(),onBack:h(),onFooterClick:h(),onInsertBlock:h(),onItemChange:h()}},y={render:e=>{let t=(0,p.useRef)(null),[n,r]=(0,p.useState)(!1),[a,o]=(0,p.useState)(null),s=(0,p.useCallback)(e=>{o(d(t.current,e?.anchorTop)),r(!0)},[]),c=(0,p.useCallback)(()=>{r(!1),o(null)},[]);return(0,m.jsxs)(m.Fragment,{children:[(0,m.jsx)(f,{open:n,onClose:c}),(0,m.jsx)(`div`,{className:`flex min-h-screen items-start justify-center bg-neutral-100 p-8`,children:(0,m.jsxs)(`div`,{className:`flex flex-col items-center gap-4`,children:[(0,m.jsxs)(`div`,{className:`relative flex items-start`,children:[(0,m.jsx)(`div`,{ref:t,className:g,children:(0,m.jsx)(u,{...e,onAddBlock:t=>{s(t),e.onAddBlock?.(t)},onInsertBlock:t=>{s(t),e.onInsertBlock?.(t)}})}),n&&a&&(0,m.jsx)(`div`,{className:`fixed z-50`,role:`dialog`,"aria-label":`Add block`,"aria-modal":`true`,style:a,children:(0,m.jsx)(i,{defaultActiveBlockId:`image-banner`,onAddBlock:c})})]}),(0,m.jsx)(`p`,{className:`max-w-[284px] text-center text-sm text-neutral-600`,children:`Preview note: hide toggles the hidden state. Delete removes the item for this session only; refresh restores the demo list. Use Add Block or the insert control between items to open the block library popover.`})]})})]})},args:{type:`fixed-blocks`,status:`draft`,pageTitle:`Home`}},b={render:()=>(0,m.jsxs)(`div`,{className:`flex min-h-screen flex-wrap items-start justify-center gap-10 bg-neutral-100 p-8`,children:[(0,m.jsx)(`div`,{className:g,children:(0,m.jsx)(u,{type:`blocks`})}),(0,m.jsx)(`div`,{className:g,children:(0,m.jsx)(u,{type:`fixed-blocks`})}),(0,m.jsx)(`div`,{className:g,children:(0,m.jsx)(u,{type:`theme-settings`})})]})},x={render:()=>(0,m.jsxs)(`div`,{className:`grid grid-cols-[236px_236px] gap-x-24 gap-y-16 p-5`,children:[[`default`,`hover`,`focused`,`disabled`].map(e=>(0,m.jsx)(s,{label:`Imager Banner`,state:e},`default-${e}`)),[`default`,`hover`,`focused`,`disabled`].map(e=>(0,m.jsx)(s,{label:`Imager Banner`,pressed:!0,state:e},`pressed-${e}`))]}),parameters:{layout:`centered`}},S={render:()=>(0,m.jsxs)(`div`,{className:`grid grid-cols-[236px_236px] gap-x-16 gap-y-5 p-5`,children:[[`default`,`hover`,`focused`,`disabled`].map(e=>(0,m.jsx)(l,{label:`App Styling`,state:e},`menu-default-${e}`)),[`default`,`hover`,`focused`,`disabled`].map(e=>(0,m.jsx)(l,{label:`App Styling`,pressed:!0,state:e},`menu-pressed-${e}`))]}),parameters:{layout:`centered`}},C={render:()=>(0,m.jsxs)(`div`,{className:`flex items-center gap-4 p-5`,children:[(0,m.jsx)(o,{status:`draft`}),(0,m.jsx)(o,{status:`active`})]}),parameters:{layout:`centered`}},y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  render: args => {
    const panelRef = useRef(null);
    const [isBlockPopoverOpen, setIsBlockPopoverOpen] = useState(false);
    const [blockPopoverPosition, setBlockPopoverPosition] = useState(null);
    const openBlockPopover = useCallback(context => {
      setBlockPopoverPosition(getBlockPopoverPosition(panelRef.current, context?.anchorTop));
      setIsBlockPopoverOpen(true);
    }, []);
    const closeBlockPopover = useCallback(() => {
      setIsBlockPopoverOpen(false);
      setBlockPopoverPosition(null);
    }, []);
    return <>
        <BlockLibraryPopoverBackdrop open={isBlockPopoverOpen} onClose={closeBlockPopover} />
        <div className="flex min-h-screen items-start justify-center bg-neutral-100 p-8">
          <div className="flex flex-col items-center gap-4">
            <div className="relative flex items-start">
              <div ref={panelRef} className={panelFrameClassName}>
                <LeftPanel {...args} onAddBlock={context => {
                openBlockPopover(context);
                args.onAddBlock?.(context);
              }} onInsertBlock={context => {
                openBlockPopover(context);
                args.onInsertBlock?.(context);
              }} />
              </div>
              {isBlockPopoverOpen && blockPopoverPosition && <div className="fixed z-50" role="dialog" aria-label="Add block" aria-modal="true" style={blockPopoverPosition}>
                  <Popover defaultActiveBlockId="image-banner" onAddBlock={closeBlockPopover} />
                </div>}
            </div>
            <p className="max-w-[284px] text-center text-sm text-neutral-600">
              Preview note: hide toggles the hidden state. Delete removes the item for this session only; refresh restores the demo list. Use Add Block or the insert control between items to open the block library popover.
            </p>
          </div>
        </div>
      </>;
  },
  args: {
    type: 'fixed-blocks',
    status: 'draft',
    pageTitle: 'Home'
  }
}`,...y.parameters?.docs?.source}}},b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex min-h-screen flex-wrap items-start justify-center gap-10 bg-neutral-100 p-8">
      <div className={panelFrameClassName}>
        <LeftPanel type="blocks" />
      </div>
      <div className={panelFrameClassName}>
        <LeftPanel type="fixed-blocks" />
      </div>
      <div className={panelFrameClassName}>
        <LeftPanel type="theme-settings" />
      </div>
    </div>
}`,...b.parameters?.docs?.source}}},x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  render: () => <div className="grid grid-cols-[236px_236px] gap-x-24 gap-y-16 p-5">
      {['default', 'hover', 'focused', 'disabled'].map(state => <LeftPanelItem key={\`default-\${state}\`} label="Imager Banner" state={state} />)}
      {['default', 'hover', 'focused', 'disabled'].map(state => <LeftPanelItem key={\`pressed-\${state}\`} label="Imager Banner" pressed state={state} />)}
    </div>,
  parameters: {
    layout: 'centered'
  }
}`,...x.parameters?.docs?.source}}},S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  render: () => <div className="grid grid-cols-[236px_236px] gap-x-16 gap-y-5 p-5">
      {['default', 'hover', 'focused', 'disabled'].map(state => <LeftPanelMenuItem key={\`menu-default-\${state}\`} label="App Styling" state={state} />)}
      {['default', 'hover', 'focused', 'disabled'].map(state => <LeftPanelMenuItem key={\`menu-pressed-\${state}\`} label="App Styling" pressed state={state} />)}
    </div>,
  parameters: {
    layout: 'centered'
  }
}`,...S.parameters?.docs?.source}}},C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex items-center gap-4 p-5">
      <ThemeStatus status="draft" />
      <ThemeStatus status="active" />
    </div>,
  parameters: {
    layout: 'centered'
  }
}`,...C.parameters?.docs?.source}}},w=[`Playground`,`Variants`,`ItemStates`,`MenuItemStates`,`Status`]}))();export{x as ItemStates,S as MenuItemStates,y as Playground,C as Status,b as Variants,w as __namedExportsOrder,v as default};