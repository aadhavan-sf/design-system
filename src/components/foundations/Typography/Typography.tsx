import type {
  ElementType,
  HTMLAttributes,
  ReactNode,
} from 'react';

export type TextVariant =
  | 'display-2xl'
  | 'display-xl'
  | 'display-lg'
  | 'display-md'
  | 'display-sm'
  | 'display-xs'
  | 'text-xl'
  | 'text-lg'
  | 'text-md'
  | 'text-sm'
  | 'text-xs';

export type TextWeight = 'regular' | 'medium' | 'semibold' | 'bold';

export interface TextProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType;
  variant?: TextVariant;
  weight?: TextWeight;
  color?: string;
  className?: string;
  children?: ReactNode;
}

export function Text({
  as: Component = 'p',
  variant = 'text-md',
  weight = 'regular',
  color = 'var(--ds-text-strong, var(--neutral_900))',
  className,
  children,
  ...props
}: TextProps) {
  return (
    <Component
      className={['ds-text', `ds-text--${variant}`, `ds-text--${weight}`, className]
        .filter(Boolean)
        .join(' ')}
      style={{ color }}
      {...props}
    >
      {children}
    </Component>
  );
}
