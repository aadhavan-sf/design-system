import { createElement, useRef, useState, type ElementType, type ReactNode } from 'react';
import {
  Bell,
  BellSimple,
  BellSlash,
  Check,
  MonitorArrowUp,
  Plug,
  Repeat,
  Trash,
} from '@phosphor-icons/react';

import { Text } from '../../foundations/Typography';

import './dropdownList.css';

const DEFAULT_ITEMS = [
  { label: 'Head Content Editor' },
  { label: 'Head Content Editor', active: true, selected: true },
  { label: 'Head Content Editor', selected: true },
];

const DEFAULT_ICON_PICKER_ITEMS = [
  { value: 'bell', label: 'Notifications', icon: Bell },
  { value: 'bell-slash', label: 'Notifications off', icon: BellSlash },
  { value: 'bell-simple', label: 'Simple notifications', icon: BellSimple },
];

function buildClassName(parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(' ');
}

function getItemValue(item: DropdownListItem) {
  return typeof item === 'string'
    ? item
    : item.value ?? item.label;
}

function getItemLabel(item: DropdownListItem) {
  return typeof item === 'string'
    ? item
    : item.label;
}

function getItemPrefix(item: DropdownListItem) {
  return typeof item === 'string'
    ? null
    : item.prefix ?? item.flag ?? null;
}

function getDefaultSelectedValues(items: DropdownListItem[]) {
  return items
    .filter((item) => typeof item !== 'string' && item.selected)
    .map(getItemValue);
}

function IconPickerGlyph({
  className,
  icon,
  size,
}: {
  className?: string;
  icon: ElementType;
  size: number;
}) {
  return createElement(icon, {
    'aria-hidden': true,
    className,
    size,
    weight: 'regular',
  });
}

function IconPickerItem({
  icon,
  label,
  onClick,
  pressed,
}: {
  icon: ElementType;
  label: string;
  onClick?: () => void;
  pressed?: boolean;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      aria-pressed={pressed}
      className={buildClassName([
        'storybook-dropdown-list__icon-picker-item',
        pressed && 'storybook-dropdown-list__icon-picker-item--pressed',
      ])}
      onClick={onClick}
    >
      <IconPickerGlyph
        className="storybook-dropdown-list__icon-picker-icon"
        icon={icon}
        size={20}
      />
    </button>
  );
}

function IconPickerUpload({
  onUpload,
}: {
  onUpload?: (file: File | null) => void;
}) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  return (
    <button
      type="button"
      className="storybook-dropdown-list__icon-picker-upload"
      onClick={() => inputRef.current?.click()}
    >
      <MonitorArrowUp
        aria-hidden="true"
        className="storybook-dropdown-list__icon-picker-upload-icon"
        size={24}
        weight="regular"
      />
      <span className="storybook-dropdown-list__icon-picker-upload-copy">
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
        className="storybook-dropdown-list__icon-picker-upload-input"
        onChange={(event) => onUpload?.(event.target.files?.[0] ?? null)}
      />
    </button>
  );
}

function IconPickerDropdown({
  iconOptions = [],
  onIconSelect,
  onRemoveUploadedIcon,
  onRepeatUploadedIcon,
  onUpload,
  selectedValue,
  uploadedIcon,
}: Pick<DropdownListProps, 'iconOptions' | 'onIconSelect' | 'onRemoveUploadedIcon' | 'onRepeatUploadedIcon' | 'onUpload' | 'selectedValue' | 'uploadedIcon'>) {
  const isUploadedState = Boolean(uploadedIcon);
  const resolvedIconOptions = iconOptions?.length
    ? iconOptions
    : DEFAULT_ICON_PICKER_ITEMS;

  return (
    <div className="storybook-dropdown-list__icon-picker">
      <Text
        as="p"
        variant="text-xs"
        weight="medium"
        color="var(--neutral_600)"
        className="storybook-dropdown-list__icon-picker-title"
      >
        Choose Icon
      </Text>

      <div className="storybook-dropdown-list__icon-picker-choices">
        {resolvedIconOptions.map((option) => (
          <IconPickerItem
            key={option.value}
            icon={option.icon}
            label={option.label}
            pressed={option.value === selectedValue}
            onClick={() => onIconSelect?.(option)}
          />
        ))}
      </div>

      <div className="storybook-dropdown-list__icon-picker-separator">
        <span className="storybook-dropdown-list__icon-picker-separator-line" />
        <Text
          as="span"
          variant="text-xs"
          weight="medium"
          color="var(--neutral_200)"
          className="storybook-dropdown-list__icon-picker-separator-label"
        >
          OR
        </Text>
      </div>

      {isUploadedState && uploadedIcon ? (
        <div className="storybook-dropdown-list__icon-picker-uploaded">
          <IconPickerItem
            icon={uploadedIcon}
            label="Uploaded icon"
            pressed
          />
          <span className="storybook-dropdown-list__icon-picker-uploaded-actions">
            <button
              type="button"
              aria-label="Replace uploaded icon"
              className="storybook-dropdown-list__icon-picker-action"
              onClick={onRepeatUploadedIcon}
            >
              <Repeat size={16} weight="regular" />
            </button>
            <button
              type="button"
              aria-label="Delete uploaded icon"
              className="storybook-dropdown-list__icon-picker-action storybook-dropdown-list__icon-picker-action--destructive"
              onClick={onRemoveUploadedIcon}
            >
              <Trash size={16} weight="regular" />
            </button>
          </span>
        </div>
      ) : (
        <IconPickerUpload onUpload={onUpload} />
      )}
    </div>
  );
}

function Control({ disabled, selected, variant }: { disabled: boolean; selected: boolean; variant: 'checkbox-left' | 'radio-left' | 'toggle-right' }) {
  if (variant === 'checkbox-left') {
    return (
      <span
        className={buildClassName([
          'storybook-dropdown-list__checkbox',
          selected && 'storybook-dropdown-list__checkbox--checked',
          disabled && 'storybook-dropdown-list__checkbox--disabled',
        ])}
        aria-hidden="true"
      >
        {selected && <Check size={12} weight="regular" />}
      </span>
    );
  }

  if (variant === 'radio-left') {
    return (
      <span
        className={buildClassName([
          'storybook-dropdown-list__radio',
          selected && 'storybook-dropdown-list__radio--checked',
          disabled && 'storybook-dropdown-list__radio--disabled',
        ])}
        aria-hidden="true"
      >
        <span className="storybook-dropdown-list__radio-dot" />
      </span>
    );
  }

  if (variant === 'toggle-right') {
    return (
      <span
        className={buildClassName([
          'storybook-dropdown-list__toggle',
          selected && 'storybook-dropdown-list__toggle--checked',
          disabled && 'storybook-dropdown-list__toggle--disabled',
        ])}
        aria-hidden="true"
      >
        <span className="storybook-dropdown-list__toggle-thumb" />
      </span>
    );
  }

  return null;
}

export function DropdownList({
  iconOptions,
  items = DEFAULT_ITEMS,
  onIconSelect,
  onRemoveUploadedIcon,
  onRepeatUploadedIcon,
  onUpload,
  selectedValue,
  selectedValues,
  uploadedIcon,
  variant = 'icon-left',
  onItemSelect,
  onSelectedValuesChange,
}: DropdownListProps) {
  const [internalSelectedValues, setInternalSelectedValues] = useState(() =>
    getDefaultSelectedValues(items)
  );

  if (variant === 'icon-picker') {
    return (
      <div className="storybook-dropdown-list storybook-dropdown-list--icon-picker">
        <IconPickerDropdown
          iconOptions={iconOptions}
          selectedValue={selectedValue}
          uploadedIcon={uploadedIcon}
          onIconSelect={onIconSelect}
          onRemoveUploadedIcon={onRemoveUploadedIcon}
          onRepeatUploadedIcon={onRepeatUploadedIcon}
          onUpload={onUpload}
        />
      </div>
    );
  }

  const resolvedSelectedValues = selectedValues ?? internalSelectedValues;

  const updateSelectedValues = (nextValues: string[]) => {
    if (!selectedValues) {
      setInternalSelectedValues(nextValues);
    }

    onSelectedValuesChange?.(nextValues);
  };

  const handleItemClick = (item: DropdownListItem, index: number) => {
    const value = getItemValue(item);
    const disabled = typeof item !== 'string' && item.disabled;

    if (disabled) {
      return;
    }

    if (variant === 'checkbox-left' || variant === 'toggle-right') {
      const nextValues = resolvedSelectedValues.includes(value)
        ? resolvedSelectedValues.filter((selectedValue) => selectedValue !== value)
        : [...resolvedSelectedValues, value];

      updateSelectedValues(nextValues);
    }

    if (variant === 'radio-left' || variant === 'check-right' || variant === 'icon-right') {
      updateSelectedValues([value]);
    }

    onItemSelect?.(item, index);
  };

  return (
    <div
      className={buildClassName([
        'storybook-dropdown-list',
        `storybook-dropdown-list--${variant}`,
      ])}
    >
      {items.map((item, index) => {
        const label = getItemLabel(item);
        const value = getItemValue(item);
        const prefix = getItemPrefix(item);
        const itemState = typeof item === 'string' ? 'default' : item.state ?? 'default';
        const isDisabled = itemState === 'disabled' || (typeof item !== 'string' && item.disabled);
        const isDestructive = itemState === 'destructive';
        const isSelected = resolvedSelectedValues.includes(value);
        const isActive =
          itemState === 'active' ||
          (typeof item !== 'string' && item.active) ||
          isSelected;

        return (
          <button
            key={`${value}-${index}`}
            type="button"
            disabled={Boolean(isDisabled)}
            className={buildClassName([
              'storybook-dropdown-list__item',
              isActive && 'storybook-dropdown-list__item--active',
              isDisabled && 'storybook-dropdown-list__item--disabled',
              isDestructive && 'storybook-dropdown-list__item--destructive',
            ])}
            onClick={() => handleItemClick(item, index)}
          >
            {variant === 'icon-left' && (
              <Plug
                className="storybook-dropdown-list__icon"
                size={16}
                weight="regular"
              />
            )}

            {(variant === 'checkbox-left' || variant === 'radio-left') && (
              <Control
                disabled={Boolean(isDisabled)}
                selected={isSelected}
                variant={variant}
              />
            )}

            {prefix && (
              <span
                className="storybook-dropdown-list__prefix"
                aria-hidden="true"
              >
                {prefix}
              </span>
            )}

            <Text
              as="span"
              variant="text-sm"
              weight="regular"
              color="currentColor"
              className="storybook-dropdown-list__label"
            >
              {label}
            </Text>

            {variant === 'toggle-right' && (
              <Control
                disabled={Boolean(isDisabled)}
                selected={isSelected}
                variant={variant}
              />
            )}

            {variant === 'icon-right' && (
              <Plug
                className="storybook-dropdown-list__icon"
                size={16}
                weight="regular"
              />
            )}

            {variant === 'check-right' && isSelected && (
              <Check
                className="storybook-dropdown-list__icon"
                size={16}
                weight="regular"
              />
            )}
          </button>
        );
      })}
    </div>
  );
}
export type DropdownListVariant = string;
export type DropdownListItemState = string;
export type DropdownListIconOption = {
  icon: ElementType;
  label: string;
  value: string;
};

export type DropdownListItem =
  | string
  | {
      label: string;
      value?: string;
      prefix?: ReactNode;
      flag?: ReactNode;
      active?: boolean;
      disabled?: boolean;
      selected?: boolean;
      state?: DropdownListItemState;
    };

export interface DropdownListProps {
  iconOptions?: DropdownListIconOption[];
  items?: DropdownListItem[];
  onIconSelect?: (item: DropdownListIconOption) => void;
  selectedValues?: string[];
  selectedValue?: string;
  variant?: DropdownListVariant;
  onItemSelect?: (item: DropdownListItem, index: number) => void;
  onRemoveUploadedIcon?: () => void;
  onRepeatUploadedIcon?: () => void;
  onSelectedValuesChange?: (values: string[]) => void;
  onUpload?: (file: File | null) => void;
  uploadedIcon?: ElementType;
}
