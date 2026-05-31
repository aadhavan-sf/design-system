import { useState, type HTMLAttributes } from 'react';
import { Question } from '@phosphor-icons/react';
import { Text } from '../../foundations/Typography';

export type TooltipPlacement = string;

function buildClassName(parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(' ');
}

const placementClassNames: Record<string, string> = {
  'Top no arrow': 'bottom-5 left-1/2 items-center -translate-x-1/2',
  'Top arrow': 'bottom-5 left-1/2 items-center -translate-x-1/2',
  'Top left': 'bottom-5 right-[-12px] items-end',
  'Top right': 'bottom-5 left-[-12px] items-start',
  Bottom: 'top-5 left-1/2 items-center -translate-x-1/2',
  Left: 'right-5 top-1/2 flex-row items-center -translate-y-1/2',
  Right: 'left-5 top-1/2 flex-row items-center -translate-y-1/2',
};

const arrowClassNames: Record<string, string> = {
  'Top arrow': 'h-0 w-0 border-x-8 border-t-[6px] border-x-transparent border-t-neutral-900',
  'Top left': 'mr-6 h-0 w-0 border-x-8 border-t-[6px] border-x-transparent border-t-neutral-900',
  'Top right': 'ml-6 h-0 w-0 border-x-8 border-t-[6px] border-x-transparent border-t-neutral-900',
  Bottom: 'order-first h-0 w-0 border-x-8 border-b-[6px] border-x-transparent border-b-neutral-900',
  Left: 'h-0 w-0 border-y-8 border-l-[6px] border-y-transparent border-l-neutral-900',
  Right: 'order-first h-0 w-0 border-y-8 border-r-[6px] border-y-transparent border-r-neutral-900',
};

export interface HelpIconProps extends HTMLAttributes<HTMLSpanElement> {
  open?: boolean;
  supportingText?: boolean;
  tooltip?: TooltipPlacement;
  title?: string;
  description?: string;
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

  const placement = placementClassNames[tooltip] ?? placementClassNames['Top no arrow'];
  const arrowClassName = arrowClassNames[tooltip];
  const isVisible = open || isHovering || isFocused;

  return (
    <span
      className={buildClassName([
        'relative inline-flex h-4 w-4 items-center justify-center font-sans text-neutral-400',
        className,
      ])}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      {...props}
    >
      <button
        type="button"
        className="inline-flex h-4 w-4 items-center justify-center border-0 bg-transparent p-0 text-inherit focus-visible:rounded-pill focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-300 [&_svg]:block"
        aria-label="More information"
        aria-expanded={isVisible}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      >
        <Question size={16} weight="regular" />
      </button>

      {isVisible && (
        <span
          className={buildClassName([
            'pointer-events-none absolute z-20 flex flex-col',
            placement,
          ])}
          role="tooltip"
        >
          <span
            className={buildClassName([
              'flex min-w-max max-w-80 flex-col items-start gap-1 rounded-2 bg-neutral-900 px-3 py-2 text-neutral-00 shadow-md',
              supportingText && 'w-[296px] min-w-[296px] p-3',
            ])}
          >
            <Text
              as="span"
              variant="text-xs"
              weight={supportingText ? 'semibold' : 'medium'}
              color="var(--neutral_00)"
              className={buildClassName([
                'block text-neutral-00',
                !supportingText && 'whitespace-nowrap',
              ])}
            >
              {title}
            </Text>

            {supportingText && (
              <Text
                as="span"
                variant="text-xs"
                weight="regular"
                color="var(--neutral_00)"
                className="block text-neutral-00"
              >
                {description}
              </Text>
            )}
          </span>
          {arrowClassName && <span className={arrowClassName} aria-hidden="true" />}
        </span>
      )}
    </span>
  );
}
