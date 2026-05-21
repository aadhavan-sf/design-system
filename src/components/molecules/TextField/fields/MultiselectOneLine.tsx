import { DropdownField, type DropdownFieldProps } from './DropdownField';

export function MultiselectOneLine(props: Omit<DropdownFieldProps, 'multiple' | 'multiselectLayout'>) {
  return (
    <DropdownField
      {...props}
      multiple
      multiselectLayout="one-line"
    />
  );
}
