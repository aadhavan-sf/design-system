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
      className={[
        'storybook-button',

        `storybook-button--${hierarchy}`,

        destructive && 'storybook-button--destructive',

        `storybook-button--${size}`,
        isIconOnly && 'storybook-button--icon-only',
        state === 'focus' && 'storybook-button--focus',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...props}
    >
    <span className="storybook-button__content">
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
