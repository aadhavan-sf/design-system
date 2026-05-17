import PropTypes from 'prop-types';
import { useState } from 'react';
import { ArrowLeft, ArrowRight } from '@phosphor-icons/react';

import { Text } from '../../foundations/Typography';

import './pagination.css';

const HIERARCHIES = ['leading', 'middle', 'trailing'];
const ICON_OPTIONS = ['false', 'only', 'true'];
const BUTTON_STATES = ['default', 'active-hover', 'focused'];
const ALIGNMENTS = ['left', 'center', 'right'];
const BREAKPOINTS = ['desktop', 'mobile'];

const desktopItems = ['1', '2', '3', '...', '8', '9', '10'];
const mobileItems = ['1', '2', '...', '9', '10'];

function normalizeValue(value, aliases = {}) {
  return aliases[value] ?? value;
}

function buildClassName(parts) {
  return parts.filter(Boolean).join(' ');
}

function getDisplayLabel({ hierarchy, icon, label }) {
  if (label) {
    return label;
  }

  if (hierarchy === 'leading' && icon === 'true') {
    return 'Previous';
  }

  if (hierarchy === 'trailing' && icon === 'true') {
    return 'Next';
  }

  return '1';
}

function PaginationDivider() {
  return <span className="storybook-pagination__divider" aria-hidden="true" />;
}

export function PaginationButton({
  hierarchy = 'middle',
  icon = 'false',
  state = 'default',
  label,
  active = false,
  className,
  ...props
}) {
  const normalizedHierarchy = normalizeValue(hierarchy, {
    Leading: 'leading',
    Middle: 'middle',
    Trailing: 'trailing',
  });
  const normalizedIcon = normalizeValue(icon, {
    False: 'false',
    Only: 'only',
    True: 'true',
  });
  const normalizedState = normalizeValue(state, {
    Default: 'default',
    'Active/hover': 'active-hover',
    Focused: 'focused',
  });
  const hasIcon =
    normalizedIcon === 'only' || normalizedIcon === 'true';
  const isIconOnly = normalizedIcon === 'only';
  const isActive =
    active || normalizedState === 'active-hover';
  const displayLabel = getDisplayLabel({
    hierarchy: normalizedHierarchy,
    icon: normalizedIcon,
    label,
  });

  return (
    <button
      type="button"
      className={buildClassName([
        'storybook-pagination-button',
        `storybook-pagination-button--${normalizedHierarchy}`,
        isIconOnly && 'storybook-pagination-button--icon-only',
        isActive && 'storybook-pagination-button--active',
        normalizedState === 'focused' && 'storybook-pagination-button--focused',
        className,
      ])}
      {...props}
    >
      {hasIcon && normalizedHierarchy === 'leading' && (
        <ArrowLeft
          className="storybook-pagination-button__icon"
          size={20}
          weight="regular"
        />
      )}
      {!isIconOnly && (
        <Text
          as="span"
          variant="text-sm"
          weight="medium"
          color="currentColor"
          className="storybook-pagination-button__label"
        >
          {displayLabel}
        </Text>
      )}
      {hasIcon && normalizedHierarchy === 'trailing' && (
        <ArrowRight
          className="storybook-pagination-button__icon"
          size={20}
          weight="regular"
        />
      )}
    </button>
  );
}

PaginationButton.propTypes = {
  hierarchy: PropTypes.oneOf([
    ...HIERARCHIES,
    'Leading',
    'Middle',
    'Trailing',
  ]),
  icon: PropTypes.oneOf([
    ...ICON_OPTIONS,
    'False',
    'Only',
    'True',
  ]),
  state: PropTypes.oneOf([
    ...BUTTON_STATES,
    'Default',
    'Active/hover',
    'Focused',
  ]),
  label: PropTypes.string,
  active: PropTypes.bool,
  className: PropTypes.string,
  onClick: PropTypes.func,
};

export function Pagination({
  alignment = 'right',
  breakpoint = 'desktop',
  currentPage,
  defaultCurrentPage = 1,
  disabled = false,
  pages,
  className,
  nextDisabled = false,
  onClick,
  onPageChange,
  onNext,
  onPrevious,
  previousDisabled = false,
}) {
  const [internalCurrentPage, setInternalCurrentPage] = useState(defaultCurrentPage);
  const isControlled = currentPage !== undefined;
  const normalizedAlignment = normalizeValue(alignment, {
    'Card button group right aligned': 'right',
    'Card button group left aligned': 'left',
    'Card button group center aligned': 'center',
  });
  const normalizedBreakpoint = normalizeValue(breakpoint, {
    Desktop: 'desktop',
    Mobile: 'mobile',
  });
  const displayedPages =
    pages ?? (normalizedBreakpoint === 'mobile' ? mobileItems : desktopItems);
  const isMobile = normalizedBreakpoint === 'mobile';
  const resolvedCurrentPage = currentPage ?? internalCurrentPage;
  const numericPages = displayedPages
    .map((page) => Number(page))
    .filter((page) => Number.isFinite(page));
  const firstPage = numericPages[0] ?? 1;
  const lastPage = numericPages[numericPages.length - 1] ?? firstPage;
  const resolvedCurrentPageNumber = Number(resolvedCurrentPage);

  const updatePage = (page, event) => {
    const nextPage = Number(page);

    if (!Number.isFinite(nextPage)) {
      return;
    }

    onClick?.(event);

    if (!isControlled) {
      setInternalCurrentPage(nextPage);
    }

    onPageChange?.(nextPage);
  };

  const handlePrevious = (event) => {
    const previousPage = Math.max(
      firstPage,
      (Number.isFinite(resolvedCurrentPageNumber) ? resolvedCurrentPageNumber : firstPage) - 1
    );

    updatePage(previousPage, event);
    onPrevious?.(previousPage);
  };

  const handleNext = (event) => {
    const nextPage = Math.min(
      lastPage,
      (Number.isFinite(resolvedCurrentPageNumber) ? resolvedCurrentPageNumber : firstPage) + 1
    );

    updatePage(nextPage, event);
    onNext?.(nextPage);
  };

  return (
    <nav
      className={buildClassName([
        'storybook-pagination',
        `storybook-pagination--${normalizedAlignment}`,
        `storybook-pagination--${normalizedBreakpoint}`,
        className,
      ])}
      aria-label="Pagination"
    >
      <div className="storybook-pagination__group">
        <PaginationButton
          hierarchy="leading"
          icon={isMobile ? 'only' : 'true'}
          label="Previous"
          disabled={disabled || previousDisabled || resolvedCurrentPageNumber <= firstPage}
          aria-label="Previous page"
          onClick={handlePrevious}
        />

        {displayedPages.map((page, index) => (
          <span
            key={`${page}-${index}`}
            className="storybook-pagination__item"
          >
            <PaginationDivider />
            <PaginationButton
              hierarchy="middle"
              label={String(page)}
              active={String(page) === String(resolvedCurrentPage)}
              disabled={disabled || page === '...'}
              aria-current={String(page) === String(resolvedCurrentPage) ? 'page' : undefined}
              aria-label={page === '...'
                ? 'Collapsed pages'
                : `Go to page ${page}`}
              onClick={(event) => {
                if (page !== '...') {
                  updatePage(page, event);
                }
              }}
            />
          </span>
        ))}

        <PaginationButton
          hierarchy="trailing"
          icon={isMobile ? 'only' : 'true'}
          label="Next"
          disabled={disabled || nextDisabled || resolvedCurrentPageNumber >= lastPage}
          aria-label="Next page"
          onClick={handleNext}
        />
      </div>
    </nav>
  );
}

Pagination.propTypes = {
  alignment: PropTypes.oneOf([
    ...ALIGNMENTS,
    'Card button group right aligned',
    'Card button group left aligned',
    'Card button group center aligned',
  ]),
  breakpoint: PropTypes.oneOf([...BREAKPOINTS, 'Desktop', 'Mobile']),
  currentPage: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  defaultCurrentPage: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  disabled: PropTypes.bool,
  pages: PropTypes.arrayOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ])),
  className: PropTypes.string,
  nextDisabled: PropTypes.bool,
  onClick: PropTypes.func,
  onPageChange: PropTypes.func,
  onNext: PropTypes.func,
  onPrevious: PropTypes.func,
  previousDisabled: PropTypes.bool,
};
