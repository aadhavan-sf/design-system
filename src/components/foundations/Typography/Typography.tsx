import type {
  CSSProperties,
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

const variantClassNames: Record<TextVariant, string> = {
  'display-2xl': 'text-ds-display-2xl',
  'display-xl': 'text-ds-display-xl',
  'display-lg': 'text-ds-display-lg',
  'display-md': 'text-ds-display-md',
  'display-sm': 'text-ds-display-sm',
  'display-xs': 'text-ds-display-xs',
  'text-xl': 'text-ds-text-xl',
  'text-lg': 'text-ds-text-lg',
  'text-md': 'text-ds-text-md',
  'text-sm': 'text-ds-text-sm',
  'text-xs': 'text-ds-text-xs',
};

const weightClassNames: Record<TextWeight, string> = {
  regular: 'font-normal',
  medium: 'font-medium',
  semibold: 'font-semibold',
  bold: 'font-bold',
};

function hasTailwindTextColor(className?: string) {
  return className?.split(/\s+/).some((value) =>
    /^!?text-(?:ds-text(?:-strong|-muted)?|(?:brand|neutral|error|warning|success)-\d+|special-[\w-]+)$/.test(value),
  );
}

export function Text({
  as: Component = 'p',
  variant = 'text-xs',
  weight = 'regular',
  color,
  className,
  children,
  style,
  ...props
}: TextProps) {
  const colorStyle: CSSProperties | undefined = color ? { color } : undefined;
  const defaultColorClassName = color || hasTailwindTextColor(className)
    ? undefined
    : 'text-ds-text-strong';

  return (
    <Component
      className={[
        'm-0 font-sans',
        defaultColorClassName,
        variantClassNames[variant],
        weightClassNames[weight],
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      style={{ ...colorStyle, ...style }}
      {...props}
    >
      {children}
    </Component>
  );
}
