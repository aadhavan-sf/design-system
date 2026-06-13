// @ts-nocheck
import { fn } from 'storybook/test';

import {
  ImageAspectRatio,
  UploadFile,
  UploadFileBase,
  UploadFileItem,
} from './UploadFile';

export default {
  title: 'Molecules/Upload File',
  component: UploadFile,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Upload file and dropzone molecule with horizontal/vertical dropzones, single uploaded file cards, image queues, and reusable image aspect ratio tiles.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    layout: {
      control: 'select',
      options: ['horizontal', 'vertical'],
    },
    mode: {
      control: 'select',
      options: ['single', 'multiple'],
    },
    dropzoneState: {
      control: 'select',
      options: ['enabled', 'hover', 'focus', 'disabled'],
    },
    multipleState: {
      control: 'select',
      options: ['complete', 'add-empty', 'add-hover', 'add-loader'],
    },
    filesQueued: {
      control: 'boolean',
    },
    supportingText: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
    size: {
      control: 'select',
      options: ['default', 'small'],
    },
  },
  args: {
    onFilesChange: fn(),
    onReplace: fn(),
    onDelete: fn(),
  },
};

export const Playground = {
  args: {
    layout: 'horizontal',
    mode: 'single',
    filesQueued: false,
    dropzoneState: 'enabled',
    supportingText: true,
    multipleState: 'complete',
    fileName: 'File_name.ext',
    fileSize: '200 KB',
    disabled: false,
  },
};

export const DropzoneStates = {
  render: () => (
    <div className="flex flex-col gap-8">
      <div className="flex flex-wrap items-start gap-6">
        {['enabled', 'hover', 'focus', 'disabled'].map((state) => (
          <UploadFileBase key={`horizontal-${state}`} state={state} />
        ))}
      </div>
      <div className="flex flex-wrap items-start gap-6">
        {['enabled', 'hover', 'focus', 'disabled'].map((state) => (
          <UploadFileBase key={`vertical-${state}`} layout="vertical" state={state} />
        ))}
      </div>
    </div>
  ),
};

export const SmallSize = {
  parameters: {
    docs: {
      description: {
        story:
          'Compact dropzone used inside constrained layouts such as the Icon Library picker. Full width, tighter padding, and smaller typography.',
      },
    },
  },
  render: () => (
    <div className="flex w-[216px] flex-col gap-8">
      <UploadFile
        size="small"
        layout="horizontal"
        title="Upload Your Icon"
        description="24x24 SVG or PNG"
      />
      <UploadFile size="small" layout="vertical" />
    </div>
  ),
};

export const DisabledStates = {
  parameters: {
    docs: {
      description: {
        story:
          'Disabled horizontal and vertical upload dropzones. Both use the disabled button state, neutral_50 surface, neutral_200 dashed border, and neutral_400 text/icon color.',
      },
    },
  },
  render: () => (
    <div className="flex flex-col gap-8">
      <UploadFileBase layout="horizontal" state="disabled" />
      <UploadFileBase layout="vertical" state="disabled" />
    </div>
  ),
};

export const UploadedItems = {
  render: () => (
    <div className="flex flex-col gap-8">
      <div className="flex flex-wrap items-start gap-6">
        <UploadFileItem />
        <UploadFileItem state="completed-hover" />
      </div>
      <div className="flex flex-wrap items-start gap-6">
        <UploadFileItem type="multiple" state="complete" />
        <UploadFileItem type="multiple" state="add-empty" />
      </div>
      <div className="flex flex-wrap items-start gap-6">
        <UploadFileItem type="multiple" state="add-hover" />
        <UploadFileItem type="multiple" state="add-loader" />
      </div>
    </div>
  ),
};

export const ComposedLayouts = {
  render: () => (
    <div className="flex flex-wrap items-start gap-6">
      <div className="flex flex-col gap-8">
        <UploadFile layout="horizontal" mode="single" />
        <UploadFile layout="horizontal" mode="single" filesQueued />
      </div>
      <div className="flex flex-col gap-8">
        <UploadFile layout="horizontal" mode="multiple" />
        <UploadFile layout="horizontal" mode="multiple" filesQueued />
      </div>
      <div className="flex flex-col gap-8">
        <UploadFile layout="vertical" mode="single" />
        <UploadFile layout="vertical" mode="single" filesQueued />
      </div>
      <div className="flex flex-col gap-8">
        <UploadFile layout="vertical" mode="multiple" />
        <UploadFile layout="vertical" mode="multiple" filesQueued />
      </div>
    </div>
  ),
};

export const ImageAspectRatios = {
  render: () => (
    <div className="flex flex-col gap-8">
      <div className="flex flex-wrap items-start gap-6">
        {['square', 'iphone', 'ipad', 'android'].map((size) => (
          <ImageAspectRatio key={`default-${size}`} size={size} />
        ))}
      </div>
      <div className="flex flex-wrap items-start gap-6">
        {['square', 'iphone', 'ipad', 'android'].map((size) => (
          <ImageAspectRatio key={`hovered-${size}`} size={size} status="hovered" />
        ))}
      </div>
      <div className="flex flex-wrap items-start gap-6">
        {['square', 'iphone', 'ipad', 'android'].map((size) => (
          <ImageAspectRatio key={`loader-${size}`} size={size} status="loader" />
        ))}
      </div>
      <div className="flex flex-wrap items-start gap-6">
        {['square', 'iphone', 'ipad', 'android'].map((size) => (
          <ImageAspectRatio key={`uploader-${size}`} size={size} type="uploader" />
        ))}
      </div>
    </div>
  ),
};
