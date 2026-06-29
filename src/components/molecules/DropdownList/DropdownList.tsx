import {
  createElement,
  useRef,
  useState,
  type ElementType,
  type KeyboardEvent,
  type MouseEvent,
  type ReactNode,
} from 'react';
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

import { CheckBox } from '../../atoms/CheckBox';
import { RadioButton } from '../../atoms/RadioButton';
import { Toggle } from '../../atoms/Toggle';
import { Text } from '../../foundations/Typography';

import './dropdownList.css';

const DEFAULT_ITEMS = [
  { label: 'Head Content Editor' },
  { label: 'Head Content Editor', selected: true },
  { label: 'Head Content Editor', selected: true },
];

const DEFAULT_ICON_PICKER_ITEMS: DropdownListIconOption[] = [
  { value: 'bell', label: 'Notifications', icon: Bell },
  { value: 'bell-slash', label: 'Notifications off', icon: BellSlash },
  { value: 'bell-simple', label: 'Simple notifications', icon: BellSimple },
];

type ControlVariant = 'checkbox-left' | 'radio-left' | 'toggle-right';

function buildClassName(parts: Array<string | false | null | undefined>) {
  return parts.flat().filter(Boolean).join(' ');
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

function usesControlVariant(variant: string): variant is ControlVariant {
  return variant === 'checkbox-left'
    || variant === 'radio-left'
    || variant === 'toggle-right';
}

function isSingleSelectVariant(variant: string) {
  return variant === 'radio-left'
    || variant === 'check-right'
    || variant === 'icon-right'
    || variant === 'icon-left'
    || variant === 'text';
}

function getDropdownListLabelWeight({
  isSelected,
  variant,
}: {
  isSelected: boolean;
  variant: string;
}) {
  if (isSelected && (variant === 'text' || variant === 'icon-left')) {
    return 'medium' as const;
  }

  return 'regular' as const;
}

function getDropdownListItemClasses({
  isActive,
  isDisabled,
  isDestructive,
}: {
  isActive: boolean;
  isDisabled: boolean;
  isDestructive: boolean;
}) {
  if (isDisabled) {
    return 'bg-neutral-0 text-neutral-300';
  }

  if (isDestructive) {
    return 'bg-neutral-0 text-error-600 hover:bg-neutral-25';
  }

  if (isActive) {
    return 'bg-neutral-25 text-neutral-700 hover:bg-neutral-25';
  }

  return 'bg-neutral-0 text-neutral-600 hover:bg-neutral-25';
}

function getControlState(isDisabled: boolean, isHovered: boolean) {
  if (isDisabled) {
    return 'disabled' as const;
  }

  if (isHovered) {
    return 'hover' as const;
  }

  return 'default' as const;
}

function getItemRole(variant: string) {
  if (variant === 'checkbox-left') {
    return 'menuitemcheckbox';
  }

  if (variant === 'radio-left') {
    return 'menuitemradio';
  }

  return 'menuitem';
}

function getDropdownListItemSizeClasses(size: DropdownListSize) {
  return size === 'sm' ? 'h-9 px-3' : 'h-11 px-4';
}

function getDropdownListTextVariant(size: DropdownListSize) {
  return size === 'sm' ? 'text-xs' : 'text-sm';
}

function getDropdownListRowIconClassName(isSelected: boolean) {
  return buildClassName([
    'shrink-0',
    isSelected ? 'text-neutral-700' : 'text-current',
  ]);
}

function getIconPickerItemClassName(pressed?: boolean) {
  return buildClassName([
    'storybook-dropdown-list__icon-picker-item',
    'inline-flex size-8 shrink-0 items-center justify-center',
    'rounded-1 border border-solid border-transparent bg-neutral-0 p-2 text-neutral-600 shadow-none',
    'hover:bg-neutral-50 focus-visible:shadow-focus-brand',
    pressed && 'border-brand-100 bg-brand-25 text-brand-400',
  ]);
}

function getIconPickerActionClassName(destructive?: boolean) {
  return buildClassName([
    'storybook-dropdown-list__icon-picker-action',
    'inline-flex size-6 items-center justify-center rounded-1 border-0 bg-transparent p-1',
    'focus-visible:shadow-focus-brand',
    destructive
      ? 'text-error-600 hover:bg-error-50'
      : 'text-neutral-600 hover:bg-neutral-50',
  ]);
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
      className={getIconPickerItemClassName(pressed)}
      onClick={onClick}
    >
      <IconPickerGlyph
        className="shrink-0"
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
      className={buildClassName([
        'storybook-dropdown-list__icon-picker-upload',
        'relative flex w-full items-start gap-2 rounded-2 border border-dashed',
        'border-neutral-200 bg-neutral-0 p-3 text-neutral-900 shadow-none',
        'hover:bg-neutral-25 focus-visible:shadow-focus-brand',
      ])}
      onClick={() => inputRef.current?.click()}
    >
      <MonitorArrowUp
        aria-hidden="true"
        className="shrink-0 text-brand-400"
        size={24}
        weight="regular"
      />
      <span className="flex min-w-0 flex-col gap-1 text-left">
        <Text
          as="span"
          variant="text-sm"
          weight="medium"
          className="text-neutral-900"
        >
          Upload Your Icon
        </Text>
        <Text
          as="span"
          variant="text-xs"
          weight="regular"
          className="text-neutral-600"
        >
          24x24 SVG or PNG
        </Text>
      </span>
      <input
        ref={inputRef}
        type="file"
        accept=".svg,.png,image/svg+xml,image/png"
        className="sr-only"
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
}: Pick<
  DropdownListProps,
  | 'iconOptions'
  | 'onIconSelect'
  | 'onRemoveUploadedIcon'
  | 'onRepeatUploadedIcon'
  | 'onUpload'
  | 'selectedValue'
  | 'uploadedIcon'
>) {
  const isUploadedState = Boolean(uploadedIcon);
  const resolvedIconOptions = iconOptions?.length
    ? iconOptions
    : DEFAULT_ICON_PICKER_ITEMS;

  return (
    <div className="flex flex-col gap-4 p-4">
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
          <IconPickerItem
            key={option.value}
            icon={option.icon}
            label={option.label}
            pressed={option.value === selectedValue}
            onClick={() => onIconSelect?.(option)}
          />
        ))}
      </div>

      <div className="storybook-dropdown-list__icon-picker-separator relative flex h-4 w-full items-center justify-center">
        <span
          aria-hidden="true"
          className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-neutral-200"
        />
        <Text
          as="span"
          variant="text-xs"
          weight="medium"
          className="storybook-dropdown-list__icon-picker-separator-label relative z-[1] bg-neutral-0 px-1 tracking-[0.2em] text-neutral-200"
        >
          OR
        </Text>
      </div>

      {isUploadedState && uploadedIcon ? (
        <div className="flex items-center justify-between gap-2">
          <IconPickerItem
            icon={uploadedIcon}
            label="Uploaded icon"
            pressed
          />
          <span className="inline-flex items-center gap-2">
            <button
              type="button"
              aria-label="Replace uploaded icon"
              className={getIconPickerActionClassName()}
              onClick={onRepeatUploadedIcon}
            >
              <Repeat size={16} weight="regular" />
            </button>
            <button
              type="button"
              aria-label="Delete uploaded icon"
              className={getIconPickerActionClassName(true)}
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

function DropdownListItem({
  index,
  isSelected,
  item,
  label,
  prefix,
  size,
  variant,
  isDisabled,
  isDestructive,
  onSelect,
}: {
  index: number;
  isSelected: boolean;
  item: DropdownListItem;
  label: string;
  prefix: ReactNode;
  size: DropdownListSize;
  variant: string;
  isDisabled: boolean;
  isDestructive: boolean;
  onSelect: (item: DropdownListItem, index: number) => void;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const controlState = getControlState(isDisabled, isHovered);
  const hasControlVariant = usesControlVariant(variant);

  const itemClasses = buildClassName([
    'storybook-dropdown-list__item',
    'box-border flex w-full shrink-0 items-center gap-2 border-0 font-sans',
    getDropdownListItemSizeClasses(size),
    getDropdownListItemClasses({ isActive: isSelected, isDisabled, isDestructive }),
  ]);

  const handleSelect = () => {
    onSelect(item, index);
  };

  const handleControlClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    handleSelect();
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (isDisabled) {
      return;
    }

    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleSelect();
    }
  };

  const content = (
    <>
      {variant === 'icon-left' && (
        <Plug
          className={getDropdownListRowIconClassName(isSelected)}
          size={16}
          weight="regular"
        />
      )}

      {variant === 'checkbox-left' && (
        <CheckBox
          size="sm"
          pressed={isSelected}
          state={controlState}
          aria-label={label}
          tabIndex={-1}
          className="shrink-0"
          onClick={handleControlClick}
        />
      )}

      {variant === 'radio-left' && (
        <RadioButton
          size="sm"
          pressed={isSelected}
          state={controlState}
          aria-label={label}
          tabIndex={-1}
          className="shrink-0"
          onClick={handleControlClick}
        />
      )}

      {prefix && (
        <span
          className="storybook-dropdown-list__prefix inline-flex w-5 shrink-0 items-center justify-center text-ds-text-sm"
          aria-hidden="true"
        >
          {prefix}
        </span>
      )}

      <Text
        as="span"
        variant={getDropdownListTextVariant(size)}
        weight={getDropdownListLabelWeight({ isSelected, variant })}
        color="currentColor"
        className="storybook-dropdown-list__label min-w-px flex-1 overflow-hidden text-ellipsis whitespace-nowrap text-left"
      >
        {label}
      </Text>

      {variant === 'toggle-right' && (
        <Toggle
          size="sm"
          pressed={isSelected}
          state={controlState}
          aria-label={label}
          tabIndex={-1}
          className="ml-auto shrink-0"
          onClick={handleControlClick}
        />
      )}

      {variant === 'icon-right' && (
        <Plug
          className={getDropdownListRowIconClassName(isSelected)}
          size={16}
          weight="regular"
        />
      )}

      {variant === 'check-right' && isSelected && (
        <Check
          className="shrink-0 text-brand-400"
          size={16}
          weight="bold"
        />
      )}
    </>
  );

  if (hasControlVariant) {
    return (
      <div
        role={getItemRole(variant)}
        aria-checked={isSelected}
        aria-disabled={isDisabled || undefined}
        tabIndex={isDisabled ? -1 : 0}
        className={itemClasses}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleSelect}
        onKeyDown={handleKeyDown}
      >
        {content}
      </div>
    );
  }

  return (
    <button
      type="button"
      disabled={isDisabled}
      role="menuitem"
      aria-selected={isSingleSelectVariant(variant) ? isSelected : undefined}
      className={itemClasses}
      onClick={handleSelect}
    >
      {content}
    </button>
  );
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
  size = 'md',
  fullWidth = false,
  className,
  onItemSelect,
  onSelectedValuesChange,
}: DropdownListProps) {
  const [internalSelectedValues, setInternalSelectedValues] = useState(() =>
    getDefaultSelectedValues(items)
  );

  if (variant === 'icon-picker') {
    return (
      <div
        className={buildClassName([
          'storybook-dropdown-list',
          'flex w-[216px] flex-col items-stretch overflow-hidden rounded-2 bg-neutral-0 shadow-md',
        ])}
      >
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

  const handleItemSelect = (item: DropdownListItem, index: number) => {
    const value = getItemValue(item);
    const disabled = typeof item !== 'string' && item.disabled;
    const itemState = typeof item === 'string' ? 'default' : item.state ?? 'default';
    const isDisabled = itemState === 'disabled' || Boolean(disabled);

    if (isDisabled) {
      return;
    }

    if (variant === 'checkbox-left' || variant === 'toggle-right') {
      const nextValues = resolvedSelectedValues.includes(value)
        ? resolvedSelectedValues.filter((selectedValue) => selectedValue !== value)
        : [...resolvedSelectedValues, value];

      updateSelectedValues(nextValues);
    }

    if (isSingleSelectVariant(variant)) {
      updateSelectedValues([value]);
    }

    onItemSelect?.(item, index);
  };

  return (
    <div
      className={buildClassName([
        'storybook-dropdown-list',
        'flex flex-col items-stretch overflow-hidden',
        fullWidth ? 'w-full' : 'w-[240px]',
        'rounded-2 bg-neutral-0 shadow-sm',
        className,
      ])}
      role="menu"
    >
      {items.map((item, index) => {
        const label = getItemLabel(item);
        const value = getItemValue(item);
        const prefix = getItemPrefix(item);
        const itemState = typeof item === 'string' ? 'default' : item.state ?? 'default';
        const isDisabled = itemState === 'disabled' || (typeof item !== 'string' && item.disabled);
        const isDestructive = itemState === 'destructive';
        const isSelected = resolvedSelectedValues.includes(value);

        return (
          <DropdownListItem
            key={`${value}-${index}`}
            index={index}
            isDestructive={isDestructive}
            isDisabled={Boolean(isDisabled)}
            isSelected={isSelected}
            item={item}
            label={label}
            prefix={prefix}
            size={size}
            variant={variant}
            onSelect={handleItemSelect}
          />
        );
      })}
    </div>
  );
}

export type DropdownListVariant = string;
export type DropdownListSize = 'sm' | 'md';
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
  size?: DropdownListSize;
  fullWidth?: boolean;
  className?: string;
  onItemSelect?: (item: DropdownListItem, index: number) => void;
  onRemoveUploadedIcon?: () => void;
  onRepeatUploadedIcon?: () => void;
  onSelectedValuesChange?: (values: string[]) => void;
  onUpload?: (file: File | null) => void;
  uploadedIcon?: ElementType;
}
