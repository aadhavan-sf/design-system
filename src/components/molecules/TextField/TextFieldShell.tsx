import type { ReactNode } from 'react';

import { Text } from '../../foundations/Typography';
import { HelpIcon } from '../Tooltip/HelpIcon';
import { buildClassName } from './textField.constants';

export interface TextFieldShellProps {
  children: ReactNode;
  className?: string;
  errorText: string;
  helperText: string;
  isError: boolean;
  isInfo: boolean;
  isRequired: boolean;
  label: boolean;
  labelText: string;
  tooltip: boolean;
  tooltipClassName?: string;
  tooltipDescription: string;
  tooltipOpen: boolean;
  tooltipPlacement: string;
  tooltipSupportingText: boolean;
  tooltipTitle: string;
  type: string;
}

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
}: TextFieldShellProps) {
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
