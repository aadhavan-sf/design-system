import type { ReactNode } from 'react';
import {
  Minus,
  Plus,
  Spinner,
  Trash,
} from '@phosphor-icons/react';

import { Text } from '../../foundations/Typography';

export type CartCounterState =
  | 'min'
  | 'single'
  | 'default'
  | 'max'
  | 'loading'
  | 'disabled';

export interface CartCounterProps {
  /** Item quantity shown in the center segment. */
  count?: number;
  /** Figma display preset; overrides count/loading/disabled when set. */
  state?: CartCounterState;
  loading?: boolean;
  disabled?: boolean;
  /** When count reaches this value, the left control switches to trash. */
  maxCount?: number;
  className?: string;
  onIncrement?: () => void;
  onDecrement?: () => void;
  onRemove?: () => void;
}

type ResolvedCartCounter = {
  count: number;
  disabled: boolean;
  loading: boolean;
  maxCount?: number;
};

const STATE_PRESETS: Record<
  Exclude<CartCounterState, 'loading' | 'disabled'>,
  Pick<ResolvedCartCounter, 'count' | 'maxCount'>
> = {
  min: { count: 0 },
  single: { count: 1 },
  default: { count: 2 },
  max: { count: 10, maxCount: 10 },
};

function buildClassName(parts: Array<string | false | null | undefined>) {
  return parts.flat().filter(Boolean).join(' ');
}

function resolveCartCounter({
  count = 0,
  disabled = false,
  loading = false,
  maxCount,
  state,
}: CartCounterProps): ResolvedCartCounter {
  if (state === 'loading') {
    return { count, disabled: false, loading: true, maxCount };
  }

  if (state === 'disabled') {
    return { count: STATE_PRESETS.min.count, disabled: true, loading: false, maxCount };
  }

  if (state && state in STATE_PRESETS) {
    const preset = STATE_PRESETS[state as keyof typeof STATE_PRESETS];

    return {
      count: preset.count,
      disabled: false,
      loading: false,
      maxCount: preset.maxCount ?? maxCount,
    };
  }

  return { count, disabled, loading, maxCount };
}

function getLeftAction({
  count,
  maxCount,
}: {
  count: number;
  maxCount?: number;
}): 'minus' | 'trash' {
  if (count === 1) {
    return 'trash';
  }

  if (maxCount !== undefined && count >= maxCount) {
    return 'trash';
  }

  return 'minus';
}

function getCartCounterShellClassName({
  className,
  disabled,
}: {
  className?: string;
  disabled: boolean;
}) {
  return buildClassName([
    'storybook-cart-counter inline-flex h-8 w-[106px] overflow-hidden rounded-2 border border-solid border-neutral-200 bg-neutral-0 font-sans',
    disabled && 'text-neutral-300',
    className,
  ]);
}

function getSegmentButtonClassName(disabled: boolean) {
  return buildClassName([
    'storybook-cart-counter__button inline-flex flex-1 items-center justify-center border-0 bg-transparent p-0 text-inherit',
    'appearance-none focus-visible:outline-none focus-visible:shadow-focus-brand',
    disabled ? 'cursor-not-allowed' : 'cursor-pointer text-neutral-700',
  ]);
}

function getValueSegmentClassName(disabled: boolean) {
  return buildClassName([
    'storybook-cart-counter__value flex flex-1 items-center justify-center border-l border-r border-t-0 border-b-0 border-solid border-neutral-200',
    disabled ? 'text-neutral-300' : 'text-neutral-700',
  ]);
}

function CartCounterButton({
  ariaLabel,
  disabled,
  onClick,
  children,
}: {
  ariaLabel: string;
  disabled?: boolean;
  onClick?: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={ariaLabel}
      disabled={disabled}
      className={getSegmentButtonClassName(Boolean(disabled))}
      onClick={disabled ? undefined : onClick}
    >
      {children}
    </button>
  );
}

export function CartCounter({
  count = 0,
  state,
  loading = false,
  disabled = false,
  maxCount,
  className,
  onIncrement,
  onDecrement,
  onRemove,
}: CartCounterProps) {
  const resolved = resolveCartCounter({
    count,
    disabled,
    loading,
    maxCount,
    state,
  });
  const leftAction = getLeftAction({
    count: resolved.count,
    maxCount: resolved.maxCount,
  });
  const isMinusDisabled = resolved.disabled || resolved.count <= 0;
  const isPlusDisabled = resolved.disabled;
  const leftAriaLabel = leftAction === 'trash' ? 'Remove item' : 'Decrease quantity';
  const handleLeftClick = leftAction === 'trash' ? onRemove ?? onDecrement : onDecrement;

  if (resolved.loading) {
    return (
      <div
        className={getCartCounterShellClassName({ className, disabled: false })}
        role="status"
        aria-live="polite"
        aria-label="Updating quantity"
      >
        <div className="flex flex-1 items-center justify-center text-neutral-700">
          <Spinner
            aria-hidden="true"
            className="size-4 animate-spin"
            size={16}
            weight="regular"
          />
        </div>
      </div>
    );
  }

  return (
    <div className={getCartCounterShellClassName({ className, disabled: resolved.disabled })}>
      <CartCounterButton
        ariaLabel={leftAriaLabel}
        disabled={resolved.disabled || (leftAction === 'minus' && isMinusDisabled)}
        onClick={handleLeftClick}
      >
        {leftAction === 'trash' ? (
          <Trash aria-hidden="true" className="size-4 shrink-0" size={16} weight="regular" />
        ) : (
          <Minus aria-hidden="true" className="size-4 shrink-0" size={16} weight="regular" />
        )}
      </CartCounterButton>

      <div className={getValueSegmentClassName(resolved.disabled)}>
        <Text
          as="span"
          variant="text-sm"
          weight="medium"
          color="currentColor"
          className="tabular-nums"
        >
          {resolved.count}
        </Text>
      </div>

      <CartCounterButton
        ariaLabel="Increase quantity"
        disabled={isPlusDisabled}
        onClick={onIncrement}
      >
        <Plus aria-hidden="true" className="size-4 shrink-0" size={16} weight="regular" />
      </CartCounterButton>
    </div>
  );
}

CartCounter.displayName = 'Cart Counter';
