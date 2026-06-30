import{n as e}from"./chunk-DnJy8xQt.js";import{t}from"./jsx-runtime-DxP0NviS.js";import{b as n,f as r,g as i,v as a}from"./UploadFileBase-uX1dFwU0.js";import{t as o}from"./uploadFile.stories-B8HDwWdz.js";import{a as s,c,i as l,l as u,n as d,o as f,r as p,s as m,t as h}from"./UploadFile-JBuLxLGB.js";function g(e){let{layout:t=`Horizontal`,showDescription:n=!0,showSupportText:r=!0,dropzoneState:i=`Default`,filesQueued:a=!1,state:o=`Uploading`,slots:s,...l}=e,d={...l};for(let e=1;e<=10;e+=1)delete d[`slotState_${e}`];let f=m(o)?s??p(e):s;return(0,_.jsx)(h,{...d,dropzoneState:c(i),filesQueued:a,layout:u(t),showDescription:n,showSupportText:r,slots:f,state:o})}var _,v,y,b,x,S,C,w,T,E,D,O,k,A,j,M,N,P,F;e((()=>{d(),f(),o(),_=t(),{fn:v}=__STORYBOOK_MODULE_TEST__,y=[`Uploading`,`Large File`,`Unsupported File`,`Internet Issue`,`Request Failed`,`Upload Successful`],b=l(),x=s(),g.displayName=`Upload File`,S={title:`Molecules/Upload File`,component:h,parameters:{layout:`centered`,controls:{sort:`none`},docs:{controls:{sort:`none`},description:{component:"Single Upload File molecule composed of **Upload File Base** (dropzone), **Upload File Item** (queued upload states), and **Multiple Images** (multi-upload grid). Use Layout, Show Description, Show Support Text, Dropzone State, Files Queued, and State to switch between the three base components. For Multiple Images, pass a custom `slots` array or use the slot controls in Playground to set each tile state individually."}}},tags:[`autodocs`],argTypes:{layout:{name:`Layout`,control:`select`,options:[...i],type:{name:`enum`,value:[...i]},if:{arg:`filesQueued`,eq:!1},table:{order:0,defaultValue:{summary:`Horizontal`}}},showDescription:{name:`Show Description`,control:`boolean`,if:{arg:`filesQueued`,eq:!1},table:{order:1,defaultValue:{summary:!0}}},showSupportText:{name:`Show Support Text`,control:`boolean`,if:{arg:`filesQueued`,eq:!1},table:{order:2,defaultValue:{summary:!0}}},dropzoneState:{name:`Dropzone State`,control:`select`,options:[...r],type:{name:`enum`,value:[...r]},if:{arg:`filesQueued`,eq:!1},table:{order:3,defaultValue:{summary:`Default`}}},filesQueued:{name:`Files Queued`,control:`boolean`,table:{order:4,defaultValue:{summary:!1}}},state:{name:`State`,control:`select`,options:[...a],type:{name:`enum`,value:[...a]},table:{order:5,defaultValue:{summary:`Uploading`}}},progress:{control:{type:`range`,min:0,max:100,step:1},if:{arg:`state`,eq:`Uploading`},table:{order:6}},showFileSize:{name:`Show File Size`,control:`boolean`,if:{arg:`state`,eq:`Upload Successful`},table:{order:7,defaultValue:{summary:!0}}},slots:{control:!1,table:{disable:!0}},...b,onBrowse:{table:{disable:!0}},onFilesChange:{table:{disable:!0}},onReplace:{table:{disable:!0}},onDelete:{table:{disable:!0}},onRetry:{table:{disable:!0}}},args:{layout:`Horizontal`,showDescription:!0,showSupportText:!0,dropzoneState:`Default`,filesQueued:!1,state:`Uploading`,progress:75,showFileSize:!0,...x,onBrowse:v(),onFilesChange:v(),onReplace:v(),onDelete:v(),onRetry:v()},render:e=>(0,_.jsx)(g,{...e})},C={parameters:{docs:{description:{story:`Interactive playground for the full Upload File molecule. Set State to a Multiple + layout and use the Multiple Image Slots controls to change any tile in row 1 or row 2.`}}}},w={parameters:{docs:{description:{story:`Default horizontal Upload File Base dropzone with support text. Matches Figma at 416×104.`}}},args:{layout:`Horizontal`,showDescription:!0,showSupportText:!0,dropzoneState:`Default`,filesQueued:!1,state:`Uploading`}},T={name:`Upload File Base / Horizontal`,parameters:{controls:{disable:!0},docs:{description:{story:`Upload File Base rendered horizontally with and without support text.`}}},render:()=>(0,_.jsxs)(`div`,{className:`flex flex-col gap-4`,children:[(0,_.jsx)(g,{layout:`Horizontal`,showSupportText:!0,state:`Uploading`}),(0,_.jsx)(g,{layout:`Horizontal`,showSupportText:!1,state:`Uploading`})]})},E={name:`Upload File Base / Vertical`,parameters:{controls:{disable:!0},docs:{description:{story:`Upload File Base rendered vertically with and without support text.`}}},render:()=>(0,_.jsxs)(`div`,{className:`flex flex-col gap-4`,children:[(0,_.jsx)(g,{layout:`Vertical`,showSupportText:!0,state:`Uploading`}),(0,_.jsx)(g,{layout:`Vertical`,showSupportText:!1,state:`Uploading`})]})},D={name:`Upload File Base / Dropzone States`,parameters:{controls:{disable:!0},docs:{description:{story:`Upload File Base default, hover, focus, and disabled dropzone states.`}}},render:()=>(0,_.jsx)(`div`,{className:`flex flex-col gap-4`,children:r.map(e=>(0,_.jsx)(g,{dropzoneState:e,state:`Uploading`},e))})},O={name:`Upload File Item / All States`,parameters:{controls:{disable:!0},docs:{description:{story:`Upload File Item states shown when Files Queued is enabled: uploading, errors, and success.`}}},render:()=>(0,_.jsx)(`div`,{className:`flex flex-col gap-4`,children:y.map(e=>(0,_.jsx)(g,{filesQueued:!0,state:e},e))})},k={name:`Upload File Item / Uploading`,parameters:{controls:{disable:!0}},args:{filesQueued:!0,state:`Uploading`,progress:75}},A={name:`Upload File Item / Upload Successful`,parameters:{controls:{disable:!0}},args:{filesQueued:!0,state:`Upload Successful`,showFileSize:!0}},j={name:`Multiple Images / All Layouts`,parameters:{controls:{disable:!0},docs:{description:{story:`Multiple Images grid for Square, iPad, iPhone, and Android tile layouts with container heights sized for two rows.`}}},render:()=>(0,_.jsx)(`div`,{className:`flex flex-col gap-6`,children:n.map(e=>(0,_.jsxs)(`div`,{className:`flex flex-col gap-3`,children:[(0,_.jsx)(`span`,{className:`font-sans text-ds-text-sm text-neutral-700`,children:e}),(0,_.jsx)(g,{state:e})]},e))})},M={name:`Multiple Images / Slot Editor`,parameters:{docs:{description:{story:`Use the Multiple Image Slots controls to set Default, Hover, or Loading on any image tile in rows 1–2, and Default, Hover, Focus, or Disabled on the add tile.`}}},args:{state:`Multiple + Square`,slotState_8:`Hover`,slotState_9:`Loading`}},N={name:`Multiple Images / Square`,parameters:{controls:{disable:!0}},args:{state:`Multiple + Square`}},P={name:`All States`,parameters:{controls:{disable:!0},docs:{description:{story:`Every Upload File state from Figma across all three base components.`}}},render:()=>(0,_.jsxs)(`div`,{className:`flex flex-col gap-6`,children:[(0,_.jsx)(g,{}),y.map(e=>(0,_.jsx)(g,{filesQueued:!0,state:e},e)),n.map(e=>(0,_.jsx)(g,{state:e},e))]})},C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: 'Interactive playground for the full Upload File molecule. Set State to a Multiple + layout and use the Multiple Image Slots controls to change any tile in row 1 or row 2.'
      }
    }
  }
}`,...C.parameters?.docs?.source}}},w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: 'Default horizontal Upload File Base dropzone with support text. Matches Figma at 416×104.'
      }
    }
  },
  args: {
    layout: 'Horizontal',
    showDescription: true,
    showSupportText: true,
    dropzoneState: 'Default',
    filesQueued: false,
    state: 'Uploading'
  }
}`,...w.parameters?.docs?.source}}},T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{
  name: 'Upload File Base / Horizontal',
  parameters: {
    controls: {
      disable: true
    },
    docs: {
      description: {
        story: 'Upload File Base rendered horizontally with and without support text.'
      }
    }
  },
  render: () => <div className="flex flex-col gap-4">
      <UploadFileStory layout="Horizontal" showSupportText state="Uploading" />
      <UploadFileStory layout="Horizontal" showSupportText={false} state="Uploading" />
    </div>
}`,...T.parameters?.docs?.source}}},E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`{
  name: 'Upload File Base / Vertical',
  parameters: {
    controls: {
      disable: true
    },
    docs: {
      description: {
        story: 'Upload File Base rendered vertically with and without support text.'
      }
    }
  },
  render: () => <div className="flex flex-col gap-4">
      <UploadFileStory layout="Vertical" showSupportText state="Uploading" />
      <UploadFileStory layout="Vertical" showSupportText={false} state="Uploading" />
    </div>
}`,...E.parameters?.docs?.source}}},D.parameters={...D.parameters,docs:{...D.parameters?.docs,source:{originalSource:`{
  name: 'Upload File Base / Dropzone States',
  parameters: {
    controls: {
      disable: true
    },
    docs: {
      description: {
        story: 'Upload File Base default, hover, focus, and disabled dropzone states.'
      }
    }
  },
  render: () => <div className="flex flex-col gap-4">
      {UPLOAD_FILE_DROPZONE_STATE_OPTIONS.map(dropzoneState => <UploadFileStory key={dropzoneState} dropzoneState={dropzoneState} state="Uploading" />)}
    </div>
}`,...D.parameters?.docs?.source}}},O.parameters={...O.parameters,docs:{...O.parameters?.docs,source:{originalSource:`{
  name: 'Upload File Item / All States',
  parameters: {
    controls: {
      disable: true
    },
    docs: {
      description: {
        story: 'Upload File Item states shown when Files Queued is enabled: uploading, errors, and success.'
      }
    }
  },
  render: () => <div className="flex flex-col gap-4">
      {ITEM_STATE_OPTIONS.map(state => <UploadFileStory key={state} filesQueued state={state} />)}
    </div>
}`,...O.parameters?.docs?.source}}},k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`{
  name: 'Upload File Item / Uploading',
  parameters: {
    controls: {
      disable: true
    }
  },
  args: {
    filesQueued: true,
    state: 'Uploading',
    progress: 75
  }
}`,...k.parameters?.docs?.source}}},A.parameters={...A.parameters,docs:{...A.parameters?.docs,source:{originalSource:`{
  name: 'Upload File Item / Upload Successful',
  parameters: {
    controls: {
      disable: true
    }
  },
  args: {
    filesQueued: true,
    state: 'Upload Successful',
    showFileSize: true
  }
}`,...A.parameters?.docs?.source}}},j.parameters={...j.parameters,docs:{...j.parameters?.docs,source:{originalSource:`{
  name: 'Multiple Images / All Layouts',
  parameters: {
    controls: {
      disable: true
    },
    docs: {
      description: {
        story: 'Multiple Images grid for Square, iPad, iPhone, and Android tile layouts with container heights sized for two rows.'
      }
    }
  },
  render: () => <div className="flex flex-col gap-6">
      {UPLOAD_FILE_MULTIPLE_STATE_OPTIONS.map(state => <div key={state} className="flex flex-col gap-3">
          <span className="font-sans text-ds-text-sm text-neutral-700">{state}</span>
          <UploadFileStory state={state} />
        </div>)}
    </div>
}`,...j.parameters?.docs?.source}}},M.parameters={...M.parameters,docs:{...M.parameters?.docs,source:{originalSource:`{
  name: 'Multiple Images / Slot Editor',
  parameters: {
    docs: {
      description: {
        story: 'Use the Multiple Image Slots controls to set Default, Hover, or Loading on any image tile in rows 1–2, and Default, Hover, Focus, or Disabled on the add tile.'
      }
    }
  },
  args: {
    state: 'Multiple + Square',
    slotState_8: 'Hover',
    slotState_9: 'Loading'
  }
}`,...M.parameters?.docs?.source}}},N.parameters={...N.parameters,docs:{...N.parameters?.docs,source:{originalSource:`{
  name: 'Multiple Images / Square',
  parameters: {
    controls: {
      disable: true
    }
  },
  args: {
    state: 'Multiple + Square'
  }
}`,...N.parameters?.docs?.source}}},P.parameters={...P.parameters,docs:{...P.parameters?.docs,source:{originalSource:`{
  name: 'All States',
  parameters: {
    controls: {
      disable: true
    },
    docs: {
      description: {
        story: 'Every Upload File state from Figma across all three base components.'
      }
    }
  },
  render: () => <div className="flex flex-col gap-6">
      <UploadFileStory />
      {ITEM_STATE_OPTIONS.map(state => <UploadFileStory key={state} filesQueued state={state} />)}
      {UPLOAD_FILE_MULTIPLE_STATE_OPTIONS.map(state => <UploadFileStory key={state} state={state} />)}
    </div>
}`,...P.parameters?.docs?.source}}},F=[`Playground`,`Default`,`UploadFileBaseHorizontal`,`UploadFileBaseVertical`,`UploadFileBaseDropzoneStates`,`UploadFileItemStates`,`UploadFileItemUploading`,`UploadFileItemUploadSuccessful`,`MultipleImagesAllLayouts`,`MultipleImagesSlotEditor`,`MultipleImagesSquare`,`AllStates`]}))();export{P as AllStates,w as Default,j as MultipleImagesAllLayouts,M as MultipleImagesSlotEditor,N as MultipleImagesSquare,C as Playground,D as UploadFileBaseDropzoneStates,T as UploadFileBaseHorizontal,E as UploadFileBaseVertical,O as UploadFileItemStates,A as UploadFileItemUploadSuccessful,k as UploadFileItemUploading,F as __namedExportsOrder,S as default};