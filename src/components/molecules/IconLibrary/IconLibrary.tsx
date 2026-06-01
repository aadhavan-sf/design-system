// @ts-nocheck
import { createElement, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Bell,
  BellRinging,
  BellSimple,
  CaretUpDown,
  HouseSimple,
} from '@phosphor-icons/react';

import { DropdownList } from '../DropdownList';
import { Text } from '../../foundations/Typography';
import {
  iconLibraryDropdownOptions,
  iconLibraryOptions,
  smallPickerOptions,
} from './iconLibrary.constants';

import './iconLibrary.css';

const ITEM_STATES = ['default', 'hover', 'focused', 'disabled'];
const ITEM_SIZES = ['sm', 'md'];
const LIBRARY_STATES = ['default', 'dropdown-upload-icon', 'uploaded-icon'];
const LIBRARY_SIZES = ['small', 'large'];
const GRID_STATES = ['default', 'icon-not-selected'];

function buildClassName(parts) {
  return parts.filter(Boolean).join(' ');
}

function normalizeValue(value, aliases = {}) {
  return aliases[value] ?? value;
}

function getOption(options, value) {
  return options.find((option) => option.value === value) ?? options[0];
}

function getCategoryLabel(value) {
  return getOption(iconLibraryDropdownOptions, value)?.label ?? 'Notifications';
}

function getMergedOptions(...optionGroups) {
  const optionMap = new Map();

  optionGroups.flat().forEach((option) => {
    optionMap.set(option.value, option);
  });

  return Array.from(optionMap.values());
}

function getIconItemSize(size) {
  return size === 'md' ? 20 : 16;
}

function IconGlyph({
  className,
  icon,
  size,
}) {
  return createElement(icon, {
    'aria-hidden': true,
    className,
    size,
    weight: 'regular',
  });
}

IconGlyph.propTypes = {
  className: PropTypes.string,
  icon: PropTypes.elementType.isRequired,
  size: PropTypes.number.isRequired,
};

export function IconLibraryItem({
  ariaLabel,
  className,
  disabled = false,
  icon = HouseSimple,
  onClick,
  pressed = false,
  size = 'md',
  state = 'default',
}) {
  const normalizedSize = normalizeValue(size, {
    Small: 'sm',
    Medium: 'md',
  });
  const normalizedState = disabled
    ? 'disabled'
    : normalizeValue(state, {
      Default: 'default',
      Hover: 'hover',
      Focused: 'focused',
      Disabled: 'disabled',
    });

  return (
    <button
      type="button"
      aria-pressed={pressed}
      aria-label={ariaLabel ?? 'Select icon'}
      disabled={normalizedState === 'disabled'}
      className={buildClassName([
        'storybook-icon-library-item',
        `storybook-icon-library-item--${normalizedSize}`,
        `storybook-icon-library-item--${normalizedState}`,
        pressed && 'storybook-icon-library-item--pressed',
        className,
      ])}
      onClick={onClick}
    >
      <IconGlyph
        className="storybook-icon-library-item__icon"
        icon={icon}
        size={getIconItemSize(normalizedSize)}
      />
    </button>
  );
}

IconLibraryItem.propTypes = {
  ariaLabel: PropTypes.string,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  icon: PropTypes.elementType,
  onClick: PropTypes.func,
  pressed: PropTypes.bool,
  size: PropTypes.oneOf([...ITEM_SIZES, 'Small', 'Medium']),
  state: PropTypes.oneOf([...ITEM_STATES, 'Default', 'Hover', 'Focused', 'Disabled']),
};

export function IconLibraryGrid({
  className,
  iconOptions = iconLibraryOptions,
  onIconSelect,
  selectedValue,
  state = 'default',
}) {
  const normalizedState = normalizeValue(state, {
    Default: 'default',
    'Icon not selected': 'icon-not-selected',
  });
  const defaultSelectedValue = normalizedState === 'icon-not-selected'
    ? 'empty'
    : iconOptions.find((option) => option.value !== 'empty')?.value ?? iconOptions[0]?.value;
  const [internalSelectedValue, setInternalSelectedValue] = useState(defaultSelectedValue);
  const resolvedSelectedValue =
    selectedValue ?? internalSelectedValue;

  const handleIconSelect = (option) => {
    setInternalSelectedValue(option.value);
    onIconSelect?.(option);
  };

  return (
    <div
      className={buildClassName([
        'storybook-icon-library-grid',
        className,
      ])}
    >
      <div className="storybook-icon-library-grid__icons">
        {iconOptions.map((option) => (
          <IconLibraryItem
            key={option.value}
            ariaLabel={option.label}
            icon={option.icon}
            pressed={option.value === resolvedSelectedValue}
            size="sm"
            onClick={() => handleIconSelect(option)}
          />
        ))}
      </div>
      <span
        className="storybook-icon-library-grid__scrollbar"
        aria-hidden="true"
      />
    </div>
  );
}

IconLibraryGrid.propTypes = {
  className: PropTypes.string,
  iconOptions: PropTypes.arrayOf(PropTypes.shape({
    icon: PropTypes.elementType.isRequired,
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
  })),
  onIconSelect: PropTypes.func,
  selectedValue: PropTypes.string,
  state: PropTypes.oneOf([...GRID_STATES, 'Default', 'Icon not selected']),
};

export function IconLibrary({
  categoryValue,
  className,
  iconOptions = smallPickerOptions,
  label = 'Icon Library',
  onCategorySelect,
  onIconSelect,
  onOpenChange,
  onRemoveUploadedIcon,
  onRepeatUploadedIcon,
  onUpload,
  selectedLabel,
  selectedValue,
  size = 'small',
  state = 'default',
  uploadedIcon,
}) {
  const normalizedSize = normalizeValue(size, {
    Small: 'small',
    Large: 'large',
  });
  const normalizedState = normalizeValue(state, {
    Default: 'default',
    'Dropdown + Upload Icon': 'dropdown-upload-icon',
    'Uploaded Icon': 'uploaded-icon',
  });
  const [activePanel, setActivePanel] = useState(normalizedState !== 'default' ? 'picker' : null);
  const [internalSelectedValue, setInternalSelectedValue] = useState(selectedValue ?? 'bell');
  const [internalCategoryValue, setInternalCategoryValue] = useState(categoryValue ?? 'notifications');
  const isPickerOpen = normalizedState === 'default' ? activePanel === 'picker' : true;
  const isDropdownOpen = normalizedState === 'default' && activePanel === 'dropdown';
  const resolvedSelectedValue = selectedValue ?? internalSelectedValue;
  const resolvedCategoryValue = categoryValue ?? internalCategoryValue;
  const mergedOptions = useMemo(
    () => getMergedOptions(iconOptions, smallPickerOptions, iconLibraryOptions),
    [iconOptions]
  );
  const selectedOption = useMemo(
    () => getOption(mergedOptions, resolvedSelectedValue),
    [mergedOptions, resolvedSelectedValue]
  );
  const SelectedIcon = selectedOption?.icon ?? BellRinging;
  const displayLabel = selectedLabel ?? getCategoryLabel(resolvedCategoryValue);
  const pickerOptions = normalizedState === 'uploaded-icon'
    ? [
      { value: 'bell', label: 'Notifications', icon: Bell },
      { value: 'bell-ringing', label: 'Notifications ringing', icon: BellRinging },
      { value: 'bell-simple', label: 'Simple notifications', icon: BellSimple },
    ]
    : iconOptions;

  const togglePanel = (panel) => {
    const nextPanel = activePanel === panel ? null : panel;

    setActivePanel(nextPanel);
    onOpenChange?.(Boolean(nextPanel));
  };

  const handleIconSelect = (option) => {
    setInternalSelectedValue(option.value);
    onIconSelect?.(option);
  };

  const handleDropdownSelect = (item) => {
    const option = getOption(iconLibraryDropdownOptions, item.value ?? item.label);

    setInternalCategoryValue(option.value);
    onCategorySelect?.(option);
    setActivePanel(null);
    onOpenChange?.(false);
  };

  if (normalizedSize === 'large') {
    return (
      <IconLibraryGrid
        className={className}
        iconOptions={iconLibraryOptions}
        selectedValue={resolvedSelectedValue}
        state={normalizedState === 'default' ? 'default' : 'icon-not-selected'}
        onIconSelect={handleIconSelect}
      />
    );
  }

  return (
    <div
      className={buildClassName([
        'storybook-icon-library',
        className,
      ])}
    >
      <Text
        as="label"
        variant="text-sm"
        weight="medium"
        color="var(--neutral_600)"
        className="storybook-icon-library__label"
      >
        {label}
      </Text>

      <div className="storybook-icon-library__field-row">
        <button
          type="button"
          className="storybook-icon-library__icon-preview"
          aria-label="Choose icon"
          aria-expanded={isPickerOpen}
          onClick={() => togglePanel('picker')}
        >
          <IconGlyph
            className="storybook-icon-library__preview-icon"
            icon={SelectedIcon}
            size={20}
          />
        </button>
        <button
          type="button"
          className="storybook-icon-library__select"
          aria-expanded={isDropdownOpen}
          onClick={() => togglePanel('dropdown')}
        >
          <Text
            as="span"
            variant="text-sm"
            weight="medium"
            color="var(--neutral_700)"
            className="storybook-icon-library__select-label"
          >
            {displayLabel}
          </Text>
          <CaretUpDown
            aria-hidden="true"
            className="storybook-icon-library__caret"
            size={20}
            weight="regular"
          />
        </button>
      </div>

      {isPickerOpen && (
        <DropdownList
          variant="icon-picker"
          iconOptions={pickerOptions}
          selectedValue={resolvedSelectedValue}
          uploadedIcon={normalizedState === 'uploaded-icon' ? uploadedIcon ?? BellRinging : undefined}
          onIconSelect={handleIconSelect}
          onRemoveUploadedIcon={onRemoveUploadedIcon}
          onRepeatUploadedIcon={onRepeatUploadedIcon}
          onUpload={onUpload}
        />
      )}

      {isDropdownOpen && (
        <div className="storybook-icon-library__dropdown-menu">
          <DropdownList
            items={iconLibraryDropdownOptions}
            selectedValues={[resolvedCategoryValue]}
            variant="text"
            onItemSelect={handleDropdownSelect}
          />
        </div>
      )}
    </div>
  );
}

IconLibrary.propTypes = {
  categoryValue: PropTypes.string,
  className: PropTypes.string,
  iconOptions: PropTypes.arrayOf(PropTypes.shape({
    icon: PropTypes.elementType.isRequired,
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
  })),
  label: PropTypes.string,
  onCategorySelect: PropTypes.func,
  onIconSelect: PropTypes.func,
  onOpenChange: PropTypes.func,
  onRemoveUploadedIcon: PropTypes.func,
  onRepeatUploadedIcon: PropTypes.func,
  onUpload: PropTypes.func,
  selectedLabel: PropTypes.string,
  selectedValue: PropTypes.string,
  size: PropTypes.oneOf([...LIBRARY_SIZES, 'Small', 'Large']),
  state: PropTypes.oneOf([...LIBRARY_STATES, 'Default', 'Dropdown + Upload Icon', 'Uploaded Icon']),
  uploadedIcon: PropTypes.elementType,
};
