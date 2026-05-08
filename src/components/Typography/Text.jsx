import PropTypes from 'prop-types';

const VARIANTS = [
  'display-2xl',
  'display-xl',
  'display-lg',
  'display-md',
  'display-sm',
  'display-xs',
  'text-xl',
  'text-lg',
  'text-md',
  'text-sm',
  'text-xs',
];

const WEIGHTS = ['regular', 'medium', 'semibold', 'bold'];

export function Text({
  as: Component = 'p',
  variant = 'text-md',
  weight = 'regular',
  color = 'var(--neutral_900)',
  className,
  children,
  ...props
}) {
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

Text.propTypes = {
  as: PropTypes.elementType,
  variant: PropTypes.oneOf(VARIANTS),
  weight: PropTypes.oneOf(WEIGHTS),
  color: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.node,
};

