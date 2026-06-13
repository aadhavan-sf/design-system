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
  totalPages?: number;
  className?: string;
  nextDisabled?: boolean;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  onPageChange?: (page: number) => void;
  onNext?: (page: number) => void;
  onPrevious?: (page: number) => void;
  previousDisabled?: boolean;
}

const DEFAULT_TOTAL_PAGES = 10;

function getDesktopPaginationPages(currentPage: number, totalPages: number): PageValue[] {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, index) => String(index + 1));
  }

  if (currentPage <= 3) {
    return ['1', '2', '3', '...', String(totalPages - 2), String(totalPages - 1), String(totalPages)];
  }

  if (currentPage >= totalPages - 2) {
    return ['1', '2', '3', '...', String(totalPages - 2), String(totalPages - 1), String(totalPages)];
  }

  if (currentPage === 4) {
    return ['1', '2', '3', '4', '...', String(totalPages - 1), String(totalPages)];
  }

  return [
    '1',
    '...',
    String(currentPage - 1),
    String(currentPage),
    String(currentPage + 1),
    '...',
    String(totalPages),
  ];
}

function getMobilePaginationPages(currentPage: number, totalPages: number): PageValue[] {
  if (totalPages <= 5) {
    return Array.from({ length: totalPages }, (_, index) => String(index + 1));
  }

  if (currentPage <= 2) {
    return ['1', '2', '...', String(totalPages - 1), String(totalPages)];
  }

  if (currentPage >= totalPages - 1) {
    return ['1', '...', String(totalPages - 1), String(totalPages)];
  }

  return ['1', '...', String(currentPage), '...', String(totalPages)];
}

function getPaginationPages(
  currentPage: number,
  totalPages: number,
  breakpoint: NormalizedBreakpoint,
): PageValue[] {
  const total = Math.max(1, totalPages);
  const current = Math.min(Math.max(1, currentPage), total);

  if (breakpoint === 'mobile') {
    return getMobilePaginationPages(current, total);
  }

  return getDesktopPaginationPages(current, total);
}

function normalizeValue<T extends string>(value: string | undefined, aliases: Record<string, T> = {}) {
  if (value === undefined) {
    return undefined;
  }

  return aliases[value] ?? value;
}

function buildClassName(parts: Array<string | false | null | undefined>) {
  return parts.flat().filter(Boolean).join(' ');
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

function getPaginationButtonVariantClasses({
  active,
  state,
  disabled = false,
}: {
  active: boolean;
  state: NormalizedButtonState;
  disabled?: boolean;
}) {
  const isFocused = state === 'focused';
  const isActive = active || state === 'active-hover';

  if (disabled) {
    return 'bg-neutral-0 text-neutral-300 shadow-none disabled:hover:bg-neutral-0 disabled:hover:text-neutral-300';
  }

  if (isFocused) {
    return 'z-[1] bg-neutral-50 text-neutral-900 shadow-focus-brand';
  }

  if (isActive) {
    return 'bg-neutral-50 text-neutral-900 shadow-none';
  }

  return [
    'bg-neutral-0 text-neutral-700 shadow-none',
    'enabled:hover:bg-neutral-50 enabled:hover:text-neutral-900',
    'focus-visible:z-[1] focus-visible:bg-neutral-50 focus-visible:text-neutral-900 focus-visible:shadow-focus-brand',
  ].join(' ');
}

function getPaginationButtonLayoutClasses({
  hierarchy,
  isIconOnly,
}: {
  hierarchy: NormalizedHierarchy;
  isIconOnly: boolean;
}) {
  if (isIconOnly) {
    if (hierarchy === 'leading') {
      return 'w-10 rounded-l-2 border-r-0 p-3';
    }

    if (hierarchy === 'trailing') {
      return 'w-10 rounded-r-2 border-l-0 p-3';
    }

    return 'w-10 p-3';
  }

  if (hierarchy === 'middle') {
    return 'w-10 flex-col border-x-0 px-4 py-3';
  }

  if (hierarchy === 'leading') {
    return 'rounded-l-2 border-r-0 px-4 py-3';
  }

  return 'rounded-r-2 border-l-0 px-4 py-3';
}

function getPaginationButtonClassName({
  className,
  layoutClasses,
  variantClasses,
}: {
  className?: string;
  layoutClasses: string;
  variantClasses: string;
}) {
  return buildClassName([
    'storybook-pagination-button',
    'box-border inline-flex h-10 min-w-10 items-center justify-center gap-2 border border-solid border-neutral-200 font-sans',
    layoutClasses,
    variantClasses,
    className,
  ]);
}

function getPaginationAlignmentClasses(alignment: NormalizedAlignment) {
  return {
    left: 'justify-start',
    center: 'justify-center',
    right: 'justify-end',
  }[alignment];
}

function PaginationDivider() {
  return (
    <span
      className="storybook-pagination__divider relative z-[1] w-px shrink-0 self-stretch bg-neutral-200"
      aria-hidden="true"
    />
  );
}

export function PaginationButton({
  hierarchy = 'middle',
  icon = 'false',
  state = 'default',
  label,
  active = false,
  className,
  disabled = false,
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
  const variantClasses = getPaginationButtonVariantClasses({
    active: isActive,
    state: normalizedState,
    disabled,
  });
  const layoutClasses = getPaginationButtonLayoutClasses({
    hierarchy: normalizedHierarchy,
    isIconOnly,
  });

  return (
    <button
      type="button"
      disabled={disabled}
      className={getPaginationButtonClassName({
        className,
        layoutClasses,
        variantClasses,
      })}
      {...props}
    >
      {hasIcon && normalizedHierarchy === 'leading' && (
        <ArrowLeft
          className="storybook-pagination-button__icon shrink-0"
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
          className="storybook-pagination-button__label whitespace-nowrap"
        >
          {displayLabel}
        </Text>
      )}
      {hasIcon && normalizedHierarchy === 'trailing' && (
        <ArrowRight
          className="storybook-pagination-button__icon shrink-0"
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
  totalPages = DEFAULT_TOTAL_PAGES,
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
  const resolvedCurrentPage = currentPage ?? internalCurrentPage;
  const resolvedCurrentPageNumber = Number(resolvedCurrentPage);
  const normalizedCurrentPage = Number.isFinite(resolvedCurrentPageNumber)
    ? resolvedCurrentPageNumber
    : 1;
  const displayedPages =
    pages ?? getPaginationPages(normalizedCurrentPage, totalPages, normalizedBreakpoint);
  const firstPage = 1;
  const lastPage = Math.max(1, totalPages);
  const alignmentClasses = getPaginationAlignmentClasses(normalizedAlignment);

  const isMobile = normalizedBreakpoint === 'mobile';

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
      normalizedCurrentPage - 1,
    );

    updatePage(previousPage, event);
    onPrevious?.(previousPage);
  };

  const handleNext = (event: MouseEvent<HTMLButtonElement>) => {
    const nextPage = Math.min(
      lastPage,
      normalizedCurrentPage + 1,
    );

    updatePage(nextPage, event);
    onNext?.(nextPage);
  };

  return (
    <nav
      className={buildClassName([
        'storybook-pagination',
        'box-border flex w-full min-w-0 max-w-[1216px] items-center overflow-x-auto overflow-y-visible border-0 border-t border-solid border-neutral-200 px-6 pb-4 pt-3',
        alignmentClasses,
        normalizedBreakpoint === 'mobile' && 'max-w-[375px]',
        className,
      ])}
      aria-label="Pagination"
    >
      <div className="storybook-pagination__group inline-flex shrink-0 items-stretch">
        <PaginationButton
          hierarchy="leading"
          icon={isMobile ? 'only' : 'true'}
          label="Previous"
          disabled={disabled || previousDisabled || normalizedCurrentPage <= firstPage}
          aria-label="Previous page"
          onClick={handlePrevious}
        />

        {displayedPages.map((page, index) => (
          <span
            key={`${page}-${index}`}
            className="storybook-pagination__item -ml-px inline-flex items-stretch"
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

        <span className="storybook-pagination__item -ml-px inline-flex items-stretch">
          <PaginationDivider />
          <PaginationButton
            hierarchy="trailing"
            icon={isMobile ? 'only' : 'true'}
            label="Next"
            disabled={disabled || nextDisabled || normalizedCurrentPage >= lastPage}
            aria-label="Next page"
            onClick={handleNext}
          />
        </span>
      </div>
    </nav>
  );
}
