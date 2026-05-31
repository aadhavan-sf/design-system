// @ts-nocheck
import { createElement, useMemo, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Bell,
  BellRinging,
  BellSimple,
  CaretUpDown,
  HouseSimple,
  MonitorArrowUp,
} from '@phosphor-icons/react';

import { IconHoverEffect } from '../../atoms/IconHoverEffect';
import { DropdownList } from '../DropdownList';
import { Text } from '../../foundations/Typography';
import {
  iconLibraryDropdownOptions,
  iconLibraryOptions,
  smallPickerOptions,
} from './iconLibrary.constants';

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
  return size === 'md' ? 20 : 15;
}

function getIconItemClassName({ className, normalizedSize, normalizedState, pressed }) {
  return buildClassName([
    'inline-flex shrink-0 cursor-pointer items-center justify-center border-0 bg-neutral-00 text-neutral-600 enabled:hover:bg-neutral-50 disabled:cursor-not-allowed disabled:bg-neutral-50 disabled:text-neutral-300',
    normalizedSize === 'sm'
      ? 'h-6 w-6 rounded-[3.692px] p-[4.5px]'
      : 'h-8 w-8 rounded-[4.923px] p-[6px]',
    normalizedState === 'hover' && 'bg-neutral-50',
    normalizedState === 'focused' && 'bg-neutral-00 shadow-focus-primary-inset',
    pressed && 'border border-solid border-primary-100 bg-primary-25 text-primary-400',
    pressed && normalizedSize === 'sm' && 'rounded-[3px] border-[0.75px]',
    pressed && normalizedSize === 'md' && 'rounded-1',
    pressed && normalizedState === 'focused' && 'bg-primary-25',
    pressed && normalizedState === 'disabled' && 'border-primary-100 bg-primary-25 text-primary-100',
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
      className={getIconItemClassName({ className, normalizedSize, normalizedState, pressed })}
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
    <div
      className={buildClassName([
        'flex w-[400px] items-start justify-end gap-2 rounded-2 border border-solid border-neutral-200 bg-neutral-00 p-3',
        className,
      ])}
    >
      <div className="flex min-w-0 flex-1 basis-0 flex-wrap content-start items-center gap-x-4 gap-y-3">
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

function IconUploadDropzone({
  onUpload,
}) {
  const inputRef = useRef(null);

  return (
    <button
      type="button"
      className="flex w-full cursor-pointer items-start gap-2 rounded-2 border border-dashed border-neutral-200 bg-neutral-00 p-3 text-neutral-900 enabled:hover:bg-neutral-25 focus-visible:outline-none focus-visible:shadow-focus-primary-inset"
      onClick={() => inputRef.current?.click()}
    >
      <MonitorArrowUp
        aria-hidden="true"
        className="shrink-0 text-primary-400"
        size={24}
        weight="regular"
      />
      <span className="flex min-w-0 flex-col gap-1 text-left">
        <Text
          as="span"
          variant="text-sm"
          weight="medium"
          color="var(--neutral_900)"
        >
          Upload Your Icon
        </Text>
        <Text
          as="span"
          variant="text-xs"
          weight="regular"
          color="var(--neutral_600)"
        >
          24x24 SVG or PNG
        </Text>
      </span>
      <input
        ref={inputRef}
        type="file"
        accept=".svg,.png,image/svg+xml,image/png"
        className="absolute h-px w-px overflow-hidden whitespace-nowrap [clip-path:inset(50%)] [clip:rect(0_0_0_0)]"
        onChange={(event) => onUpload?.(event.target.files?.[0] ?? null)}
      />
    </button>
  );
}

IconUploadDropzone.propTypes = {
  onUpload: PropTypes.func,
};

function IconPickerPopover({
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

  return (
    <div className="flex w-[216px] flex-col gap-4 rounded-2 bg-neutral-00 p-4 shadow-md">
      <Text
        as="p"
        variant="text-xs"
        weight="medium"
        color="var(--neutral_600)"
        className="m-0"
      >
        Choose Icon
      </Text>

      <div className="flex items-center gap-2">
        {(isUploadedState ? [
          { value: 'bell', label: 'Notifications', icon: Bell },
          { value: 'bell-ringing', label: 'Notifications ringing', icon: BellRinging },
          { value: 'bell-simple', label: 'Simple notifications', icon: BellSimple },
        ] : smallPickerOptions).map((option) => (
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

      <div className="relative flex h-4 w-full items-center justify-center">
        <span className="absolute inset-x-0 top-1/2 h-px bg-neutral-200" />
        <Text
          as="span"
          variant="text-xs"
          weight="medium"
          color="var(--neutral_200)"
          className="relative z-[1] bg-neutral-00 px-1 tracking-[0.2em]"
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
        <IconUploadDropzone onUpload={onUpload} />
      )}
    </div>
  );
}

IconPickerPopover.propTypes = {
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
        'relative flex w-[216px] flex-col gap-3',
        className,
      ])}
    >
      <Text
        as="label"
        variant="text-sm"
        weight="medium"
        color="var(--neutral_600)"
        className="block"
      >
        {label}
      </Text>

      <div className="flex items-center gap-2">
        <button
          type="button"
          className="box-border inline-flex h-11 w-11 shrink-0 cursor-pointer items-center justify-center rounded-2 border border-solid border-neutral-200 bg-neutral-00 p-0 text-neutral-700 enabled:hover:bg-neutral-25 focus-visible:outline-none focus-visible:shadow-focus-primary-inset"
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
        <button
          type="button"
          className="box-border inline-flex h-11 min-w-0 flex-1 basis-0 cursor-pointer items-center justify-between gap-2 rounded-2 border border-solid border-neutral-200 bg-neutral-00 px-[14px] py-3 text-neutral-700 enabled:hover:bg-neutral-25 focus-visible:outline-none focus-visible:shadow-focus-primary-inset"
          aria-expanded={isDropdownOpen}
          onClick={() => togglePanel('dropdown')}
        >
          <Text
            as="span"
            variant="text-sm"
            weight="medium"
            color="var(--neutral_700)"
            className="min-w-0 overflow-hidden text-ellipsis whitespace-nowrap"
          >
            {displayLabel}
          </Text>
          <CaretUpDown
            aria-hidden="true"
            className="shrink-0 text-neutral-700"
            size={20}
            weight="regular"
          />
        </button>
      </div>

      {isPickerOpen && (
        <IconPickerPopover
          selectedValue={resolvedSelectedValue}
          state={normalizedState}
          uploadedIcon={uploadedIcon}
          onIconSelect={handleIconSelect}
          onRemoveUploadedIcon={onRemoveUploadedIcon}
          onRepeatUploadedIcon={onRepeatUploadedIcon}
          onUpload={onUpload}
        />
      )}

      {isDropdownOpen && (
        <div className="absolute left-[52px] top-[calc(100%+8px)] z-20">
          <DropdownList
            className="w-[164px]"
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
