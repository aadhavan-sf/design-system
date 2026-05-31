import { useState, type ButtonHTMLAttributes, type MouseEvent } from 'react';
import { ArrowLeft, ArrowRight } from '@phosphor-icons/react';

import { Text } from '../../foundations/Typography';

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

function PaginationDivider() {
  return <span className="h-10 w-px shrink-0 bg-neutral-200" aria-hidden="true" />;
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
        'inline-flex h-10 min-w-10 cursor-pointer items-center justify-center gap-2 border border-solid border-neutral-200 bg-neutral-0 box-border px-4 py-2.5 font-sans text-neutral-700 transition-[background-color,color,box-shadow] duration-[160ms] hover:bg-neutral-50 hover:text-neutral-900 disabled:cursor-not-allowed disabled:bg-neutral-0 disabled:text-neutral-300 disabled:hover:bg-neutral-0 disabled:hover:text-neutral-300 focus-visible:z-[1] focus-visible:bg-neutral-50 focus-visible:text-neutral-900 focus-visible:shadow-focus-brand focus-visible:outline-none',
        normalizedHierarchy === 'leading' && 'rounded-l-2 rounded-r-none',
        normalizedHierarchy === 'middle' && 'w-10 flex-col border-l-0 border-r-0',
        normalizedHierarchy === 'trailing' && 'rounded-l-none rounded-r-2',
        isIconOnly && 'w-10 px-2.5',
        isActive && 'bg-neutral-50 text-neutral-900',
        normalizedState === 'focused' && 'z-[1] bg-neutral-50 text-neutral-900 shadow-focus-brand',
        className,
      ])}
      {...props}
    >
      {hasIcon && normalizedHierarchy === 'leading' && (
        <ArrowLeft
          className="shrink-0"
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
          className="whitespace-nowrap"
        >
          {displayLabel}
        </Text>
      )}
      {hasIcon && normalizedHierarchy === 'trailing' && (
        <ArrowRight
          className="shrink-0"
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
        'flex w-full min-w-0 max-w-[1216px] items-center overflow-x-auto overflow-y-visible border-t border-solid border-neutral-200 px-6 pb-4 pt-3 box-border',
        normalizedBreakpoint === 'mobile' && 'max-w-[375px]',
        normalizedAlignment === 'left' && 'justify-start',
        normalizedAlignment === 'center' && 'justify-center',
        normalizedAlignment === 'right' && 'justify-end',
        className,
      ])}
      aria-label="Pagination"
    >
      <div className="inline-flex flex-none items-stretch">
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
            className="inline-flex items-stretch"
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
