// @ts-nocheck
import { fn } from 'storybook/test';

import { UploadFile } from './UploadFile';
import {
  buildMultipleImagesSlotsFromStoryArgs,
  createMultipleImagesSlotArgTypes,
  createMultipleImagesSlotArgs,
  isUploadFileMultipleState,
  resolveUploadFileDropzoneState,
  resolveUploadFileLayout,
  UPLOAD_FILE_DROPZONE_STATE_OPTIONS,
  UPLOAD_FILE_LAYOUT_OPTIONS,
  UPLOAD_FILE_MAIN_STATE_OPTIONS,
  UPLOAD_FILE_MULTIPLE_STATE_OPTIONS,
} from './uploadFileStory.utils';

import './uploadFile.stories.css';

const ITEM_STATE_OPTIONS = [
  'Uploading',
  'Large File',
  'Unsupported File',
  'Internet Issue',
  'Request Failed',
  'Upload Successful',
];

const MULTIPLE_IMAGE_SLOT_ARG_TYPES = createMultipleImagesSlotArgTypes();
const MULTIPLE_IMAGE_SLOT_ARGS = createMultipleImagesSlotArgs();

function UploadFileStory(args) {
  const {
    layout = 'Horizontal',
    showDescription = true,
    showSupportText = true,
    dropzoneState = 'Default',
    filesQueued = false,
    state = 'Uploading',
    slots: providedSlots,
    ...rest
  } = args;

  const uploadFileProps = { ...rest };
  for (let index = 1; index <= 10; index += 1) {
    delete uploadFileProps[`slotState_${index}`];
  }

  const slots = isUploadFileMultipleState(state)
    ? providedSlots ?? buildMultipleImagesSlotsFromStoryArgs(args)
    : providedSlots;

  return (
    <UploadFile
      {...uploadFileProps}
      dropzoneState={resolveUploadFileDropzoneState(dropzoneState)}
      filesQueued={filesQueued}
      layout={resolveUploadFileLayout(layout)}
      showDescription={showDescription}
      showSupportText={showSupportText}
      slots={slots}
      state={state}
    />
  );
}

UploadFileStory.displayName = 'Upload File';

export default {
  title: 'Molecules/Upload File',
  component: UploadFile,
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
          'Single Upload File molecule composed of **Upload File Base** (dropzone), **Upload File Item** (queued upload states), and **Multiple Images** (multi-upload grid). Use Layout, Show Description, Show Support Text, Dropzone State, Files Queued, and State to switch between the three base components. For Multiple Images, pass a custom `slots` array or use the slot controls in Playground to set each tile state individually.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    layout: {
      name: 'Layout',
      control: 'select',
      options: [...UPLOAD_FILE_LAYOUT_OPTIONS],
      type: { name: 'enum', value: [...UPLOAD_FILE_LAYOUT_OPTIONS] },
      if: { arg: 'filesQueued', eq: false },
      table: { order: 0, defaultValue: { summary: 'Horizontal' } },
    },
    showDescription: {
      name: 'Show Description',
      control: 'boolean',
      if: { arg: 'filesQueued', eq: false },
      table: { order: 1, defaultValue: { summary: true } },
    },
    showSupportText: {
      name: 'Show Support Text',
      control: 'boolean',
      if: { arg: 'filesQueued', eq: false },
      table: { order: 2, defaultValue: { summary: true } },
    },
    dropzoneState: {
      name: 'Dropzone State',
      control: 'select',
      options: [...UPLOAD_FILE_DROPZONE_STATE_OPTIONS],
      type: { name: 'enum', value: [...UPLOAD_FILE_DROPZONE_STATE_OPTIONS] },
      if: { arg: 'filesQueued', eq: false },
      table: { order: 3, defaultValue: { summary: 'Default' } },
    },
    filesQueued: {
      name: 'Files Queued',
      control: 'boolean',
      table: { order: 4, defaultValue: { summary: false } },
    },
    state: {
      name: 'State',
      control: 'select',
      options: [...UPLOAD_FILE_MAIN_STATE_OPTIONS],
      type: { name: 'enum', value: [...UPLOAD_FILE_MAIN_STATE_OPTIONS] },
      table: { order: 5, defaultValue: { summary: 'Uploading' } },
    },
    progress: {
      control: { type: 'range', min: 0, max: 100, step: 1 },
      if: { arg: 'state', eq: 'Uploading' },
      table: { order: 6 },
    },
    showFileSize: {
      name: 'Show File Size',
      control: 'boolean',
      if: { arg: 'state', eq: 'Upload Successful' },
      table: { order: 7, defaultValue: { summary: true } },
    },
    slots: {
      control: false,
      table: { disable: true },
    },
    ...MULTIPLE_IMAGE_SLOT_ARG_TYPES,
    onBrowse: { table: { disable: true } },
    onFilesChange: { table: { disable: true } },
    onReplace: { table: { disable: true } },
    onDelete: { table: { disable: true } },
    onRetry: { table: { disable: true } },
  },
  args: {
    layout: 'Horizontal',
    showDescription: true,
    showSupportText: true,
    dropzoneState: 'Default',
    filesQueued: false,
    state: 'Uploading',
    progress: 75,
    showFileSize: true,
    ...MULTIPLE_IMAGE_SLOT_ARGS,
    onBrowse: fn(),
    onFilesChange: fn(),
    onReplace: fn(),
    onDelete: fn(),
    onRetry: fn(),
  },
  render: (args) => <UploadFileStory {...args} />,
};

export const Playground = {
  parameters: {
    docs: {
      description: {
        story:
          'Interactive playground for the full Upload File molecule. Set State to a Multiple + layout and use the Multiple Image Slots controls to change any tile in row 1 or row 2.',
      },
    },
  },
};

export const Default = {
  parameters: {
    docs: {
      description: {
        story:
          'Default horizontal Upload File Base dropzone with support text. Matches Figma at 416×104.',
      },
    },
  },
  args: {
    layout: 'Horizontal',
    showDescription: true,
    showSupportText: true,
    dropzoneState: 'Default',
    filesQueued: false,
    state: 'Uploading',
  },
};

export const UploadFileBaseHorizontal = {
  name: 'Upload File Base / Horizontal',
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Upload File Base rendered horizontally with and without support text.',
      },
    },
  },
  render: () => (
    <div className="flex flex-col gap-4">
      <UploadFileStory layout="Horizontal" showSupportText state="Uploading" />
      <UploadFileStory layout="Horizontal" showSupportText={false} state="Uploading" />
    </div>
  ),
};

export const UploadFileBaseVertical = {
  name: 'Upload File Base / Vertical',
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Upload File Base rendered vertically with and without support text.',
      },
    },
  },
  render: () => (
    <div className="flex flex-col gap-4">
      <UploadFileStory layout="Vertical" showSupportText state="Uploading" />
      <UploadFileStory layout="Vertical" showSupportText={false} state="Uploading" />
    </div>
  ),
};

export const UploadFileBaseDropzoneStates = {
  name: 'Upload File Base / Dropzone States',
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Upload File Base default, hover, focus, and disabled dropzone states.',
      },
    },
  },
  render: () => (
    <div className="flex flex-col gap-4">
      {UPLOAD_FILE_DROPZONE_STATE_OPTIONS.map((dropzoneState) => (
        <UploadFileStory key={dropzoneState} dropzoneState={dropzoneState} state="Uploading" />
      ))}
    </div>
  ),
};

export const UploadFileItemStates = {
  name: 'Upload File Item / All States',
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          'Upload File Item states shown when Files Queued is enabled: uploading, errors, and success.',
      },
    },
  },
  render: () => (
    <div className="flex flex-col gap-4">
      {ITEM_STATE_OPTIONS.map((state) => (
        <UploadFileStory key={state} filesQueued state={state} />
      ))}
    </div>
  ),
};

export const UploadFileItemUploading = {
  name: 'Upload File Item / Uploading',
  parameters: {
    controls: { disable: true },
  },
  args: {
    filesQueued: true,
    state: 'Uploading',
    progress: 75,
  },
};

export const UploadFileItemUploadSuccessful = {
  name: 'Upload File Item / Upload Successful',
  parameters: {
    controls: { disable: true },
  },
  args: {
    filesQueued: true,
    state: 'Upload Successful',
    showFileSize: true,
  },
};

export const MultipleImagesAllLayouts = {
  name: 'Multiple Images / All Layouts',
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          'Multiple Images grid for Square, iPad, iPhone, and Android tile layouts with container heights sized for two rows.',
      },
    },
  },
  render: () => (
    <div className="flex flex-col gap-6">
      {UPLOAD_FILE_MULTIPLE_STATE_OPTIONS.map((state) => (
        <div key={state} className="flex flex-col gap-3">
          <span className="font-sans text-ds-text-sm text-neutral-700">{state}</span>
          <UploadFileStory state={state} />
        </div>
      ))}
    </div>
  ),
};

export const MultipleImagesSlotEditor = {
  name: 'Multiple Images / Slot Editor',
  parameters: {
    docs: {
      description: {
        story:
          'Use the Multiple Image Slots controls to set Default, Hover, or Loading on any image tile in rows 1–2, and Default, Hover, Focus, or Disabled on the add tile.',
      },
    },
  },
  args: {
    state: 'Multiple + Square',
    slotState_8: 'Hover',
    slotState_9: 'Loading',
  },
};

export const MultipleImagesSquare = {
  name: 'Multiple Images / Square',
  parameters: {
    controls: { disable: true },
  },
  args: {
    state: 'Multiple + Square',
  },
};

export const AllStates = {
  name: 'All States',
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Every Upload File state from Figma across all three base components.',
      },
    },
  },
  render: () => (
    <div className="flex flex-col gap-6">
      <UploadFileStory />
      {ITEM_STATE_OPTIONS.map((state) => (
        <UploadFileStory key={state} filesQueued state={state} />
      ))}
      {UPLOAD_FILE_MULTIPLE_STATE_OPTIONS.map((state) => (
        <UploadFileStory key={state} state={state} />
      ))}
    </div>
  ),
};
