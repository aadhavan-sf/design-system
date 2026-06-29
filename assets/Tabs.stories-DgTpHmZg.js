import{n as e}from"./chunk-DnJy8xQt.js";import{t}from"./jsx-runtime-DxP0NviS.js";import{n,r,t as i}from"./Tabs-B3nGvz8j.js";var a,o,s,c,l,u;e((()=>{r(),a=t(),o={title:`Molecules/Tabs`,component:n,parameters:{layout:`centered`,docs:{description:{component:`Tabs atom with individual tab item states and segmented/non-segmented tab groups from Figma.`}}},tags:[`autodocs`],argTypes:{type:{control:`select`,options:[`no-segment`,`segments`]},size:{control:`select`,options:[`sm`,`md`]},iconPosition:{control:`select`,options:[`left`,`right`]},showIcons:{control:`boolean`},tabCount:{control:`select`,options:[2,3,4,5],description:`Number of tabs shown when custom tab labels are not provided.`},activeIndex:{control:`number`},tabs:{control:!1}}},s={args:{type:`no-segment`,size:`sm`,showIcons:!1,iconPosition:`left`,defaultActiveIndex:0,tabCount:3}},c={render:()=>(0,a.jsxs)(`div`,{className:`grid grid-cols-4 items-start gap-6`,children:[(0,a.jsx)(i,{size:`sm`,iconPosition:`right`}),(0,a.jsx)(i,{size:`sm`,iconPosition:`right`,pressed:!0}),(0,a.jsx)(i,{size:`md`,iconPosition:`right`}),(0,a.jsx)(i,{size:`md`,iconPosition:`right`,pressed:!0}),(0,a.jsx)(i,{size:`sm`,iconPosition:`right`,state:`hover`}),(0,a.jsx)(i,{size:`sm`,iconPosition:`right`,pressed:!0,state:`hover`}),(0,a.jsx)(i,{size:`md`,iconPosition:`right`,state:`hover`}),(0,a.jsx)(i,{size:`md`,iconPosition:`right`,pressed:!0,state:`hover`}),(0,a.jsx)(i,{size:`sm`,iconPosition:`right`,state:`focused`}),(0,a.jsx)(i,{size:`sm`,iconPosition:`right`,pressed:!0,state:`focused`}),(0,a.jsx)(i,{size:`md`,iconPosition:`right`,state:`focused`}),(0,a.jsx)(i,{size:`md`,iconPosition:`right`,pressed:!0,state:`focused`}),(0,a.jsx)(i,{size:`sm`,iconPosition:`right`,state:`disabled`}),(0,a.jsx)(i,{size:`sm`,iconPosition:`right`,pressed:!0,state:`disabled`}),(0,a.jsx)(i,{size:`md`,iconPosition:`right`,state:`disabled`}),(0,a.jsx)(i,{size:`md`,iconPosition:`right`,pressed:!0,state:`disabled`}),(0,a.jsx)(i,{size:`sm`,iconPosition:`left`}),(0,a.jsx)(i,{size:`sm`,iconPosition:`left`,pressed:!0}),(0,a.jsx)(i,{size:`md`,iconPosition:`left`}),(0,a.jsx)(i,{size:`md`,iconPosition:`left`,pressed:!0})]})},l={render:()=>(0,a.jsxs)(`div`,{className:`flex flex-col items-start gap-6`,children:[(0,a.jsx)(n,{type:`no-segment`,tabCount:2}),(0,a.jsx)(n,{type:`no-segment`,tabCount:3}),(0,a.jsx)(n,{type:`no-segment`,tabCount:4}),(0,a.jsx)(n,{type:`no-segment`,tabCount:5}),(0,a.jsx)(n,{type:`segments`,tabCount:2}),(0,a.jsx)(n,{type:`segments`,tabCount:3}),(0,a.jsx)(n,{type:`segments`,tabCount:4}),(0,a.jsx)(n,{type:`segments`,tabCount:5})]})},s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    type: 'no-segment',
    size: 'sm',
    showIcons: false,
    iconPosition: 'left',
    defaultActiveIndex: 0,
    tabCount: 3
  }
}`,...s.parameters?.docs?.source}}},c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  render: () => <div className="grid grid-cols-4 items-start gap-6">
      <TabItem size="sm" iconPosition="right" />
      <TabItem size="sm" iconPosition="right" pressed />
      <TabItem size="md" iconPosition="right" />
      <TabItem size="md" iconPosition="right" pressed />

      <TabItem size="sm" iconPosition="right" state="hover" />
      <TabItem size="sm" iconPosition="right" pressed state="hover" />
      <TabItem size="md" iconPosition="right" state="hover" />
      <TabItem size="md" iconPosition="right" pressed state="hover" />

      <TabItem size="sm" iconPosition="right" state="focused" />
      <TabItem size="sm" iconPosition="right" pressed state="focused" />
      <TabItem size="md" iconPosition="right" state="focused" />
      <TabItem size="md" iconPosition="right" pressed state="focused" />

      <TabItem size="sm" iconPosition="right" state="disabled" />
      <TabItem size="sm" iconPosition="right" pressed state="disabled" />
      <TabItem size="md" iconPosition="right" state="disabled" />
      <TabItem size="md" iconPosition="right" pressed state="disabled" />

      <TabItem size="sm" iconPosition="left" />
      <TabItem size="sm" iconPosition="left" pressed />
      <TabItem size="md" iconPosition="left" />
      <TabItem size="md" iconPosition="left" pressed />
    </div>
}`,...c.parameters?.docs?.source}}},l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex flex-col items-start gap-6">
      <Tabs type="no-segment" tabCount={2} />
      <Tabs type="no-segment" tabCount={3} />
      <Tabs type="no-segment" tabCount={4} />
      <Tabs type="no-segment" tabCount={5} />
      <Tabs type="segments" tabCount={2} />
      <Tabs type="segments" tabCount={3} />
      <Tabs type="segments" tabCount={4} />
      <Tabs type="segments" tabCount={5} />
    </div>
}`,...l.parameters?.docs?.source}}},u=[`Playground`,`TabItemStates`,`TabGroups`]}))();export{s as Playground,l as TabGroups,c as TabItemStates,u as __namedExportsOrder,o as default};