import PropTypes from 'prop-types';

import { Text } from '../../styling/Typography';
import { HelpIcon } from '../Tooltip/HelpIcon';
import { buildClassName } from './textField.constants';

export function TextFieldShell({
  children,
  className,
  errorText,
  helperText,
  isError,
  isInfo,
  isRequired,
  label,
  labelText,
  tooltip,
  tooltipClassName,
  tooltipDescription,
  tooltipOpen,
  tooltipPlacement,
  tooltipSupportingText,
  tooltipTitle,
  type,
}) {
  return (
    <div
      className={buildClassName([
        'storybook-textfield',
        `storybook-textfield--${type}`,
        className,
      ])}
    >
      {label && type !== 'search' && (
        <div className="storybook-textfield__header">
          <Text
            as="label"
            variant="text-sm"
            weight="medium"
            color="var(--neutral_600)"
            className="storybook-textfield__label"
          >
            {labelText}
          </Text>

          {tooltip && (
            <HelpIcon
              className={buildClassName([
                'storybook-textfield__tooltip',
                tooltipClassName,
              ])}
              open={tooltipOpen}
              title={tooltipTitle}
              description={tooltipDescription}
              supportingText={tooltipSupportingText}
              tooltip={tooltipPlacement}
            />
          )}

          {isRequired && (
            <Text
              as="span"
              variant="text-xs"
              weight="semibold"
              color="var(--error_600)"
              className="storybook-textfield__required"
            >
              *
            </Text>
          )}
        </div>
      )}

      {children}

      {(isInfo || isError) && (
        <Text
          as="span"
          variant="text-xs"
          weight="regular"
          color={isError ? 'var(--error_600)' : 'var(--neutral_600)'}
          className={buildClassName([
            'storybook-textfield__helper',
            isError && 'storybook-textfield__helper--error',
          ])}
        >
          {isError ? errorText : helperText}
        </Text>
      )}
    </div>
  );
}

TextFieldShell.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  errorText: PropTypes.string.isRequired,
  helperText: PropTypes.string.isRequired,
  isError: PropTypes.bool.isRequired,
  isInfo: PropTypes.bool.isRequired,
  isRequired: PropTypes.bool.isRequired,
  label: PropTypes.bool.isRequired,
  labelText: PropTypes.string.isRequired,
  tooltip: PropTypes.bool.isRequired,
  tooltipClassName: PropTypes.string,
  tooltipDescription: PropTypes.string.isRequired,
  tooltipOpen: PropTypes.bool.isRequired,
  tooltipPlacement: PropTypes.string.isRequired,
  tooltipSupportingText: PropTypes.bool.isRequired,
  tooltipTitle: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};
