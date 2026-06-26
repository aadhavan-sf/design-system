import{a as e,n as t}from"./chunk-DnJy8xQt.js";import{a as n}from"./iframe-CJsyicl5.js";import{t as r}from"./jsx-runtime-DxP0NviS.js";import{Jt as i,L as a,M as o,a as s,d as c,i as l,k as u,ot as d,r as f,t as p,y as ee}from"./index.es-eIie9M8s.js";import{t as m}from"./Typography-VHhF8HGF.js";import{t as h}from"./Typography-CHZPSMKC.js";import{t as g}from"./Button-DlE_tbn_.js";import{t as _}from"./Button-BiD3GJLQ.js";import{n as v,t as te}from"./ProgressBar-CnXnAUhE.js";var y,b=t((()=>{y=``+new URL(`upload-file-preview-DUNjb0v8.png`,import.meta.url).href})),x,S=t((()=>{x=``+new URL(`upload-file-preview-DUNjb0v8.png`,import.meta.url).href})),C,w,T,ne,E,D,re,O,k,ie,A,ae,oe,se,ce,le,ue,de,fe,pe,me,he,ge,j=t((()=>{b(),S(),C=`w-[416px]`,w=[`Horizontal`,`Vertical`],T=[`Default`,`Hover`,`Focus`,`Disabled`],ne={default:`default`,hover:`hover`,focus:`focus`,disabled:`disabled`,Default:`default`,Hover:`hover`,Focus:`focus`,Disabled:`disabled`,Focused:`focus`},E=[`Uploading`,`Large File`,`Unsupported File`,`Internet Issue`,`Request Failed`,`Upload Successful`,`Multiple + iPad`,`Multiple + Square`,`Multiple + iPhone`,`Multiple + Android`],D=[`Multiple + iPad`,`Multiple + Square`,`Multiple + iPhone`,`Multiple + Android`],re={horizontal:`horizontal`,vertical:`vertical`,Horizontal:`horizontal`,Vertical:`vertical`},O={Uploading:`uploading-media`,uploading:`uploading-media`,"uploading-media":`uploading-media`,"Upload Successful":`upload-successful`,"upload-successful":`upload-successful`,"Large File":`large-file`,"large-file":`large-file`,"Unsupported File":`unsupported-file`,"unsupported-file":`unsupported-file`,"Internet Issue":`internet-issue`,"internet-issue":`internet-issue`,"Request Failed":`request-failed`,"request-failed":`request-failed`,"Multiple + Square":`multiple-square`,"Multiple + iPad":`multiple-ipad`,"Multiple + iPhone":`multiple-iphone`,"Multiple + Android":`multiple-android`},k=y,ie=x,A={title:`This file is too large to upload!`,description:`Please upload an image under 20 MB or a video under 200 MB.`},ae={title:`This file format is not supported!`,description:`Please upload a JPG, PNG, MP4, or MOV file to continue with your upload.`},oe={title:`This file couldn't be uploaded!`,description:`Please check your internet connection and try uploading the file again.`},se={title:`Request failed with status code 400!`,description:`We couldn't complete your request at the moment. Please try again.`},ce=[{kind:`item`,state:`default`},{kind:`item`,state:`default`},{kind:`item`,state:`default`},{kind:`item`,state:`default`},{kind:`item`,state:`default`},{kind:`item`,state:`default`},{kind:`item`,state:`default`},{kind:`item`,state:`hover`},{kind:`item`,state:`loading`},{kind:`base`,state:`default`}],le={"Multiple + Square":`square`,"Multiple + iPad":`ipad`,"Multiple + iPhone":`iphone`,"Multiple + Android":`android`},ue=[`storybook-multiple-images relative box-border`,C,`bg-neutral-0 p-3 rounded-8`,`after:content-[""] after:absolute after:inset-0 after:z-[1]`,`after:box-border after:border after:border-solid after:border-neutral-200`,`after:rounded-[inherit] after:pointer-events-none`].join(` `),de={square:`min-h-[176px]`,ipad:`min-h-[240px]`,iphone:`min-h-[342px]`,android:`min-h-[348px]`},fe=`relative z-0 grid w-fit grid-cols-[repeat(5,72px)] gap-2`,pe={square:`grid-rows-[72px_72px]`,ipad:`grid-rows-[104px_104px]`,iphone:`grid-rows-[155px_155px]`,android:`grid-rows-[158px_158px]`},me={square:`storybook-upload-image-tile--square`,ipad:`storybook-upload-image-tile--ipad`,iphone:`storybook-upload-image-tile--iphone`,android:`storybook-upload-image-tile--android`},he={square:`w-[72px] h-[72px]`,ipad:`w-[72px] h-[104px]`,iphone:`w-[72px] h-[155px]`,android:`w-[72px] h-[158px]`},ge={square:`square`,ipad:`ipad`,iphone:`iphone`,android:`android`,Square:`square`,iPad:`ipad`,iPhone:`iphone`,Android:`android`}}));function _e(e){return e.flat().filter(Boolean).join(` `)}function ve({active:e=!1,cornerRadius:t=8,className:n}){return(0,ye.jsx)(`svg`,{"aria-hidden":`true`,className:_e([`storybook-upload-file-dashed-border pointer-events-none absolute inset-0 size-full text-neutral-200`,e&&`text-brand-400`,n]),preserveAspectRatio:`none`,children:(0,ye.jsx)(`rect`,{fill:`none`,height:`calc(100% - 1px)`,rx:t,stroke:`currentColor`,strokeDasharray:`4 4`,strokeLinecap:`butt`,strokeLinejoin:`miter`,strokeWidth:`1`,vectorEffect:`non-scaling-stroke`,width:`calc(100% - 1px)`,x:`0.5`,y:`0.5`})})}var ye,be=t((()=>{ye=r(),ve.__docgenInfo={description:``,methods:[],displayName:`UploadFileDashedBorder`,props:{active:{required:!1,tsType:{name:`boolean`},description:``,defaultValue:{value:`false`,computed:!1}},cornerRadius:{required:!1,tsType:{name:`number`},description:``,defaultValue:{value:`8`,computed:!1}},className:{required:!1,tsType:{name:`string`},description:``}}}})),xe=t((()=>{})),Se=t((()=>{}));function M(e){return e.flat().filter(Boolean).join(` `)}function Ce(e){return Fe[e??`horizontal`]??`horizontal`}function we(e){return Ie[e??`default`]??`default`}function Te(e){return e!==`horizontal`&&e!==`vertical`}function Ee({visualState:e,isDisabled:t}){let n=e===`hover`,r=e===`focus`;return M([t&&`cursor-not-allowed bg-neutral-50 text-neutral-400`,!t&&n&&`bg-neutral-25`,!t&&!n&&!r&&`hover:bg-neutral-25`,!t&&r&&`bg-neutral-0 shadow-focus-brand`,!t&&`focus-visible:bg-neutral-0 focus-visible:shadow-focus-brand`])}function De(e,t){return!e&&!t?`title-only`:e&&t?`full`:`partial`}function Oe({layout:e,copyLayoutMode:t}){return M([`storybook-upload-file-base__copy flex min-w-0 flex-col`,e===`vertical`&&`items-center`,e===`horizontal`&&t===`title-only`&&`justify-center`])}function ke({layout:e,showDescription:t,showSupportText:n,visualState:r,isDisabled:i,className:a}){if(Te(e))return M([`storybook-upload-file-base relative box-border inline-flex shrink-0 items-center justify-center border-0`,`rounded-4 bg-neutral-0 font-sans`,Le[e],Ee({visualState:r,isDisabled:i}),a]);let o=De(t,n);if(e===`horizontal`){let e={"title-only":`h-[64px] items-center`,partial:`h-[80px] items-start`,full:`h-[104px] items-start`}[o];return M([`storybook-upload-file-base relative box-border flex w-[416px] border-0`,`rounded-2 bg-neutral-0 p-4 font-sans text-left gap-3`,e,Ee({visualState:r,isDisabled:i}),a])}let s={"title-only":`h-[116px] flex-col items-center justify-center gap-3`,partial:`h-[140px] flex-col items-center justify-start gap-3`,full:`h-[164px] flex-col items-center justify-start gap-4`}[o];return M([`storybook-upload-file-base relative box-border flex w-[416px] border-0`,`rounded-2 bg-neutral-0 px-[54px] py-6 font-sans text-center`,s,Ee({visualState:r,isDisabled:i}),a])}function Ae({supportingText:e,showDescription:t,showSupportText:n}){return e===!1?{showDescription:!1,showSupportText:!1}:{showDescription:t??!0,showSupportText:n??!0}}function je(e,t){return e?`text-neutral-400`:t}function Me(e){return M([`shrink-0`,e?`text-neutral-400`:`text-brand-400`])}function Ne({layout:e=`horizontal`,state:t=`default`,supportingText:n,showDescription:r,showSupportText:i,title:s=`Drag and drop or browse files`,description:c=`Upload vertical images or videos for your background.`,footerText:l=`Max image size: 20 MB • Max video size: 200 MB`,disabled:u=!1,className:d,onBrowse:f,onDropFiles:p,onClick:ee,...h}){let[g,_]=(0,Pe.useState)(!1),v=Ce(e),te=we(t),y=u||te===`disabled`,b=g&&!y?`hover`:te,x=Te(v),{showDescription:S,showSupportText:C}=Ae({supportingText:n,showDescription:r,showSupportText:i}),w=De(S,C);return(0,N.jsxs)(`button`,{type:`button`,disabled:y,className:ke({layout:v,showDescription:S,showSupportText:C,visualState:b,isDisabled:y,className:d}),onClick:e=>{ee?.(e),!(y||e.defaultPrevented)&&f?.()},onDragLeave:()=>_(!1),onDragOver:e=>{e.preventDefault(),y||_(!0)},onDrop:e=>{e.preventDefault(),_(!1),!y&&p?.(Array.from(e.dataTransfer.files))},...h,children:[(0,N.jsx)(ve,{active:!y&&b===`focus`,cornerRadius:x?4:8}),x?(0,N.jsx)(o,{"aria-hidden":`true`,className:Me(y),size:32,weight:`regular`}):(0,N.jsxs)(N.Fragment,{children:[(0,N.jsx)(a,{"aria-hidden":`true`,className:Me(y),size:32,weight:`regular`}),(0,N.jsxs)(`span`,{className:Oe({layout:v,copyLayoutMode:w}),children:[(0,N.jsx)(m,{as:`span`,variant:`text-md`,weight:`medium`,className:M([`storybook-upload-file-base__title block whitespace-nowrap`,je(y,`text-neutral-900`)]),children:s}),S&&(0,N.jsx)(m,{as:`span`,variant:`text-sm`,weight:`regular`,className:M([`storybook-upload-file-base__description block whitespace-nowrap`,je(y,`text-neutral-600`)]),children:c}),C&&(0,N.jsx)(m,{as:`span`,variant:`text-xs`,weight:`regular`,className:M([`storybook-upload-file-base__support block whitespace-nowrap`,je(y,`text-neutral-600`)]),children:l})]})]})]})}var Pe,N,Fe,Ie,Le,Re=t((()=>{Pe=e(n(),1),p(),h(),be(),j(),xe(),Se(),N=r(),Fe={horizontal:`horizontal`,vertical:`vertical`,square:`square`,ipad:`ipad`,iphone:`iphone`,android:`android`,Horizontal:`horizontal`,Vertical:`vertical`,Square:`square`,iPad:`ipad`,iPhone:`iphone`,Android:`android`},Ie={default:`default`,hover:`hover`,focus:`focus`,disabled:`disabled`,Default:`default`,Hover:`hover`,Focus:`focus`,Focused:`focus`,Disabled:`disabled`,enabled:`default`,Enabled:`default`},Le=he,Ne.__docgenInfo={description:``,methods:[],displayName:`UploadFileBase`,props:{layout:{required:!1,tsType:{name:`union`,raw:`| 'horizontal'
| 'vertical'
| 'square'
| 'ipad'
| 'iphone'
| 'android'
| 'Horizontal'
| 'Vertical'
| 'Square'
| 'iPad'
| 'iPhone'
| 'Android'`,elements:[{name:`literal`,value:`'horizontal'`},{name:`literal`,value:`'vertical'`},{name:`literal`,value:`'square'`},{name:`literal`,value:`'ipad'`},{name:`literal`,value:`'iphone'`},{name:`literal`,value:`'android'`},{name:`literal`,value:`'Horizontal'`},{name:`literal`,value:`'Vertical'`},{name:`literal`,value:`'Square'`},{name:`literal`,value:`'iPad'`},{name:`literal`,value:`'iPhone'`},{name:`literal`,value:`'Android'`}]},description:``,defaultValue:{value:`'horizontal'`,computed:!1}},state:{required:!1,tsType:{name:`union`,raw:`| 'default'
| 'hover'
| 'focus'
| 'disabled'
| 'Default'
| 'Hover'
| 'Focus'
| 'Focused'
| 'Disabled'`,elements:[{name:`literal`,value:`'default'`},{name:`literal`,value:`'hover'`},{name:`literal`,value:`'focus'`},{name:`literal`,value:`'disabled'`},{name:`literal`,value:`'Default'`},{name:`literal`,value:`'Hover'`},{name:`literal`,value:`'Focus'`},{name:`literal`,value:`'Focused'`},{name:`literal`,value:`'Disabled'`}]},description:``,defaultValue:{value:`'default'`,computed:!1}},supportingText:{required:!1,tsType:{name:`boolean`},description:`@deprecated Use showDescription and showSupportText instead.`},showDescription:{required:!1,tsType:{name:`boolean`},description:``},showSupportText:{required:!1,tsType:{name:`boolean`},description:``},title:{required:!1,tsType:{name:`string`},description:``,defaultValue:{value:`'Drag and drop or browse files'`,computed:!1}},description:{required:!1,tsType:{name:`string`},description:``,defaultValue:{value:`'Upload vertical images or videos for your background.'`,computed:!1}},footerText:{required:!1,tsType:{name:`string`},description:``,defaultValue:{value:`'Max image size: 20 MB • Max video size: 200 MB'`,computed:!1}},onBrowse:{required:!1,tsType:{name:`signature`,type:`function`,raw:`() => void`,signature:{arguments:[],return:{name:`void`}}},description:``},onDropFiles:{required:!1,tsType:{name:`signature`,type:`function`,raw:`(files: File[]) => void`,signature:{arguments:[{type:{name:`Array`,elements:[{name:`File`}],raw:`File[]`},name:`files`}],return:{name:`void`}}},description:``},disabled:{defaultValue:{value:`false`,computed:!1},required:!1}},composes:[`Omit`]}})),ze=t((()=>{}));function P(e){return e.flat().filter(Boolean).join(` `)}function Be(e){return ge[e??`square`]??`square`}function Ve(e){return Ue[e??`default`]??`default`}function He({layout:e=`square`,state:t=`default`,index:n=0,imageUrl:r=ie,className:i}){let a=Be(e),o=Ve(t),s=o===`hover`,c=o===`loading`;return(0,F.jsxs)(`div`,{className:P([`storybook-upload-image-tile relative shrink-0 overflow-hidden`,me[a],i]),children:[r?(0,F.jsx)(`img`,{alt:``,"aria-hidden":`true`,className:P([`storybook-upload-image-tile__image`,c&&`storybook-upload-image-tile__image--blurred`]),src:r}):(0,F.jsx)(`div`,{className:P([`storybook-upload-image-tile__image storybook-upload-image-tile__image--placeholder`,c&&`storybook-upload-image-tile__image--blurred`]),"data-image-index":n%8}),(0,F.jsx)(`span`,{"aria-hidden":`true`,className:P([`storybook-upload-image-tile__overlay`,(s||c)&&`storybook-upload-image-tile__overlay--visible`])}),c&&(0,F.jsx)(ee,{"aria-hidden":`true`,"aria-label":`Loading`,className:`storybook-upload-image-tile__loader storybook-upload-image-tile__loader--spinning text-neutral-0`,size:24,weight:`regular`})]})}var F,Ue,We=t((()=>{p(),j(),ze(),F=r(),Ue={default:`default`,hover:`hover`,loading:`loading`,Default:`default`,Hover:`hover`,Loading:`loading`},He.__docgenInfo={description:``,methods:[],displayName:`UploadFileImageTile`,props:{layout:{required:!1,tsType:{name:`union`,raw:`UploadTileLayout | string`,elements:[{name:`union`,raw:`'square' | 'ipad' | 'iphone' | 'android'`,elements:[{name:`literal`,value:`'square'`},{name:`literal`,value:`'ipad'`},{name:`literal`,value:`'iphone'`},{name:`literal`,value:`'android'`}]},{name:`string`}]},description:``,defaultValue:{value:`'square'`,computed:!1}},state:{required:!1,tsType:{name:`union`,raw:`| 'default'
| 'hover'
| 'loading'
| 'Default'
| 'Hover'
| 'Loading'`,elements:[{name:`literal`,value:`'default'`},{name:`literal`,value:`'hover'`},{name:`literal`,value:`'loading'`},{name:`literal`,value:`'Default'`},{name:`literal`,value:`'Hover'`},{name:`literal`,value:`'Loading'`}]},description:``,defaultValue:{value:`'default'`,computed:!1}},index:{required:!1,tsType:{name:`number`},description:``,defaultValue:{value:`0`,computed:!1}},imageUrl:{required:!1,tsType:{name:`string`},description:``,defaultValue:{value:`UPLOAD_FILE_SQUARE_PREVIEW_IMAGE`,computed:!0}},className:{required:!1,tsType:{name:`string`},description:``}}}}));function Ge(e){return e.flat().filter(Boolean).join(` `)}function Ke(e){return ge[e??`square`]??`square`}function qe(e,t,n,r){let i=e.layout??n;return e.kind===`base`?(0,I.jsx)(Ne,{layout:i,showDescription:!1,showSupportText:!1,state:e.state??`default`,onBrowse:r},`base-${t}`):(0,I.jsx)(He,{layout:i,state:e.state??`default`},`item-${t}`)}function Je({layout:e=`square`,slots:t=[...ce],className:n,onBrowse:r}){let i=Ke(e);return(0,I.jsx)(`div`,{className:Ge([ue,de[i],n]),children:(0,I.jsx)(`div`,{className:Ge([fe,pe[i]]),children:t.map((e,t)=>qe(e,t,i,r))})})}var I,Ye=t((()=>{j(),Re(),We(),I=r(),Je.displayName=`Multiple Images`,Je.__docgenInfo={description:``,methods:[],displayName:`Multiple Images`,props:{layout:{required:!1,tsType:{name:`union`,raw:`UploadTileLayout | UploadTileLayoutOption | string`,elements:[{name:`union`,raw:`'square' | 'ipad' | 'iphone' | 'android'`,elements:[{name:`literal`,value:`'square'`},{name:`literal`,value:`'ipad'`},{name:`literal`,value:`'iphone'`},{name:`literal`,value:`'android'`}]},{name:`unknown[number]`,raw:`(typeof UPLOAD_TILE_LAYOUT_OPTIONS)[number]`},{name:`string`}]},description:``,defaultValue:{value:`'square'`,computed:!1}},slots:{required:!1,tsType:{name:`Array`,elements:[{name:`union`,raw:`| {
    kind: 'item';
    layout?: UploadTileLayout;
    state?: UploadFileImageTileState;
  }
| {
    kind: 'base';
    layout?: UploadTileLayout;
    state?: UploadFileBaseState;
  }`,elements:[{name:`signature`,type:`object`,raw:`{
  kind: 'item';
  layout?: UploadTileLayout;
  state?: UploadFileImageTileState;
}`,signature:{properties:[{key:`kind`,value:{name:`literal`,value:`'item'`,required:!0}},{key:`layout`,value:{name:`union`,raw:`'square' | 'ipad' | 'iphone' | 'android'`,elements:[{name:`literal`,value:`'square'`},{name:`literal`,value:`'ipad'`},{name:`literal`,value:`'iphone'`},{name:`literal`,value:`'android'`}],required:!1}},{key:`state`,value:{name:`union`,raw:`| 'default'
| 'hover'
| 'loading'
| 'Default'
| 'Hover'
| 'Loading'`,elements:[{name:`literal`,value:`'default'`},{name:`literal`,value:`'hover'`},{name:`literal`,value:`'loading'`},{name:`literal`,value:`'Default'`},{name:`literal`,value:`'Hover'`},{name:`literal`,value:`'Loading'`}],required:!1}}]}},{name:`signature`,type:`object`,raw:`{
  kind: 'base';
  layout?: UploadTileLayout;
  state?: UploadFileBaseState;
}`,signature:{properties:[{key:`kind`,value:{name:`literal`,value:`'base'`,required:!0}},{key:`layout`,value:{name:`union`,raw:`'square' | 'ipad' | 'iphone' | 'android'`,elements:[{name:`literal`,value:`'square'`},{name:`literal`,value:`'ipad'`},{name:`literal`,value:`'iphone'`},{name:`literal`,value:`'android'`}],required:!1}},{key:`state`,value:{name:`union`,raw:`| 'default'
| 'hover'
| 'focus'
| 'disabled'
| 'Default'
| 'Hover'
| 'Focus'
| 'Focused'
| 'Disabled'`,elements:[{name:`literal`,value:`'default'`},{name:`literal`,value:`'hover'`},{name:`literal`,value:`'focus'`},{name:`literal`,value:`'disabled'`},{name:`literal`,value:`'Default'`},{name:`literal`,value:`'Hover'`},{name:`literal`,value:`'Focus'`},{name:`literal`,value:`'Focused'`},{name:`literal`,value:`'Disabled'`}],required:!1}}]}}]}],raw:`MultipleImagesSlot[]`},description:``,defaultValue:{value:`[...MULTIPLE_IMAGES_DEFAULT_SLOTS]`,computed:!1}},className:{required:!1,tsType:{name:`string`},description:``},onBrowse:{required:!1,tsType:{name:`signature`,type:`function`,raw:`() => void`,signature:{arguments:[],return:{name:`void`}}},description:``}}}})),Xe=t((()=>{v()})),Ze=t((()=>{}));function Qe(e){return e.flat().filter(Boolean).join(` `)}function $e(e){return ot[e??`upload-successful`]??`upload-successful`}function et(e){return e in st}function tt({progress:e=75,className:t}){let n=Math.min(100,Math.max(0,e)),r=(0,at.useId)();return(0,L.jsxs)(`div`,{className:Qe([`storybook-upload-item storybook-upload-item--uploading-media relative box-border flex flex-col gap-4 rounded-2 bg-neutral-25 p-4`,C,t]),role:`status`,"aria-live":`polite`,children:[(0,L.jsx)(ve,{}),(0,L.jsx)(m,{as:`span`,id:r,variant:`text-sm`,weight:`medium`,className:`text-neutral-600`,children:`Uploading media...`}),(0,L.jsx)(te,{"aria-labelledby":r,value:n})]})}function nt({icon:e,errorTitle:t,errorDescription:n,retryLabel:r=`Retry`,className:a,onRetry:o}){return(0,L.jsxs)(`div`,{className:Qe([`storybook-upload-item storybook-upload-item--error relative box-border flex items-start gap-4 rounded-2 bg-neutral-0 p-4`,C,a]),role:`alert`,children:[(0,L.jsx)(ve,{}),(0,L.jsx)(e,{"aria-hidden":`true`,className:`shrink-0 text-error-600`,size:40,weight:`regular`}),(0,L.jsxs)(`div`,{className:`flex min-w-0 flex-1 flex-col gap-2`,children:[(0,L.jsxs)(`div`,{className:`flex flex-col gap-1`,children:[(0,L.jsx)(m,{as:`span`,variant:`text-md`,weight:`medium`,className:`text-neutral-900`,children:t}),(0,L.jsx)(m,{as:`span`,variant:`text-sm`,weight:`regular`,className:`text-neutral-600`,children:n})]}),(0,L.jsx)(g,{className:`self-start`,hierarchy:`secondary`,icon:`left`,label:r,leadingIcon:(0,L.jsx)(i,{"aria-hidden":`true`,size:20,weight:`regular`}),size:`small`,onClick:o})]})]})}function rt({fileName:e=`File_name.ext`,fileSize:t=`200 KB`,showFileSize:n=!0,replaceLabel:r=`Replace`,deleteLabel:i=`Delete`,imageUrl:a,className:o,onReplace:s,onDelete:l}){let d=a?{backgroundImage:`url(${a})`}:void 0;return(0,L.jsxs)(`div`,{className:Qe([`storybook-upload-item storybook-upload-item--upload-successful box-border flex items-start gap-4 rounded-2 border border-solid border-neutral-200 bg-neutral-25 p-4`,C,o]),children:[(0,L.jsx)(`div`,{className:`storybook-upload-item__thumbnail-image size-[92px] shrink-0 overflow-hidden rounded-8 border border-solid border-neutral-200 box-border bg-cover bg-center bg-no-repeat`,style:d}),(0,L.jsxs)(`div`,{className:`flex min-w-0 flex-1 flex-col gap-2`,children:[(0,L.jsxs)(`div`,{className:`flex flex-col gap-1`,children:[(0,L.jsx)(m,{as:`span`,variant:`text-md`,weight:`medium`,className:`max-w-full overflow-hidden text-ellipsis whitespace-nowrap text-neutral-900`,children:e}),(0,L.jsx)(m,{as:`span`,variant:`text-sm`,weight:`regular`,"aria-hidden":!n||void 0,className:Qe([`text-neutral-600`,!n&&`invisible`]),children:t})]}),(0,L.jsxs)(`div`,{className:`flex items-center justify-between gap-3`,children:[(0,L.jsx)(g,{hierarchy:`secondary`,icon:`left`,label:r,leadingIcon:(0,L.jsx)(u,{"aria-hidden":`true`,size:20,weight:`regular`}),size:`small`,onClick:s}),(0,L.jsx)(g,{destructive:!0,hierarchy:`link-color`,icon:`left`,label:i,leadingIcon:(0,L.jsx)(c,{"aria-hidden":`true`,size:20,weight:`regular`}),size:`small`,onClick:l})]})]})]})}function it({state:e=`upload-successful`,showFileSize:t=!0,progress:n=75,fileName:r=`File_name.ext`,fileSize:i=`200 KB`,errorTitle:a,errorDescription:o,retryLabel:s=`Retry`,replaceLabel:c=`Replace`,deleteLabel:l=`Delete`,imageUrl:u=k,className:d,onReplace:f,onDelete:p,onRetry:ee}){let m=$e(e);if(m===`uploading-media`)return(0,L.jsx)(tt,{className:d,progress:n});if(et(m)){let e=st[m];return(0,L.jsx)(nt,{className:d,errorDescription:o??e.description,errorTitle:a??e.title,icon:e.icon,retryLabel:s,onRetry:ee})}return(0,L.jsx)(rt,{className:d,deleteLabel:l,fileName:r,fileSize:i,imageUrl:u,replaceLabel:c,showFileSize:t,onDelete:p,onReplace:f})}var at,L,ot,st,ct=t((()=>{at=e(n(),1),p(),h(),_(),Xe(),be(),j(),Se(),Ze(),L=r(),ot={"uploading-media":`uploading-media`,uploading:`uploading-media`,"upload-successful":`upload-successful`,"large-file":`large-file`,"unsupported-file":`unsupported-file`,"internet-issue":`internet-issue`,"request-failed":`request-failed`,"Uploading Media":`uploading-media`,Uploading:`uploading-media`,"Upload Successful":`upload-successful`,"Large File":`large-file`,"Unsupported File":`unsupported-file`,"Internet Issue":`internet-issue`,"Request Failed":`request-failed`},st={"large-file":{icon:d,title:A.title,description:A.description},"unsupported-file":{icon:s,title:ae.title,description:ae.description},"internet-issue":{icon:f,title:oe.title,description:oe.description},"request-failed":{icon:l,title:se.title,description:se.description}},it.__docgenInfo={description:``,methods:[],displayName:`UploadFileItem`,props:{state:{required:!1,tsType:{name:`union`,raw:`| 'uploading-media'
| 'upload-successful'
| 'large-file'
| 'unsupported-file'
| 'internet-issue'
| 'request-failed'
| 'Uploading Media'
| 'Uploading'
| 'Upload Successful'
| 'Large File'
| 'Unsupported File'
| 'Internet Issue'
| 'Request Failed'`,elements:[{name:`literal`,value:`'uploading-media'`},{name:`literal`,value:`'upload-successful'`},{name:`literal`,value:`'large-file'`},{name:`literal`,value:`'unsupported-file'`},{name:`literal`,value:`'internet-issue'`},{name:`literal`,value:`'request-failed'`},{name:`literal`,value:`'Uploading Media'`},{name:`literal`,value:`'Uploading'`},{name:`literal`,value:`'Upload Successful'`},{name:`literal`,value:`'Large File'`},{name:`literal`,value:`'Unsupported File'`},{name:`literal`,value:`'Internet Issue'`},{name:`literal`,value:`'Request Failed'`}]},description:``,defaultValue:{value:`'upload-successful'`,computed:!1}},showFileSize:{required:!1,tsType:{name:`boolean`},description:``,defaultValue:{value:`true`,computed:!1}},progress:{required:!1,tsType:{name:`number`},description:``,defaultValue:{value:`75`,computed:!1}},fileName:{required:!1,tsType:{name:`string`},description:``,defaultValue:{value:`'File_name.ext'`,computed:!1}},fileSize:{required:!1,tsType:{name:`string`},description:``,defaultValue:{value:`'200 KB'`,computed:!1}},errorTitle:{required:!1,tsType:{name:`string`},description:``},errorDescription:{required:!1,tsType:{name:`string`},description:``},retryLabel:{required:!1,tsType:{name:`string`},description:``,defaultValue:{value:`'Retry'`,computed:!1}},replaceLabel:{required:!1,tsType:{name:`string`},description:``,defaultValue:{value:`'Replace'`,computed:!1}},deleteLabel:{required:!1,tsType:{name:`string`},description:``,defaultValue:{value:`'Delete'`,computed:!1}},imageUrl:{required:!1,tsType:{name:`string`},description:``,defaultValue:{value:`UPLOAD_FILE_DEFAULT_PREVIEW_IMAGE`,computed:!0}},className:{required:!1,tsType:{name:`string`},description:``},onReplace:{required:!1,tsType:{name:`signature`,type:`function`,raw:`() => void`,signature:{arguments:[],return:{name:`void`}}},description:``},onDelete:{required:!1,tsType:{name:`signature`,type:`function`,raw:`() => void`,signature:{arguments:[],return:{name:`void`}}},description:``},onRetry:{required:!1,tsType:{name:`signature`,type:`function`,raw:`() => void`,signature:{arguments:[],return:{name:`void`}}},description:``}}}}));function lt(e){switch(e){case`Hover`:return`hover`;case`Loading`:return`loading`;default:return`default`}}var ut=t((()=>{j()}));function dt(e){return re[e??`Horizontal`]??`horizontal`}function ft(e){return ne[e??`Default`]??`default`}function pt(e){return D.includes(e)}function mt(e){return pt(e)?le[e]:`square`}function ht(){return[...yt]}function gt(e){return[...Array.from({length:9},(t,n)=>({kind:`item`,state:lt(e[`slotState_${n+1}`]??yt[n])})),{kind:`base`,state:ft(e.slotState_10??yt[9])}]}function _t(){let e={control:`select`,options:[`Default`,`Hover`,`Loading`],table:{category:`Multiple Image Slots`}},t={name:`Slot 10 (Add tile)`,control:`select`,options:[...T],table:{category:`Multiple Image Slots`,order:10}};return{...Object.fromEntries([`Slot 1 (Row 1, Col 1)`,`Slot 2 (Row 1, Col 2)`,`Slot 3 (Row 1, Col 3)`,`Slot 4 (Row 1, Col 4)`,`Slot 5 (Row 1, Col 5)`,`Slot 6 (Row 2, Col 1)`,`Slot 7 (Row 2, Col 2)`,`Slot 8 (Row 2, Col 3)`,`Slot 9 (Row 2, Col 4)`].map((t,n)=>[`slotState_${n+1}`,{...e,name:t,table:{...e.table,order:n+1}}])),slotState_10:t}}function vt(){let e=ht();return Object.fromEntries(e.map((e,t)=>[`slotState_${t+1}`,e]))}var yt,bt=t((()=>{j(),ut(),yt=ce.map((e,t)=>{if(e.kind===`base`)return`Default`;switch(e.state){case`hover`:return`Hover`;case`loading`:return`Loading`;default:return`Default`}})})),xt=t((()=>{}));function St(e){return e.flat().filter(Boolean).join(` `)}function Ct(e){return re[e??`horizontal`]??`horizontal`}function wt(e){return O[e??`Uploading`]??e??`uploading-media`}function Tt({layout:e=`horizontal`,showSupportText:t=!0,showDescription:n=!0,dropzoneState:r=`default`,filesQueued:i=!1,state:a=`Uploading`,slots:o,progress:s=75,showFileSize:c=!0,fileName:l=`File_name.ext`,fileSize:u=`200 KB`,errorTitle:d,errorDescription:f,retryLabel:p,replaceLabel:ee,deleteLabel:m,title:h,description:g,footerText:_,accept:v,multiple:te=!1,disabled:y=!1,className:b,onBrowse:x,onFilesChange:S,onReplace:w,onDelete:T,onRetry:ne}){let E=(0,Et.useRef)(null),D=Ct(e),re=wt(a),O=ft(r),k=pt(a),ie=i&&!k,A=()=>{x?.(),y||E.current?.click()};return(0,R.jsxs)(`div`,{className:St([`storybook-upload-file relative flex flex-col gap-2`,C,b]),children:[(0,R.jsx)(`input`,{ref:E,accept:v,className:`storybook-upload-file__input`,disabled:y,multiple:te||k,type:`file`,onChange:e=>{S?.(Array.from(e.target.files??[])),e.target.value=``}}),k?(0,R.jsx)(Je,{layout:mt(a),slots:o,onBrowse:A}):ie?(0,R.jsx)(it,{deleteLabel:m,errorDescription:f,errorTitle:d,fileName:l,fileSize:u,progress:s,replaceLabel:ee,retryLabel:p,showFileSize:c,state:re,onDelete:T,onReplace:()=>{w?.(),y||E.current?.click()},onRetry:ne}):(0,R.jsx)(Ne,{description:g,disabled:y||O===`disabled`,footerText:_,layout:D,showDescription:n,showSupportText:t,state:O,title:h,onBrowse:A,onDropFiles:S})]})}var Et,R,Dt=t((()=>{Et=e(n(),1),Ye(),Re(),ct(),j(),bt(),xt(),R=r(),Tt.displayName=`Upload File`,Tt.__docgenInfo={description:``,methods:[],displayName:`Upload File`,props:{layout:{required:!1,tsType:{name:`union`,raw:`| 'horizontal'
| 'vertical'
| UploadFileLayoutOption`,elements:[{name:`literal`,value:`'horizontal'`},{name:`literal`,value:`'vertical'`},{name:`unknown[number]`,raw:`(typeof UPLOAD_FILE_LAYOUT_OPTIONS)[number]`}]},description:``,defaultValue:{value:`'horizontal'`,computed:!1}},showSupportText:{required:!1,tsType:{name:`boolean`},description:``,defaultValue:{value:`true`,computed:!1}},showDescription:{required:!1,tsType:{name:`boolean`},description:``,defaultValue:{value:`true`,computed:!1}},dropzoneState:{required:!1,tsType:{name:`union`,raw:`UploadFileBaseState | UploadFileDropzoneStateOption`,elements:[{name:`union`,raw:`| 'default'
| 'hover'
| 'focus'
| 'disabled'
| 'Default'
| 'Hover'
| 'Focus'
| 'Focused'
| 'Disabled'`,elements:[{name:`literal`,value:`'default'`},{name:`literal`,value:`'hover'`},{name:`literal`,value:`'focus'`},{name:`literal`,value:`'disabled'`},{name:`literal`,value:`'Default'`},{name:`literal`,value:`'Hover'`},{name:`literal`,value:`'Focus'`},{name:`literal`,value:`'Focused'`},{name:`literal`,value:`'Disabled'`}]},{name:`unknown[number]`,raw:`(typeof UPLOAD_FILE_DROPZONE_STATE_OPTIONS)[number]`}]},description:``,defaultValue:{value:`'default'`,computed:!1}},filesQueued:{required:!1,tsType:{name:`boolean`},description:``,defaultValue:{value:`false`,computed:!1}},state:{required:!1,tsType:{name:`union`,raw:`UploadFileItemState | UploadFileMainStateOption`,elements:[{name:`union`,raw:`| 'uploading-media'
| 'upload-successful'
| 'large-file'
| 'unsupported-file'
| 'internet-issue'
| 'request-failed'
| 'Uploading Media'
| 'Uploading'
| 'Upload Successful'
| 'Large File'
| 'Unsupported File'
| 'Internet Issue'
| 'Request Failed'`,elements:[{name:`literal`,value:`'uploading-media'`},{name:`literal`,value:`'upload-successful'`},{name:`literal`,value:`'large-file'`},{name:`literal`,value:`'unsupported-file'`},{name:`literal`,value:`'internet-issue'`},{name:`literal`,value:`'request-failed'`},{name:`literal`,value:`'Uploading Media'`},{name:`literal`,value:`'Uploading'`},{name:`literal`,value:`'Upload Successful'`},{name:`literal`,value:`'Large File'`},{name:`literal`,value:`'Unsupported File'`},{name:`literal`,value:`'Internet Issue'`},{name:`literal`,value:`'Request Failed'`}]},{name:`unknown[number]`,raw:`(typeof UPLOAD_FILE_MAIN_STATE_OPTIONS)[number]`}]},description:``,defaultValue:{value:`'Uploading'`,computed:!1}},slots:{required:!1,tsType:{name:`Array`,elements:[{name:`union`,raw:`| {
    kind: 'item';
    layout?: UploadTileLayout;
    state?: UploadFileImageTileState;
  }
| {
    kind: 'base';
    layout?: UploadTileLayout;
    state?: UploadFileBaseState;
  }`,elements:[{name:`signature`,type:`object`,raw:`{
  kind: 'item';
  layout?: UploadTileLayout;
  state?: UploadFileImageTileState;
}`,signature:{properties:[{key:`kind`,value:{name:`literal`,value:`'item'`,required:!0}},{key:`layout`,value:{name:`union`,raw:`'square' | 'ipad' | 'iphone' | 'android'`,elements:[{name:`literal`,value:`'square'`},{name:`literal`,value:`'ipad'`},{name:`literal`,value:`'iphone'`},{name:`literal`,value:`'android'`}],required:!1}},{key:`state`,value:{name:`union`,raw:`| 'default'
| 'hover'
| 'loading'
| 'Default'
| 'Hover'
| 'Loading'`,elements:[{name:`literal`,value:`'default'`},{name:`literal`,value:`'hover'`},{name:`literal`,value:`'loading'`},{name:`literal`,value:`'Default'`},{name:`literal`,value:`'Hover'`},{name:`literal`,value:`'Loading'`}],required:!1}}]}},{name:`signature`,type:`object`,raw:`{
  kind: 'base';
  layout?: UploadTileLayout;
  state?: UploadFileBaseState;
}`,signature:{properties:[{key:`kind`,value:{name:`literal`,value:`'base'`,required:!0}},{key:`layout`,value:{name:`union`,raw:`'square' | 'ipad' | 'iphone' | 'android'`,elements:[{name:`literal`,value:`'square'`},{name:`literal`,value:`'ipad'`},{name:`literal`,value:`'iphone'`},{name:`literal`,value:`'android'`}],required:!1}},{key:`state`,value:{name:`union`,raw:`| 'default'
| 'hover'
| 'focus'
| 'disabled'
| 'Default'
| 'Hover'
| 'Focus'
| 'Focused'
| 'Disabled'`,elements:[{name:`literal`,value:`'default'`},{name:`literal`,value:`'hover'`},{name:`literal`,value:`'focus'`},{name:`literal`,value:`'disabled'`},{name:`literal`,value:`'Default'`},{name:`literal`,value:`'Hover'`},{name:`literal`,value:`'Focus'`},{name:`literal`,value:`'Focused'`},{name:`literal`,value:`'Disabled'`}],required:!1}}]}}]}],raw:`MultipleImagesSlot[]`},description:``},progress:{required:!1,tsType:{name:`number`},description:``,defaultValue:{value:`75`,computed:!1}},showFileSize:{required:!1,tsType:{name:`boolean`},description:``,defaultValue:{value:`true`,computed:!1}},fileName:{required:!1,tsType:{name:`string`},description:``,defaultValue:{value:`'File_name.ext'`,computed:!1}},fileSize:{required:!1,tsType:{name:`string`},description:``,defaultValue:{value:`'200 KB'`,computed:!1}},errorTitle:{required:!1,tsType:{name:`string`},description:``},errorDescription:{required:!1,tsType:{name:`string`},description:``},retryLabel:{required:!1,tsType:{name:`string`},description:``},replaceLabel:{required:!1,tsType:{name:`string`},description:``},deleteLabel:{required:!1,tsType:{name:`string`},description:``},title:{required:!1,tsType:{name:`string`},description:``},description:{required:!1,tsType:{name:`string`},description:``},footerText:{required:!1,tsType:{name:`string`},description:``},accept:{required:!1,tsType:{name:`string`},description:``},multiple:{required:!1,tsType:{name:`boolean`},description:``,defaultValue:{value:`false`,computed:!1}},disabled:{required:!1,tsType:{name:`boolean`},description:``,defaultValue:{value:`false`,computed:!1}},className:{required:!1,tsType:{name:`string`},description:``},onBrowse:{required:!1,tsType:{name:`signature`,type:`function`,raw:`() => void`,signature:{arguments:[],return:{name:`void`}}},description:``},onFilesChange:{required:!1,tsType:{name:`signature`,type:`function`,raw:`(files: File[]) => void`,signature:{arguments:[{type:{name:`Array`,elements:[{name:`File`}],raw:`File[]`},name:`files`}],return:{name:`void`}}},description:``},onReplace:{required:!1,tsType:{name:`signature`,type:`function`,raw:`() => void`,signature:{arguments:[],return:{name:`void`}}},description:``},onDelete:{required:!1,tsType:{name:`signature`,type:`function`,raw:`() => void`,signature:{arguments:[],return:{name:`void`}}},description:``},onRetry:{required:!1,tsType:{name:`signature`,type:`function`,raw:`() => void`,signature:{arguments:[],return:{name:`void`}}},description:``}}}})),Ot=t((()=>{}));function z(e){let{layout:t=`Horizontal`,showDescription:n=!0,showSupportText:r=!0,dropzoneState:i=`Default`,filesQueued:a=!1,state:o=`Uploading`,slots:s,...c}=e,l={...c};for(let e=1;e<=10;e+=1)delete l[`slotState_${e}`];let u=pt(o)?s??gt(e):s;return(0,B.jsx)(Tt,{...l,dropzoneState:ft(i),filesQueued:a,layout:dt(t),showDescription:n,showSupportText:r,slots:u,state:o})}var B,V,kt,At,jt,Mt,H,U,W,G,K,q,J,Y,X,Z,Q,$,Nt;t((()=>{Dt(),bt(),Ot(),B=r(),{fn:V}=__STORYBOOK_MODULE_TEST__,kt=[`Uploading`,`Large File`,`Unsupported File`,`Internet Issue`,`Request Failed`,`Upload Successful`],At=_t(),jt=vt(),z.displayName=`Upload File`,Mt={title:`Molecules/Upload File`,component:Tt,parameters:{layout:`centered`,controls:{sort:`none`},docs:{controls:{sort:`none`},description:{component:"Single Upload File molecule composed of **Upload File Base** (dropzone), **Upload File Item** (queued upload states), and **Multiple Images** (multi-upload grid). Use Layout, Show Description, Show Support Text, Dropzone State, Files Queued, and State to switch between the three base components. For Multiple Images, pass a custom `slots` array or use the slot controls in Playground to set each tile state individually."}}},tags:[`autodocs`],argTypes:{layout:{name:`Layout`,control:`select`,options:[...w],type:{name:`enum`,value:[...w]},if:{arg:`filesQueued`,eq:!1},table:{order:0,defaultValue:{summary:`Horizontal`}}},showDescription:{name:`Show Description`,control:`boolean`,if:{arg:`filesQueued`,eq:!1},table:{order:1,defaultValue:{summary:!0}}},showSupportText:{name:`Show Support Text`,control:`boolean`,if:{arg:`filesQueued`,eq:!1},table:{order:2,defaultValue:{summary:!0}}},dropzoneState:{name:`Dropzone State`,control:`select`,options:[...T],type:{name:`enum`,value:[...T]},if:{arg:`filesQueued`,eq:!1},table:{order:3,defaultValue:{summary:`Default`}}},filesQueued:{name:`Files Queued`,control:`boolean`,table:{order:4,defaultValue:{summary:!1}}},state:{name:`State`,control:`select`,options:[...E],type:{name:`enum`,value:[...E]},table:{order:5,defaultValue:{summary:`Uploading`}}},progress:{control:{type:`range`,min:0,max:100,step:1},if:{arg:`state`,eq:`Uploading`},table:{order:6}},showFileSize:{name:`Show File Size`,control:`boolean`,if:{arg:`state`,eq:`Upload Successful`},table:{order:7,defaultValue:{summary:!0}}},slots:{control:!1,table:{disable:!0}},...At,onBrowse:{table:{disable:!0}},onFilesChange:{table:{disable:!0}},onReplace:{table:{disable:!0}},onDelete:{table:{disable:!0}},onRetry:{table:{disable:!0}}},args:{layout:`Horizontal`,showDescription:!0,showSupportText:!0,dropzoneState:`Default`,filesQueued:!1,state:`Uploading`,progress:75,showFileSize:!0,...jt,onBrowse:V(),onFilesChange:V(),onReplace:V(),onDelete:V(),onRetry:V()},render:e=>(0,B.jsx)(z,{...e})},H={parameters:{docs:{description:{story:`Interactive playground for the full Upload File molecule. Set State to a Multiple + layout and use the Multiple Image Slots controls to change any tile in row 1 or row 2.`}}}},U={parameters:{docs:{description:{story:`Default horizontal Upload File Base dropzone with support text. Matches Figma at 416×104.`}}},args:{layout:`Horizontal`,showDescription:!0,showSupportText:!0,dropzoneState:`Default`,filesQueued:!1,state:`Uploading`}},W={name:`Upload File Base / Horizontal`,parameters:{controls:{disable:!0},docs:{description:{story:`Upload File Base rendered horizontally with and without support text.`}}},render:()=>(0,B.jsxs)(`div`,{className:`flex flex-col gap-4`,children:[(0,B.jsx)(z,{layout:`Horizontal`,showSupportText:!0,state:`Uploading`}),(0,B.jsx)(z,{layout:`Horizontal`,showSupportText:!1,state:`Uploading`})]})},G={name:`Upload File Base / Vertical`,parameters:{controls:{disable:!0},docs:{description:{story:`Upload File Base rendered vertically with and without support text.`}}},render:()=>(0,B.jsxs)(`div`,{className:`flex flex-col gap-4`,children:[(0,B.jsx)(z,{layout:`Vertical`,showSupportText:!0,state:`Uploading`}),(0,B.jsx)(z,{layout:`Vertical`,showSupportText:!1,state:`Uploading`})]})},K={name:`Upload File Base / Dropzone States`,parameters:{controls:{disable:!0},docs:{description:{story:`Upload File Base default, hover, focus, and disabled dropzone states.`}}},render:()=>(0,B.jsx)(`div`,{className:`flex flex-col gap-4`,children:T.map(e=>(0,B.jsx)(z,{dropzoneState:e,state:`Uploading`},e))})},q={name:`Upload File Item / All States`,parameters:{controls:{disable:!0},docs:{description:{story:`Upload File Item states shown when Files Queued is enabled: uploading, errors, and success.`}}},render:()=>(0,B.jsx)(`div`,{className:`flex flex-col gap-4`,children:kt.map(e=>(0,B.jsx)(z,{filesQueued:!0,state:e},e))})},J={name:`Upload File Item / Uploading`,parameters:{controls:{disable:!0}},args:{filesQueued:!0,state:`Uploading`,progress:75}},Y={name:`Upload File Item / Upload Successful`,parameters:{controls:{disable:!0}},args:{filesQueued:!0,state:`Upload Successful`,showFileSize:!0}},X={name:`Multiple Images / All Layouts`,parameters:{controls:{disable:!0},docs:{description:{story:`Multiple Images grid for Square, iPad, iPhone, and Android tile layouts with container heights sized for two rows.`}}},render:()=>(0,B.jsx)(`div`,{className:`flex flex-col gap-6`,children:D.map(e=>(0,B.jsxs)(`div`,{className:`flex flex-col gap-3`,children:[(0,B.jsx)(`span`,{className:`font-sans text-ds-text-sm text-neutral-700`,children:e}),(0,B.jsx)(z,{state:e})]},e))})},Z={name:`Multiple Images / Slot Editor`,parameters:{docs:{description:{story:`Use the Multiple Image Slots controls to set Default, Hover, or Loading on any image tile in rows 1–2, and Default, Hover, Focus, or Disabled on the add tile.`}}},args:{state:`Multiple + Square`,slotState_8:`Hover`,slotState_9:`Loading`}},Q={name:`Multiple Images / Square`,parameters:{controls:{disable:!0}},args:{state:`Multiple + Square`}},$={name:`All States`,parameters:{controls:{disable:!0},docs:{description:{story:`Every Upload File state from Figma across all three base components.`}}},render:()=>(0,B.jsxs)(`div`,{className:`flex flex-col gap-6`,children:[(0,B.jsx)(z,{}),kt.map(e=>(0,B.jsx)(z,{filesQueued:!0,state:e},e)),D.map(e=>(0,B.jsx)(z,{state:e},e))]})},H.parameters={...H.parameters,docs:{...H.parameters?.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: 'Interactive playground for the full Upload File molecule. Set State to a Multiple + layout and use the Multiple Image Slots controls to change any tile in row 1 or row 2.'
      }
    }
  }
}`,...H.parameters?.docs?.source}}},U.parameters={...U.parameters,docs:{...U.parameters?.docs,source:{originalSource:`{
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
}`,...U.parameters?.docs?.source}}},W.parameters={...W.parameters,docs:{...W.parameters?.docs,source:{originalSource:`{
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
}`,...W.parameters?.docs?.source}}},G.parameters={...G.parameters,docs:{...G.parameters?.docs,source:{originalSource:`{
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
}`,...G.parameters?.docs?.source}}},K.parameters={...K.parameters,docs:{...K.parameters?.docs,source:{originalSource:`{
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
}`,...K.parameters?.docs?.source}}},q.parameters={...q.parameters,docs:{...q.parameters?.docs,source:{originalSource:`{
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
}`,...q.parameters?.docs?.source}}},J.parameters={...J.parameters,docs:{...J.parameters?.docs,source:{originalSource:`{
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
}`,...J.parameters?.docs?.source}}},Y.parameters={...Y.parameters,docs:{...Y.parameters?.docs,source:{originalSource:`{
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
}`,...Y.parameters?.docs?.source}}},X.parameters={...X.parameters,docs:{...X.parameters?.docs,source:{originalSource:`{
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
}`,...X.parameters?.docs?.source}}},Z.parameters={...Z.parameters,docs:{...Z.parameters?.docs,source:{originalSource:`{
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
}`,...Z.parameters?.docs?.source}}},Q.parameters={...Q.parameters,docs:{...Q.parameters?.docs,source:{originalSource:`{
  name: 'Multiple Images / Square',
  parameters: {
    controls: {
      disable: true
    }
  },
  args: {
    state: 'Multiple + Square'
  }
}`,...Q.parameters?.docs?.source}}},$.parameters={...$.parameters,docs:{...$.parameters?.docs,source:{originalSource:`{
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
}`,...$.parameters?.docs?.source}}},Nt=[`Playground`,`Default`,`UploadFileBaseHorizontal`,`UploadFileBaseVertical`,`UploadFileBaseDropzoneStates`,`UploadFileItemStates`,`UploadFileItemUploading`,`UploadFileItemUploadSuccessful`,`MultipleImagesAllLayouts`,`MultipleImagesSlotEditor`,`MultipleImagesSquare`,`AllStates`]}))();export{$ as AllStates,U as Default,X as MultipleImagesAllLayouts,Z as MultipleImagesSlotEditor,Q as MultipleImagesSquare,H as Playground,K as UploadFileBaseDropzoneStates,W as UploadFileBaseHorizontal,G as UploadFileBaseVertical,q as UploadFileItemStates,Y as UploadFileItemUploadSuccessful,J as UploadFileItemUploading,Nt as __namedExportsOrder,Mt as default};