import type {
  ElementType,
  HTMLAttributes,
  ReactNode,
  CSSProperties,
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

const variantClassNames: Record<TextVariant, string> = {
  'display-2xl': 'text-[length:var(--type-display-2xl-size)] leading-[var(--type-display-2xl-line)] tracking-[var(--type-display-2xl-letter)]',
  'display-xl': 'text-[length:var(--type-display-xl-size)] leading-[var(--type-display-xl-line)] tracking-[var(--type-display-xl-letter)]',
  'display-lg': 'text-[length:var(--type-display-lg-size)] leading-[var(--type-display-lg-line)] tracking-[var(--type-display-lg-letter)]',
  'display-md': 'text-[length:var(--type-display-md-size)] leading-[var(--type-display-md-line)] tracking-[var(--type-display-md-letter)]',
  'display-sm': 'text-[length:var(--type-display-sm-size)] leading-[var(--type-display-sm-line)] tracking-[var(--type-display-sm-letter)]',
  'display-xs': 'text-[length:var(--type-display-xs-size)] leading-[var(--type-display-xs-line)] tracking-[var(--type-display-xs-letter)]',
  'text-xl': 'text-[length:var(--type-text-xl-size)] leading-[var(--type-text-xl-line)] tracking-[var(--type-text-xl-letter)]',
  'text-lg': 'text-[length:var(--type-text-lg-size)] leading-[var(--type-text-lg-line)] tracking-[var(--type-text-lg-letter)]',
  'text-md': 'text-[length:var(--type-text-md-size)] leading-[var(--type-text-md-line)] tracking-[var(--type-text-md-letter)]',
  'text-sm': 'text-[length:var(--type-text-sm-size)] leading-[var(--type-text-sm-line)] tracking-[var(--type-text-sm-letter)]',
  'text-xs': 'text-[length:var(--type-text-xs-size)] leading-[var(--type-text-xs-line)] tracking-[var(--type-text-xs-letter)]',
};

const weightClassNames: Record<TextWeight, string> = {
  regular: 'font-normal',
  medium: 'font-medium',
  semibold: 'font-semibold',
  bold: 'font-bold',
};

function buildClassName(parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(' ');
}

export function Text({
  as: Component = 'p',
  variant = 'text-md',
  weight = 'regular',
  color = 'var(--ds-text-strong, var(--neutral_900))',
  className,
  children,
  style,
  ...props
}: TextProps) {
  const textStyle: CSSProperties = {
    ...style,
    color,
  };

  return (
    <Component
      className={buildClassName([
        'm-0 font-sans',
        variantClassNames[variant],
        weightClassNames[weight],
        className,
      ])}
      style={textStyle}
      {...props}
    >
      {children}
    </Component>
  );
}
