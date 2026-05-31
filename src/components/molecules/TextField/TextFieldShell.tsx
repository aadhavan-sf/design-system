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
        'flex w-[296px] flex-col gap-1',
        className,
      ])}
    >
      {label && type !== 'search' && (
        <div className="flex w-full items-center gap-1">
          <Text
            as="label"
            variant="text-sm"
            weight="medium"
            color="var(--neutral_600)"
          >
            {labelText}
          </Text>

          {tooltip && (
            <HelpIcon
              className={buildClassName([
                'flex h-4 w-4 items-center justify-center text-neutral-600',
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
              className="w-[6px]"
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
          className="w-full"
        >
          {isError ? errorText : helperText}
        </Text>
      )}
    </div>
  );
}
