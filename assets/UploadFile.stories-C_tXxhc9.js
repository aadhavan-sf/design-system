import{n as e}from"./chunk-DnJy8xQt.js";import{t}from"./jsx-runtime-DxP0NviS.js";import{a as n,i as r,o as i,r as a,t as o}from"./UploadFile-CA-OER8O.js";var s,c,l,u,d,f,p,m,h,g,_;e((()=>{i(),s=t(),{fn:c}=__STORYBOOK_MODULE_TEST__,l={title:`Molecules/Upload File`,component:a,parameters:{layout:`centered`,docs:{description:{component:`Upload file and dropzone molecule with horizontal/vertical dropzones, single uploaded file cards, image queues, and reusable image aspect ratio tiles.`}}},tags:[`autodocs`],argTypes:{layout:{control:`select`,options:[`horizontal`,`vertical`]},mode:{control:`select`,options:[`single`,`multiple`]},dropzoneState:{control:`select`,options:[`enabled`,`hover`,`focus`,`disabled`]},multipleState:{control:`select`,options:[`complete`,`add-empty`,`add-hover`,`add-loader`]},filesQueued:{control:`boolean`},supportingText:{control:`boolean`},disabled:{control:`boolean`},size:{control:`select`,options:[`default`,`small`]}},args:{onFilesChange:c(),onReplace:c(),onDelete:c()}},u={args:{layout:`horizontal`,mode:`single`,filesQueued:!1,dropzoneState:`enabled`,supportingText:!0,multipleState:`complete`,fileName:`File_name.ext`,fileSize:`200 KB`,disabled:!1}},d={render:()=>(0,s.jsxs)(`div`,{className:`flex flex-col gap-8`,children:[(0,s.jsx)(`div`,{className:`flex flex-wrap items-start gap-6`,children:[`enabled`,`hover`,`focus`,`disabled`].map(e=>(0,s.jsx)(r,{state:e},`horizontal-${e}`))}),(0,s.jsx)(`div`,{className:`flex flex-wrap items-start gap-6`,children:[`enabled`,`hover`,`focus`,`disabled`].map(e=>(0,s.jsx)(r,{layout:`vertical`,state:e},`vertical-${e}`))})]})},f={parameters:{docs:{description:{story:`Compact dropzone used inside constrained layouts such as the Icon Library picker. Full width, tighter padding, and smaller typography.`}}},render:()=>(0,s.jsxs)(`div`,{className:`flex w-[216px] flex-col gap-8`,children:[(0,s.jsx)(a,{size:`small`,layout:`horizontal`,title:`Upload Your Icon`,description:`24x24 SVG or PNG`}),(0,s.jsx)(a,{size:`small`,layout:`vertical`})]})},p={parameters:{docs:{description:{story:`Disabled horizontal and vertical upload dropzones. Both use the disabled button state, neutral_50 surface, neutral_200 dashed border, and neutral_400 text/icon color.`}}},render:()=>(0,s.jsxs)(`div`,{className:`flex flex-col gap-8`,children:[(0,s.jsx)(r,{layout:`horizontal`,state:`disabled`}),(0,s.jsx)(r,{layout:`vertical`,state:`disabled`})]})},m={render:()=>(0,s.jsxs)(`div`,{className:`flex flex-col gap-8`,children:[(0,s.jsxs)(`div`,{className:`flex flex-wrap items-start gap-6`,children:[(0,s.jsx)(n,{}),(0,s.jsx)(n,{state:`completed-hover`})]}),(0,s.jsxs)(`div`,{className:`flex flex-wrap items-start gap-6`,children:[(0,s.jsx)(n,{type:`multiple`,state:`complete`}),(0,s.jsx)(n,{type:`multiple`,state:`add-empty`})]}),(0,s.jsxs)(`div`,{className:`flex flex-wrap items-start gap-6`,children:[(0,s.jsx)(n,{type:`multiple`,state:`add-hover`}),(0,s.jsx)(n,{type:`multiple`,state:`add-loader`})]})]})},h={render:()=>(0,s.jsxs)(`div`,{className:`flex flex-wrap items-start gap-6`,children:[(0,s.jsxs)(`div`,{className:`flex flex-col gap-8`,children:[(0,s.jsx)(a,{layout:`horizontal`,mode:`single`}),(0,s.jsx)(a,{layout:`horizontal`,mode:`single`,filesQueued:!0})]}),(0,s.jsxs)(`div`,{className:`flex flex-col gap-8`,children:[(0,s.jsx)(a,{layout:`horizontal`,mode:`multiple`}),(0,s.jsx)(a,{layout:`horizontal`,mode:`multiple`,filesQueued:!0})]}),(0,s.jsxs)(`div`,{className:`flex flex-col gap-8`,children:[(0,s.jsx)(a,{layout:`vertical`,mode:`single`}),(0,s.jsx)(a,{layout:`vertical`,mode:`single`,filesQueued:!0})]}),(0,s.jsxs)(`div`,{className:`flex flex-col gap-8`,children:[(0,s.jsx)(a,{layout:`vertical`,mode:`multiple`}),(0,s.jsx)(a,{layout:`vertical`,mode:`multiple`,filesQueued:!0})]})]})},g={render:()=>(0,s.jsxs)(`div`,{className:`flex flex-col gap-8`,children:[(0,s.jsx)(`div`,{className:`flex flex-wrap items-start gap-6`,children:[`square`,`iphone`,`ipad`,`android`].map(e=>(0,s.jsx)(o,{size:e},`default-${e}`))}),(0,s.jsx)(`div`,{className:`flex flex-wrap items-start gap-6`,children:[`square`,`iphone`,`ipad`,`android`].map(e=>(0,s.jsx)(o,{size:e,status:`hovered`},`hovered-${e}`))}),(0,s.jsx)(`div`,{className:`flex flex-wrap items-start gap-6`,children:[`square`,`iphone`,`ipad`,`android`].map(e=>(0,s.jsx)(o,{size:e,status:`loader`},`loader-${e}`))}),(0,s.jsx)(`div`,{className:`flex flex-wrap items-start gap-6`,children:[`square`,`iphone`,`ipad`,`android`].map(e=>(0,s.jsx)(o,{size:e,type:`uploader`},`uploader-${e}`))})]})},u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  args: {
    layout: 'horizontal',
    mode: 'single',
    filesQueued: false,
    dropzoneState: 'enabled',
    supportingText: true,
    multipleState: 'complete',
    fileName: 'File_name.ext',
    fileSize: '200 KB',
    disabled: false
  }
}`,...u.parameters?.docs?.source}}},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex flex-col gap-8">
      <div className="flex flex-wrap items-start gap-6">
        {['enabled', 'hover', 'focus', 'disabled'].map(state => <UploadFileBase key={\`horizontal-\${state}\`} state={state} />)}
      </div>
      <div className="flex flex-wrap items-start gap-6">
        {['enabled', 'hover', 'focus', 'disabled'].map(state => <UploadFileBase key={\`vertical-\${state}\`} layout="vertical" state={state} />)}
      </div>
    </div>
}`,...d.parameters?.docs?.source}}},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: 'Compact dropzone used inside constrained layouts such as the Icon Library picker. Full width, tighter padding, and smaller typography.'
      }
    }
  },
  render: () => <div className="flex w-[216px] flex-col gap-8">
      <UploadFile size="small" layout="horizontal" title="Upload Your Icon" description="24x24 SVG or PNG" />
      <UploadFile size="small" layout="vertical" />
    </div>
}`,...f.parameters?.docs?.source}}},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: 'Disabled horizontal and vertical upload dropzones. Both use the disabled button state, neutral_50 surface, neutral_200 dashed border, and neutral_400 text/icon color.'
      }
    }
  },
  render: () => <div className="flex flex-col gap-8">
      <UploadFileBase layout="horizontal" state="disabled" />
      <UploadFileBase layout="vertical" state="disabled" />
    </div>
}`,...p.parameters?.docs?.source}}},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex flex-col gap-8">
      <div className="flex flex-wrap items-start gap-6">
        <UploadFileItem />
        <UploadFileItem state="completed-hover" />
      </div>
      <div className="flex flex-wrap items-start gap-6">
        <UploadFileItem type="multiple" state="complete" />
        <UploadFileItem type="multiple" state="add-empty" />
      </div>
      <div className="flex flex-wrap items-start gap-6">
        <UploadFileItem type="multiple" state="add-hover" />
        <UploadFileItem type="multiple" state="add-loader" />
      </div>
    </div>
}`,...m.parameters?.docs?.source}}},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex flex-wrap items-start gap-6">
      <div className="flex flex-col gap-8">
        <UploadFile layout="horizontal" mode="single" />
        <UploadFile layout="horizontal" mode="single" filesQueued />
      </div>
      <div className="flex flex-col gap-8">
        <UploadFile layout="horizontal" mode="multiple" />
        <UploadFile layout="horizontal" mode="multiple" filesQueued />
      </div>
      <div className="flex flex-col gap-8">
        <UploadFile layout="vertical" mode="single" />
        <UploadFile layout="vertical" mode="single" filesQueued />
      </div>
      <div className="flex flex-col gap-8">
        <UploadFile layout="vertical" mode="multiple" />
        <UploadFile layout="vertical" mode="multiple" filesQueued />
      </div>
    </div>
}`,...h.parameters?.docs?.source}}},g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex flex-col gap-8">
      <div className="flex flex-wrap items-start gap-6">
        {['square', 'iphone', 'ipad', 'android'].map(size => <ImageAspectRatio key={\`default-\${size}\`} size={size} />)}
      </div>
      <div className="flex flex-wrap items-start gap-6">
        {['square', 'iphone', 'ipad', 'android'].map(size => <ImageAspectRatio key={\`hovered-\${size}\`} size={size} status="hovered" />)}
      </div>
      <div className="flex flex-wrap items-start gap-6">
        {['square', 'iphone', 'ipad', 'android'].map(size => <ImageAspectRatio key={\`loader-\${size}\`} size={size} status="loader" />)}
      </div>
      <div className="flex flex-wrap items-start gap-6">
        {['square', 'iphone', 'ipad', 'android'].map(size => <ImageAspectRatio key={\`uploader-\${size}\`} size={size} type="uploader" />)}
      </div>
    </div>
}`,...g.parameters?.docs?.source}}},_=[`Playground`,`DropzoneStates`,`SmallSize`,`DisabledStates`,`UploadedItems`,`ComposedLayouts`,`ImageAspectRatios`]}))();export{h as ComposedLayouts,p as DisabledStates,d as DropzoneStates,g as ImageAspectRatios,u as Playground,f as SmallSize,m as UploadedItems,_ as __namedExportsOrder,l as default};