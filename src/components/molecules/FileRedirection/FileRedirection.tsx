import { useEffect, useRef, type ChangeEvent, useState } from 'react';
import { DotsSixVertical } from '@phosphor-icons/react';

import { Toggle } from '../../atoms/Toggle';
import { Text } from '../../foundations/Typography';
import { UploadFileBase, type UploadFileBaseState } from '../UploadFile/UploadFileBase';
import { FILE_REDIRECTION_WIDTH_CLASS } from '../UploadFile/uploadFile.constants';
import { FileRedirectionDestinationDropdown } from './FileRedirectionDestinationDropdown';
import { FileRedirectionTargetChips } from './FileRedirectionTargetChips';
import { FileRedirectionUploadedPreview } from './FileRedirectionUploadedPreview';
import {
  FILE_REDIRECTION_DEFAULT_REDIRECT_LABEL,
  FILE_REDIRECTION_DEFAULT_TARGET,
  FILE_REDIRECTION_DEFAULT_TARGET_VALUE,
  FILE_REDIRECTION_DEFAULT_TITLE,
  type FileRedirectionActionOption,
  type FileRedirectionTargetOption,
  type FileRedirectionTypeOption,
  type NormalizedFileRedirectionTarget,
} from './fileRedirection.constants';
import {
  getDefaultFileRedirectionTargetValue,
  getFileRedirectionTargetOptions,
  getFileRedirectionUploadedPreviewConfig,
  getUploadFileDropzoneStateForAction,
  isFileRedirectionUploadedAction,
  resolveFileRedirectionAction,
  resolveFileRedirectionTarget,
  resolveFileRedirectionType,
  type NormalizedFileRedirectionAction,
} from './fileRedirectionStory.utils';

export type FileRedirectionType = FileRedirectionTypeOption | 'with-redirection' | 'without-redirection';

export type FileRedirectionAction =
  | FileRedirectionActionOption
  | 'upload-file'
  | 'file-uploaded'
  | 'file-hover-effect';

export interface FileRedirectionProps {
  type?: FileRedirectionType;
  redirection?: boolean;
  action?: FileRedirectionAction;
  showDragIcon?: boolean;
  redirectLabel?: string;
  redirectTarget?: FileRedirectionTargetOption;
  redirectValue?: string;
  uploadTitle?: string;
  disabled?: boolean;
  className?: string;
  onBrowse?: () => void;
  onFilesChange?: (files: File[]) => void;
  onRedirectionChange?: (pressed: boolean) => void;
  onRedirectTargetChange?: (target: FileRedirectionTargetOption) => void;
  onRedirectValueChange?: (value: string) => void;
}

function buildClassName(parts: Array<string | false | null | undefined>) {
  return parts.flat().filter(Boolean).join(' ');
}

function renderUploadContent({
  action,
  uploadTitle,
  dropzoneState,
  disabled,
  onBrowse,
  onDropFiles,
}: {
  action: NormalizedFileRedirectionAction;
  uploadTitle: string;
  dropzoneState: UploadFileBaseState;
  disabled?: boolean;
  onBrowse?: () => void;
  onDropFiles?: (files: File[]) => void;
}) {
  if (isFileRedirectionUploadedAction(action)) {
    return (
      <FileRedirectionUploadedPreview
        disabled={disabled}
        onReplace={onBrowse}
        {...getFileRedirectionUploadedPreviewConfig(action)}
      />
    );
  }

  return (
    <UploadFileBase
      className="w-full"
      compact
      disabled={disabled}
      layout="vertical"
      showDescription={false}
      showSupportText={false}
      state={dropzoneState}
      title={uploadTitle}
      onBrowse={onBrowse}
      onDropFiles={onDropFiles}
    />
  );
}

export function FileRedirection({
  type = 'With Redirection',
  redirection = false,
  action = 'Upload File',
  showDragIcon = true,
  redirectLabel = FILE_REDIRECTION_DEFAULT_REDIRECT_LABEL,
  redirectTarget = FILE_REDIRECTION_DEFAULT_TARGET,
  redirectValue = FILE_REDIRECTION_DEFAULT_TARGET_VALUE,
  uploadTitle = FILE_REDIRECTION_DEFAULT_TITLE,
  disabled = false,
  className,
  onBrowse,
  onFilesChange,
  onRedirectionChange,
  onRedirectTargetChange,
  onRedirectValueChange,
}: FileRedirectionProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isRedirectionOn, setIsRedirectionOn] = useState(redirection);
  const [selectedTarget, setSelectedTarget] = useState<NormalizedFileRedirectionTarget>(() =>
    resolveFileRedirectionTarget(redirectTarget),
  );
  const [selectedValue, setSelectedValue] = useState(redirectValue);
  const normalizedType = resolveFileRedirectionType(type);
  const normalizedAction = resolveFileRedirectionAction(action);
  const showRedirectionRow = normalizedType === 'with-redirection';
  const dropzoneState = getUploadFileDropzoneStateForAction(normalizedAction);
  const redirectTargetOptions = getFileRedirectionTargetOptions(selectedTarget);

  useEffect(() => {
    setIsRedirectionOn(redirection);
  }, [redirection]);

  useEffect(() => {
    setSelectedTarget(resolveFileRedirectionTarget(redirectTarget));
  }, [redirectTarget]);

  useEffect(() => {
    setSelectedValue(redirectValue);
  }, [redirectValue]);

  const handleRedirectionChange = (nextRedirection: boolean) => {
    setIsRedirectionOn(nextRedirection);
    onRedirectionChange?.(nextRedirection);
  };

  const handleRedirectTargetChange = (target: FileRedirectionTargetOption) => {
    const normalizedTarget = resolveFileRedirectionTarget(target);
    const nextValue = getDefaultFileRedirectionTargetValue(normalizedTarget);

    setSelectedTarget(normalizedTarget);
    setSelectedValue(nextValue);
    onRedirectTargetChange?.(target);
    onRedirectValueChange?.(nextValue);
  };

  const handleRedirectValueChange = (values: string[]) => {
    const nextValue = values[0] ?? '';

    setSelectedValue(nextValue);
    onRedirectValueChange?.(nextValue);
  };

  const handleBrowse = () => {
    onBrowse?.();

    if (!disabled) {
      inputRef.current?.click();
    }
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    onFilesChange?.(Array.from(event.target.files ?? []));
    event.target.value = '';
  };

  return (
    <div
      className={buildClassName([
        'storybook-file-redirection relative box-border rounded-2 bg-neutral-25 p-3',
        FILE_REDIRECTION_WIDTH_CLASS,
        className,
      ])}
    >
      <input
        ref={inputRef}
        className="sr-only"
        disabled={disabled}
        type="file"
        onChange={handleInputChange}
      />

      <div className={buildClassName(['flex items-start', showDragIcon && 'gap-1'])}>
        {showDragIcon && (
          <button
            type="button"
            aria-label="Reorder file redirection"
            className="mt-1 inline-flex h-6 w-6 shrink-0 cursor-grab items-center justify-center border-0 bg-transparent p-0 text-neutral-400 appearance-none"
          >
            <DotsSixVertical aria-hidden="true" size={24} weight="bold" />
          </button>
        )}

        <div className="flex min-w-0 flex-1 flex-col gap-4">
          {renderUploadContent({
            action: normalizedAction,
            uploadTitle,
            dropzoneState,
            disabled,
            onBrowse: handleBrowse,
            onDropFiles: onFilesChange,
          })}

          {showRedirectionRow && (
            <>
              <div aria-hidden="true" className="h-px w-full bg-neutral-200" />
              <div className="flex flex-col gap-3">
                <div className="flex w-full items-center justify-between gap-2">
                  <Text as="span" variant="text-sm" weight="medium" className="text-neutral-900">
                    {redirectLabel}
                  </Text>
                  <Toggle
                    aria-label={redirectLabel}
                    pressed={isRedirectionOn}
                    size="sm"
                    onPressedChange={handleRedirectionChange}
                  />
                </div>

                {isRedirectionOn && (
                  <FileRedirectionTargetChips
                    disabled={disabled}
                    selectedTarget={selectedTarget}
                    onTargetChange={handleRedirectTargetChange}
                  />
                )}
              </div>

              {isRedirectionOn && (
                <FileRedirectionDestinationDropdown
                  disabled={disabled}
                  options={redirectTargetOptions}
                  selectedTarget={selectedTarget}
                  selectedValue={selectedValue}
                  onValueChange={(nextValue) => handleRedirectValueChange([nextValue])}
                />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

FileRedirection.displayName = 'File Redirection';
