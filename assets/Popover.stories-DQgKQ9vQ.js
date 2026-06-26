import{a as e,n as t}from"./chunk-DnJy8xQt.js";import{a as n}from"./iframe-BwdYszoy.js";import{t as r}from"./jsx-runtime-DxP0NviS.js";import{a as i,c as a,i as o,l as s,n as c,o as l,r as u,s as d,t as f}from"./Popover-Coq_EHdh.js";var p,m,h,g,_,v,y,b,x,S,C,w,T,E,D,O,k,A;t((()=>{p=e(n(),1),i(),s(),m=r(),{fn:h}=__STORYBOOK_MODULE_TEST__,g={title:`Organisms/Popover`,component:f,parameters:{layout:`centered`,docs:{description:{component:`Custom Blocks popover organism with search, segmented source tabs, scrollable built-in block list, hover add action, and a live preview panel from Figma.`}}},tags:[`autodocs`],argTypes:{activeBlockId:{control:`text`},activeTabIndex:{control:{type:`number`,min:0,max:2,step:1}},searchQuery:{control:`text`},previewLabel:{control:`text`},blocks:{control:`object`},tabs:{control:`object`}},args:{onAddBlock:h(),onBlockChange:h(),onCreateCustomBlock:h(),onGoToPlugins:h(),onSearchChange:h(),onTabChange:h()}},_={render:e=>{let[t,n]=(0,p.useState)(``),[r,i]=(0,p.useState)(`image-banner`),[a,o]=(0,p.useState)(0);return(0,m.jsx)(f,{...e,activeBlockId:r,activeTabIndex:a,searchQuery:t,onAddBlock:e.onAddBlock,onSearchChange:t=>{n(t),e.onSearchChange?.(t)},onBlockChange:t=>{i(t.id),e.onBlockChange?.(t)},onTabChange:t=>{o(t),n(``),e.onTabChange?.(t)}})}},v={args:{searchQuery:`product`,activeBlockId:`product-grid`,activeTabIndex:0}},y={args:{searchQuery:`sort`,activeTabIndex:0}},b={args:{searchQuery:`zzzz`,activeTabIndex:0}},x={args:{activeTabIndex:1}},S={args:{activeTabIndex:2}},C={args:{activeTabIndex:1,activeBlockId:`custom-block`,blocks:[...l,...d]}},w={args:{activeTabIndex:2,activeBlockId:`plugin-block`,blocks:[...l,...a]}},T={render:()=>(0,m.jsx)(`div`,{className:`flex w-[232px] flex-col gap-2 rounded-16 border border-solid border-neutral-100 bg-neutral-0 p-4`,children:l.filter(e=>e.category===`built-in`).map(e=>{let t=e.icon;return(0,m.jsxs)(`div`,{className:`flex h-5 items-center gap-2 text-neutral-700`,children:[(0,m.jsx)(t,{size:16,weight:`regular`}),(0,m.jsx)(`span`,{className:`text-sm font-medium`,children:e.label})]},e.id)})})},E={render:()=>(0,m.jsxs)(`div`,{className:`flex w-[232px] flex-col gap-2 rounded-16 border border-solid border-neutral-100 bg-neutral-0 p-4`,children:[(0,m.jsx)(c,{label:`Rich Text`,state:`default`}),(0,m.jsx)(c,{label:`Image Banner`,state:`hover`}),(0,m.jsx)(c,{label:`Video Banner`,state:`selected`})]})},D={render:()=>(0,m.jsxs)(`div`,{className:`flex w-[232px] flex-col gap-6`,children:[(0,m.jsx)(u,{type:`search`}),(0,m.jsx)(u,{type:`custom`,onAction:h()}),(0,m.jsx)(u,{type:`plugin`,onAction:h()})]})},O={render:()=>(0,m.jsx)(o,{label:`Preview`})},k={render:()=>(0,m.jsx)(o,{empty:!0,label:`Preview`})},_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  render: args => {
    const [searchQuery, setSearchQuery] = useState('');
    const [activeBlockId, setActiveBlockId] = useState('image-banner');
    const [activeTabIndex, setActiveTabIndex] = useState(0);
    return <Popover {...args} activeBlockId={activeBlockId} activeTabIndex={activeTabIndex} searchQuery={searchQuery} onAddBlock={args.onAddBlock} onSearchChange={query => {
      setSearchQuery(query);
      args.onSearchChange?.(query);
    }} onBlockChange={block => {
      setActiveBlockId(block.id);
      args.onBlockChange?.(block);
    }} onTabChange={index => {
      setActiveTabIndex(index);
      setSearchQuery('');
      args.onTabChange?.(index);
    }} />;
  }
}`,..._.parameters?.docs?.source}}},v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  args: {
    searchQuery: 'product',
    activeBlockId: 'product-grid',
    activeTabIndex: 0
  }
}`,...v.parameters?.docs?.source}}},y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  args: {
    searchQuery: 'sort',
    activeTabIndex: 0
  }
}`,...y.parameters?.docs?.source}}},b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  args: {
    searchQuery: 'zzzz',
    activeTabIndex: 0
  }
}`,...b.parameters?.docs?.source}}},x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  args: {
    activeTabIndex: 1
  }
}`,...x.parameters?.docs?.source}}},S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  args: {
    activeTabIndex: 2
  }
}`,...S.parameters?.docs?.source}}},C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
  args: {
    activeTabIndex: 1,
    activeBlockId: 'custom-block',
    blocks: [...BUILTIN_BLOCKS, ...DEMO_CUSTOM_BLOCKS]
  }
}`,...C.parameters?.docs?.source}}},w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  args: {
    activeTabIndex: 2,
    activeBlockId: 'plugin-block',
    blocks: [...BUILTIN_BLOCKS, ...DEMO_PLUGIN_BLOCKS]
  }
}`,...w.parameters?.docs?.source}}},T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex w-[232px] flex-col gap-2 rounded-16 border border-solid border-neutral-100 bg-neutral-0 p-4">
      {BUILTIN_BLOCKS.filter(block => block.category === 'built-in').map(block => {
      const BlockIcon = block.icon;
      return <div key={block.id} className="flex h-5 items-center gap-2 text-neutral-700">
            <BlockIcon size={16} weight="regular" />
            <span className="text-sm font-medium">{block.label}</span>
          </div>;
    })}
    </div>
}`,...T.parameters?.docs?.source}}},E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex w-[232px] flex-col gap-2 rounded-16 border border-solid border-neutral-100 bg-neutral-0 p-4">
      <PopoverBlockItem label="Rich Text" state="default" />
      <PopoverBlockItem label="Image Banner" state="hover" />
      <PopoverBlockItem label="Video Banner" state="selected" />
    </div>
}`,...E.parameters?.docs?.source}}},D.parameters={...D.parameters,docs:{...D.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex w-[232px] flex-col gap-6">
      <PopoverEmptyState type="search" />
      <PopoverEmptyState type="custom" onAction={fn()} />
      <PopoverEmptyState type="plugin" onAction={fn()} />
    </div>
}`,...D.parameters?.docs?.source}}},O.parameters={...O.parameters,docs:{...O.parameters?.docs,source:{originalSource:`{
  render: () => <PopoverPreview label="Preview" />
}`,...O.parameters?.docs?.source}}},k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`{
  render: () => <PopoverPreview empty label="Preview" />
}`,...k.parameters?.docs?.source}}},A=[`Playground`,`WithSearchQuery`,`SearchSortAndFilter`,`BuiltInSearchEmpty`,`CustomTabEmpty`,`PluginTabEmpty`,`CustomTabWithBlocks`,`PluginTabWithBlocks`,`BuiltInBlockList`,`BlockItemStates`,`EmptyStates`,`PreviewPanel`,`PreviewPanelEmpty`]}))();export{E as BlockItemStates,T as BuiltInBlockList,b as BuiltInSearchEmpty,x as CustomTabEmpty,C as CustomTabWithBlocks,D as EmptyStates,_ as Playground,S as PluginTabEmpty,w as PluginTabWithBlocks,O as PreviewPanel,k as PreviewPanelEmpty,y as SearchSortAndFilter,v as WithSearchQuery,A as __namedExportsOrder,g as default};