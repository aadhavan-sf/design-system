import { DropdownField, type DropdownFieldProps } from './DropdownField';

export function MultiselectTwoLine(props: Omit<DropdownFieldProps, 'multiple' | 'multiselectLayout'>) {
  return (
    <DropdownField
      {...props}
      multiple
      multiselectLayout="two-line"
    />
  );
}
