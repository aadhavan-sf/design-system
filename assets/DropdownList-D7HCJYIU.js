import{a as e,n as t}from"./chunk-DnJy8xQt.js";import{a as n}from"./iframe-D-wJyx6Z.js";import{t as r}from"./jsx-runtime-DxP0NviS.js";import{S as i,at as a,t as o}from"./index.es-BYbkLAXI.js";import{t as s}from"./Typography-BgU3xvPN.js";import{t as c}from"./Typography-CBTaHlYJ.js";var l=t((()=>{}));function u(e){return e.filter(Boolean).join(` `)}function d(e){return typeof e==`string`?e:e.value??e.label}function f(e){return typeof e==`string`?e:e.label}function p(e){return typeof e==`string`?null:e.prefix??e.flag??null}function m(e){return e.filter(e=>typeof e!=`string`&&e.selected).map(d)}function h({disabled:e,selected:t,variant:n}){return n===`checkbox-left`?(0,v.jsx)(`span`,{className:u([`storybook-dropdown-list__checkbox`,t&&`storybook-dropdown-list__checkbox--checked`,e&&`storybook-dropdown-list__checkbox--disabled`]),"aria-hidden":`true`,children:t&&(0,v.jsx)(a,{size:12,weight:`regular`})}):n===`radio-left`?(0,v.jsx)(`span`,{className:u([`storybook-dropdown-list__radio`,t&&`storybook-dropdown-list__radio--checked`,e&&`storybook-dropdown-list__radio--disabled`]),"aria-hidden":`true`,children:(0,v.jsx)(`span`,{className:`storybook-dropdown-list__radio-dot`})}):n===`toggle-right`?(0,v.jsx)(`span`,{className:u([`storybook-dropdown-list__toggle`,t&&`storybook-dropdown-list__toggle--checked`,e&&`storybook-dropdown-list__toggle--disabled`]),"aria-hidden":`true`,children:(0,v.jsx)(`span`,{className:`storybook-dropdown-list__toggle-thumb`})}):null}function g({items:e=y,selectedValues:t,variant:n=`icon-left`,onItemSelect:r,onSelectedValuesChange:o}){let[c,l]=(0,_.useState)(()=>m(e)),g=t??c,b=e=>{t||l(e),o?.(e)},x=(e,t)=>{let i=d(e);typeof e!=`string`&&e.disabled||((n===`checkbox-left`||n===`toggle-right`)&&b(g.includes(i)?g.filter(e=>e!==i):[...g,i]),(n===`radio-left`||n===`check-right`||n===`icon-right`)&&b([i]),r?.(e,t))};return(0,v.jsx)(`div`,{className:u([`storybook-dropdown-list`,`storybook-dropdown-list--${n}`]),children:e.map((e,t)=>{let r=f(e),o=d(e),c=p(e),l=typeof e==`string`?`default`:e.state??`default`,m=l===`disabled`||typeof e!=`string`&&e.disabled,_=l===`destructive`,y=g.includes(o),b=l===`active`||typeof e!=`string`&&e.active||y;return(0,v.jsxs)(`button`,{type:`button`,disabled:!!m,className:u([`storybook-dropdown-list__item`,b&&`storybook-dropdown-list__item--active`,m&&`storybook-dropdown-list__item--disabled`,_&&`storybook-dropdown-list__item--destructive`]),onClick:()=>x(e,t),children:[n===`icon-left`&&(0,v.jsx)(i,{className:`storybook-dropdown-list__icon`,size:16,weight:`regular`}),(n===`checkbox-left`||n===`radio-left`)&&(0,v.jsx)(h,{disabled:!!m,selected:y,variant:n}),c&&(0,v.jsx)(`span`,{className:`storybook-dropdown-list__prefix`,"aria-hidden":`true`,children:c}),(0,v.jsx)(s,{as:`span`,variant:`text-sm`,weight:`regular`,color:`currentColor`,className:`storybook-dropdown-list__label`,children:r}),n===`toggle-right`&&(0,v.jsx)(h,{disabled:!!m,selected:y,variant:n}),n===`icon-right`&&(0,v.jsx)(i,{className:`storybook-dropdown-list__icon`,size:16,weight:`regular`}),n===`check-right`&&y&&(0,v.jsx)(a,{className:`storybook-dropdown-list__icon`,size:16,weight:`regular`})]},`${o}-${t}`)})})}var _,v,y,b=t((()=>{_=e(n(),1),o(),c(),l(),v=r(),y=[{label:`Head Content Editor`},{label:`Head Content Editor`,active:!0,selected:!0},{label:`Head Content Editor`,selected:!0}],g.__docgenInfo={description:``,methods:[],displayName:`DropdownList`,props:{items:{required:!1,tsType:{name:`Array`,elements:[{name:`union`,raw:`| string
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
}`,signature:{properties:[{key:`label`,value:{name:`string`,required:!0}},{key:`value`,value:{name:`string`,required:!1}},{key:`prefix`,value:{name:`ReactNode`,required:!1}},{key:`flag`,value:{name:`ReactNode`,required:!1}},{key:`active`,value:{name:`boolean`,required:!1}},{key:`disabled`,value:{name:`boolean`,required:!1}},{key:`selected`,value:{name:`boolean`,required:!1}},{key:`state`,value:{name:`string`,required:!1}}]}}]},name:`item`},{type:{name:`number`},name:`index`}],return:{name:`void`}}},description:``},onSelectedValuesChange:{required:!1,tsType:{name:`signature`,type:`function`,raw:`(values: string[]) => void`,signature:{arguments:[{type:{name:`Array`,elements:[{name:`string`}],raw:`string[]`},name:`values`}],return:{name:`void`}}},description:``}}}}));export{b as n,g as t};