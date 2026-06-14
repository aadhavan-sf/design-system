// @ts-nocheck
import { useState } from 'react';
import { fn } from 'storybook/test';

import {
  Popover,
  PopoverBlockItem,
  PopoverEmptyState,
  PopoverPreview,
} from './Popover';
import {
  BUILTIN_BLOCKS,
  DEMO_CUSTOM_BLOCKS,
  DEMO_PLUGIN_BLOCKS,
} from './popover.constants';

export default {
  title: 'Organisms/Popover',
  component: Popover,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Custom Blocks popover organism with search, segmented source tabs, scrollable built-in block list, hover add action, and a live preview panel from Figma.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    activeBlockId: {
      control: 'text',
    },
    activeTabIndex: {
      control: { type: 'number', min: 0, max: 2, step: 1 },
    },
    searchQuery: {
      control: 'text',
    },
    previewLabel: {
      control: 'text',
    },
    blocks: {
      control: 'object',
    },
    tabs: {
      control: 'object',
    },
  },
  args: {
    onAddBlock: fn(),
    onBlockChange: fn(),
    onCreateCustomBlock: fn(),
    onGoToPlugins: fn(),
    onSearchChange: fn(),
    onTabChange: fn(),
  },
};

export const Playground = {
  render: (args) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [activeBlockId, setActiveBlockId] = useState('image-banner');
    const [activeTabIndex, setActiveTabIndex] = useState(0);

    return (
      <Popover
        {...args}
        activeBlockId={activeBlockId}
        activeTabIndex={activeTabIndex}
        searchQuery={searchQuery}
        onAddBlock={args.onAddBlock}
        onSearchChange={(query) => {
          setSearchQuery(query);
          args.onSearchChange?.(query);
        }}
        onBlockChange={(block) => {
          setActiveBlockId(block.id);
          args.onBlockChange?.(block);
        }}
        onTabChange={(index) => {
          setActiveTabIndex(index);
          setSearchQuery('');
          args.onTabChange?.(index);
        }}
      />
    );
  },
};

export const WithSearchQuery = {
  args: {
    searchQuery: 'product',
    activeBlockId: 'product-grid',
    activeTabIndex: 0,
  },
};

export const SearchSortAndFilter = {
  args: {
    searchQuery: 'sort',
    activeTabIndex: 0,
  },
};

export const BuiltInSearchEmpty = {
  args: {
    searchQuery: 'zzzz',
    activeTabIndex: 0,
  },
};

export const CustomTabEmpty = {
  args: {
    activeTabIndex: 1,
  },
};

export const PluginTabEmpty = {
  args: {
    activeTabIndex: 2,
  },
};

export const CustomTabWithBlocks = {
  args: {
    activeTabIndex: 1,
    activeBlockId: 'custom-block',
    blocks: [...BUILTIN_BLOCKS, ...DEMO_CUSTOM_BLOCKS],
  },
};

export const PluginTabWithBlocks = {
  args: {
    activeTabIndex: 2,
    activeBlockId: 'plugin-block',
    blocks: [...BUILTIN_BLOCKS, ...DEMO_PLUGIN_BLOCKS],
  },
};

export const BuiltInBlockList = {
  render: () => (
    <div className="flex w-[232px] flex-col gap-2 rounded-16 border border-solid border-neutral-100 bg-neutral-0 p-4">
      {BUILTIN_BLOCKS.filter((block) => block.category === 'built-in').map((block) => {
        const BlockIcon = block.icon;

        return (
          <div key={block.id} className="flex h-5 items-center gap-2 text-neutral-700">
            <BlockIcon size={16} weight="regular" />
            <span className="text-sm font-medium">{block.label}</span>
          </div>
        );
      })}
    </div>
  ),
};

export const BlockItemStates = {
  render: () => (
    <div className="flex w-[232px] flex-col gap-2 rounded-16 border border-solid border-neutral-100 bg-neutral-0 p-4">
      <PopoverBlockItem label="Rich Text" state="default" />
      <PopoverBlockItem label="Image Banner" state="hover" />
      <PopoverBlockItem label="Video Banner" state="selected" />
    </div>
  ),
};

export const EmptyStates = {
  render: () => (
    <div className="flex w-[232px] flex-col gap-6">
      <PopoverEmptyState type="search" />
      <PopoverEmptyState type="custom" onAction={fn()} />
      <PopoverEmptyState type="plugin" onAction={fn()} />
    </div>
  ),
};

export const PreviewPanel = {
  render: () => (
    <PopoverPreview label="Preview" />
  ),
};

export const PreviewPanelEmpty = {
  render: () => (
    <PopoverPreview empty label="Preview" />
  ),
};
