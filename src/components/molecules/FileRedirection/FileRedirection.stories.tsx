// @ts-nocheck
import { fn } from 'storybook/test';

import { FileRedirection } from './FileRedirection';
import { FileRedirectionUploadedPreview } from './FileRedirectionUploadedPreview';
import {
  FILE_REDIRECTION_ACTION_OPTIONS,
  FILE_REDIRECTION_TARGET_OPTIONS,
  FILE_REDIRECTION_TYPE_OPTIONS,
} from './fileRedirectionStory.utils';

import '../UploadFile/uploadFile.stories.css';

export default {
  title: 'Molecules/File Redirection',
  component: FileRedirection,
  parameters: {
    layout: 'centered',
    controls: {
      sort: 'none',
    },
    docs: {
      controls: {
        sort: 'none',
      },
      description: {
        component:
          'Compact 216px upload card with optional drag handle, Upload File dropzone states, uploaded image preview, redirect toggle, target chips, and destination dropdown when redirection is enabled.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      name: 'Type',
      control: 'select',
      options: [...FILE_REDIRECTION_TYPE_OPTIONS],
      type: { name: 'enum', value: [...FILE_REDIRECTION_TYPE_OPTIONS] },
      table: { order: 0, defaultValue: { summary: 'With Redirection' } },
    },
    redirection: {
      name: 'Redirection',
      control: 'boolean',
      if: { arg: 'type', eq: 'With Redirection' },
      table: { order: 1, defaultValue: { summary: false } },
    },
    redirectTarget: {
      name: 'Redirect Target',
      control: 'select',
      options: [...FILE_REDIRECTION_TARGET_OPTIONS],
      if: { arg: 'redirection', eq: true },
      table: { order: 2, defaultValue: { summary: 'Collection' } },
    },
    action: {
      name: 'Action',
      control: 'select',
      options: [...FILE_REDIRECTION_ACTION_OPTIONS],
      type: { name: 'enum', value: [...FILE_REDIRECTION_ACTION_OPTIONS] },
      table: { order: 3, defaultValue: { summary: 'Upload File' } },
    },
    showDragIcon: {
      name: 'Drag Icon',
      control: 'boolean',
      table: { order: 4, defaultValue: { summary: true } },
    },
    uploadTitle: { table: { disable: true } },
    redirectLabel: { table: { disable: true } },
    redirectValue: { table: { disable: true } },
    onBrowse: { table: { disable: true } },
    onFilesChange: { table: { disable: true } },
    onRedirectionChange: { table: { disable: true } },
    onRedirectTargetChange: { table: { disable: true } },
    onRedirectValueChange: { table: { disable: true } },
  },
  args: {
    type: 'With Redirection',
    redirection: false,
    redirectTarget: 'Collection',
    action: 'Upload File',
    showDragIcon: true,
    onBrowse: fn(),
    onFilesChange: fn(),
    onRedirectionChange: fn(),
    onRedirectTargetChange: fn(),
    onRedirectValueChange: fn(),
  },
};

export const Playground = {
  parameters: {
    docs: {
      description: {
        story:
          'Interactive File Redirection card matching Figma with Type, Redirection, Redirect Target, Action, and Drag Icon controls.',
      },
    },
  },
};

export const Default = {
  args: {
    type: 'With Redirection',
    redirection: false,
    action: 'Upload File',
    showDragIcon: true,
  },
};

export const FileHoverEffectDefault = {
  name: 'File Hover Effect Default Icons',
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          'Default icon state with overlay visible, matching Figma Default Icon State (4052:9347).',
      },
    },
  },
  render: () => <FileRedirectionUploadedPreview forceOverlay />,
};

export const FileHoverEffectIconHover = {
  name: 'File Hover Effect Icon Hover',
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          'Delete icon hover state matching Figma Icon Hover effect (4052:9578).',
      },
    },
  },
  render: () => (
    <FileRedirectionUploadedPreview forceDeleteHover forceOverlay />
  ),
};

export const AllActions = {
  name: 'All Actions',
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Upload File, File Uploaded preview, and File Hover Effect states.',
      },
    },
  },
  render: () => (
    <div className="flex flex-col gap-4">
      {FILE_REDIRECTION_ACTION_OPTIONS.map((action) => (
        <FileRedirection key={action} action={action} showDragIcon />
      ))}
    </div>
  ),
};

export const TypeVariants = {
  name: 'Type Variants',
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <div className="flex flex-col gap-4">
      <FileRedirection redirection type="With Redirection" />
      <FileRedirection type="Without Redirection" />
    </div>
  ),
};

export const RedirectionEnabled = {
  name: 'Redirection Enabled',
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Redirect toggle on with target chips and destination dropdown, matching Figma.',
      },
    },
  },
  args: {
    redirection: true,
    redirectTarget: 'Collection',
  },
};

export const RedirectionStates = {
  name: 'Redirection States',
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <div className="flex flex-col gap-4">
      <FileRedirection redirection={false} />
      <FileRedirection redirection />
    </div>
  ),
};

export const DragIconVisibility = {
  name: 'Drag Icon Visibility',
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <div className="flex flex-col gap-4">
      <FileRedirection showDragIcon />
      <FileRedirection showDragIcon={false} />
    </div>
  ),
};
