// @ts-nocheck
import {
  Table,
  TableCell,
  TableEmptyState,
  TableFilters,
  TableHeader,
  TableHeaderCell,
} from './Table';

export default {
  title: 'Organisms/Table',
  component: Table,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Table organism with filter bars, table headers, reusable cells, empty states, pagination, and bordered/unbordered row or column views.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['without-border', 'with-border'],
    },
    view: {
      control: 'select',
      options: ['column', 'row'],
    },
    showPagination: {
      control: 'boolean',
    },
    paginationAlignment: {
      control: 'select',
      options: ['left', 'center', 'right'],
    },
    paginationBreakpoint: {
      control: 'select',
      options: ['desktop', 'mobile'],
    },
  },
};

export const Playground = {
  render: (args) => (
    <div className="storybook-table-story-surface">
      <Table {...args} />
    </div>
  ),
  args: {
    type: 'without-border',
    view: 'column',
    showPagination: true,
    paginationAlignment: 'right',
    paginationBreakpoint: 'desktop',
  },
};

export const TableVariants = {
  render: () => (
    <div className="storybook-table-story-surface">
      <Table type="without-border" view="column" />
      <Table type="with-border" view="column" />
      <Table type="without-border" view="row" />
      <Table type="with-border" view="row" />
    </div>
  ),
};

export const FilterStyles = {
  render: () => (
    <div className="storybook-table-story-stack">
      <TableFilters filterStyle="search-button" />
      <TableFilters filterStyle="dropdown-search-button" />
      <TableFilters filterStyle="advanced" />
      <TableFilters filterStyle="button-only" />
    </div>
  ),
  parameters: {
    layout: 'centered',
  },
};

export const HeaderStates = {
  render: () => (
    <div className="storybook-table-story-stack">
      <div className="storybook-table-story-grid">
        {['default', 'hover', 'disabled'].map((state) => (
          <TableHeader
            key={`plain-${state}`}
            label="Company"
            state={state}
          />
        ))}
        {['default', 'hover', 'disabled'].map((state) => (
          <TableHeader
            key={`help-${state}`}
            helpIcon
            label="Company"
            state={state}
          />
        ))}
        {['default', 'hover', 'disabled'].map((state) => (
          <TableHeader
            key={`down-${state}`}
            arrow="down"
            label="Company"
            state={state}
          />
        ))}
        {['default', 'hover', 'disabled'].map((state) => (
          <TableHeader
            key={`help-down-${state}`}
            arrow="down"
            helpIcon
            label="Company"
            state={state}
          />
        ))}
        {['default', 'hover', 'disabled'].map((state) => (
          <TableHeader
            key={`up-${state}`}
            arrow="up"
            label="Company"
            state={state}
          />
        ))}
        {['default', 'hover', 'disabled'].map((state) => (
          <TableHeader
            key={`help-up-${state}`}
            arrow="up"
            helpIcon
            label="Company"
            state={state}
          />
        ))}
      </div>
      <div className="storybook-table-story-grid">
        <TableHeaderCell checkbox label="Company" arrow="down" />
        <TableHeaderCell checkbox color="gray" label="Company" arrow="down" />
        <TableHeaderCell checkbox text={false} />
        <TableHeaderCell checkbox color="gray" text={false} />
        <TableHeaderCell checkbox={false} label="Company" />
        <TableHeaderCell checkbox={false} color="gray" label="Company" />
      </div>
    </div>
  ),
  parameters: {
    layout: 'centered',
  },
};

export const CellStates = {
  render: () => (
    <div className="storybook-table-story-grid">
      {['default', 'hover', 'disabled'].map((state) => (
        <TableCell
          key={`lead-${state}`}
          state={state}
          style="lead"
          value="Olivia Rhye"
        />
      ))}
      {['default', 'hover', 'disabled'].map((state) => (
        <TableCell
          key={`text-${state}`}
          state={state}
          style="text"
          value="Olivia Rhye"
        />
      ))}
      {['default', 'hover', 'disabled'].map((state) => (
        <TableCell
          key={`checkbox-${state}`}
          state={state}
          style="checkbox"
          value="Olivia Rhye"
        />
      ))}
      {['default', 'hover', 'disabled'].map((state) => (
        <TableCell
          key={`badge-${state}`}
          badges={[{ label: 'Active', tone: 'success' }]}
          state={state}
          style="badge"
        />
      ))}
      {['default', 'hover', 'disabled'].map((state) => (
        <TableCell
          key={`badges-${state}`}
          badges={[
            { label: 'Active', tone: 'success' },
            { label: 'Active', tone: 'error' },
          ]}
          state={state}
          style="badges"
        />
      ))}
      {['default', 'hover', 'disabled'].map((state) => (
        <TableCell
          key={`trend-${state}`}
          state={state}
          style="trend"
          supportingText
          value="$1,800"
        />
      ))}
      {['default', 'hover', 'disabled'].map((state) => (
        <TableCell
          key={`delivery-${state}`}
          deliveryValue={72}
          state={state}
          style="delivery"
        />
      ))}
      {['default', 'hover', 'disabled'].map((state) => (
        <TableCell
          key={`actions-${state}`}
          state={state}
          style="actions"
        />
      ))}
      {['default', 'hover', 'disabled'].map((state) => (
        <TableCell
          key={`avatar-${state}`}
          state={state}
          style="avatar"
          supportingText
          value="Olivia Rhye"
        />
      ))}
    </div>
  ),
  parameters: {
    layout: 'centered',
  },
};

export const EmptyStates = {
  render: () => (
    <div className="storybook-table-story-stack">
      <TableEmptyState type="search" />
      <TableEmptyState type="upload" />
      <TableEmptyState type="error" />
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
  },
};
