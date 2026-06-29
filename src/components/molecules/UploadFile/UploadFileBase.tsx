import {
  useState,
  type ButtonHTMLAttributes,
  type DragEvent,
  type MouseEvent,
} from 'react';
import { MonitorArrowUp, Plus } from '@phosphor-icons/react';

import { Text } from '../../foundations/Typography';
import { UploadFileDashedBorder } from './UploadFileDashedBorder';
import { UPLOAD_TILE_SIZE_CLASSES } from './uploadFile.constants';

import './uploadFileBase.css';
import './uploadFileDashedBorder.css';

export type UploadFileBaseLayout =
  | 'horizontal'
  | 'vertical'
  | 'square'
  | 'ipad'
  | 'iphone'
  | 'android'
  | 'Horizontal'
  | 'Vertical'
  | 'Square'
  | 'iPad'
  | 'iPhone'
  | 'Android';

export type UploadFileBaseState =
  | 'default'
  | 'hover'
  | 'focus'
  | 'disabled'
  | 'Default'
  | 'Hover'
  | 'Focus'
  | 'Focused'
  | 'Disabled';

type NormalizedLayout = 'horizontal' | 'vertical' | 'square' | 'ipad' | 'iphone' | 'android';
type NormalizedState = 'default' | 'hover' | 'focus' | 'disabled';

const LAYOUT_ALIASES: Record<string, NormalizedLayout> = {
  horizontal: 'horizontal',
  vertical: 'vertical',
  square: 'square',
  ipad: 'ipad',
  iphone: 'iphone',
  android: 'android',
  Horizontal: 'horizontal',
  Vertical: 'vertical',
  Square: 'square',
  iPad: 'ipad',
  iPhone: 'iphone',
  Android: 'android',
};

const STATE_ALIASES: Record<string, NormalizedState> = {
  default: 'default',
  hover: 'hover',
  focus: 'focus',
  disabled: 'disabled',
  Default: 'default',
  Hover: 'hover',
  Focus: 'focus',
  Focused: 'focus',
  Disabled: 'disabled',
  enabled: 'default',
  Enabled: 'default',
};

const TILE_SIZE_CLASSES: Record<Exclude<NormalizedLayout, 'horizontal' | 'vertical'>, string> =
  UPLOAD_TILE_SIZE_CLASSES;

export interface UploadFileBaseProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onDrop'> {
  layout?: UploadFileBaseLayout;
  state?: UploadFileBaseState;
  compact?: boolean;
  /** @deprecated Use showDescription and showSupportText instead. */
  supportingText?: boolean;
  showDescription?: boolean;
  showSupportText?: boolean;
  title?: string;
  description?: string;
  footerText?: string;
  onBrowse?: () => void;
  onDropFiles?: (files: File[]) => void;
}

function buildClassName(parts: Array<string | false | null | undefined>) {
  return parts.flat().filter(Boolean).join(' ');
}

function normalizeLayout(layout: UploadFileBaseLayout | undefined): NormalizedLayout {
  return LAYOUT_ALIASES[layout ?? 'horizontal'] ?? 'horizontal';
}

function normalizeState(state: UploadFileBaseState | undefined): NormalizedState {
  return STATE_ALIASES[state ?? 'default'] ?? 'default';
}

function isTileLayout(layout: NormalizedLayout): layout is keyof typeof TILE_SIZE_CLASSES {
  return layout !== 'horizontal' && layout !== 'vertical';
}

function getStateClassName({
  visualState,
  isDisabled,
}: {
  visualState: NormalizedState;
  isDisabled: boolean;
}) {
  const isHovered = visualState === 'hover';
  const isFocused = visualState === 'focus';

  return buildClassName([
    isDisabled && 'cursor-not-allowed bg-neutral-50 text-neutral-400',
    !isDisabled && isHovered && 'bg-neutral-25',
    !isDisabled && !isHovered && !isFocused && 'hover:bg-neutral-25',
    !isDisabled && isFocused && 'bg-neutral-0 shadow-focus-brand',
    !isDisabled && 'focus-visible:bg-neutral-0 focus-visible:shadow-focus-brand',
  ]);
}

type CopyLayoutMode = 'title-only' | 'partial' | 'full';

function getCopyLayoutMode(
  showDescription: boolean,
  showSupportText: boolean,
): CopyLayoutMode {
  if (!showDescription && !showSupportText) {
    return 'title-only';
  }

  if (showDescription && showSupportText) {
    return 'full';
  }

  return 'partial';
}

function getTextLayoutClassName({
  layout,
  copyLayoutMode,
}: {
  layout: NormalizedLayout;
  copyLayoutMode: CopyLayoutMode;
}) {
  const isHorizontal = layout === 'horizontal';

  return buildClassName([
    'storybook-upload-file-base__copy flex min-w-0 flex-col',
    copyLayoutMode !== 'title-only' && 'gap-1',
    layout === 'vertical' && 'items-center',
    isHorizontal && copyLayoutMode === 'title-only' && 'justify-center',
  ]);
}

function getDropzoneClassName({
  layout,
  showDescription,
  showSupportText,
  visualState,
  isDisabled,
  compact,
  className,
}: {
  layout: NormalizedLayout;
  showDescription: boolean;
  showSupportText: boolean;
  visualState: NormalizedState;
  isDisabled: boolean;
  compact?: boolean;
  className?: string;
}) {
  if (isTileLayout(layout)) {
    return buildClassName([
      'storybook-upload-file-base relative box-border inline-flex shrink-0 items-center justify-center border-0',
      'rounded-4 bg-neutral-0 font-sans',
      TILE_SIZE_CLASSES[layout],
      getStateClassName({ visualState, isDisabled }),
      className,
    ]);
  }

  const copyLayoutMode = getCopyLayoutMode(showDescription, showSupportText);
  const isHorizontal = layout === 'horizontal';
  const widthClass = compact ? 'w-full' : 'w-[416px]';

  if (isHorizontal) {
    const heightClass = compact
      ? {
          'title-only': 'h-[64px] items-center',
          partial: 'h-[72px] items-start',
          full: 'h-[88px] items-start',
        }[copyLayoutMode]
      : {
          'title-only': 'h-[64px] items-center',
          partial: 'h-[80px] items-start',
          full: 'h-[104px] items-start',
        }[copyLayoutMode];

    return buildClassName([
      'storybook-upload-file-base relative box-border flex border-0',
      'rounded-2 bg-neutral-0 font-sans text-left gap-3',
      compact ? 'p-3' : 'p-4',
      widthClass,
      heightClass,
      getStateClassName({ visualState, isDisabled }),
      className,
    ]);
  }

  const heightClass = compact
    ? {
        'title-only': 'h-[100px] min-h-[100px] flex-col items-center justify-center gap-3 p-4',
        partial: 'h-[120px] flex-col items-center justify-start gap-3 p-4',
        full: 'h-[136px] flex-col items-center justify-start gap-3 p-4',
      }[copyLayoutMode]
    : {
        'title-only': 'h-[116px] flex-col items-center justify-center gap-3',
        partial: 'h-[140px] flex-col items-center justify-start gap-3',
        full: 'h-[164px] flex-col items-center justify-start gap-4',
      }[copyLayoutMode];

  return buildClassName([
    'storybook-upload-file-base relative box-border flex border-0',
    'rounded-2 bg-neutral-0 font-sans text-center',
    compact ? '' : 'px-[54px] py-6',
    widthClass,
    heightClass,
    getStateClassName({ visualState, isDisabled }),
    className,
  ]);
}

function resolveCopyVisibility({
  supportingText,
  showDescription,
  showSupportText,
}: {
  supportingText?: boolean;
  showDescription?: boolean;
  showSupportText?: boolean;
}) {
  if (supportingText === false) {
    return {
      showDescription: false,
      showSupportText: false,
    };
  }

  return {
    showDescription: showDescription ?? true,
    showSupportText: showSupportText ?? true,
  };
}

function getCopyTextClassName(isDisabled: boolean, enabledColorClass: string) {
  return isDisabled ? 'text-neutral-400' : enabledColorClass;
}

function getIconClassName(isDisabled: boolean) {
  return buildClassName([
    'shrink-0',
    isDisabled ? 'text-neutral-400' : 'text-brand-400',
  ]);
}

export function UploadFileBase({
  layout = 'horizontal',
  state = 'default',
  compact = false,
  supportingText,
  showDescription,
  showSupportText,
  title = 'Drag and drop or browse files',
  description = 'Upload vertical images or videos for your background.',
  footerText = 'Max image size: 20 MB • Max video size: 200 MB',
  disabled = false,
  className,
  onBrowse,
  onDropFiles,
  onClick,
  ...rest
}: UploadFileBaseProps) {
  const [isDragging, setIsDragging] = useState(false);
  const normalizedLayout = normalizeLayout(layout);
  const normalizedState = normalizeState(state);
  const isDisabled = disabled || normalizedState === 'disabled';
  const visualState = isDragging && !isDisabled ? 'hover' : normalizedState;
  const isTile = isTileLayout(normalizedLayout);
  const copyVisibility = resolveCopyVisibility({
    supportingText,
    showDescription,
    showSupportText,
  });
  const { showDescription: resolvedShowDescription, showSupportText: resolvedShowSupportText } = copyVisibility;
  const copyLayoutMode = getCopyLayoutMode(resolvedShowDescription, resolvedShowSupportText);

  const handleDrop = (event: DragEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setIsDragging(false);

    if (isDisabled) {
      return;
    }

    onDropFiles?.(Array.from(event.dataTransfer.files));
  };

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    onClick?.(event);

    if (isDisabled || event.defaultPrevented) {
      return;
    }

    onBrowse?.();
  };

  return (
    <button
      type="button"
      disabled={isDisabled}
      className={getDropzoneClassName({
        layout: normalizedLayout,
        showDescription: resolvedShowDescription,
        showSupportText: resolvedShowSupportText,
        visualState,
        isDisabled,
        compact,
        className,
      })}
      onClick={handleClick}
      onDragLeave={() => setIsDragging(false)}
      onDragOver={(event) => {
        event.preventDefault();

        if (!isDisabled) {
          setIsDragging(true);
        }
      }}
      onDrop={handleDrop}
      {...rest}
    >
      <UploadFileDashedBorder
        active={!isDisabled && visualState === 'focus'}
        cornerRadius={isTile ? 4 : 8}
      />
      {isTile ? (
        <Plus
          aria-hidden="true"
          className={getIconClassName(isDisabled)}
          size={compact ? 24 : 32}
          weight="regular"
        />
      ) : (
        <>
          <MonitorArrowUp
            aria-hidden="true"
            className={getIconClassName(isDisabled)}
            size={32}
            weight="regular"
          />
          <span className={getTextLayoutClassName({
            layout: normalizedLayout,
            copyLayoutMode,
          })}>
            <Text
              as="span"
              variant="text-md"
              weight="medium"
              className={buildClassName([
                'storybook-upload-file-base__title block whitespace-nowrap',
                getCopyTextClassName(isDisabled, 'text-neutral-900'),
              ])}
            >
              {title}
            </Text>
            {resolvedShowDescription && (
              <Text
                as="span"
                variant="text-sm"
                weight="regular"
                className={buildClassName([
                  'storybook-upload-file-base__description block whitespace-nowrap',
                  getCopyTextClassName(isDisabled, 'text-neutral-600'),
                ])}
              >
                {description}
              </Text>
            )}
            {resolvedShowSupportText && (
              <Text
                as="span"
                variant="text-xs"
                weight="regular"
                className={buildClassName([
                  'storybook-upload-file-base__support block whitespace-nowrap',
                  getCopyTextClassName(isDisabled, 'text-neutral-600'),
                  copyLayoutMode === 'full' && 'mt-1',
                ])}
              >
                {footerText}
              </Text>
            )}
          </span>
        </>
      )}
    </button>
  );
}
