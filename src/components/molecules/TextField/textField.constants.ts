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
] as const;

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
] as const;

export type TextFieldType = typeof FIELD_TYPES[number];
export type PublicTextFieldType = typeof PUBLIC_FIELD_TYPES[number];
export type NormalizedTextFieldType =
  | 'input'
  | 'dropdown'
  | 'color-picker'
  | 'date-picker'
  | 'search'
  | 'paragraph'
  | 'mobile-number'
  | 'multiselect'
  | 'multiselect-2-line';

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
] as const;

export type TextFieldState = typeof FIELD_STATES[number];
export type NormalizedTextFieldState =
  | 'default'
  | 'active'
  | 'filled'
  | 'info'
  | 'error'
  | 'disabled';

export const placeholderByType: Record<NormalizedTextFieldType, string> = {
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

export const filledValueByType: Record<NormalizedTextFieldType, string> = {
  input: 'Name filled',
  dropdown: 'Phoenix Baker',
  'color-picker': '#131313',
  'date-picker': '16/05/2026',
  search: 'Search query',
  paragraph: 'This is the first line of text.\nThis is the second line of text.',
  'mobile-number': '98765 43210',
  multiselect: 'Phoenix Baker',
  'multiselect-2-line': 'Phoenix Baker, Olivia Rhye',
};

export const activeValueByType: Partial<Record<NormalizedTextFieldType, string>> = {
  dropdown: 'Phoenix Baker',
};

export type CountryOption = {
  code: string;
  name: string;
  flag: string;
};

export const countryOptions: CountryOption[] = [
  { code: '+91', name: 'India', flag: '🇮🇳' },
  { code: '+1', name: 'United States', flag: '🇺🇸' },
  { code: '+44', name: 'United Kingdom', flag: '🇬🇧' },
  { code: '+61', name: 'Australia', flag: '🇦🇺' },
  { code: '+971', name: 'United Arab Emirates', flag: '🇦🇪' },
  { code: '+33', name: 'France', flag: '🇫🇷' },
  { code: '+49', name: 'Germany', flag: '🇩🇪' },
  { code: '+55', name: 'Brazil', flag: '🇧🇷' },
  { code: '+591', name: 'Bolivia', flag: '🇧🇴' },
  { code: '+501', name: 'Belize', flag: '🇧🇿' },
  { code: '+375', name: 'Belarus', flag: '🇧🇾' },
  { code: '+1441', name: 'Bermuda', flag: '🇧🇲' },
];

export function normalizeType(type: TextFieldType | string): NormalizedTextFieldType {
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

  return (typeAliases[type as keyof typeof typeAliases] ?? type) as NormalizedTextFieldType;
}

export function normalizeState(state: TextFieldState | string): NormalizedTextFieldState {
  return state === 'disable'
    ? 'disabled'
    : state as NormalizedTextFieldState;
}

export function buildClassName(parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(' ');
}
