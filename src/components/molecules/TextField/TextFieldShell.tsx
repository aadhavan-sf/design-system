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
        'gap-1',
        `storybook-textfield--${type}`,
        className,
      ])}
    >
      {label && type !== 'search' && (
        <div className="storybook-textfield__header gap-1">
          <Text
            as="label"
            variant="text-sm"
            weight="medium"
            color="currentColor"
            className="storybook-textfield__label text-ds-text-sm font-medium text-neutral-600"
          >
            {labelText}
          </Text>

          {tooltip && (
            <HelpIcon
              className={buildClassName([
                'storybook-textfield__tooltip',
                'text-neutral-600',
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
              color="currentColor"
              className="storybook-textfield__required text-ds-text-xs font-semibold text-error-600"
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
          color="currentColor"
          className={buildClassName([
            'storybook-textfield__helper',
            'text-ds-text-xs',
            'font-normal',
            isError ? 'text-error-600' : 'text-neutral-600',
            isError && 'storybook-textfield__helper--error',
          ])}
        >
          {isError ? errorText : helperText}
        </Text>
      )}
    </div>
  );
}
