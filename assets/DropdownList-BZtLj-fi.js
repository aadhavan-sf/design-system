import{a as e,n as t}from"./chunk-DnJy8xQt.js";import{a as n}from"./iframe-BQTwm-GU.js";import{t as r}from"./jsx-runtime-DxP0NviS.js";import{S as i,at as a,t as o}from"./index.es-B1uMxi5A.js";import{t as s}from"./Typography-DXUEOnBH.js";import{t as c}from"./Typography-Dujv08q4.js";function l(e){return e.filter(Boolean).join(` `)}function u(e){return typeof e==`string`?e:e.value??e.label}function d(e){return typeof e==`string`?e:e.label}function f(e){return typeof e==`string`?null:e.prefix??e.flag??null}function p(e){return e.filter(e=>typeof e!=`string`&&e.selected).map(u)}function m({disabled:e,selected:t,variant:n}){return n===`checkbox-left`?(0,_.jsx)(`span`,{className:l([`inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-1 border border-solid border-neutral-300 bg-neutral-00 text-neutral-00`,t&&`border-primary-400 bg-primary-400`,e&&`border-neutral-200 bg-neutral-25 text-neutral-00`,t&&e&&`border-primary-100 bg-primary-100`]),"aria-hidden":`true`,children:t&&(0,_.jsx)(a,{size:12,weight:`regular`})}):n===`radio-left`?(0,_.jsx)(`span`,{className:l([`inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-pill border border-solid border-neutral-300 bg-neutral-00`,t&&`border-primary-400 bg-primary-50`,e&&`border-neutral-200 bg-neutral-25`,t&&e&&`border-primary-100 bg-primary-25`]),"aria-hidden":`true`,children:(0,_.jsx)(`span`,{className:l([`h-[6px] w-[6px] rounded-pill bg-transparent`,t&&`bg-primary-400`,e&&`bg-primary-100`])})}):n===`toggle-right`?(0,_.jsx)(`span`,{className:l([`inline-flex h-5 w-9 shrink-0 items-center rounded-pill bg-neutral-100 p-0.5`,t&&`justify-end bg-primary-400`,e&&`bg-neutral-50`,t&&e&&`bg-primary-100`]),"aria-hidden":`true`,children:(0,_.jsx)(`span`,{className:`h-4 w-4 rounded-pill bg-neutral-00 shadow-sm`})}):null}function h({className:e,items:t=v,selectedValues:n,variant:r=`icon-left`,onItemSelect:o,onSelectedValuesChange:c}){let[h,y]=(0,g.useState)(()=>p(t)),b=n??h,x=e=>{n||y(e),c?.(e)},S=(e,t)=>{let n=u(e);typeof e!=`string`&&e.disabled||((r===`checkbox-left`||r===`toggle-right`)&&x(b.includes(n)?b.filter(e=>e!==n):[...b,n]),(r===`radio-left`||r===`check-right`||r===`icon-right`)&&x([n]),o?.(e,t))};return(0,_.jsx)(`div`,{className:l([`flex w-60 flex-col items-stretch overflow-hidden rounded-2 bg-neutral-00 shadow-sm`,e]),children:t.map((e,t)=>{let n=d(e),o=u(e),c=f(e),p=typeof e==`string`?`default`:e.state??`default`,h=p===`disabled`||typeof e!=`string`&&e.disabled,g=p===`destructive`,v=b.includes(o),y=p===`active`||typeof e!=`string`&&e.active||v;return(0,_.jsxs)(`button`,{type:`button`,disabled:!!h,className:l([`flex min-h-11 w-full cursor-pointer items-center gap-2 border-0 bg-transparent px-4 py-3 text-neutral-600 transition-[background-color,color] duration-[140ms] enabled:hover:bg-neutral-25`,y&&`bg-neutral-50 text-neutral-800 [&_.storybook-dropdown-list__icon]:text-primary-400`,h&&`cursor-not-allowed text-neutral-300 enabled:hover:bg-transparent`,g&&`text-error-600`]),onClick:()=>S(e,t),children:[r===`icon-left`&&(0,_.jsx)(i,{className:`storybook-dropdown-list__icon shrink-0`,size:16,weight:`regular`}),(r===`checkbox-left`||r===`radio-left`)&&(0,_.jsx)(m,{disabled:!!h,selected:v,variant:r}),c&&(0,_.jsx)(`span`,{className:`inline-flex w-5 shrink-0 items-center justify-center text-sm leading-normal`,"aria-hidden":`true`,children:c}),(0,_.jsx)(s,{as:`span`,variant:`text-sm`,weight:`regular`,color:`currentColor`,className:`min-w-px flex-1 basis-0 overflow-hidden text-left text-ellipsis whitespace-nowrap`,children:n}),r===`toggle-right`&&(0,_.jsx)(m,{disabled:!!h,selected:v,variant:r}),r===`icon-right`&&(0,_.jsx)(i,{className:`storybook-dropdown-list__icon shrink-0`,size:16,weight:`regular`}),r===`check-right`&&v&&(0,_.jsx)(a,{className:`storybook-dropdown-list__icon shrink-0`,size:16,weight:`regular`})]},`${o}-${t}`)})})}var g,_,v,y=t((()=>{g=e(n(),1),o(),c(),_=r(),v=[{label:`Head Content Editor`},{label:`Head Content Editor`,active:!0,selected:!0},{label:`Head Content Editor`,selected:!0}],h.__docgenInfo={description:``,methods:[],displayName:`DropdownList`,props:{className:{required:!1,tsType:{name:`string`},description:``},items:{required:!1,tsType:{name:`Array`,elements:[{name:`union`,raw:`| string
| {
    label: string;
    value?: string;
    prefix?: ReactNode;
    flag?: ReactNode;
    active?: boolean;
    disabled?: boolean;
    selected?: boolean;
    state?: DropdownListItemState;
  }`,elements:[{name:`string`},{name:`signature`,type:`object`,raw:`{
  label: string;
  value?: string;
  prefix?: ReactNode;
  flag?: ReactNode;
  active?: boolean;
  disabled?: boolean;
  selected?: boolean;
  state?: DropdownListItemState;
}`,signature:{properties:[{key:`label`,value:{name:`string`,required:!0}},{key:`value`,value:{name:`string`,required:!1}},{key:`prefix`,value:{name:`ReactNode`,required:!1}},{key:`flag`,value:{name:`ReactNode`,required:!1}},{key:`active`,value:{name:`boolean`,required:!1}},{key:`disabled`,value:{name:`boolean`,required:!1}},{key:`selected`,value:{name:`boolean`,required:!1}},{key:`state`,value:{name:`string`,required:!1}}]}}]}],raw:`DropdownListItem[]`},description:``,defaultValue:{value:`[
  { label: 'Head Content Editor' },
  { label: 'Head Content Editor', active: true, selected: true },
  { label: 'Head Content Editor', selected: true },
]`,computed:!1}},selectedValues:{required:!1,tsType:{name:`Array`,elements:[{name:`string`}],raw:`string[]`},description:``},variant:{required:!1,tsType:{name:`string`},description:``,defaultValue:{value:`'icon-left'`,computed:!1}},onItemSelect:{required:!1,tsType:{name:`signature`,type:`function`,raw:`(item: DropdownListItem, index: number) => void`,signature:{arguments:[{type:{name:`union`,raw:`| string
| {
    label: string;
    value?: string;
    prefix?: ReactNode;
    flag?: ReactNode;
    active?: boolean;
    disabled?: boolean;
    selected?: boolean;
    state?: DropdownListItemState;
  }`,elements:[{name:`string`},{name:`signature`,type:`object`,raw:`{
  label: string;
  value?: string;
  prefix?: ReactNode;
  flag?: ReactNode;
  active?: boolean;
  disabled?: boolean;
  selected?: boolean;
  state?: DropdownListItemState;
}`,signature:{properties:[{key:`label`,value:{name:`string`,required:!0}},{key:`value`,value:{name:`string`,required:!1}},{key:`prefix`,value:{name:`ReactNode`,required:!1}},{key:`flag`,value:{name:`ReactNode`,required:!1}},{key:`active`,value:{name:`boolean`,required:!1}},{key:`disabled`,value:{name:`boolean`,required:!1}},{key:`selected`,value:{name:`boolean`,required:!1}},{key:`state`,value:{name:`string`,required:!1}}]}}]},name:`item`},{type:{name:`number`},name:`index`}],return:{name:`void`}}},description:``},onSelectedValuesChange:{required:!1,tsType:{name:`signature`,type:`function`,raw:`(values: string[]) => void`,signature:{arguments:[{type:{name:`Array`,elements:[{name:`string`}],raw:`string[]`},name:`values`}],return:{name:`void`}}},description:``}}}}));export{y as n,h as t};