// @ts-nocheck
import { useState } from 'react';
import PropTypes from 'prop-types';
import {
  ArrowDown,
  ArrowUp,
  ArrowsClockwise,
  CalendarBlank,
  CaretUpDown,
  Cloud,
  DotsThreeVertical,
  Eye,
  FileText,
  ListChecks,
  MagnifyingGlass,
  PencilSimple,
  Question,
  SealCheck,
  Warning,
} from '@phosphor-icons/react';

import { CheckBox } from '../../atoms/CheckBox';
import { Button } from '../../molecules/Button';
import { Pagination } from '../../molecules/Pagination';
import { Text } from '../../foundations/Typography';
import tableAvatarImage from '../../../assets/superfans-avatar.png';

import './table.css';

const HEADER_ARROWS = ['none', 'down', 'up'];
const TABLE_STATES = ['default', 'hover', 'disabled'];
const CELL_TYPES = [
  'actions',
  'avatar',
  'badge',
  'badges',
  'checkbox',
  'delivery',
  'lead',
  'text',
  'trend',
];
const EMPTY_TYPES = ['search', 'upload', 'error'];
const FILTER_STYLES = ['button-only', 'search-button', 'dropdown-search-button', 'advanced'];
const TABLE_TYPES = ['with-border', 'without-border'];
const TABLE_VIEWS = ['column', 'row'];
const DEFAULT_PAGINATION_TOTAL_PAGES = 10;

const DEFAULT_COLUMNS = [
  { key: 'name', label: 'Name', type: 'lead', width: 'minmax(180px, 2fr)' },
  { key: 'delivery', label: 'Delivery', type: 'delivery', width: 'minmax(140px, 1fr)' },
  { key: 'status', label: 'Status', type: 'badges', width: 'minmax(160px, 1.1fr)' },
  { key: 'updated', label: 'Last updated', type: 'text', width: 'minmax(144px, 1fr)' },
  { key: 'actions', label: 'Actions', type: 'actions', width: 'minmax(96px, 0.6fr)' },
];

const DEFAULT_ROWS = [
  {
    id: 'row-1',
    name: 'Block #3066',
    delivery: 78,
    status: [{ label: 'Published', tone: 'success', icon: 'seal' }],
    updated: 'Jan 10, 2025',
    actionIcon: 'eye',
  },
  {
    id: 'row-2',
    name: 'Block #3066',
    delivery: 68,
    status: [
      { label: 'Draft', tone: 'info', icon: 'file' },
      { label: 'Published', tone: 'success', icon: 'seal' },
    ],
    updated: 'Jan 9, 2025',
    actionIcon: 'edit',
  },
  {
    id: 'row-3',
    name: 'Block #3066',
    delivery: 54,
    status: [{ label: 'Review', tone: 'warning', icon: 'list' }],
    updated: 'Jan 8, 2025',
  },
  {
    id: 'row-4',
    name: 'Block #3066',
    delivery: 84,
    status: [{ label: 'Published', tone: 'success', icon: 'seal' }],
    updated: 'Jan 7, 2025',
    actionIcon: 'edit',
  },
  {
    id: 'row-5',
    name: 'Block #3066',
    delivery: 62,
    status: [{ label: 'Review', tone: 'warning', icon: 'list' }],
    updated: 'Jan 6, 2025',
  },
  {
    id: 'row-6',
    name: 'Block #3066',
    delivery: 74,
    status: [{ label: 'Published', tone: 'success', icon: 'seal' }],
    updated: 'Jan 5, 2025',
  },
  {
    id: 'row-7',
    name: 'Block #3066',
    delivery: 48,
    status: [{ label: 'Draft', tone: 'info', icon: 'file' }],
    updated: 'Jan 4, 2025',
  },
];

function buildClassName(parts) {
  return parts.flat().filter(Boolean).join(' ');
}

function normalizeValue(value, aliases = {}) {
  return aliases[value] ?? value;
}

function getResolvedState(state) {
  return normalizeValue(state, {
    Default: 'default',
    Hover: 'hover',
    Disabled: 'disabled',
  });
}

function getResolvedArrow(arrow) {
  return normalizeValue(arrow, {
    False: 'none',
    None: 'none',
    Down: 'down',
    Up: 'up',
  });
}

function getResolvedFilterStyle(filterStyle) {
  return normalizeValue(filterStyle, {
    'Filter Style 0': 'button-only',
    'Filter Style 1': 'search-button',
    'Filter Style 2': 'dropdown-search-button',
    'Filter Style 3': 'advanced',
    filterStyle0: 'button-only',
    filterStyle1: 'search-button',
    filterStyle2: 'dropdown-search-button',
    filterStyle3: 'advanced',
  });
}

function getResolvedType(type) {
  return normalizeValue(type, {
    'With Border': 'with-border',
    'Without Border': 'without-border',
    withBorder: 'with-border',
    withoutBorder: 'without-border',
  });
}

function getResolvedView(view) {
  return normalizeValue(view, {
    Column: 'column',
    Row: 'row',
  });
}

const TABLE_CHIP_TONE_CLASSES = {
  error: 'bg-error-50 text-error-600',
  success: 'bg-success-50 text-success-700',
  warning: 'bg-warning-50 text-warning-700',
};

const TABLE_EMPTY_ICON_CLASSES = {
  brand: 'bg-brand-50 text-brand-400',
  cloud: 'bg-neutral-100 text-neutral-600',
  warning: 'bg-warning-50 text-warning-700',
};

function getTableHeaderLabelClassName({
  state,
  className,
}) {
  const isDisabled = state === 'disabled';
  const isHover = state === 'hover';

  return buildClassName([
    'inline-flex min-w-0 items-center gap-1',
    isDisabled && 'text-neutral-300',
    !isDisabled && !isHover && 'text-neutral-700',
    isHover && 'text-neutral-800',
    state === 'hover' && 'storybook-table-header-label--hover',
    className,
  ]);
}

function getTableHeaderCellClassName({
  color,
  empty,
}) {
  return buildClassName([
    'storybook-table-header-cell box-border flex h-11 min-w-0 items-center gap-3 border-0 px-6 py-3 last:justify-center last:px-4 max-[900px]:px-4',
    color === 'gray' ? 'bg-neutral-25' : 'bg-neutral-0',
    empty && 'justify-center',
  ]);
}

function getTableCellClassName({
  state,
  style,
}) {
  const isHover = state === 'hover';
  const isDisabled = state === 'disabled';

  return buildClassName([
    'storybook-table-cell box-border flex h-[72px] min-w-0 items-center gap-3 border-0 bg-neutral-0 px-6 py-6 max-[900px]:px-4 max-[900px]:py-5',
    style === 'actions' && 'justify-center gap-2 px-4 py-5',
    (style === 'badge' || style === 'badges') && 'justify-start',
    style === 'lead' && 'text-neutral-800',
    style === 'text' && 'text-neutral-600',
    style === 'trend' && 'text-neutral-600',
    style === 'checkbox' && 'text-neutral-800',
    isHover && 'bg-neutral-50',
    isDisabled && 'bg-neutral-25 text-neutral-300',
    `storybook-table-cell--${style}`,
    isHover && 'storybook-table-cell--hover',
    isDisabled && 'storybook-table-cell--disabled',
  ]);
}

function getFilterInputClassName({
  type,
  wide,
}) {
  return buildClassName([
    'storybook-table-filter-input box-border inline-flex h-[42px] min-w-0 items-center gap-2 rounded-2 border border-solid border-neutral-100 bg-neutral-0 px-3 py-2.5 text-neutral-600 focus-within:outline-none focus-within:shadow-focus-brand max-[640px]:max-w-none',
    wide ? 'w-full max-w-[240px]' : 'w-full max-w-[200px]',
  ]);
}

function getTableActionButtonClassName() {
  return buildClassName([
    'storybook-table-action inline-flex size-7 items-center justify-center rounded-2 border-0 bg-transparent p-1 text-neutral-600',
    'hover:bg-neutral-50 hover:text-neutral-800',
    'focus-visible:outline-none focus-visible:shadow-focus-brand',
  ]);
}

export function TableHeader({
  label = 'Company',
  arrow = 'none',
  helpIcon = false,
  state = 'default',
  className,
}) {
  const resolvedArrow = getResolvedArrow(arrow);
  const resolvedState = getResolvedState(state);
  const ArrowIcon = resolvedArrow === 'up' ? ArrowUp : ArrowDown;

  return (
    <span
      className={getTableHeaderLabelClassName({
        state: resolvedState,
        className,
      })}
    >
      <Text
        as="span"
        variant="text-xs"
        weight="semibold"
        color="currentColor"
      >
        {label}
      </Text>
      {helpIcon && (
        <Question
          aria-hidden="true"
          className="size-4 shrink-0"
          size={16}
          weight="regular"
        />
      )}
      {resolvedArrow !== 'none' && (
        <ArrowIcon
          aria-hidden="true"
          className="size-4 shrink-0"
          size={16}
          weight="regular"
        />
      )}
    </span>
  );
}

TableHeader.propTypes = {
  label: PropTypes.string,
  arrow: PropTypes.oneOf([...HEADER_ARROWS, 'False', 'None', 'Down', 'Up']),
  helpIcon: PropTypes.bool,
  state: PropTypes.oneOf([...TABLE_STATES, 'Default', 'Hover', 'Disabled']),
  className: PropTypes.string,
};

export function TableHeaderCell({
  label = 'Company',
  arrow = 'none',
  checkbox = false,
  color = 'white',
  helpIcon = false,
  text = true,
  state = 'default',
}) {
  const resolvedColor = normalizeValue(color, {
    White: 'white',
    Gray: 'gray',
  });

  return (
    <div
      className={getTableHeaderCellClassName({
        color: resolvedColor,
        empty: !text,
      })}
      role="columnheader"
    >
      {checkbox && <CheckBox size="mid" />}
      {text && (
        <TableHeader
          arrow={arrow}
          helpIcon={helpIcon}
          label={label}
          state={state}
        />
      )}
    </div>
  );
}

TableHeaderCell.propTypes = {
  label: PropTypes.string,
  arrow: PropTypes.oneOf([...HEADER_ARROWS, 'False', 'None', 'Down', 'Up']),
  checkbox: PropTypes.bool,
  color: PropTypes.oneOf(['white', 'gray', 'White', 'Gray']),
  helpIcon: PropTypes.bool,
  text: PropTypes.bool,
  state: PropTypes.oneOf([...TABLE_STATES, 'Default', 'Hover', 'Disabled']),
};

function StatusIcon({ icon }) {
  const iconProps = {
    'aria-hidden': true,
    className: 'size-3 shrink-0',
    size: 12,
    weight: 'regular',
  };

  switch (icon) {
    case 'file':
      return <FileText {...iconProps} />;
    case 'list':
      return <ListChecks {...iconProps} />;
    case 'seal':
      return <SealCheck {...iconProps} />;
    default:
      return null;
  }
}

StatusIcon.propTypes = {
  icon: PropTypes.oneOf(['file', 'list', 'seal']),
};

function TableChip({
  icon,
  label = 'Active',
  tone = 'success',
}) {
  return (
    <span className={buildClassName([
      'inline-flex items-center justify-center gap-1 rounded-2 px-2 py-1',
      tone === 'info'
        ? 'storybook-table-chip--info'
        : (TABLE_CHIP_TONE_CLASSES[tone] ?? TABLE_CHIP_TONE_CLASSES.success),
    ])}>
      {icon && <StatusIcon icon={icon} />}
      <Text
        as="span"
        variant="text-xs"
        weight="medium"
        color="currentColor"
        className="shrink-0"
      >
        {label}
      </Text>
    </span>
  );
}

TableChip.propTypes = {
  icon: PropTypes.oneOf(['file', 'list', 'seal']),
  label: PropTypes.string,
  tone: PropTypes.oneOf(['error', 'info', 'success', 'warning']),
};

function DeliveryBar({ value = 72 }) {
  const green = Math.max(20, Math.min(value, 88));
  const warning = 18;
  const error = 10;

  return (
    <span className="flex h-2 w-full overflow-hidden rounded-4">
      <span
        className="storybook-table-delivery__segment bg-success-300"
        style={{ flexGrow: green }}
      />
      <span
        className="storybook-table-delivery__segment bg-warning-200"
        style={{ flexGrow: warning }}
      />
      <span
        className="storybook-table-delivery__segment bg-error-500"
        style={{ flexGrow: error }}
      />
    </span>
  );
}

DeliveryBar.propTypes = {
  value: PropTypes.number,
};

function AvatarBlock({
  supportingText = false,
  value = 'Olivia Rhye',
  supportingValue = 'olivia@untitledui.com',
}) {
  return (
    <span className="inline-flex min-w-0 items-center gap-3">
      <img
        alt=""
        aria-hidden="true"
        className="size-10 shrink-0 rounded-full object-cover object-center"
        src={tableAvatarImage}
      />
      <span className="flex min-w-0 flex-col text-neutral-800">
        <Text
          as="span"
          variant="text-sm"
          weight="medium"
          color="currentColor"
          className="min-w-0 overflow-hidden text-ellipsis whitespace-nowrap"
        >
          {value}
        </Text>
        {supportingText && (
          <Text
            as="span"
            variant="text-sm"
            weight="regular"
            color="currentColor"
            className="min-w-0 overflow-hidden text-ellipsis whitespace-nowrap text-neutral-600"
          >
            {supportingValue}
          </Text>
        )}
      </span>
    </span>
  );
}

AvatarBlock.propTypes = {
  supportingText: PropTypes.bool,
  value: PropTypes.string,
  supportingValue: PropTypes.string,
};

function ActionButtons({ actionIcon = 'eye' }) {
  const FirstIcon = actionIcon === 'edit' ? PencilSimple : Eye;

  return (
    <span className="inline-flex items-center gap-1">
      <button type="button" className={getTableActionButtonClassName()} aria-label={actionIcon === 'edit' ? 'Edit' : 'View'}>
        <FirstIcon size={20} weight="regular" />
      </button>
      <button type="button" className={getTableActionButtonClassName()} aria-label="More actions">
        <DotsThreeVertical size={20} weight="bold" />
      </button>
    </span>
  );
}

ActionButtons.propTypes = {
  actionIcon: PropTypes.oneOf(['edit', 'eye']),
};

export function TableCell({
  actionIcon = 'eye',
  badges,
  deliveryValue,
  state = 'default',
  style = 'lead',
  supportingText = false,
  supportingValue,
  trend = '20%',
  value = 'Olivia Rhye',
}) {
  const resolvedState = getResolvedState(state);
  const resolvedStyle = normalizeValue(style, {
    'Action icons': 'actions',
    Badge: 'badge',
    'Badges multiple': 'badges',
    'Delivery Status': 'delivery',
    'Lead avatar': 'avatar',
    'Lead checkbox': 'checkbox',
    'Lead text': 'lead',
    Text: 'text',
    'Trend positive': 'trend',
  });
  const resolvedBadges = badges ?? [{ label: 'Active', tone: 'success' }];

  return (
    <div
      className={getTableCellClassName({
        state: resolvedState,
        style: resolvedStyle,
      })}
      role="cell"
    >
      {resolvedStyle === 'lead' && (
        <Text
          as="span"
          variant="text-sm"
          weight="semibold"
          color="currentColor"
          className="min-w-0 overflow-hidden text-ellipsis whitespace-nowrap"
        >
          {value}
        </Text>
      )}
      {resolvedStyle === 'text' && (
        <Text
          as="span"
          variant="text-sm"
          weight="regular"
          color="currentColor"
          className="min-w-0 overflow-hidden text-ellipsis whitespace-nowrap"
        >
          {value}
        </Text>
      )}
      {resolvedStyle === 'checkbox' && (
        <>
          <CheckBox size="sm" />
          <Text
            as="span"
            variant="text-sm"
            weight="semibold"
            color="currentColor"
            className="min-w-0 overflow-hidden text-ellipsis whitespace-nowrap"
          >
            {value}
          </Text>
        </>
      )}
      {resolvedStyle === 'avatar' && (
        <AvatarBlock
          supportingText={supportingText}
          supportingValue={supportingValue}
          value={value}
        />
      )}
      {resolvedStyle === 'badge' && (
        <TableChip
          icon={resolvedBadges[0]?.icon}
          label={resolvedBadges[0]?.label}
          tone={resolvedBadges[0]?.tone}
        />
      )}
      {resolvedStyle === 'badges' && (
        <span className="inline-flex min-w-0 items-center gap-1">
          {resolvedBadges.map((badge, index) => (
            <TableChip
              key={`${badge.label}-${index}`}
              icon={badge.icon}
              label={badge.label}
              tone={badge.tone}
            />
          ))}
        </span>
      )}
      {resolvedStyle === 'trend' && (
        <>
          {supportingText && (
            <Text
              as="span"
              variant="text-sm"
              weight="regular"
              color="currentColor"
            >
              {value}
            </Text>
          )}
          <TableChip
            icon="seal"
            label={trend}
            tone="success"
          />
        </>
      )}
      {resolvedStyle === 'delivery' && <DeliveryBar value={deliveryValue} />}
      {resolvedStyle === 'actions' && <ActionButtons actionIcon={actionIcon} />}
    </div>
  );
}

TableCell.propTypes = {
  actionIcon: PropTypes.oneOf(['edit', 'eye']),
  badges: PropTypes.arrayOf(PropTypes.shape({
    icon: PropTypes.oneOf(['file', 'list', 'seal']),
    label: PropTypes.string,
    tone: PropTypes.oneOf(['error', 'info', 'success', 'warning']),
  })),
  deliveryValue: PropTypes.number,
  state: PropTypes.oneOf([...TABLE_STATES, 'Default', 'Hover', 'Disabled']),
  style: PropTypes.oneOf([...CELL_TYPES, 'Action icons', 'Badge', 'Badges multiple', 'Delivery Status', 'Lead avatar', 'Lead checkbox', 'Lead text', 'Text', 'Trend positive']),
  supportingText: PropTypes.bool,
  supportingValue: PropTypes.string,
  trend: PropTypes.string,
  value: PropTypes.string,
};

function FilterInput({
  icon,
  label,
  type = 'search',
  wide = false,
}) {
  const Icon = icon;

  return (
    <span className={getFilterInputClassName({ type, wide })}>
      {Icon && <Icon className="size-5 shrink-0" size={20} weight="regular" />}
      <Text
        as="span"
        variant="text-sm"
        weight="regular"
        color="currentColor"
        className="min-w-0 flex-[1_1_0] overflow-hidden text-ellipsis whitespace-nowrap text-neutral-300"
      >
        {label}
      </Text>
      {type === 'select' && <CaretUpDown className="size-5 shrink-0" size={20} weight="regular" />}
      {type === 'date' && <CalendarBlank className="size-5 shrink-0" size={20} weight="regular" />}
    </span>
  );
}

FilterInput.propTypes = {
  icon: PropTypes.elementType,
  label: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['date', 'search', 'select']),
  wide: PropTypes.bool,
};

export function TableFilters({
  buttonLabel = 'Button',
  filterStyle = 'search-button',
  showButton = true,
  showSearch = true,
  title = 'Account',
}) {
  const resolvedStyle = getResolvedFilterStyle(filterStyle);
  const showSelect = ['dropdown-search-button', 'advanced'].includes(resolvedStyle);
  const showDate = resolvedStyle === 'advanced';
  const showRefresh = resolvedStyle === 'advanced';

  return (
    <div className="flex w-full max-w-[1257px] items-center justify-between gap-4 max-[900px]:flex-col max-[900px]:items-start">
      <Text
        as="h2"
        variant="display-xs"
        weight="semibold"
        className="shrink-0 text-neutral-900"
      >
        {title}
      </Text>
      <div className="flex min-w-0 flex-wrap items-center justify-end gap-4 max-[900px]:w-full max-[900px]:justify-start">
        {showSearch && resolvedStyle !== 'button-only' && resolvedStyle !== 'advanced' && !showSelect && (
          <FilterInput
            icon={MagnifyingGlass}
            label="Search"
            wide
          />
        )}
        {showSearch && showSelect && (
          <FilterInput
            label="Click to select"
            type="select"
          />
        )}
        {showSearch && ['dropdown-search-button', 'advanced'].includes(resolvedStyle) && (
          <FilterInput
            icon={MagnifyingGlass}
            label="Search"
          />
        )}
        {showSearch && showDate && (
          <FilterInput
            label="DD/MM/YYYY"
            type="date"
          />
        )}
        {showButton && showRefresh && (
          <button
            type="button"
            className="storybook-table-icon-button inline-flex size-[42px] cursor-pointer items-center justify-center rounded-2 border border-solid border-neutral-100 bg-neutral-0 p-1 text-neutral-600 hover:bg-neutral-50 hover:text-neutral-800 focus-visible:outline-none focus-visible:shadow-focus-brand"
            aria-label="Refresh filters"
          >
            <ArrowsClockwise size={20} weight="regular" />
          </button>
        )}
        {showButton && !showRefresh && (
          <Button
            hierarchy="primary"
            icon="left"
            label={buttonLabel}
            size="medium"
          />
        )}
        {showButton && showRefresh && (
          <button
            type="button"
            className="storybook-table-clear cursor-pointer rounded-2 border-0 bg-transparent p-0 font-sans text-ds-text-sm font-semibold text-brand-400 focus-visible:outline-none focus-visible:shadow-focus-brand"
          >
            Clear Filters
          </button>
        )}
      </div>
    </div>
  );
}

TableFilters.propTypes = {
  buttonLabel: PropTypes.string,
  filterStyle: PropTypes.oneOf([...FILTER_STYLES, 'Filter Style 0', 'Filter Style 1', 'Filter Style 2', 'Filter Style 3', 'filterStyle0', 'filterStyle1', 'filterStyle2', 'filterStyle3']),
  showButton: PropTypes.bool,
  showSearch: PropTypes.bool,
  title: PropTypes.string,
};

export function TableEmptyState({
  type = 'search',
}) {
  const resolvedType = normalizeValue(type, {
    Search: 'search',
    Upload: 'upload',
    Error: 'error',
  });
  const config = {
    error: {
      icon: Warning,
      iconTone: 'warning',
      title: 'Something went wrong...',
      description: 'We had some trouble loading this page. Please refresh the page to try again or get in touch if the problem sticks around!',
      secondaryLabel: 'Contact support',
      primaryLabel: 'Refresh page',
    },
    search: {
      icon: MagnifyingGlass,
      iconTone: 'brand',
      title: 'No vendors found',
      description: 'Your search "Stripe" did not match any vendors. Please try again or create add a new vendor.',
      secondaryLabel: 'Clear search',
      primaryLabel: 'Add vendor',
      primaryIcon: 'left',
    },
    upload: {
      icon: Cloud,
      iconTone: 'cloud',
      title: 'Start by uploading a file',
      description: 'Any assets used in projects will live here. Start creating by uploading your files.',
      secondaryLabel: 'Support article',
      primaryLabel: 'Upload',
      primaryIcon: 'left',
    },
  }[resolvedType];
  const Icon = config.icon;

  return (
    <div className="flex min-h-[240px] flex-col items-center justify-center gap-6 bg-neutral-0 px-8 pb-12 pt-10 text-center">
      <div className={buildClassName([
        'inline-flex size-12 items-center justify-center rounded-[28px]',
        TABLE_EMPTY_ICON_CLASSES[config.iconTone],
      ])}>
        <Icon size={24} weight="regular" />
      </div>
      <div className="flex w-[352px] flex-col gap-1">
        <Text
          as="h3"
          variant="text-md"
          weight="semibold"
          className="text-neutral-900"
        >
          {config.title}
        </Text>
        <Text
          as="p"
          variant="text-sm"
          weight="regular"
          className="text-neutral-600"
        >
          {config.description}
        </Text>
      </div>
      <div className="grid w-[352px] grid-cols-2 gap-3">
        <Button
          hierarchy="secondary"
          label={config.secondaryLabel}
          size="medium"
        />
        <Button
          hierarchy="primary"
          icon={config.primaryIcon ?? 'none'}
          label={config.primaryLabel}
          size="medium"
        />
      </div>
    </div>
  );
}

TableEmptyState.propTypes = {
  type: PropTypes.oneOf([...EMPTY_TYPES, 'Search', 'Upload', 'Error']),
};

export function Table({
  columns = DEFAULT_COLUMNS,
  currentPage,
  defaultCurrentPage = 1,
  onNext,
  onPageChange,
  onPrevious,
  paginationAlignment = 'right',
  paginationBreakpoint = 'desktop',
  paginationTotalPages = DEFAULT_PAGINATION_TOTAL_PAGES,
  paginationPages,
  rows = DEFAULT_ROWS,
  showPagination = true,
  type = 'without-border',
  view = 'column',
}) {
  const resolvedType = getResolvedType(type);
  const resolvedView = getResolvedView(view);
  const [internalCurrentPage, setInternalCurrentPage] = useState(defaultCurrentPage);
  const activePage = currentPage ?? internalCurrentPage;
  const gridTemplateColumns = columns.map((column) => column.width ?? 'minmax(140px, 1fr)').join(' ');
  const firstPage = 1;
  const lastPage = paginationTotalPages;
  const activePageNumber = Number(activePage);
  const updatePage = (nextPage) => {
    const normalizedPage = Number(nextPage);

    if (!Number.isFinite(normalizedPage)) {
      return;
    }

    if (currentPage === undefined) {
      setInternalCurrentPage(normalizedPage);
    }

    onPageChange?.(normalizedPage);
  };
  const handlePrevious = () => {
    const previousPage = Math.max(firstPage, (Number.isFinite(activePageNumber) ? activePageNumber : firstPage) - 1);

    updatePage(previousPage);
    onPrevious?.(previousPage);
  };
  const handleNext = () => {
    const nextPage = Math.min(lastPage, (Number.isFinite(activePageNumber) ? activePageNumber : firstPage) + 1);

    updatePage(nextPage);
    onNext?.(nextPage);
  };

  return (
    <section className={buildClassName([
      'storybook-table box-border w-full min-w-0 max-w-full overflow-hidden rounded-2 border border-solid border-neutral-100 bg-neutral-0',
      `storybook-table--${resolvedType}`,
      `storybook-table--${resolvedView}`,
    ])}>
      <div className="w-full overflow-x-auto">
        <div
          className={buildClassName([
            'storybook-table__grid grid w-full min-w-[720px] bg-neutral-100 max-[900px]:min-w-[640px]',
            resolvedType === 'with-border' ? 'gap-px' : 'gap-y-px',
          ])}
          style={{ gridTemplateColumns }}
          role="table"
        >
          <div className="storybook-table__header-row" role="row">
            {columns.map((column) => (
              <TableHeaderCell
                key={column.key}
                arrow={column.arrow}
                checkbox={column.checkbox}
                color={resolvedView === 'row' ? 'gray' : 'white'}
                helpIcon={column.helpIcon}
                label={column.label}
              />
            ))}
          </div>
          {rows.map((row) => (
            <div
              key={row.id}
              className={buildClassName([
                'storybook-table__row',
                row.state === 'hover' && 'storybook-table__row--hover',
              ])}
              role="row"
            >
              {columns.map((column) => (
                <TableCell
                  key={`${row.id}-${column.key}`}
                  actionIcon={row.actionIcon}
                  badges={row[column.key]}
                  deliveryValue={row[column.key]}
                  state={row.state ?? 'default'}
                  style={column.type}
                  value={row[column.key] ?? row.name}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
      {showPagination && (
        <Pagination
          alignment={paginationAlignment}
          breakpoint={paginationBreakpoint}
          currentPage={activePage}
          className="storybook-table__pagination max-w-full border-t border-solid border-neutral-100 px-6 pb-4 pt-3 max-[900px]:justify-start max-[900px]:px-4"
          nextDisabled={Number.isFinite(activePageNumber) && activePageNumber >= lastPage}
          onNext={handleNext}
          onPageChange={updatePage}
          onPrevious={handlePrevious}
          totalPages={paginationTotalPages}
          {...(paginationPages ? { pages: paginationPages } : {})}
          previousDisabled={Number.isFinite(activePageNumber) && activePageNumber <= firstPage}
        />
      )}
    </section>
  );
}

const columnShape = PropTypes.shape({
  arrow: PropTypes.oneOf([...HEADER_ARROWS, 'False', 'None', 'Down', 'Up']),
  checkbox: PropTypes.bool,
  helpIcon: PropTypes.bool,
  key: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.oneOf(CELL_TYPES),
  width: PropTypes.string,
});

Table.propTypes = {
  columns: PropTypes.arrayOf(columnShape),
  currentPage: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  defaultCurrentPage: PropTypes.number,
  onNext: PropTypes.func,
  onPageChange: PropTypes.func,
  onPrevious: PropTypes.func,
  paginationAlignment: PropTypes.oneOf(['left', 'center', 'right']),
  paginationBreakpoint: PropTypes.oneOf(['desktop', 'mobile']),
  paginationPages: PropTypes.arrayOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ])),
  paginationTotalPages: PropTypes.number,
  rows: PropTypes.arrayOf(PropTypes.object),
  showPagination: PropTypes.bool,
  type: PropTypes.oneOf([...TABLE_TYPES, 'With Border', 'Without Border', 'withBorder', 'withoutBorder']),
  view: PropTypes.oneOf([...TABLE_VIEWS, 'Column', 'Row']),
};
