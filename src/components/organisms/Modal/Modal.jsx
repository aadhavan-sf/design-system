import PropTypes from 'prop-types';
import {
  SealCheck,
  Warning,
  WarningCircle,
} from '@phosphor-icons/react';

import { Button } from '../../molecules/Button';
import { Text } from '../../foundations/Typography';

import './modal.css';

const MODAL_CONTENT = {
  error: {
    icon: WarningCircle,
    title: 'Are you sure you want to remove this language?',
    description: 'A confirmation message asking the user to verify before deleting a selected language.',
    primaryLabel: 'Confirm',
    secondaryLabel: 'Cancel',
  },
  warning: {
    icon: Warning,
    title: 'Default Language Cannot Be Deleted',
    description: 'You can’t remove the default language. Please select a different language as default before proceeding with deletion.',
    primaryLabel: 'Got It',
    secondaryLabel: 'Cancel',
  },
  success: {
    icon: SealCheck,
    title: 'Selected language has been removed successfully.',
    description: 'Preferences have been updated and changes are now saved. Feel free to explore your settings or make additional adjustments.',
    primaryLabel: 'Done',
    secondaryLabel: 'Cancel',
  },
};

export function Modal({
  actionCount = 2,
  description,
  onPrimaryAction,
  onSecondaryAction,
  primaryButtonDestructive = false,
  primaryButtonHierarchy = 'primary',
  primaryButtonIcon = 'none',
  primaryButtonProps,
  primaryButtonSize = 'large',
  primaryButtonState = 'default',
  primaryLabel,
  secondaryButtonDestructive = false,
  secondaryButtonHierarchy = 'secondary',
  secondaryButtonIcon = 'none',
  secondaryButtonProps,
  secondaryButtonSize = 'large',
  secondaryButtonState = 'default',
  secondaryLabel,
  state = 'error',
  title,
}) {
  const content = MODAL_CONTENT[state];
  const Icon = content.icon;
  const resolvedTitle = title ?? content.title;
  const resolvedDescription = description ?? content.description;
  const resolvedPrimaryLabel = primaryLabel ?? content.primaryLabel;
  const resolvedSecondaryLabel = secondaryLabel ?? content.secondaryLabel;
  const showSecondaryAction = actionCount === 2;

  return (
    <div className="storybook-modal__backdrop">
      <section
        aria-labelledby="storybook-modal-title"
        aria-describedby="storybook-modal-description"
        className="storybook-modal"
        role="dialog"
      >
        <div className={`storybook-modal__icon storybook-modal__icon--${state}`}>
          <Icon size={24} weight="regular" />
        </div>

        <div className="storybook-modal__content">
          <div className="storybook-modal__copy">
            <Text
              as="h2"
              id="storybook-modal-title"
              variant="text-lg"
              weight="semibold"
              color="var(--neutral_900)"
              className="storybook-modal__title"
            >
              {resolvedTitle}
            </Text>

            <Text
              as="p"
              id="storybook-modal-description"
              variant="text-sm"
              weight="regular"
              color="var(--neutral_600)"
              className="storybook-modal__description"
            >
              {resolvedDescription}
            </Text>
          </div>

          <div className="storybook-modal__actions">
            {showSecondaryAction && (
              <Button
                destructive={secondaryButtonDestructive}
                hierarchy={secondaryButtonHierarchy}
                icon={secondaryButtonIcon}
                label={resolvedSecondaryLabel}
                size={secondaryButtonSize}
                state={secondaryButtonState}
                onClick={onSecondaryAction}
                {...secondaryButtonProps}
              />
            )}

            <Button
              destructive={primaryButtonDestructive}
              hierarchy={primaryButtonHierarchy}
              icon={primaryButtonIcon}
              label={resolvedPrimaryLabel}
              size={primaryButtonSize}
              state={primaryButtonState}
              onClick={onPrimaryAction}
              {...primaryButtonProps}
            />
          </div>
        </div>
      </section>
    </div>
  );
}

Modal.propTypes = {
  actionCount: PropTypes.oneOf([1, 2]),
  description: PropTypes.string,
  onPrimaryAction: PropTypes.func,
  onSecondaryAction: PropTypes.func,
  primaryButtonDestructive: PropTypes.bool,
  primaryButtonHierarchy: PropTypes.oneOf([
    'primary',
    'secondary',
    'link-grey',
    'link-color',
  ]),
  primaryButtonIcon: PropTypes.oneOf([
    'none',
    'left',
    'right',
    'only',
  ]),
  primaryButtonProps: PropTypes.shape({
    destructive: PropTypes.bool,
    hierarchy: PropTypes.oneOf([
      'primary',
      'secondary',
      'link-grey',
      'link-color',
    ]),
    icon: PropTypes.oneOf([
      'none',
      'left',
      'right',
      'only',
    ]),
    label: PropTypes.string,
    size: PropTypes.oneOf([
      'small',
      'medium',
      'large',
      'xlarge',
    ]),
    state: PropTypes.oneOf([
      'default',
      'focus',
      'disabled',
    ]),
  }),
  primaryButtonSize: PropTypes.oneOf([
    'small',
    'medium',
    'large',
    'xlarge',
  ]),
  primaryButtonState: PropTypes.oneOf([
    'default',
    'focus',
    'disabled',
  ]),
  primaryLabel: PropTypes.string,
  secondaryButtonDestructive: PropTypes.bool,
  secondaryButtonHierarchy: PropTypes.oneOf([
    'primary',
    'secondary',
    'link-grey',
    'link-color',
  ]),
  secondaryButtonIcon: PropTypes.oneOf([
    'none',
    'left',
    'right',
    'only',
  ]),
  secondaryButtonProps: PropTypes.shape({
    destructive: PropTypes.bool,
    hierarchy: PropTypes.oneOf([
      'primary',
      'secondary',
      'link-grey',
      'link-color',
    ]),
    icon: PropTypes.oneOf([
      'none',
      'left',
      'right',
      'only',
    ]),
    label: PropTypes.string,
    size: PropTypes.oneOf([
      'small',
      'medium',
      'large',
      'xlarge',
    ]),
    state: PropTypes.oneOf([
      'default',
      'focus',
      'disabled',
    ]),
  }),
  secondaryButtonSize: PropTypes.oneOf([
    'small',
    'medium',
    'large',
    'xlarge',
  ]),
  secondaryButtonState: PropTypes.oneOf([
    'default',
    'focus',
    'disabled',
  ]),
  secondaryLabel: PropTypes.string,
  state: PropTypes.oneOf(['error', 'warning', 'success']),
  title: PropTypes.string,
};
