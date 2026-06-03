import type { ButtonHTMLAttributes } from 'react';
import { CircleIcon } from '@phosphor-icons/react';
import { Text } from '../../foundations/Typography';

import './button.css';

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
      return 'border-error-300 bg-error-300 text-neutral-0 shadow-none';
    }

    if (isFocus) {
      return 'border-error-600 bg-error-600 text-neutral-0 shadow-focus-error';
    }

    return 'border-error-600 bg-error-600 text-neutral-0 shadow-xs hover:border-error-700 hover:bg-error-700 focus-visible:shadow-focus-error';
  }

  if (hierarchy === 'link-color' && destructive) {
    if (isDisabled) {
      return 'border-transparent bg-transparent text-error-300 shadow-none';
    }

    return 'border-transparent bg-transparent text-error-600 shadow-none hover:text-error-700';
  }

  if (hierarchy === 'primary') {
    if (isDisabled) {
      return 'border-brand-200 bg-brand-200 text-neutral-0 shadow-none';
    }

    if (isFocus) {
      return 'border-brand-400 bg-brand-400 text-neutral-0 shadow-focus-brand';
    }

    return 'border-brand-400 bg-brand-400 text-neutral-0 shadow-xs hover:border-brand-700 hover:bg-brand-700 hover:shadow-sm focus-visible:shadow-focus-brand';
  }

  if (hierarchy === 'secondary') {
    if (isDisabled) {
      return 'border-neutral-200 bg-transparent text-neutral-300 shadow-none';
    }

    if (isFocus) {
      return 'border-neutral-300 bg-transparent text-neutral-700 shadow-focus-neutral';
    }

    return 'border-neutral-300 bg-transparent text-neutral-700 shadow-none hover:border-neutral-300 hover:bg-neutral-50 hover:text-neutral-800 focus-visible:shadow-focus-neutral';
  }

  if (hierarchy === 'link-grey') {
    if (isDisabled) {
      return 'border-transparent bg-transparent text-neutral-300 shadow-none';
    }

    return 'border-transparent bg-transparent text-neutral-600 shadow-none hover:text-neutral-800';
  }

  if (isDisabled) {
    return 'border-transparent bg-transparent text-neutral-300 shadow-none';
  }

  return 'border-transparent bg-transparent text-brand-400 shadow-none hover:text-brand-700';
}

function getButtonSizeClasses(size: ButtonSize, isIconOnly: boolean) {
  if (isIconOnly) {
    return {
      small: 'p-2 text-ds-text-sm',
      medium: 'p-3 text-ds-text-sm',
      large: 'p-3 text-ds-text-md',
      xlarge: 'p-custom-14 text-ds-text-md',
    }[size];
  }

  return {
    small: 'px-custom-14 py-2 text-ds-text-sm',
    medium: 'px-4 py-custom-10 text-ds-text-sm',
    large: 'px-custom-18 py-custom-10 text-ds-text-md',
    xlarge: 'px-5 py-3 text-ds-text-md',
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
  const variantClasses = getButtonVariantClasses({
    destructive,
    hierarchy,
    state,
  });
  const sizeClasses = getButtonSizeClasses(size, isIconOnly);

  return (
    <button
      type="button"
      disabled={state === 'disabled'}
      className={[
        'storybook-button',
        'rounded-ds',
        'border',
        'border-solid',
        'font-sans',
        'font-semibold',
        variantClasses,
        sizeClasses,
        `storybook-button--${hierarchy}`,
        destructive && 'storybook-button--destructive',
        `storybook-button--${size}`,
        isIconOnly && 'storybook-button--icon-only',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...props}
    >
      <span className="storybook-button__content gap-2">
        {(icon === 'left' || icon === 'only') && (
          <span className="storybook-button__icon--left">
            {iconElement}
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

        {icon === 'right' && (
          <span className="storybook-button__icon--right">
            {iconElement}
          </span>
        )}
      </span>
    </button>
  );
};
