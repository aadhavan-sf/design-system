// @ts-nocheck
import {
  Pagination,
  PaginationButton,
} from './Pagination';

export default {
  title: 'Molecules/Pagination',
  component: Pagination,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Pagination atom with reusable pagination button base and card button group layouts from Figma.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    alignment: {
      control: 'select',
      options: ['left', 'center', 'right'],
    },
    breakpoint: {
      control: 'select',
      options: ['desktop', 'mobile'],
    },
    currentPage: {
      control: 'number',
    },
    defaultCurrentPage: {
      control: 'number',
    },
    pages: {
      control: 'object',
    },
    totalPages: {
      control: 'number',
    },
  },
};

export const Playground = {
  render: (args) => (
    <div className="box-border flex w-full flex-col items-stretch gap-4 p-6">
      <Pagination {...args} />
    </div>
  ),
  args: {
    alignment: 'right',
    breakpoint: 'desktop',
    defaultCurrentPage: 3,
    totalPages: 10,
  },
};

export const ButtonBaseStates = {
  render: () => (
    <div className="box-border flex w-full flex-col items-stretch gap-4 p-6">
      <div className="flex flex-col items-stretch gap-4">
        <div className="flex flex-wrap gap-4">
          <PaginationButton hierarchy="leading" label="1" />
          <PaginationButton hierarchy="middle" label="1" />
          <PaginationButton hierarchy="trailing" label="1" />
          <PaginationButton hierarchy="leading" icon="only" />
          <PaginationButton hierarchy="trailing" icon="only" />
          <PaginationButton hierarchy="leading" icon="true" />
          <PaginationButton hierarchy="trailing" icon="true" />
        </div>
        <div className="flex flex-wrap gap-4">
          <PaginationButton hierarchy="leading" label="1" state="active-hover" />
          <PaginationButton hierarchy="middle" label="1" state="active-hover" />
          <PaginationButton hierarchy="trailing" label="1" state="active-hover" />
          <PaginationButton hierarchy="leading" icon="only" state="active-hover" />
          <PaginationButton hierarchy="trailing" icon="only" state="active-hover" />
          <PaginationButton hierarchy="leading" icon="true" state="active-hover" />
          <PaginationButton hierarchy="trailing" icon="true" state="active-hover" />
        </div>
        <div className="flex flex-wrap gap-4">
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
  ),
};

export const CardButtonGroups = {
  render: () => (
    <div className="box-border flex w-full flex-col items-stretch gap-4 p-6">
      <div className="flex flex-col items-stretch gap-4">
        <Pagination alignment="right" breakpoint="desktop" />
        <Pagination alignment="left" breakpoint="desktop" />
        <Pagination alignment="center" breakpoint="desktop" />
        <Pagination alignment="right" breakpoint="mobile" />
        <Pagination alignment="left" breakpoint="mobile" />
        <Pagination alignment="center" breakpoint="mobile" />
      </div>
    </div>
  ),
};
