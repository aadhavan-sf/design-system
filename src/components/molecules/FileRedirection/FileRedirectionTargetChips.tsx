import { Chip } from '../Chip';
import {
  FILE_REDIRECTION_TARGET_OPTIONS,
  type FileRedirectionTargetOption,
  type NormalizedFileRedirectionTarget,
} from './fileRedirection.constants';
import { resolveFileRedirectionTarget } from './fileRedirectionStory.utils';

import './fileRedirectionTargetChips.css';

export interface FileRedirectionTargetChipsProps {
  disabled?: boolean;
  selectedTarget: NormalizedFileRedirectionTarget;
  onTargetChange: (target: FileRedirectionTargetOption) => void;
}

export function FileRedirectionTargetChips({
  disabled = false,
  selectedTarget,
  onTargetChange,
}: FileRedirectionTargetChipsProps) {
  return (
    <div className="storybook-file-redirection-target-chips flex w-full flex-wrap gap-2">
      {FILE_REDIRECTION_TARGET_OPTIONS.map((targetOption) => (
        <Chip
          key={targetOption}
          active={resolveFileRedirectionTarget(targetOption) === selectedTarget}
          disabled={disabled}
          label={targetOption}
          shape="pill"
          size="md"
          state={disabled ? 'disabled' : 'default'}
          type="button"
          onClick={() => onTargetChange(targetOption)}
        />
      ))}
    </div>
  );
}

FileRedirectionTargetChips.displayName = 'File Redirection Target Chips';
