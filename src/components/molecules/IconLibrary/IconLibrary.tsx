// @ts-nocheck
import { createElement, useMemo, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Bell,
  BellRinging,
  BellSimple,
  HouseSimple,
} from '@phosphor-icons/react';

import { IconHoverEffect } from '../../atoms/IconHoverEffect';
import { DropdownField } from '../TextField/fields/DropdownField';
import { UploadFileBase, UPLOAD_FILE_INPUT_CLASSNAME } from '../UploadFile';
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

const UPLOADED_PICKER_OPTIONS = [
  { value: 'bell', label: 'Notifications', icon: Bell },
  { value: 'bell-ringing', label: 'Notifications ringing', icon: BellRinging },
  { value: 'bell-simple', label: 'Simple notifications', icon: BellSimple },
];

function buildClassName(parts) {
  return parts.flat().filter(Boolean).join(' ');
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

function getIconLibraryItemStateClasses({
  pressed,
  state,
}) {
  if (state === 'disabled') {
    if (pressed) {
      return 'border border-solid border-brand-100 bg-brand-25 text-brand-100';
    }

    return 'border-0 bg-neutral-50 text-neutral-300';
  }

  if (pressed) {
    return buildClassName([
      'border border-solid border-brand-100 bg-brand-25 text-brand-400',
      state === 'hover' && 'bg-brand-25',
      state === 'focused' && 'shadow-focus-brand',
    ]);
  }

  return buildClassName([
    'border-0 bg-neutral-0 text-neutral-600',
    state === 'hover' && 'bg-neutral-50',
    state === 'focused' && 'bg-neutral-0 shadow-focus-brand',
  ]);
}

function getIconLibraryItemHoverClasses({
  pressed,
  state,
}) {
  if (state === 'disabled') {
    return '';
  }

  if (pressed) {
    return 'enabled:hover:bg-brand-25';
  }

  return 'enabled:hover:bg-neutral-50';
}

function getIconLibraryItemLayoutClasses(size) {
  return size === 'sm' ? 'size-6 rounded-1 p-1' : 'size-8 rounded-1 p-2';
}

function getIconLibraryItemClassName({
  size,
  state,
  pressed,
  className,
}) {
  return buildClassName([
    'storybook-icon-library-item box-border inline-flex shrink-0 items-center justify-center',
    getIconLibraryItemLayoutClasses(size),
    getIconLibraryItemStateClasses({ pressed, state }),
    getIconLibraryItemHoverClasses({ pressed, state }),
    className,
  ]);
}

function getIconPreviewClassName() {
  return buildClassName([
    'storybook-icon-library__icon-preview',
    'box-border inline-flex size-11 shrink-0 items-center justify-center',
    'rounded-2 border border-solid border-neutral-200 bg-neutral-0 p-0',
    'text-neutral-700',
    'enabled:hover:bg-neutral-25',
    'focus-visible:shadow-focus-brand',
  ]);
}

function getIconLibraryShellClassName(className) {
  return buildClassName([
    'storybook-icon-library relative flex w-[216px] flex-col',
    className,
  ]);
}

function getIconLibraryGridClassName(className) {
  return buildClassName([
    'flex w-[400px] items-start justify-end gap-2',
    'rounded-2 border border-solid border-neutral-200 bg-neutral-0 p-3',
    className,
  ]);
}

function getIconPickerPopoverClassName(className) {
  return buildClassName([
    'storybook-icon-library-popover',
    'box-border flex w-full min-w-0 max-w-full flex-col gap-4 overflow-hidden',
    'rounded-2 bg-neutral-0 p-4 shadow-md',
    className,
  ]);
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
      className={getIconLibraryItemClassName({
        size: normalizedSize,
        state: normalizedState,
        pressed,
        className,
      })}
      onClick={onClick}
    >
      <IconGlyph
        className="shrink-0"
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
    <div className={getIconLibraryGridClassName(className)}>
      <div className="flex min-w-0 flex-[1_0_0] flex-wrap content-start items-center gap-x-4 gap-y-3">
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
        className="h-[60px] w-2 shrink-0 rounded-2 bg-neutral-100"
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

function IconLibraryUpload({
  onUpload,
}) {
  const inputRef = useRef(null);

  return (
    <div className="relative min-w-0 w-full overflow-hidden">
      <input
        ref={inputRef}
        accept=".svg,.png,image/svg+xml,image/png"
        className={UPLOAD_FILE_INPUT_CLASSNAME}
        type="file"
        onChange={(event) => {
          onUpload?.(event.target.files?.[0] ?? null);
          event.target.value = '';
        }}
      />
      <UploadFileBase
        className="min-w-0"
        size="small"
        layout="horizontal"
        title="Upload Your Icon"
        description="24x24 SVG or PNG"
        supportingText
        onBrowse={() => inputRef.current?.click()}
      />
    </div>
  );
}

IconLibraryUpload.propTypes = {
  onUpload: PropTypes.func,
};

function IconPickerPopover({
  className,
  iconOptions = smallPickerOptions,
  onIconSelect,
  onRemoveUploadedIcon,
  onRepeatUploadedIcon,
  onUpload,
  selectedValue,
  state,
  uploadedIcon = BellRinging,
}) {
  const normalizedState = normalizeValue(state, {
    Default: 'default',
    'Dropdown + Upload Icon': 'dropdown-upload-icon',
    'Uploaded Icon': 'uploaded-icon',
  });
  const isUploadedState = normalizedState === 'uploaded-icon';
  const resolvedIconOptions = isUploadedState ? UPLOADED_PICKER_OPTIONS : iconOptions;

  return (
    <div className={getIconPickerPopoverClassName(className)}>
      <Text
        as="p"
        variant="text-xs"
        weight="medium"
        className="m-0 text-neutral-600"
      >
        Choose Icon
      </Text>

      <div className="flex items-center gap-2">
        {resolvedIconOptions.map((option) => (
          <IconLibraryItem
            key={option.value}
            ariaLabel={option.label}
            icon={option.icon}
            pressed={option.value === selectedValue}
            size="md"
            onClick={() => onIconSelect?.(option)}
          />
        ))}
      </div>

      <div className="storybook-icon-library-separator relative flex h-4 w-full items-center justify-center">
        <span
          aria-hidden="true"
          className="storybook-icon-library-separator-line h-px bg-neutral-200"
        />
        <Text
          as="span"
          variant="text-xs"
          weight="medium"
          className="storybook-icon-library-separator__label relative z-[1] bg-neutral-0 px-1 tracking-[0.2em] text-neutral-200"
        >
          OR
        </Text>
      </div>

      {isUploadedState ? (
        <div className="flex items-center justify-between gap-2">
          <IconLibraryItem
            ariaLabel="Uploaded icon"
            icon={uploadedIcon}
            pressed
            size="md"
          />
          <span className="inline-flex items-center gap-2">
            <IconHoverEffect
              ariaLabel="Replace uploaded icon"
              icon="repeat"
              size="sm"
              onClick={onRepeatUploadedIcon}
            />
            <IconHoverEffect
              ariaLabel="Delete uploaded icon"
              type="destructive"
              size="sm"
              onClick={onRemoveUploadedIcon}
            />
          </span>
        </div>
      ) : (
        <IconLibraryUpload onUpload={onUpload} />
      )}
    </div>
  );
}

IconPickerPopover.propTypes = {
  className: PropTypes.string,
  iconOptions: PropTypes.arrayOf(PropTypes.shape({
    icon: PropTypes.elementType.isRequired,
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
  })),
  onIconSelect: PropTypes.func,
  onRemoveUploadedIcon: PropTypes.func,
  onRepeatUploadedIcon: PropTypes.func,
  onUpload: PropTypes.func,
  selectedValue: PropTypes.string,
  state: PropTypes.oneOf([...LIBRARY_STATES, 'Default', 'Dropdown + Upload Icon', 'Uploaded Icon']),
  uploadedIcon: PropTypes.elementType,
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
  const isDropdownOpen = activePanel === 'dropdown';
  const isPickerOpen = activePanel === 'dropdown'
    ? false
    : normalizedState === 'default'
      ? activePanel === 'picker'
      : true;
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

  const togglePanel = (panel) => {
    const nextPanel = activePanel === panel ? null : panel;

    setActivePanel(nextPanel);
    onOpenChange?.(Boolean(nextPanel));
  };

  const handleIconSelect = (option) => {
    setInternalSelectedValue(option.value);
    onIconSelect?.(option);
  };

  const handleCategoryDropdownOpenChange = (open) => {
    setActivePanel(open ? 'dropdown' : null);
    onOpenChange?.(open);
  };

  const handleCategorySelect = (value) => {
    const option = getOption(iconLibraryDropdownOptions, value);

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
    <div className={getIconLibraryShellClassName(className)}>
      <div className="storybook-icon-library__field-group relative flex flex-col gap-1">
        <Text
          as="label"
          variant="text-sm"
          weight="medium"
          className="block text-neutral-600"
        >
          {label}
        </Text>

        <div className="storybook-icon-library__field-row grid w-full grid-cols-[44px_minmax(0,1fr)] items-center gap-x-2 gap-y-3">
          <button
            type="button"
            className={getIconPreviewClassName()}
            aria-label="Choose icon"
            aria-expanded={isPickerOpen}
            onClick={() => togglePanel('picker')}
          >
            <IconGlyph
              className="shrink-0"
              icon={SelectedIcon}
              size={20}
            />
          </button>
          <DropdownField
            disabled={false}
            displayValue={displayLabel}
            dropdownListItems={iconLibraryDropdownOptions}
            dropdownListVariant="check-right"
            hasValue
            isOpen={isDropdownOpen}
            options={iconLibraryDropdownOptions.map((option) => option.value)}
            selectedOptions={[resolvedCategoryValue]}
            state={isDropdownOpen ? 'active' : 'default'}
            withIcon={false}
            onOpenChange={handleCategoryDropdownOpenChange}
            onSelect={handleCategorySelect}
          />

          {isPickerOpen && (
            <IconPickerPopover
              className="col-span-2 w-full min-w-0"
              iconOptions={iconOptions}
              selectedValue={resolvedSelectedValue}
              state={normalizedState}
              uploadedIcon={normalizedState === 'uploaded-icon' ? uploadedIcon ?? BellRinging : undefined}
              onIconSelect={handleIconSelect}
              onRemoveUploadedIcon={onRemoveUploadedIcon}
              onRepeatUploadedIcon={onRepeatUploadedIcon}
              onUpload={onUpload}
            />
          )}
        </div>
      </div>
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
