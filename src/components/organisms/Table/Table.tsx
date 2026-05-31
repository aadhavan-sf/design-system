// @ts-nocheck
import { useState } from 'react';
import PropTypes from 'prop-types';
import {
  ArrowDown,
  ArrowUp,
  ArrowsClockwise,
  CalendarBlank,
  CaretUpDown,
  CloudArrowDown,
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
const DEFAULT_PAGINATION_PAGES = ['1', '2', '3', '...', '8', '9', '10'];

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
    state: 'hover',
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

const cloudIconBackground = {
  background:
    'radial-gradient(circle at 50% 40%, rgba(255, 255, 255, 0.8) 0 32%, transparent 34%), linear-gradient(135deg, var(--neutral_100) 0%, var(--neutral_300) 100%)',
};

function buildClassName(parts) {
  return parts.filter(Boolean).join(' ');
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
      className={buildClassName([
        'inline-flex min-w-0 items-center gap-1 text-neutral-700',
        resolvedState === 'disabled' && 'text-neutral-300',
        className,
      ])}
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
          className="shrink-0"
          size={16}
          weight="regular"
        />
      )}
      {resolvedArrow !== 'none' && (
        <ArrowIcon
          aria-hidden="true"
          className="shrink-0"
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
  className,
}) {
  const resolvedColor = normalizeValue(color, {
    White: 'white',
    Gray: 'gray',
  });

  return (
    <div
      className={buildClassName([
        'box-border flex h-11 min-w-0 items-center gap-3 border-b border-solid border-neutral-200 bg-neutral-00 px-6 py-3',
        resolvedColor === 'gray' && 'bg-neutral-25',
        !text && 'justify-center',
        className,
      ])}
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
  className: PropTypes.string,
};

function StatusIcon({ icon }) {
  const iconProps = {
    'aria-hidden': true,
    className: 'shrink-0',
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
    <span
      className={buildClassName([
        'inline-flex items-center justify-center gap-1 rounded-2 px-2 py-1',
        tone === 'error' && 'bg-error-50 text-error-600',
        tone === 'info' && 'bg-information-50 text-information-700',
        tone === 'success' && 'bg-success-50 text-success-700',
        tone === 'warning' && 'bg-warning-50 text-warning-700',
      ])}
    >
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
        className="bg-success-300"
        style={{ flexGrow: green }}
      />
      <span
        className="bg-warning-200"
        style={{ flexGrow: warning }}
      />
      <span
        className="bg-error-500"
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
      <span className="h-10 w-10 shrink-0 rounded-full bg-[radial-gradient(circle_at_48%_35%,#2d1f18_0_16%,transparent_17%),radial-gradient(circle_at_50%_88%,#8b4f3a_0_34%,transparent_35%),linear-gradient(135deg,#f6d5bf_0%,#c88361_100%)]" aria-hidden="true" />
      <span className="flex min-w-0 flex-col">
        <Text
          as="span"
          variant="text-sm"
          weight="medium"
          color="var(--neutral_800)"
          className="min-w-0 overflow-hidden text-ellipsis whitespace-nowrap"
        >
          {value}
        </Text>
        {supportingText && (
          <Text
            as="span"
            variant="text-sm"
            weight="regular"
            color="var(--neutral_600)"
            className="min-w-0 overflow-hidden text-ellipsis whitespace-nowrap"
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
      <button type="button" className="inline-flex h-7 w-7 cursor-pointer items-center justify-center rounded-2 border-0 bg-transparent p-1 text-neutral-600 enabled:hover:bg-neutral-50 enabled:hover:text-neutral-800 focus-visible:outline-none focus-visible:shadow-focus-brand" aria-label={actionIcon === 'edit' ? 'Edit' : 'View'}>
        <FirstIcon size={20} weight="regular" />
      </button>
      <button type="button" className="inline-flex h-7 w-7 cursor-pointer items-center justify-center rounded-2 border-0 bg-transparent p-1 text-neutral-600 enabled:hover:bg-neutral-50 enabled:hover:text-neutral-800 focus-visible:outline-none focus-visible:shadow-focus-brand" aria-label="More actions">
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
  className,
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
      className={buildClassName([
        'box-border flex h-[72px] min-w-0 items-center gap-3 border-b border-solid border-neutral-200 bg-neutral-00 p-6',
        resolvedStyle === 'actions' && 'justify-center gap-2 px-4 py-5',
        (resolvedStyle === 'badge' || resolvedStyle === 'badges') && 'justify-start',
        resolvedState === 'hover' && 'bg-neutral-50',
        resolvedState === 'disabled' && 'bg-neutral-25 text-neutral-300',
        className,
      ])}
      role="cell"
    >
      {resolvedStyle === 'lead' && (
        <Text
          as="span"
          variant="text-sm"
          weight="semibold"
          color="var(--neutral_800)"
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
          color="var(--neutral_600)"
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
            color="var(--neutral_800)"
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
              color="var(--neutral_600)"
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
  className: PropTypes.string,
};

function FilterInput({
  icon,
  label,
  type = 'search',
}) {
  const Icon = icon;

  return (
    <span className={buildClassName([
      'box-border inline-flex h-[42px] w-[min(200px,100%)] items-center gap-2 rounded-2 border border-solid border-neutral-200 bg-neutral-00 px-3 py-[10px] text-neutral-600 focus-within:outline-none focus-within:shadow-focus-brand',
      type === 'search' && 'first:w-[min(240px,100%)]',
    ])}>
      {Icon && <Icon size={20} weight="regular" />}
      <Text
        as="span"
        variant="text-sm"
        weight="regular"
        color="var(--neutral_300)"
        className="min-w-0 flex-1 basis-0 overflow-hidden text-ellipsis whitespace-nowrap"
      >
        {label}
      </Text>
      {type === 'select' && <CaretUpDown size={20} weight="regular" />}
      {type === 'date' && <CalendarBlank size={20} weight="regular" />}
    </span>
  );
}

FilterInput.propTypes = {
  icon: PropTypes.elementType,
  label: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['date', 'search', 'select']),
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
        color="var(--neutral_900)"
        className="shrink-0"
      >
        {title}
      </Text>
      <div className="flex min-w-0 flex-wrap items-center justify-end gap-4 max-[900px]:w-full max-[900px]:justify-start">
        {showSearch && resolvedStyle !== 'button-only' && resolvedStyle !== 'advanced' && !showSelect && (
          <FilterInput
            icon={MagnifyingGlass}
            label="Search"
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
          <button type="button" className="inline-flex h-[42px] w-[42px] cursor-pointer items-center justify-center rounded-2 border border-solid border-neutral-200 bg-neutral-00 p-1 text-neutral-600 enabled:hover:bg-neutral-50 enabled:hover:text-neutral-800 focus-visible:outline-none focus-visible:shadow-focus-brand" aria-label="Refresh filters">
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
          <button type="button" className="cursor-pointer rounded-2 border-0 bg-transparent p-0 font-sans text-sm font-semibold leading-normal text-primary-400 focus-visible:outline-none focus-visible:shadow-focus-brand">
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
      icon: CloudArrowDown,
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
    <div className="flex min-h-60 flex-col items-center justify-center gap-6 bg-neutral-00 px-8 pb-12 pt-10 text-center">
      <div
        className={buildClassName([
          'inline-flex h-12 w-12 items-center justify-center rounded-[28px]',
          config.iconTone === 'brand' && 'bg-primary-50 text-primary-400',
          config.iconTone === 'cloud' && 'text-neutral-00 shadow-xl',
          config.iconTone === 'warning' && 'bg-warning-50 text-warning-700',
        ])}
        style={config.iconTone === 'cloud' ? cloudIconBackground : undefined}
      >
        <Icon size={24} weight="regular" />
      </div>
      <div className="flex w-[352px] flex-col gap-1 [&_p]:m-0">
        <Text
          as="h3"
          variant="text-md"
          weight="semibold"
          color="var(--neutral_900)"
        >
          {config.title}
        </Text>
        <Text
          as="p"
          variant="text-sm"
          weight="regular"
          color="var(--neutral_600)"
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
  paginationPages = DEFAULT_PAGINATION_PAGES,
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
  const selectablePages = paginationPages
    .map((page) => Number(page))
    .filter((page) => Number.isFinite(page));
  const firstPage = selectablePages[0] ?? 1;
  const lastPage = selectablePages[selectablePages.length - 1] ?? firstPage;
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
    <section className="box-border w-full min-w-0 max-w-full overflow-hidden rounded-2 border border-solid border-neutral-200 bg-neutral-00">
      <div className="w-full overflow-x-auto">
        <div
          className="grid w-full min-w-[720px] max-[900px]:min-w-[640px]"
          style={{ gridTemplateColumns }}
          role="table"
        >
          <div className="contents" role="row">
            {columns.map((column, columnIndex) => (
              <TableHeaderCell
                key={column.key}
                arrow={column.arrow}
                checkbox={column.checkbox}
                color={resolvedView === 'row' ? 'gray' : 'white'}
                helpIcon={column.helpIcon}
                label={column.label}
                className={buildClassName([
                  resolvedType === 'with-border' && columnIndex < columns.length - 1 && 'border-r border-solid border-neutral-200',
                  columnIndex === columns.length - 1 && 'justify-center px-4',
                ])}
              />
            ))}
          </div>
          {rows.map((row) => (
            <div
              key={row.id}
              className="contents"
              role="row"
            >
              {columns.map((column, columnIndex) => (
                <TableCell
                  key={`${row.id}-${column.key}`}
                  actionIcon={row.actionIcon}
                  badges={row[column.key]}
                  deliveryValue={row[column.key]}
                  state={row.state ?? 'default'}
                  style={column.type}
                  value={row[column.key] ?? row.name}
                  className={buildClassName([
                    row.state === 'hover' && 'bg-neutral-50',
                    resolvedType === 'with-border' && columnIndex < columns.length - 1 && 'border-r border-solid border-neutral-200',
                    row === rows[rows.length - 1] && 'border-b-0',
                  ])}
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
          className="max-w-full px-6 pb-4 pt-3 max-[900px]:justify-start max-[900px]:px-4"
          nextDisabled={Number.isFinite(activePageNumber) && activePageNumber >= lastPage}
          onNext={handleNext}
          onPageChange={updatePage}
          onPrevious={handlePrevious}
          pages={paginationPages}
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
  rows: PropTypes.arrayOf(PropTypes.object),
  showPagination: PropTypes.bool,
  type: PropTypes.oneOf([...TABLE_TYPES, 'With Border', 'Without Border', 'withBorder', 'withoutBorder']),
  view: PropTypes.oneOf([...TABLE_VIEWS, 'Column', 'Row']),
};
