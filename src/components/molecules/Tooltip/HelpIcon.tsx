import { useState, type HTMLAttributes } from 'react';
import { Question } from '@phosphor-icons/react';
import { Text } from '../../foundations/Typography';

import './helpIcon.css';

export type TooltipPlacement = string;

const placementClassNames = {
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

  const placement = placementClassNames[tooltip as keyof typeof placementClassNames] ?? 'top-no-arrow';
  const hasArrow = tooltip !== 'Top no arrow';
  const isVisible = open || isHovering || isFocused;

  return (
    <span
      className={[
        'storybook-help-icon',
        isVisible && 'storybook-help-icon--open',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      {...props}
    >
      <button
        type="button"
        className="storybook-help-icon__trigger"
        aria-label="More information"
        aria-expanded={isVisible}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      >
        <Question size={16} weight="regular" />
      </button>

      {isVisible && (
        <span
          className={[
            'storybook-help-icon__popover',
            `storybook-help-icon__popover--${placement}`,
            hasArrow && 'storybook-help-icon__popover--arrow',
            supportingText && 'storybook-help-icon__popover--supporting',
          ]
            .filter(Boolean)
            .join(' ')}
          role="tooltip"
        >
          <span className="storybook-help-icon__content">
            <Text
              as="span"
              variant="text-xs"
              weight={supportingText ? 'semibold' : 'medium'}
              color="var(--neutral_00)"
              className="storybook-help-icon__title"
            >
              {title}
            </Text>

            {supportingText && (
              <Text
                as="span"
                variant="text-xs"
                weight="regular"
                color="var(--neutral_00)"
                className="storybook-help-icon__description"
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
