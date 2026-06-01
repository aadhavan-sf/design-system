import{n as e}from"./chunk-DnJy8xQt.js";import{t}from"./jsx-runtime-DxP0NviS.js";import{n,r,t as i}from"./Pagination-BbSbDoYJ.js";var a,o,s,c,l,u;e((()=>{r(),a=t(),o={title:`Molecules/Pagination`,component:i,parameters:{layout:`fullscreen`,docs:{description:{component:`Pagination atom with reusable pagination button base and card button group layouts from Figma.`}}},tags:[`autodocs`],argTypes:{alignment:{control:`select`,options:[`left`,`center`,`right`]},breakpoint:{control:`select`,options:[`desktop`,`mobile`]},currentPage:{control:`number`},defaultCurrentPage:{control:`number`},pages:{control:`object`}}},s={render:e=>(0,a.jsx)(`div`,{className:`pagination-story-surface`,children:(0,a.jsx)(i,{...e})}),args:{alignment:`right`,breakpoint:`desktop`,defaultCurrentPage:1}},c={render:()=>(0,a.jsx)(`div`,{className:`pagination-story-surface`,children:(0,a.jsxs)(`div`,{className:`pagination-story-stack`,children:[(0,a.jsxs)(`div`,{className:`pagination-story-buttons`,children:[(0,a.jsx)(n,{hierarchy:`leading`,label:`1`}),(0,a.jsx)(n,{hierarchy:`middle`,label:`1`}),(0,a.jsx)(n,{hierarchy:`trailing`,label:`1`}),(0,a.jsx)(n,{hierarchy:`leading`,icon:`only`}),(0,a.jsx)(n,{hierarchy:`trailing`,icon:`only`}),(0,a.jsx)(n,{hierarchy:`leading`,icon:`true`}),(0,a.jsx)(n,{hierarchy:`trailing`,icon:`true`})]}),(0,a.jsxs)(`div`,{className:`pagination-story-buttons`,children:[(0,a.jsx)(n,{hierarchy:`leading`,label:`1`,state:`active-hover`}),(0,a.jsx)(n,{hierarchy:`middle`,label:`1`,state:`active-hover`}),(0,a.jsx)(n,{hierarchy:`trailing`,label:`1`,state:`active-hover`}),(0,a.jsx)(n,{hierarchy:`leading`,icon:`only`,state:`active-hover`}),(0,a.jsx)(n,{hierarchy:`trailing`,icon:`only`,state:`active-hover`}),(0,a.jsx)(n,{hierarchy:`leading`,icon:`true`,state:`active-hover`}),(0,a.jsx)(n,{hierarchy:`trailing`,icon:`true`,state:`active-hover`})]}),(0,a.jsxs)(`div`,{className:`pagination-story-buttons`,children:[(0,a.jsx)(n,{hierarchy:`leading`,label:`1`,state:`focused`}),(0,a.jsx)(n,{hierarchy:`middle`,label:`1`,state:`focused`}),(0,a.jsx)(n,{hierarchy:`trailing`,label:`1`,state:`focused`}),(0,a.jsx)(n,{hierarchy:`leading`,icon:`only`,state:`focused`}),(0,a.jsx)(n,{hierarchy:`trailing`,icon:`only`,state:`focused`}),(0,a.jsx)(n,{hierarchy:`leading`,icon:`true`,state:`focused`}),(0,a.jsx)(n,{hierarchy:`trailing`,icon:`true`,state:`focused`})]})]})})},l={render:()=>(0,a.jsx)(`div`,{className:`pagination-story-surface`,children:(0,a.jsxs)(`div`,{className:`pagination-story-stack`,children:[(0,a.jsx)(i,{alignment:`right`,breakpoint:`desktop`}),(0,a.jsx)(i,{alignment:`left`,breakpoint:`desktop`}),(0,a.jsx)(i,{alignment:`center`,breakpoint:`desktop`}),(0,a.jsx)(i,{alignment:`right`,breakpoint:`mobile`}),(0,a.jsx)(i,{alignment:`left`,breakpoint:`mobile`}),(0,a.jsx)(i,{alignment:`center`,breakpoint:`mobile`})]})})},s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  render: args => <div className="pagination-story-surface">
      <Pagination {...args} />
    </div>,
  args: {
    alignment: 'right',
    breakpoint: 'desktop',
    defaultCurrentPage: 1
  }
}`,...s.parameters?.docs?.source}}},c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  render: () => <div className="pagination-story-surface">
      <div className="pagination-story-stack">
        <div className="pagination-story-buttons">
          <PaginationButton hierarchy="leading" label="1" />
          <PaginationButton hierarchy="middle" label="1" />
          <PaginationButton hierarchy="trailing" label="1" />
          <PaginationButton hierarchy="leading" icon="only" />
          <PaginationButton hierarchy="trailing" icon="only" />
          <PaginationButton hierarchy="leading" icon="true" />
          <PaginationButton hierarchy="trailing" icon="true" />
        </div>
        <div className="pagination-story-buttons">
          <PaginationButton hierarchy="leading" label="1" state="active-hover" />
          <PaginationButton hierarchy="middle" label="1" state="active-hover" />
          <PaginationButton hierarchy="trailing" label="1" state="active-hover" />
          <PaginationButton hierarchy="leading" icon="only" state="active-hover" />
          <PaginationButton hierarchy="trailing" icon="only" state="active-hover" />
          <PaginationButton hierarchy="leading" icon="true" state="active-hover" />
          <PaginationButton hierarchy="trailing" icon="true" state="active-hover" />
        </div>
        <div className="pagination-story-buttons">
          <PaginationButton hierarchy="leading" label="1" state="focused" />
          <PaginationButton hierarchy="middle" label="1" state="focused" />
          <PaginationButton hierarchy="trailing" label="1" state="focused" />
          <PaginationButton hierarchy="leading" icon="only" state="focused" />
          <PaginationButton hierarchy="trailing" icon="only" state="focused" />
          <PaginationButton hierarchy="leading" icon="true" state="focused" />
          <PaginationButton hierarchy="trailing" icon="true" state="focused" />
        </div>
      </div>
    </div>
}`,...c.parameters?.docs?.source}}},l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  render: () => <div className="pagination-story-surface">
      <div className="pagination-story-stack">
        <Pagination alignment="right" breakpoint="desktop" />
        <Pagination alignment="left" breakpoint="desktop" />
        <Pagination alignment="center" breakpoint="desktop" />
        <Pagination alignment="right" breakpoint="mobile" />
        <Pagination alignment="left" breakpoint="mobile" />
        <Pagination alignment="center" breakpoint="mobile" />
      </div>
    </div>
}`,...l.parameters?.docs?.source}}},u=[`Playground`,`ButtonBaseStates`,`CardButtonGroups`]}))();export{c as ButtonBaseStates,l as CardButtonGroups,s as Playground,u as __namedExportsOrder,o as default};