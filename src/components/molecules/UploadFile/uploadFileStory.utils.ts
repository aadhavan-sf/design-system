import {
  UPLOAD_FILE_DROPZONE_STATE_ALIASES,
  UPLOAD_FILE_DROPZONE_STATE_OPTIONS,
  UPLOAD_FILE_LAYOUT_ALIASES,
  UPLOAD_FILE_LAYOUT_OPTIONS,
  UPLOAD_FILE_MAIN_STATE_ALIASES,
  UPLOAD_FILE_MAIN_STATE_OPTIONS,
  UPLOAD_FILE_MULTIPLE_STATE_LAYOUTS,
  UPLOAD_FILE_MULTIPLE_STATE_OPTIONS,
  MULTIPLE_IMAGES_DEFAULT_SLOTS,
  MULTIPLE_IMAGES_ITEM_SLOT_COUNT,
  type UploadFileDropzoneStateOption,
  type UploadFileLayoutOption,
  type UploadFileMainStateOption,
  type UploadFileMultipleStateOption,
  type UploadTileLayout,
} from './uploadFile.constants';
import { resolveTileState } from './uploadFileTileStory.utils';
import type { MultipleImagesSlot } from './MultipleImages';

export {
  UPLOAD_FILE_DROPZONE_STATE_OPTIONS,
  UPLOAD_FILE_LAYOUT_OPTIONS,
  UPLOAD_FILE_MAIN_STATE_OPTIONS,
  UPLOAD_FILE_MULTIPLE_STATE_OPTIONS,
};

export function resolveUploadFileLayout(
  layout: UploadFileLayoutOption | string | undefined,
): 'horizontal' | 'vertical' {
  return UPLOAD_FILE_LAYOUT_ALIASES[layout ?? 'Horizontal'] ?? 'horizontal';
}

export function resolveUploadFileDropzoneState(
  state: UploadFileDropzoneStateOption | string | undefined,
): string {
  return UPLOAD_FILE_DROPZONE_STATE_ALIASES[state ?? 'Default'] ?? 'default';
}

export function resolveUploadFileMainState(
  state: UploadFileMainStateOption | string | undefined,
): string {
  return UPLOAD_FILE_MAIN_STATE_ALIASES[state ?? 'Uploading'] ?? 'uploading-media';
}

export function isUploadFileMultipleState(
  state: UploadFileMainStateOption | string | undefined,
): state is UploadFileMultipleStateOption {
  return UPLOAD_FILE_MULTIPLE_STATE_OPTIONS.includes(state as UploadFileMultipleStateOption);
}

export function resolveUploadFileMultipleLayout(
  state: UploadFileMultipleStateOption | string,
): UploadTileLayout {
  if (isUploadFileMultipleState(state)) {
    return UPLOAD_FILE_MULTIPLE_STATE_LAYOUTS[state];
  }

  return 'square';
}

export function isUploadFileQueuedItemState(
  state: UploadFileMainStateOption | string | undefined,
): boolean {
  return Boolean(state && !isUploadFileMultipleState(state));
}

const MULTIPLE_IMAGES_DEFAULT_STORY_SLOT_STATES = MULTIPLE_IMAGES_DEFAULT_SLOTS.map((slot, index) => {
  if (slot.kind === 'base') {
    return 'Default';
  }

  switch (slot.state) {
    case 'hover':
      return 'Hover';
    case 'loading':
      return 'Loading';
    default:
      return 'Default';
  }
});

export function getMultipleImagesDefaultStorySlotStates(): string[] {
  return [...MULTIPLE_IMAGES_DEFAULT_STORY_SLOT_STATES];
}

export function buildMultipleImagesSlotsFromStoryArgs(
  args: Record<string, string | undefined>,
): MultipleImagesSlot[] {
  const itemSlots = Array.from({ length: MULTIPLE_IMAGES_ITEM_SLOT_COUNT }, (_, index) => ({
    kind: 'item' as const,
    state: resolveTileState(args[`slotState_${index + 1}`] ?? MULTIPLE_IMAGES_DEFAULT_STORY_SLOT_STATES[index]),
  }));

  return [
    ...itemSlots,
    {
      kind: 'base',
      state: resolveUploadFileDropzoneState(
        args.slotState_10 ?? MULTIPLE_IMAGES_DEFAULT_STORY_SLOT_STATES[MULTIPLE_IMAGES_ITEM_SLOT_COUNT],
      ),
    },
  ];
}

export function createMultipleImagesSlotArgTypes() {
  const itemSlotArgType = {
    control: 'select',
    options: ['Default', 'Hover', 'Loading'],
    table: { category: 'Multiple Image Slots' },
  };

  const addTileArgType = {
    name: 'Slot 10 (Add tile)',
    control: 'select',
    options: [...UPLOAD_FILE_DROPZONE_STATE_OPTIONS],
    table: { category: 'Multiple Image Slots', order: 10 },
  };

  const slotLabels = [
    'Slot 1 (Row 1, Col 1)',
    'Slot 2 (Row 1, Col 2)',
    'Slot 3 (Row 1, Col 3)',
    'Slot 4 (Row 1, Col 4)',
    'Slot 5 (Row 1, Col 5)',
    'Slot 6 (Row 2, Col 1)',
    'Slot 7 (Row 2, Col 2)',
    'Slot 8 (Row 2, Col 3)',
    'Slot 9 (Row 2, Col 4)',
  ];

  return {
    ...Object.fromEntries(
      slotLabels.map((name, index) => [
        `slotState_${index + 1}`,
        {
          ...itemSlotArgType,
          name,
          table: { ...itemSlotArgType.table, order: index + 1 },
        },
      ]),
    ),
    slotState_10: addTileArgType,
  };
}

export function createMultipleImagesSlotArgs() {
  const defaults = getMultipleImagesDefaultStorySlotStates();

  return Object.fromEntries(
    defaults.map((value, index) => [`slotState_${index + 1}`, value]),
  );
}
