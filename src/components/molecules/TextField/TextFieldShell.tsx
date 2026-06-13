import type { ReactNode } from 'react';

import { Text } from '../../foundations/Typography';
import { HelpIcon } from '../Tooltip/HelpIcon';
import { buildClassName } from './textField.constants';

export interface TextFieldShellProps {
  children: ReactNode;
  className?: string;
  errorText: string;
  fluid?: boolean;
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

function getTextFieldShellClassName({
  fluid,
  type,
  className,
}: {
  fluid?: boolean;
  type: string;
  className?: string;
}) {
  return buildClassName([
    'storybook-textfield flex flex-col gap-1',
    fluid ? 'w-full' : 'w-[296px]',
    type && `storybook-textfield--${type}`,
    className,
  ]);
}

function getTextFieldHelperClassName(isError: boolean) {
  return buildClassName([
    'w-full font-normal text-ds-text-xs',
    isError ? 'text-error-600' : 'text-neutral-600',
  ]);
}

export function TextFieldShell({
  children,
  className,
  errorText,
  fluid = false,
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
      className={getTextFieldShellClassName({ fluid, type, className })}
    >
      {label && type !== 'search' && (
        <div className="flex w-full items-center gap-1">
          <Text
            as="label"
            variant="text-sm"
            weight="medium"
            className="leading-none text-neutral-600"
          >
            {labelText}
          </Text>

          {tooltip && (
            <HelpIcon
              className={buildClassName([
                'inline-flex size-4 shrink-0 items-center justify-center text-neutral-600',
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
              className="inline-flex shrink-0 items-center leading-none text-error-600"
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
          className={getTextFieldHelperClassName(isError)}
        >
          {isError ? errorText : helperText}
        </Text>
      )}
    </div>
  );
}
