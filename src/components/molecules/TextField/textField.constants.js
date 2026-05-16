export const FIELD_TYPES = [
  'input-fields',
  'dropdown-field',
  'color-dropdown',
  'datepicker-field',
  'search-fields',
  'mobile-number-field',
  'text-area',
  'multiselect-field-one-line',
  'multiselect-field-two-line',
  'input',
  'dropdown',
  'color-picker',
  'colour-dropdown',
  'date-picker',
  'search',
  'paragraph',
  'mobile-number',
  'multiselect',
  'multiselect-2-line',
];

export const PUBLIC_FIELD_TYPES = [
  'input-fields',
  'dropdown-field',
  'color-dropdown',
  'datepicker-field',
  'search-fields',
  'mobile-number-field',
  'text-area',
  'multiselect-field-one-line',
  'multiselect-field-two-line',
];

export const fieldTypeLabels = {
  'input-fields': 'Input fields',
  'dropdown-field': 'Dropdown field',
  'color-dropdown': 'Color Dropdown',
  'datepicker-field': 'Datepicker field',
  'search-fields': 'Search fields',
  'mobile-number-field': 'Mobile number field',
  'text-area': 'Text area',
  'multiselect-field-one-line': 'Multiselect field - one line',
  'multiselect-field-two-line': 'Multiselect field - Two line',
};

export const FIELD_STATES = [
  'default',
  'active',
  'filled',
  'info',
  'error',
  'disabled',
  'disable',
];

export const placeholderByType = {
  input: 'Placeholder text',
  dropdown: 'Click to select',
  'color-picker': 'Click to select',
  'date-picker': 'DD/MM/YYYY',
  search: 'Search',
  paragraph: 'Placeholder text',
  'mobile-number': 'Enter mobile number',
  multiselect: 'Select one or more',
  'multiselect-2-line': 'Select one or more',
};

export const filledValueByType = {
  input: 'Name filled',
  dropdown: 'Phoenix Baker',
  'color-picker': '#131313',
  'date-picker': '16/05/2026',
  search: 'Search query',
  paragraph: 'Name filled',
  'mobile-number': '98765 43210',
  multiselect: 'Phoenix Baker',
  'multiselect-2-line': 'Phoenix Baker, Olivia Rhye',
};

export const activeValueByType = {
  dropdown: 'Phoenix Baker',
};

export const countryOptions = [
  '+91',
  '+1',
  '+44',
  '+61',
];

export function normalizeType(type) {
  const typeAliases = {
    'input-fields': 'input',
    'dropdown-field': 'dropdown',
    'color-dropdown': 'color-picker',
    'colour-dropdown': 'color-picker',
    'datepicker-field': 'date-picker',
    'search-fields': 'search',
    'mobile-number-field': 'mobile-number',
    'text-area': 'paragraph',
    'multiselect-field-one-line': 'multiselect',
    'multiselect-field-two-line': 'multiselect-2-line',
  };

  return typeAliases[type] ?? type;
}

export function normalizeState(state) {
  return state === 'disable'
    ? 'disabled'
    : state;
}

export function buildClassName(parts) {
  return parts.filter(Boolean).join(' ');
}
