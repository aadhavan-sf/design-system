import { useState, type MouseEvent } from 'react';
import {
  SealCheck,
  Warning,
  WarningCircle,
  X,
} from '@phosphor-icons/react';
import type { Icon } from '@phosphor-icons/react';

import { Button } from '../../molecules/Button';
import type { ButtonProps } from '../../molecules/Button/Button';
import { Text } from '../../foundations/Typography';

export type ModalVariant = 'status' | 'demo';
export type ModalActionCount = 1 | 2;
export type ModalState = 'error' | 'warning' | 'success';

export type ModalProps = {
  actionCount?: ModalActionCount;
  closeButtonLabel?: string;
  closeOnAction?: boolean;
  closeOnCloseClick?: boolean;
  defaultOpen?: boolean;
  description?: string;
  hideCloseButton?: boolean;
  onClose?: (event: MouseEvent<HTMLButtonElement>) => void;
  onOpenChange?: (open: boolean) => void;
  onPrimaryAction?: (event: MouseEvent<HTMLButtonElement>) => void;
  onSecondaryAction?: (event: MouseEvent<HTMLButtonElement>) => void;
  open?: boolean;
  primaryButtonDestructive?: ButtonProps['destructive'];
  primaryButtonHierarchy?: ButtonProps['hierarchy'];
  primaryButtonIcon?: ButtonProps['icon'];
  primaryButtonProps?: ButtonProps;
  primaryButtonSize?: ButtonProps['size'];
  primaryButtonState?: ButtonProps['state'];
  primaryLabel?: string;
  secondaryButtonDestructive?: ButtonProps['destructive'];
  secondaryButtonHierarchy?: ButtonProps['hierarchy'];
  secondaryButtonIcon?: ButtonProps['icon'];
  secondaryButtonProps?: ButtonProps;
  secondaryButtonSize?: ButtonProps['size'];
  secondaryButtonState?: ButtonProps['state'];
  secondaryLabel?: string;
  state?: ModalState;
  title?: string;
  variant?: ModalVariant;
};

type ModalContent = {
  description: string;
  icon: Icon;
  primaryLabel: string;
  secondaryLabel: string;
  title: string;
};

const MODAL_CONTENT: Record<ModalState, ModalContent> = {
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
  variant = 'status',
  actionCount = 2,
  closeButtonLabel = 'Close modal',
  closeOnAction = true,
  closeOnCloseClick = true,
  description,
  defaultOpen = true,
  hideCloseButton = false,
  onClose,
  onPrimaryAction,
  onOpenChange,
  onSecondaryAction,
  open,
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
}: ModalProps) {
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const isOpenControlled = typeof open === 'boolean';
  const isOpen = isOpenControlled ? open : internalOpen;
  const content = MODAL_CONTENT[state];
  const Icon = content.icon;
  const resolvedTitle = title ?? content.title;
  const resolvedDescription = description ?? content.description;
  const resolvedPrimaryLabel = primaryLabel ?? (variant === 'demo' ? 'Submit' : content.primaryLabel);
  const resolvedSecondaryLabel = secondaryLabel ?? content.secondaryLabel;
  const showSecondaryAction = actionCount === 2;
  const closeModal = () => {
    if (!isOpenControlled) {
      setInternalOpen(false);
    }

    onOpenChange?.(false);
  };

  const handlePrimaryAction = (event: MouseEvent<HTMLButtonElement>) => {
    onPrimaryAction?.(event);

    if (closeOnAction) {
      closeModal();
    }
  };

  const handleSecondaryAction = (event: MouseEvent<HTMLButtonElement>) => {
    onSecondaryAction?.(event);

    if (closeOnAction) {
      closeModal();
    }
  };

  const handleCloseClick = (event: MouseEvent<HTMLButtonElement>) => {
    onClose?.(event);

    if (closeOnCloseClick) {
      closeModal();
    }
  };

  if (!isOpen) {
    return null;
  }

  if (variant === 'demo') {
    return (
      <div className="flex min-h-[360px] min-w-full items-center justify-center bg-neutral-100/70 p-10">
        <section
          aria-labelledby="storybook-modal-title"
          aria-modal="true"
          className="flex w-[480px] flex-col items-start gap-6 overflow-hidden rounded-4 bg-neutral-00 p-6"
          role="dialog"
        >
          <div className="flex w-full items-center justify-between gap-4">
            <Text
              as="h2"
              id="storybook-modal-title"
              variant="text-lg"
              weight="semibold"
              color="var(--neutral_900)"
              className="min-w-0 overflow-hidden text-ellipsis whitespace-nowrap"
            >
              {title ?? 'Add menu Item'}
            </Text>

            {!hideCloseButton && (
              <button
                type="button"
                aria-label={closeButtonLabel}
                className="inline-flex h-6 w-6 shrink-0 cursor-pointer items-center justify-center rounded-1 border-0 bg-transparent p-0 text-neutral-600 transition-[background-color,color,box-shadow] duration-[160ms] enabled:hover:bg-neutral-25 enabled:hover:text-neutral-800 focus-visible:outline-none focus-visible:shadow-focus-neutral"
                onClick={handleCloseClick}
              >
                <X size={24} weight="regular" />
              </button>
            )}
          </div>

          <div className="flex w-full items-center justify-end gap-4">
            {showSecondaryAction && (
              <Button
                destructive={secondaryButtonDestructive}
                hierarchy={secondaryButtonHierarchy}
                icon={secondaryButtonIcon}
                label={resolvedSecondaryLabel}
                size={secondaryButtonSize}
                state={secondaryButtonState}
                onClick={handleSecondaryAction}
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
              onClick={handlePrimaryAction}
              {...primaryButtonProps}
            />
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="flex min-h-[360px] min-w-full items-center justify-center bg-neutral-100/70 p-10">
      <section
        aria-labelledby="storybook-modal-title"
        aria-describedby="storybook-modal-description"
        aria-modal="true"
        className="flex w-[540px] items-start gap-4 overflow-hidden rounded-4 bg-neutral-00 p-6"
        role="dialog"
      >
        <div
          className={[
            'box-border inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-10 p-2',
            state === 'error' && 'bg-error-50 text-error-600',
            state === 'warning' && 'bg-warning-50 text-warning-600',
            state === 'success' && 'bg-success-50 text-success-600',
          ].filter(Boolean).join(' ')}
        >
          <Icon size={24} weight="regular" />
        </div>

        <div className="flex min-w-0 flex-1 basis-0 flex-col gap-8">
          <div className="flex flex-col gap-2">
            <Text
              as="h2"
              id="storybook-modal-title"
              variant="text-lg"
              weight="semibold"
              color="var(--neutral_900)"
              className="w-full overflow-hidden text-ellipsis whitespace-nowrap"
            >
              {resolvedTitle}
            </Text>

            <Text
              as="p"
              id="storybook-modal-description"
              variant="text-sm"
              weight="regular"
              color="var(--neutral_600)"
              className="w-full"
            >
              {resolvedDescription}
            </Text>
          </div>

          <div className="flex items-center justify-end gap-4">
            {showSecondaryAction && (
              <Button
                destructive={secondaryButtonDestructive}
                hierarchy={secondaryButtonHierarchy}
                icon={secondaryButtonIcon}
                label={resolvedSecondaryLabel}
                size={secondaryButtonSize}
                state={secondaryButtonState}
                onClick={handleSecondaryAction}
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
              onClick={handlePrimaryAction}
              {...primaryButtonProps}
            />
          </div>
        </div>
      </section>
    </div>
  );
}
