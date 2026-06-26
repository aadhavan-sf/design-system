import { InputFields } from '../TextField/fields/InputFields';
import { TextField } from '../TextField';
import { FILE_REDIRECTION_URL_PLACEHOLDER } from './fileRedirection.constants';
import type { NormalizedFileRedirectionTarget } from './fileRedirection.constants';

export interface FileRedirectionDestinationDropdownProps {
  disabled?: boolean;
  options: readonly string[];
  selectedTarget: NormalizedFileRedirectionTarget;
  selectedValue: string;
  onValueChange: (value: string) => void;
}

export function FileRedirectionDestinationDropdown({
  disabled = false,
  options,
  selectedTarget,
  selectedValue,
  onValueChange,
}: FileRedirectionDestinationDropdownProps) {
  if (selectedTarget === 'url') {
    return (
      <InputFields
        disabled={disabled}
        hasValue={selectedValue.length > 0}
        placeholder={FILE_REDIRECTION_URL_PLACEHOLDER}
        state={disabled ? 'disabled' : 'default'}
        value={selectedValue}
        onChange={onValueChange}
      />
    );
  }

  return (
    <TextField
      fluid
      label={false}
      options={[...options]}
      selectedOptions={selectedValue ? [selectedValue] : []}
      state={disabled ? 'disabled' : 'default'}
      tooltip={false}
      type="dropdown-field"
      onSelectedOptionsChange={(values) => onValueChange(values[0] ?? '')}
    />
  );
}

FileRedirectionDestinationDropdown.displayName = 'File Redirection Destination Dropdown';
