import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import { TextFieldShell } from './TextFieldShell';
import { ColorDropdown } from './fields/ColorDropdown';
import { DatepickerField } from './fields/DatepickerField';
import { DropdownField } from './fields/DropdownField';
import { InputFields } from './fields/InputFields';
import { MobileNumberField } from './fields/MobileNumberField';
import { MultiselectOneLine } from './fields/MultiselectOneLine';
import { MultiselectTwoLine } from './fields/MultiselectTwoLine';
import { SearchFields } from './fields/SearchFields';
import { TextArea } from './fields/TextArea';
import {
  type NormalizedTextFieldState,
  type NormalizedTextFieldType,
  type TextFieldState,
  type TextFieldType,
  activeValueByType,
  filledValueByType,
  normalizeState,
  normalizeType,
  placeholderByType,
} from './textField.constants';
import type { DatepickerFieldProps } from './fields/DatepickerField';
import type { DropdownListVariant } from '../DropdownList/DropdownList';
import type { TextFieldDropdownItem } from './fields/DropdownField';

import './textfield.css';

const EMPTY_OPTIONS: string[] = [];

export interface TextFieldProps {
  type?: TextFieldType | string;
  state?: TextFieldState | string;
  defaultSelectedOptions?: string[];
  label?: boolean;
  tooltip?: boolean;
  tooltipClassName?: string;
  tooltipOpen?: boolean;
  tooltipTitle?: string;
  tooltipDescription?: string;
  tooltipSupportingText?: boolean;
  tooltipPlacement?: string;
  astriks?: boolean;
  required?: boolean;
  labelText?: string;
  placeholder?: string;
  helperText?: string;
  errorText?: string;
  datePickerProps?: DatepickerFieldProps['datePickerProps'];
  datePickerType?: string;
  dropdownListItems?: TextFieldDropdownItem[];
  dropdownListVariant?: DropdownListVariant;
  fluid?: boolean;
  onSelectedOptionsChange?: (selectedOptions: string[]) => void;
  options?: string[];
  selectedOptions?: string[];
  withIcon?: boolean;
}

function formatCurrentDateValue(date = new Date()) {
  return [
    String(date.getDate()).padStart(2, '0'),
    String(date.getMonth() + 1).padStart(2, '0'),
    String(date.getFullYear()),
  ].join('/');
}

function getFilledValue(type: NormalizedTextFieldType) {
  return type === 'date-picker'
    ? formatCurrentDateValue()
    : filledValueByType[type] ?? '';
}

function getInitialTextValue(type: NormalizedTextFieldType, state: NormalizedTextFieldState) {
  return state === 'filled'
    ? getFilledValue(type)
    : '';
}

function getInitialSelections(
  type: NormalizedTextFieldType,
  state: NormalizedTextFieldState,
  options: string[]
) {
  const shouldPreselectMultiselect =
    ['filled', 'error', 'disabled'].includes(state) &&
    type === 'multiselect';
  const shouldPreselectTwoLine =
    ['filled', 'error', 'disabled'].includes(state) &&
    type === 'multiselect-2-line';

  if (state !== 'filled' && !shouldPreselectMultiselect && !shouldPreselectTwoLine) {
    return [];
  }

  if (type === 'multiselect-2-line') {
    return options.slice(0, 2);
  }

  if (type === 'multiselect') {
    return options.length > 0 ? [options[0]] : [];
  }

  if (type === 'dropdown') {
    return [filledValueByType.dropdown];
  }

  return [];
}

function getDropdownItemValue(item: TextFieldDropdownItem) {
  return typeof item === 'string'
    ? item
    : item.value ?? item.label;
}

function getDropdownItemLabel(item: TextFieldDropdownItem) {
  return typeof item === 'string'
    ? item
    : item.label;
}

function getSelectedDropdownDisplayValue(
  selectedValues: string[],
  items: TextFieldDropdownItem[]
) {
  return selectedValues
    .map((selectedValue) => {
      const matchingItem = items.find((item) =>
        getDropdownItemValue(item) === selectedValue
      );

      return matchingItem
        ? getDropdownItemLabel(matchingItem)
        : selectedValue;
    })
    .join(', ');
}

function formatColorWithOpacity(color: string, opacity: number) {
  const alphaHex = Math.round((opacity / 100) * 255)
    .toString(16)
    .padStart(2, '0')
    .toUpperCase();

  return opacity === 100
    ? color.toUpperCase()
    : `${color.toUpperCase()}${alphaHex}`;
}

function formatColorDisplayValue(colorValue: string) {
  const normalizedColor = colorValue.toUpperCase();
  const colorNames: Record<string, string> = {
    '#131313': 'Black',
  };

  return colorNames[normalizedColor]
    ? `${colorNames[normalizedColor]} (${normalizedColor})`
    : normalizedColor;
}

export function TextField({
  type = 'input',
  state = 'default',
  defaultSelectedOptions,
  label = true,
  tooltip = true,
  tooltipClassName,
  tooltipOpen = false,
  tooltipTitle = 'This is a tooltip',
  tooltipDescription = 'Tooltips are used to describe or identify an element.',
  tooltipSupportingText = false,
  tooltipPlacement = 'Top arrow',
  astriks = true,
  required,
  labelText = 'Label',
  placeholder,
  helperText = 'Info text comes here',
  errorText = 'Error text comes here',
  datePickerProps,
  datePickerType = 'single-date',
  dropdownListItems,
  dropdownListVariant,
  fluid = false,
  onSelectedOptionsChange,
  options = EMPTY_OPTIONS,
  selectedOptions: controlledSelectedOptions,
  withIcon = false,
}: TextFieldProps) {
  const normalizedType = normalizeType(type);
  const normalizedState = normalizeState(state);
  const isDisabled = normalizedState === 'disabled';
  const isError = normalizedState === 'error';
  const isInfo = normalizedState === 'info';
  const isRequired = required ?? astriks;
  const resolvedPlaceholder =
    placeholder ?? placeholderByType[normalizedType];
  const resolvedDropdownItems = dropdownListItems ?? options;

  const [inputValue, setInputValue] = useState(() =>
    getInitialTextValue(normalizedType, normalizedState)
  );
  const [internalSelectedOptions, setInternalSelectedOptions] = useState(() =>
    defaultSelectedOptions ??
    getInitialSelections(normalizedType, normalizedState, options)
  );
  const isSelectedOptionsControlled = Array.isArray(controlledSelectedOptions);
  const selectedOptions = isSelectedOptionsControlled
    ? controlledSelectedOptions
    : internalSelectedOptions;
  const [countryCode, setCountryCode] = useState('+91');
  const [openMenu, setOpenMenu] = useState(
    normalizedState === 'active' && normalizedType === 'color-picker'
      ? normalizedType
      : ''
  );
  const [color, setColor] = useState('#131313');
  const [opacity, setOpacity] = useState(100);
  const [hasPickedColor, setHasPickedColor] = useState(
    normalizedState === 'filled'
  );
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: globalThis.MouseEvent) => {
      if (
        rootRef.current &&
        event.target instanceof Node &&
        !rootRef.current.contains(event.target)
      ) {
        setOpenMenu('');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const colorValue = formatColorWithOpacity(color, opacity);
  const colorDisplayValue = formatColorDisplayValue(colorValue);
  const hasInputValue = inputValue.length > 0;
  const hasSelectedOptions = selectedOptions.length > 0;
  const hasColorValue =
    hasPickedColor ||
    ['filled', 'error', 'disabled'].includes(normalizedState);

  const hasValueByType = {
    input: hasInputValue,
    search: hasInputValue,
    paragraph: hasInputValue,
    'date-picker': hasInputValue,
    'mobile-number': hasInputValue,
    dropdown: hasSelectedOptions,
    multiselect: hasSelectedOptions,
    'multiselect-2-line': hasSelectedOptions,
    'color-picker': hasColorValue,
  };

  const hasStateDisplayValue =
    normalizedType === 'dropdown' &&
    (normalizedState === 'active' || normalizedState === 'filled');

  const hasValue =
    Boolean(hasValueByType[normalizedType]) ||
    normalizedState === 'filled' ||
    hasStateDisplayValue;

  const visualState = normalizedState;

  const selectedDisplayValue = useMemo(() => {
    if (selectedOptions.length > 0) {
      if (normalizedType === 'dropdown') {
        return getSelectedDropdownDisplayValue(
          selectedOptions,
          resolvedDropdownItems
        );
      }

      return selectedOptions.join(', ');
    }

    if (normalizedState === 'active') {
      return activeValueByType[normalizedType] ?? resolvedPlaceholder;
    }

    if (normalizedState === 'filled') {
      return getFilledValue(normalizedType) || resolvedPlaceholder;
    }

    return resolvedPlaceholder;
  }, [
    normalizedState,
    normalizedType,
    resolvedPlaceholder,
    resolvedDropdownItems,
    selectedOptions,
  ]);

  const handleOpenChange = (key: string, isOpen: boolean) => {
    setOpenMenu(isOpen ? key : '');
  };

  const updateSelectedOptions = (nextSelectedOptions: string[]) => {
    if (!isSelectedOptionsControlled) {
      setInternalSelectedOptions(nextSelectedOptions);
    }

    onSelectedOptionsChange?.(nextSelectedOptions);
  };

  const handleSingleSelect = (option: string) => {
    updateSelectedOptions([option]);
    setOpenMenu('');
  };

  const handleMultiSelect = (option: string) => {
    const nextSelectedOptions = selectedOptions.includes(option)
      ? selectedOptions.filter((item) => item !== option)
      : [...selectedOptions, option];

    updateSelectedOptions(nextSelectedOptions);
  };

  const handleColorChange = (nextColor: string) => {
    setColor(nextColor);
    setHasPickedColor(true);
  };

  const renderField = () => {
    if (normalizedType === 'dropdown') {
      return (
        <DropdownField
          disabled={isDisabled}
          displayValue={selectedDisplayValue}
          hasValue={hasValue}
          isOpen={openMenu === 'dropdown'}
          onOpenChange={(nextOpen) => handleOpenChange('dropdown', nextOpen)}
          onSelect={handleSingleSelect}
          options={options}
          dropdownListItems={resolvedDropdownItems}
          dropdownListVariant={dropdownListVariant}
          selectedOptions={selectedOptions}
          state={visualState}
          withIcon={withIcon}
        />
      );
    }

    if (normalizedType === 'multiselect') {
      return (
        <MultiselectOneLine
          disabled={isDisabled}
          displayValue={selectedDisplayValue}
          hasValue={hasValue}
          isOpen={openMenu === normalizedType}
          onOpenChange={(nextOpen) => handleOpenChange(normalizedType, nextOpen)}
          onSelect={handleMultiSelect}
          options={options}
          dropdownListItems={resolvedDropdownItems}
          dropdownListVariant={dropdownListVariant}
          selectedOptions={selectedOptions}
          state={visualState}
          withIcon={withIcon}
        />
      );
    }

    if (normalizedType === 'multiselect-2-line') {
      return (
        <MultiselectTwoLine
          disabled={isDisabled}
          displayValue={selectedDisplayValue}
          hasValue={hasValue}
          isOpen={openMenu === normalizedType}
          onOpenChange={(nextOpen) => handleOpenChange(normalizedType, nextOpen)}
          onSelect={handleMultiSelect}
          options={options}
          dropdownListItems={resolvedDropdownItems}
          dropdownListVariant={dropdownListVariant}
          selectedOptions={selectedOptions}
          state={visualState}
          withIcon={withIcon}
        />
      );
    }

    if (normalizedType === 'color-picker') {
      return (
        <ColorDropdown
          color={color}
          disabled={isDisabled}
          displayValue={colorValue}
          fieldDisplayValue={colorDisplayValue}
          hasValue={hasValue}
          isOpen={openMenu === 'color-picker'}
          onColorChange={handleColorChange}
          onOpenChange={(nextOpen) => handleOpenChange('color-picker', nextOpen)}
          onOpacityChange={(nextOpacity) => {
            setOpacity(nextOpacity);
            setHasPickedColor(true);
          }}
          opacity={opacity}
          placeholder={resolvedPlaceholder}
          state={visualState}
        />
      );
    }

    if (normalizedType === 'date-picker') {
      return (
        <DatepickerField
          datePickerProps={datePickerProps}
          datePickerType={datePickerType}
          disabled={isDisabled}
          hasValue={hasValue}
          isOpen={openMenu === 'date-picker'}
          onChange={setInputValue}
          onOpenChange={(nextOpen) => handleOpenChange('date-picker', nextOpen)}
          placeholder={resolvedPlaceholder}
          state={visualState}
          value={inputValue}
        />
      );
    }

    if (normalizedType === 'search') {
      return (
        <SearchFields
          disabled={isDisabled}
          hasValue={hasInputValue}
          onChange={setInputValue}
          placeholder={resolvedPlaceholder}
          state={visualState}
          value={inputValue}
        />
      );
    }

    if (normalizedType === 'paragraph') {
      return (
        <TextArea
          disabled={isDisabled}
          hasValue={hasValue}
          onChange={setInputValue}
          placeholder={resolvedPlaceholder}
          state={visualState}
          value={inputValue}
        />
      );
    }

    if (normalizedType === 'mobile-number') {
      return (
        <MobileNumberField
          countryCode={countryCode}
          disabled={isDisabled}
          hasValue={hasValue}
          isCountryOpen={openMenu === 'country-code'}
          onChange={setInputValue}
          onCountryChange={setCountryCode}
          onCountryOpenChange={(nextOpen) =>
            handleOpenChange('country-code', nextOpen)
          }
          placeholder={resolvedPlaceholder}
          state={visualState}
          value={inputValue}
        />
      );
    }

    return (
      <InputFields
        disabled={isDisabled}
        hasValue={hasValue}
        onChange={setInputValue}
        placeholder={resolvedPlaceholder}
        state={visualState}
        value={inputValue}
      />
    );
  };

  return (
    <div ref={rootRef}>
      <TextFieldShell
        errorText={errorText}
        helperText={helperText}
        isError={isError}
        isInfo={isInfo}
        isRequired={isRequired}
        label={label}
        labelText={labelText}
        tooltip={tooltip}
        className={fluid ? 'w-full' : undefined}
        tooltipClassName={tooltipClassName}
        tooltipDescription={tooltipDescription}
        tooltipOpen={tooltipOpen}
        tooltipPlacement={tooltipPlacement}
        tooltipSupportingText={tooltipSupportingText}
        tooltipTitle={tooltipTitle}
        type={normalizedType}
      >
        {renderField()}
      </TextFieldShell>
    </div>
  );
}
