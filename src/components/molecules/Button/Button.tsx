import type { ButtonHTMLAttributes } from 'react';
import { CircleIcon } from '@phosphor-icons/react';
import { Text } from '../../foundations/Typography';

export type ButtonHierarchy = 'primary' | 'secondary' | 'link-grey' | 'link-color';
export type ButtonIcon = 'none' | 'left' | 'right' | 'only';
export type ButtonState = 'default' | 'focus' | 'disabled';
export type ButtonSize = 'small' | 'medium' | 'large' | 'xlarge';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  hierarchy?: ButtonHierarchy;
  destructive?: boolean;
  icon?: ButtonIcon;
  state?: ButtonState;
  size?: ButtonSize;
  label?: string;
}

function buildClassName(parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(' ');
}

function getHierarchyClassName({
  destructive,
  hierarchy,
}: {
  destructive: boolean;
  hierarchy: ButtonHierarchy;
}) {
  if (hierarchy === 'primary' && destructive) {
    return 'border-error-600 bg-error-600 text-neutral-0 enabled:hover:border-error-700 enabled:hover:bg-error-700 focus-visible:border-error-600 focus-visible:bg-error-600 focus-visible:shadow-focus-error disabled:border-error-300 disabled:bg-error-300 disabled:text-neutral-0';
  }

  if (hierarchy === 'primary') {
    return 'border-primary-400 bg-primary-400 text-neutral-0 enabled:hover:border-primary-700 enabled:hover:bg-primary-700 enabled:hover:shadow-sm focus-visible:border-primary-400 focus-visible:bg-primary-400 focus-visible:shadow-focus-brand disabled:border-primary-200 disabled:bg-primary-200 disabled:text-neutral-0';
  }

  if (hierarchy === 'secondary') {
    return 'border-neutral-300 bg-transparent text-neutral-700 enabled:hover:border-neutral-300 enabled:hover:bg-neutral-50 enabled:hover:text-neutral-800 enabled:hover:shadow-sm focus-visible:border-neutral-300 focus-visible:bg-transparent focus-visible:text-neutral-700 focus-visible:shadow-focus-neutral disabled:border-neutral-200 disabled:bg-transparent disabled:text-neutral-300';
  }

  if (hierarchy === 'link-color' && destructive) {
    return 'border-transparent bg-transparent text-error-600 shadow-none enabled:hover:text-error-700 focus-visible:text-error-600 focus-visible:shadow-none disabled:text-error-300';
  }

  if (hierarchy === 'link-color') {
    return 'border-transparent bg-transparent text-primary-400 shadow-none enabled:hover:text-primary-700 focus-visible:text-primary-400 focus-visible:shadow-none disabled:text-neutral-300';
  }

  return 'border-transparent bg-transparent text-neutral-600 shadow-none enabled:hover:text-neutral-800 focus-visible:text-neutral-600 focus-visible:shadow-none disabled:text-neutral-300';
}

function getStateClassName({
  destructive,
  hierarchy,
  state,
}: {
  destructive: boolean;
  hierarchy: ButtonHierarchy;
  state: ButtonState;
}) {
  if (state !== 'focus') {
    return undefined;
  }

  if (hierarchy === 'primary' && destructive) {
    return 'border-error-600 bg-error-600 shadow-focus-error';
  }

  if (hierarchy === 'primary') {
    return 'border-primary-400 bg-primary-400 shadow-focus-brand';
  }

  if (hierarchy === 'secondary') {
    return 'border-neutral-300 bg-transparent text-neutral-700 shadow-focus-neutral';
  }

  return undefined;
}

function getSizeClassName(size: ButtonSize, isIconOnly: boolean) {
  if (isIconOnly) {
    return {
      small: 'p-2',
      medium: 'p-2.5',
      large: 'p-3',
      xlarge: 'p-3.5',
    }[size];
  }

  return {
    small: 'px-3.5 py-2',
    medium: 'px-4 py-2.5',
    large: 'px-[18px] py-2.5',
    xlarge: 'px-5 py-3',
  }[size];
}

/** Primary UI component for user interaction */
export const Button = ({
  hierarchy = 'primary',
  destructive = false,
  icon = 'none',
  state = 'default',
  size = 'small',
  label,
  className,
  ...props
}: ButtonProps) => {
  const iconElement = (
    <CircleIcon
      size={20}
      weight="regular"
      color="currentColor"
    />
  );
  
  const isIconOnly = icon === 'only';

  return (
    <button
      type="button"
      disabled={state === 'disabled'}
      className={buildClassName([
        'flex min-w-max cursor-pointer items-center justify-center rounded-2 border border-solid font-sans font-semibold no-underline shadow-xs transition-[background-color,border-color,box-shadow,color,transform] duration-[160ms] focus-visible:outline-none disabled:cursor-not-allowed disabled:shadow-none',
        getHierarchyClassName({ destructive, hierarchy }),
        getStateClassName({ destructive, hierarchy, state }),
        getSizeClassName(size, isIconOnly),
        className,
      ])}
      {...props}
    >
    <span className="flex items-center justify-center gap-2">
      {(icon === 'left' || icon === 'only') && (
        <span className="flex h-5 w-5 shrink-0 items-center justify-center [&_svg]:block [&_svg]:h-5 [&_svg]:w-5">
          {iconElement}
        </span>
      )}

      {!isIconOnly && (
        <Text
          as="span"
          variant={size === 'small' || size === 'medium' ? 'text-sm' : 'text-md'}
          weight="semibold"
          color="currentColor"
          className="flex items-center"
        >
          {label}
        </Text>
      )}

      {icon === 'right' && (
        <span className="flex h-5 w-5 shrink-0 items-center justify-center [&_svg]:block [&_svg]:h-5 [&_svg]:w-5">
          {iconElement}
        </span>
      )}
    </span>
    </button>
  );
};
