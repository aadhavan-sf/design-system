import { useId } from 'react';
import type { Icon } from '@phosphor-icons/react';
import {
  ArrowCounterClockwise,
  FileX,
  Repeat,
  Trash,
  Warning,
  WarningCircle,
  WifiSlash,
} from '@phosphor-icons/react';

import { Text } from '../../foundations/Typography';
import { Button } from '../Button';
import { ProgressBar } from '../ProgressBar';
import { UploadFileDashedBorder } from './UploadFileDashedBorder';
import {
  UPLOAD_FILE_DEFAULT_PREVIEW_IMAGE,
  UPLOAD_FILE_INTERNET_ISSUE_ERROR,
  UPLOAD_FILE_LARGE_FILE_ERROR,
  UPLOAD_FILE_REQUEST_FAILED_ERROR,
  UPLOAD_FILE_UNSUPPORTED_FILE_ERROR,
  UPLOAD_FILE_WIDTH_CLASS,
} from './uploadFile.constants';

import './uploadFileDashedBorder.css';

export type UploadFileItemState =
  | 'uploading-media'
  | 'upload-successful'
  | 'large-file'
  | 'unsupported-file'
  | 'internet-issue'
  | 'request-failed'
  | 'Uploading Media'
  | 'Uploading'
  | 'Upload Successful'
  | 'Large File'
  | 'Unsupported File'
  | 'Internet Issue'
  | 'Request Failed';

export interface UploadFileItemProps {
  state?: UploadFileItemState;
  showFileSize?: boolean;
  progress?: number;
  fileName?: string;
  fileSize?: string;
  errorTitle?: string;
  errorDescription?: string;
  retryLabel?: string;
  replaceLabel?: string;
  deleteLabel?: string;
  imageUrl?: string;
  className?: string;
  onReplace?: () => void;
  onDelete?: () => void;
  onRetry?: () => void;
}

type NormalizedItemState =
  | 'uploading-media'
  | 'upload-successful'
  | 'large-file'
  | 'unsupported-file'
  | 'internet-issue'
  | 'request-failed';

type UploadErrorState = Exclude<NormalizedItemState, 'uploading-media' | 'upload-successful'>;

interface UploadErrorContent {
  icon: Icon;
  title: string;
  description: string;
}

const ITEM_STATE_ALIASES: Record<string, NormalizedItemState> = {
  'uploading-media': 'uploading-media',
  uploading: 'uploading-media',
  'upload-successful': 'upload-successful',
  'large-file': 'large-file',
  'unsupported-file': 'unsupported-file',
  'internet-issue': 'internet-issue',
  'request-failed': 'request-failed',
  'Uploading Media': 'uploading-media',
  Uploading: 'uploading-media',
  'Upload Successful': 'upload-successful',
  'Large File': 'large-file',
  'Unsupported File': 'unsupported-file',
  'Internet Issue': 'internet-issue',
  'Request Failed': 'request-failed',
};

const UPLOAD_FILE_ERROR_CONTENT: Record<UploadErrorState, UploadErrorContent> = {
  'large-file': {
    icon: FileX,
    title: UPLOAD_FILE_LARGE_FILE_ERROR.title,
    description: UPLOAD_FILE_LARGE_FILE_ERROR.description,
  },
  'unsupported-file': {
    icon: Warning,
    title: UPLOAD_FILE_UNSUPPORTED_FILE_ERROR.title,
    description: UPLOAD_FILE_UNSUPPORTED_FILE_ERROR.description,
  },
  'internet-issue': {
    icon: WifiSlash,
    title: UPLOAD_FILE_INTERNET_ISSUE_ERROR.title,
    description: UPLOAD_FILE_INTERNET_ISSUE_ERROR.description,
  },
  'request-failed': {
    icon: WarningCircle,
    title: UPLOAD_FILE_REQUEST_FAILED_ERROR.title,
    description: UPLOAD_FILE_REQUEST_FAILED_ERROR.description,
  },
};

function buildClassName(parts: Array<string | false | null | undefined>) {
  return parts.flat().filter(Boolean).join(' ');
}

function normalizeItemState(state: UploadFileItemState | undefined): NormalizedItemState {
  return ITEM_STATE_ALIASES[state ?? 'upload-successful'] ?? 'upload-successful';
}

function isUploadErrorState(state: NormalizedItemState): state is UploadErrorState {
  return state in UPLOAD_FILE_ERROR_CONTENT;
}

function UploadProgressItem({
  progress = 75,
  className,
}: {
  progress?: number;
  className?: string;
}) {
  const clampedProgress = Math.min(100, Math.max(0, progress));
  const progressLabelId = useId();

  return (
    <div
      className={buildClassName([
        'storybook-upload-item storybook-upload-item--uploading-media relative box-border flex flex-col gap-4 rounded-2 bg-neutral-25 p-4',
        UPLOAD_FILE_WIDTH_CLASS,
        className,
      ])}
      role="status"
      aria-live="polite"
    >
      <UploadFileDashedBorder />
      <Text
        as="span"
        id={progressLabelId}
        variant="text-sm"
        weight="medium"
        className="text-neutral-600"
      >
        Uploading media...
      </Text>
      <ProgressBar aria-labelledby={progressLabelId} value={clampedProgress} />
    </div>
  );
}

function UploadErrorItem({
  icon: ErrorIcon,
  errorTitle,
  errorDescription,
  retryLabel = 'Retry',
  className,
  onRetry,
}: {
  icon: Icon;
  errorTitle: string;
  errorDescription: string;
  retryLabel?: string;
  className?: string;
  onRetry?: () => void;
}) {
  return (
    <div
      className={buildClassName([
        'storybook-upload-item storybook-upload-item--error relative box-border flex items-start gap-4 rounded-2 bg-neutral-0 p-4',
        UPLOAD_FILE_WIDTH_CLASS,
        className,
      ])}
      role="alert"
    >
      <UploadFileDashedBorder />
      <ErrorIcon aria-hidden="true" className="shrink-0 text-error-600" size={40} weight="regular" />
      <div className="flex min-w-0 flex-1 flex-col gap-2">
        <div className="flex flex-col gap-1">
          <Text as="span" variant="text-md" weight="medium" className="text-neutral-900">
            {errorTitle}
          </Text>
          <Text as="span" variant="text-sm" weight="regular" className="text-neutral-600">
            {errorDescription}
          </Text>
        </div>
        <Button
          className="self-start"
          hierarchy="secondary"
          icon="left"
          label={retryLabel}
          leadingIcon={<ArrowCounterClockwise aria-hidden="true" size={20} weight="regular" />}
          size="small"
          onClick={onRetry}
        />
      </div>
    </div>
  );
}

function UploadSuccessItem({
  fileName = 'File_name.ext',
  fileSize = '200 KB',
  showFileSize = true,
  replaceLabel = 'Replace',
  deleteLabel = 'Delete',
  imageUrl,
  className,
  onReplace,
  onDelete,
}: {
  fileName?: string;
  fileSize?: string;
  showFileSize?: boolean;
  replaceLabel?: string;
  deleteLabel?: string;
  imageUrl?: string;
  className?: string;
  onReplace?: () => void;
  onDelete?: () => void;
}) {
  return (
    <div
      className={buildClassName([
        'storybook-upload-item storybook-upload-item--upload-successful box-border flex items-start gap-4 rounded-2 border border-solid border-neutral-200 bg-neutral-25 p-4',
        UPLOAD_FILE_WIDTH_CLASS,
        className,
      ])}
    >
      <img
        alt=""
        aria-hidden="true"
        className="size-[92px] shrink-0 overflow-hidden rounded-8 border border-solid border-neutral-200 box-border object-cover object-center"
        src={imageUrl ?? UPLOAD_FILE_DEFAULT_PREVIEW_IMAGE}
      />
      <div className="flex min-w-0 flex-1 flex-col gap-2">
        <div className="flex flex-col gap-1">
          <Text
            as="span"
            variant="text-md"
            weight="medium"
            className="max-w-full overflow-hidden text-ellipsis whitespace-nowrap text-neutral-900"
          >
            {fileName}
          </Text>
          <Text
            as="span"
            variant="text-sm"
            weight="regular"
            aria-hidden={!showFileSize || undefined}
            className={buildClassName([
              'text-neutral-600',
              !showFileSize && 'invisible',
            ])}
          >
            {fileSize}
          </Text>
        </div>
        <div className="flex items-center justify-between gap-3">
          <Button
            hierarchy="secondary"
            icon="left"
            label={replaceLabel}
            leadingIcon={<Repeat aria-hidden="true" size={20} weight="regular" />}
            size="small"
            onClick={onReplace}
          />
          <Button
            destructive
            hierarchy="link-color"
            icon="left"
            label={deleteLabel}
            leadingIcon={<Trash aria-hidden="true" size={20} weight="regular" />}
            size="small"
            onClick={onDelete}
          />
        </div>
      </div>
    </div>
  );
}

export function UploadFileItem({
  state = 'upload-successful',
  showFileSize = true,
  progress = 75,
  fileName = 'File_name.ext',
  fileSize = '200 KB',
  errorTitle,
  errorDescription,
  retryLabel = 'Retry',
  replaceLabel = 'Replace',
  deleteLabel = 'Delete',
  imageUrl = UPLOAD_FILE_DEFAULT_PREVIEW_IMAGE,
  className,
  onReplace,
  onDelete,
  onRetry,
}: UploadFileItemProps) {
  const normalizedState = normalizeItemState(state);

  if (normalizedState === 'uploading-media') {
    return <UploadProgressItem className={className} progress={progress} />;
  }

  if (isUploadErrorState(normalizedState)) {
    const content = UPLOAD_FILE_ERROR_CONTENT[normalizedState];

    return (
      <UploadErrorItem
        className={className}
        errorDescription={errorDescription ?? content.description}
        errorTitle={errorTitle ?? content.title}
        icon={content.icon}
        retryLabel={retryLabel}
        onRetry={onRetry}
      />
    );
  }

  return (
    <UploadSuccessItem
      className={className}
      deleteLabel={deleteLabel}
      fileName={fileName}
      fileSize={fileSize}
      imageUrl={imageUrl}
      replaceLabel={replaceLabel}
      showFileSize={showFileSize}
      onDelete={onDelete}
      onReplace={onReplace}
    />
  );
}
