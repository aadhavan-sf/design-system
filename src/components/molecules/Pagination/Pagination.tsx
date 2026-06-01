import { useState, type ButtonHTMLAttributes, type MouseEvent } from 'react';
import { ArrowLeft, ArrowRight } from '@phosphor-icons/react';

import { Text } from '../../foundations/Typography';

import './pagination.css';

export type PaginationButtonHierarchy = 'leading' | 'middle' | 'trailing' | 'Leading' | 'Middle' | 'Trailing';
export type PaginationButtonIcon = 'false' | 'only' | 'true' | 'False' | 'Only' | 'True';
export type PaginationButtonState = 'default' | 'active-hover' | 'focused' | 'Default' | 'Active/hover' | 'Focused';
export type PaginationAlignment =
  | 'left'
  | 'center'
  | 'right'
  | 'Card button group right aligned'
  | 'Card button group left aligned'
  | 'Card button group center aligned';
export type PaginationBreakpoint = 'desktop' | 'mobile' | 'Desktop' | 'Mobile';

type NormalizedHierarchy = 'leading' | 'middle' | 'trailing';
type NormalizedIcon = 'false' | 'only' | 'true';
type NormalizedButtonState = 'default' | 'active-hover' | 'focused';
type NormalizedAlignment = 'left' | 'center' | 'right';
type NormalizedBreakpoint = 'desktop' | 'mobile';
type PageValue = string | number;

export interface PaginationButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  hierarchy?: PaginationButtonHierarchy;
  icon?: PaginationButtonIcon;
  state?: PaginationButtonState;
  label?: string;
  active?: boolean;
}

export interface PaginationProps {
  alignment?: PaginationAlignment;
  breakpoint?: PaginationBreakpoint;
  currentPage?: PageValue;
  defaultCurrentPage?: PageValue;
  disabled?: boolean;
  pages?: PageValue[];
  className?: string;
  nextDisabled?: boolean;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  onPageChange?: (page: number) => void;
  onNext?: (page: number) => void;
  onPrevious?: (page: number) => void;
  previousDisabled?: boolean;
}

const desktopItems = ['1', '2', '3', '...', '8', '9', '10'];
const mobileItems = ['1', '2', '...', '9', '10'];

function normalizeValue<T extends string>(value: string | undefined, aliases: Record<string, T> = {}) {
  if (value === undefined) {
    return undefined;
  }

  return aliases[value] ?? value;
}

function buildClassName(parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(' ');
}

function getDisplayLabel({ hierarchy, icon, label }: { hierarchy: NormalizedHierarchy; icon: NormalizedIcon; label?: string }) {
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

export function PaginationButton({
  hierarchy = 'middle',
  icon = 'false',
  state = 'default',
  label,
  active = false,
  className,
  ...props
}: PaginationButtonProps) {
  const normalizedHierarchy = normalizeValue(hierarchy, {
    Leading: 'leading',
    Middle: 'middle',
    Trailing: 'trailing',
  }) as NormalizedHierarchy;
  const normalizedIcon = normalizeValue(icon, {
    False: 'false',
    Only: 'only',
    True: 'true',
  }) as NormalizedIcon;
  const normalizedState = normalizeValue(state, {
    Default: 'default',
    'Active/hover': 'active-hover',
    Focused: 'focused',
  }) as NormalizedButtonState;
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
}: PaginationProps) {
  const [internalCurrentPage, setInternalCurrentPage] = useState(defaultCurrentPage);
  const isControlled = currentPage !== undefined;
  const normalizedAlignment = normalizeValue(alignment, {
    'Card button group right aligned': 'right',
    'Card button group left aligned': 'left',
    'Card button group center aligned': 'center',
  }) as NormalizedAlignment;
  const normalizedBreakpoint = normalizeValue(breakpoint, {
    Desktop: 'desktop',
    Mobile: 'mobile',
  }) as NormalizedBreakpoint;
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

  const updatePage = (page: PageValue, event: MouseEvent<HTMLButtonElement>) => {
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

  const handlePrevious = (event: MouseEvent<HTMLButtonElement>) => {
    const previousPage = Math.max(
      firstPage,
      (Number.isFinite(resolvedCurrentPageNumber) ? resolvedCurrentPageNumber : firstPage) - 1
    );

    updatePage(previousPage, event);
    onPrevious?.(previousPage);
  };

  const handleNext = (event: MouseEvent<HTMLButtonElement>) => {
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
