import PropTypes from 'prop-types';

import { DropdownField } from './DropdownField';

export function MultiselectTwoLine(props) {
  return (
    <DropdownField
      {...props}
      multiple
    />
  );
}

MultiselectTwoLine.propTypes = {
  disabled: PropTypes.bool.isRequired,
  displayValue: PropTypes.string.isRequired,
  hasValue: PropTypes.bool.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onOpenChange: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired,
  dropdownListItems: PropTypes.array,
  dropdownListVariant: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  selectedOptions: PropTypes.arrayOf(PropTypes.string).isRequired,
  state: PropTypes.string.isRequired,
  withIcon: PropTypes.bool.isRequired,
};
