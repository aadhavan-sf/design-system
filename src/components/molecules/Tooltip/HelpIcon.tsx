import { useState, type HTMLAttributes } from 'react';
import { Question } from '@phosphor-icons/react';
import { Text } from '../../foundations/Typography';

import './helpIcon.css';

export type TooltipPlacement =
  | 'Top no arrow'
  | 'Top arrow'
  | 'Top left'
  | 'Top right'
  | 'Bottom'
  | 'Left'
  | 'Right';

type NormalizedPlacement =
  | 'top-no-arrow'
  | 'top-arrow'
  | 'top-left'
  | 'top-right'
  | 'bottom'
  | 'left'
  | 'right';

const placementClassNames: Record<TooltipPlacement, NormalizedPlacement> = {
  'Top no arrow': 'top-no-arrow',
  'Top arrow': 'top-arrow',
  'Top left': 'top-left',
  'Top right': 'top-right',
  Bottom: 'bottom',
  Left: 'left',
  Right: 'right',
};

export interface HelpIconProps extends HTMLAttributes<HTMLSpanElement> {
  open?: boolean;
  supportingText?: boolean;
  tooltip?: TooltipPlacement | string;
  title?: string;
  description?: string;
}

function buildClassName(parts: Array<string | false | null | undefined>) {
  return parts.flat().filter(Boolean).join(' ');
}

function normalizePlacement(tooltip: string): NormalizedPlacement {
  return placementClassNames[tooltip as TooltipPlacement] ?? 'top-no-arrow';
}

function getHelpIconClassName(className?: string) {
  return buildClassName([
    'storybook-help-icon relative inline-flex h-4 w-4 items-center justify-center font-sans text-neutral-400',
    className,
  ]);
}

function getHelpIconTriggerClassName() {
  return buildClassName([
    'storybook-help-icon__trigger inline-flex h-4 w-4 items-center justify-center rounded-full border-0 bg-transparent p-0 text-inherit',
    'focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-300 focus-visible:outline-offset-2',
  ]);
}

function getPopoverClassName({
  hasArrow,
  placement,
}: {
  hasArrow: boolean;
  placement: NormalizedPlacement;
}) {
  return buildClassName([
    'storybook-help-icon__popover pointer-events-none absolute z-20 flex flex-col',
    `storybook-help-icon__popover--${placement}`,
    hasArrow && 'storybook-help-icon__popover--arrow',
  ]);
}

function getPopoverPanelClassName(supportingText: boolean) {
  return buildClassName([
    'flex flex-col items-start gap-1 rounded-8 bg-neutral-900 text-neutral-0 shadow-md',
    'min-w-max max-w-[320px] px-3 py-2',
    supportingText && 'w-[296px] min-w-[296px] p-3',
  ]);
}

function getPopoverTitleClassName(supportingText: boolean) {
  return buildClassName([
    'block text-ds-text-xs',
    supportingText ? 'whitespace-normal' : 'whitespace-nowrap',
  ]);
}

export function HelpIcon({
  open = false,
  supportingText = false,
  tooltip = 'Top no arrow',
  title = 'This is a tooltip',
  description = 'Tooltips are used to describe or identify an element. In most scenarios, tooltips help the user understand the meaning, function or alt-text of an element.',
  className,
  ...props
}: HelpIconProps) {
  const [isHovering, setIsHovering] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const placement = normalizePlacement(tooltip);
  const hasArrow = tooltip !== 'Top no arrow';
  const isVisible = open || isHovering || isFocused;

  return (
    <span
      className={getHelpIconClassName(className)}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      {...props}
    >
      <button
        type="button"
        className={getHelpIconTriggerClassName()}
        aria-label="More information"
        aria-expanded={isVisible}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      >
        <Question className="block" size={16} weight="regular" />
      </button>

      {isVisible && (
        <span
          className={getPopoverClassName({ hasArrow, placement })}
          role="tooltip"
        >
          <span className={getPopoverPanelClassName(supportingText)}>
            <Text
              as="span"
              variant="text-xs"
              weight={supportingText ? 'semibold' : 'medium'}
              color="currentColor"
              className={getPopoverTitleClassName(supportingText)}
            >
              {title}
            </Text>

            {supportingText && (
              <Text
                as="span"
                variant="text-xs"
                weight="regular"
                color="currentColor"
                className="block text-ds-text-xs"
              >
                {description}
              </Text>
            )}
          </span>
        </span>
      )}
    </span>
  );
}
