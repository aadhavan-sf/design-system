import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { CircleIcon } from '@phosphor-icons/react';
import { Text } from '../../foundations/Typography';

import './button.css';

export type ButtonHierarchy = 'primary' | 'secondary' | 'link-grey' | 'link-color';
export type ButtonIcon = 'none' | 'left' | 'right' | 'only' | 'both';
export type ButtonState = 'default' | 'focus' | 'disabled';
export type ButtonSize = 'small' | 'medium' | 'large' | 'xlarge';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  hierarchy?: ButtonHierarchy;
  destructive?: boolean;
  icon?: ButtonIcon;
  leadingIcon?: ReactNode;
  trailingIcon?: ReactNode;
  state?: ButtonState;
  size?: ButtonSize;
  label?: string;
}

function buildClassName(parts: Array<string | false | null | undefined>) {
  return parts.flat().filter(Boolean).join(' ');
}

const SECONDARY_BORDER = 'border border-solid border-neutral-300';
const SECONDARY_BORDER_DISABLED = 'border border-solid border-neutral-200';

function getButtonVariantClasses({
  destructive,
  hierarchy,
  state,
}: {
  destructive: boolean;
  hierarchy: ButtonHierarchy;
  state: ButtonState;
}) {
  const isDisabled = state === 'disabled';
  const isFocus = state === 'focus';

  if (hierarchy === 'primary' && destructive) {
    if (isDisabled) {
      return 'storybook-button--primary-destructive bg-error-300 text-neutral-0 shadow-none';
    }

    if (isFocus) {
      return 'storybook-button--primary-destructive bg-error-600 text-neutral-0 shadow-focus-error';
    }

    return [
      'storybook-button--primary-destructive bg-error-600 text-neutral-0',
      'enabled:hover:bg-error-700',
      'focus-visible:shadow-focus-error',
    ].join(' ');
  }

  if (hierarchy === 'link-color' && destructive) {
    if (isDisabled) {
      return 'border-transparent bg-transparent p-0 text-error-300 shadow-none';
    }

    if (isFocus) {
      return 'border-transparent bg-transparent p-0 text-error-600 shadow-none';
    }

    return [
      'border-transparent bg-transparent p-0 text-error-600 shadow-none',
      'enabled:hover:text-error-700',
    ].join(' ');
  }

  if (hierarchy === 'primary') {
    if (isDisabled) {
      return 'storybook-button--primary bg-brand-200 text-neutral-0 shadow-none';
    }

    if (isFocus) {
      return 'storybook-button--primary bg-brand-400 text-neutral-0 shadow-focus-brand';
    }

    return [
      'storybook-button--primary bg-brand-400 text-neutral-0 shadow-xs',
      'enabled:hover:bg-brand-700 enabled:hover:shadow-sm',
      'focus-visible:shadow-focus-brand',
    ].join(' ');
  }

  if (hierarchy === 'secondary') {
    if (isDisabled) {
      return buildClassName([
        'storybook-button--secondary storybook-button--disabled bg-transparent text-neutral-300',
        SECONDARY_BORDER_DISABLED,
      ]);
    }

    if (isFocus) {
      return buildClassName([
        'storybook-button--secondary storybook-button--focus bg-transparent text-neutral-700',
        SECONDARY_BORDER,
        'shadow-focus-neutral',
      ]);
    }

    return buildClassName([
      'storybook-button--secondary bg-transparent text-neutral-700',
      SECONDARY_BORDER,
      'enabled:hover:bg-neutral-50 enabled:hover:text-neutral-800',
      'focus-visible:shadow-focus-neutral',
    ]);
  }

  if (hierarchy === 'link-grey') {
    if (isDisabled) {
      return 'border-transparent bg-transparent p-0 text-neutral-300 shadow-none';
    }

    if (isFocus) {
      return 'border-transparent bg-transparent p-0 text-neutral-600 shadow-none';
    }

    return [
      'border-transparent bg-transparent p-0 text-neutral-600 shadow-none',
      'enabled:hover:text-neutral-800',
    ].join(' ');
  }

  if (isDisabled) {
    return 'border-transparent bg-transparent p-0 text-neutral-300 shadow-none';
  }

  if (isFocus) {
    return 'border-transparent bg-transparent p-0 text-brand-400 shadow-none';
  }

  return [
    'border-transparent bg-transparent p-0 text-brand-400 shadow-none',
    'enabled:hover:text-brand-700',
  ].join(' ');
}

function getButtonIconClassName(side: 'left' | 'right') {
  return buildClassName([
    side === 'left'
      ? 'storybook-button__icon--left'
      : 'storybook-button__icon--right',
    'shrink-0 h-5 w-5',
  ]);
}

function getButtonClassName({
  className,
  destructive,
  hierarchy,
  isIconOnly,
  size,
  state,
}: {
  className?: string;
  destructive: boolean;
  hierarchy: ButtonHierarchy;
  isIconOnly: boolean;
  size: ButtonSize;
  state: ButtonState;
}) {
  return buildClassName([
    'storybook-button box-border min-w-max rounded-ds font-sans font-semibold no-underline',
    hierarchy !== 'secondary' && 'border-0',
    getButtonVariantClasses({ destructive, hierarchy, state }),
    getButtonSizeClasses(size, isIconOnly, hierarchy),
    className,
  ]);
}

function getButtonSizeClasses(
  size: ButtonSize,
  isIconOnly: boolean,
  hierarchy: ButtonHierarchy,
) {
  const isLink = hierarchy === 'link-grey' || hierarchy === 'link-color';

  if (isLink) {
    return {
      small: 'text-ds-text-sm',
      medium: 'text-ds-text-sm',
      large: 'text-ds-text-md',
      xlarge: 'text-ds-text-md',
    }[size];
  }

  if (isIconOnly) {
    return {
      small: 'p-2 text-ds-text-sm',
      medium: 'p-3 text-ds-text-sm',
      large: 'p-3 text-ds-text-md',
      xlarge: 'p-[14px] text-ds-text-md',
    }[size];
  }

  return {
    small: 'px-[14px] py-2 text-ds-text-sm',
    medium: 'px-4 py-2.5 text-ds-text-sm',
    large: 'px-[18px] py-2.5 text-ds-text-md',
    xlarge: 'px-5 py-3 text-ds-text-md',
  }[size];
}

/** Primary UI component for user interaction */
export const Button = ({
  hierarchy = 'primary',
  destructive = false,
  icon = 'none',
  leadingIcon,
  trailingIcon,
  state = 'default',
  size = 'small',
  label,
  className,
  ...props
}: ButtonProps) => {
  const isIconOnly = icon === 'only';
  const showLeadingIcon = icon === 'left' || icon === 'only' || icon === 'both';
  const showTrailingIcon = icon === 'right' || icon === 'both';
  const defaultIconElement = (
    <CircleIcon
      size={20}
      weight="regular"
      color="currentColor"
    />
  );
  const leadingIconElement = leadingIcon ?? defaultIconElement;
  const trailingIconElement = trailingIcon ?? defaultIconElement;

  return (
    <button
      type="button"
      disabled={state === 'disabled'}
      className={getButtonClassName({
        className,
        destructive,
        hierarchy,
        isIconOnly,
        size,
        state,
      })}
      {...props}
    >
      <span className="storybook-button__content gap-2">
        {showLeadingIcon && (
          <span className={getButtonIconClassName('left')}>
            {leadingIconElement}
          </span>
        )}

        {!isIconOnly && (
          <Text
            as="span"
            variant={size === 'small' || size === 'medium' ? 'text-sm' : 'text-md'}
            weight="semibold"
            color="currentColor"
            className="storybook-button__label"
          >
            {label}
          </Text>
        )}

        {showTrailingIcon && (
          <span className={getButtonIconClassName('right')}>
            {trailingIconElement}
          </span>
        )}
      </span>
    </button>
  );
};
