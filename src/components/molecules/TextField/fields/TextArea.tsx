import {
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
  type PointerEvent,
} from 'react';

import {
  buildClassName,
  textFieldFocusVisibleClassName,
  textFieldPlaceholderTrackingClass,
  type NormalizedTextFieldState,
} from '../textField.constants';
import type { BaseTextFieldInputProps } from './InputFields';

import './textareaField.css';

const MIN_TEXTAREA_HEIGHT = 112;

function getTextAreaFieldClassName(state: NormalizedTextFieldState | string) {
  const placeholderClasses =
    state === 'error'
      ? 'placeholder:text-error-600'
      : 'placeholder:text-neutral-300';

  const baseClasses = [
    'box-border block w-full min-w-0 resize-none px-[14px] py-3',
    'rounded-8 border border-solid bg-neutral-0',
    'font-sans text-ds-text-sm font-normal text-neutral-700',
    'placeholder:font-sans placeholder:text-ds-text-sm placeholder:font-normal',
    textFieldPlaceholderTrackingClass,
    placeholderClasses,
    'transition-[border-color,background-color,color,box-shadow] duration-150 ease-out',
    'focus:outline-none focus-visible:border-neutral-500',
  ];

  if (state === 'disabled') {
    return buildClassName([
      ...baseClasses,
      'cursor-not-allowed border-neutral-200 bg-neutral-25 text-neutral-300',
      'disabled:cursor-not-allowed',
    ]);
  }

  if (state === 'error') {
    return buildClassName([
      ...baseClasses,
      'border-error-600 text-error-600',
    ]);
  }

  if (state === 'active') {
    return buildClassName([
      ...baseClasses,
      'border-neutral-500 caret-neutral-700',
    ]);
  }

  return buildClassName([
    ...baseClasses,
    'border-neutral-200',
  ]);
}

function getResizeMarkClassName(state: NormalizedTextFieldState | string) {
  return buildClassName([
    'storybook-textarea-field__resize-mark',
    'absolute bottom-1 right-1 inline-flex size-[14px] items-center justify-center',
    'appearance-none border-0 bg-transparent p-0',
    textFieldFocusVisibleClassName,
    state === 'disabled'
      ? 'cursor-not-allowed text-neutral-300'
      : 'cursor-ns-resize text-neutral-400',
  ]);
}

export function TextArea({
  disabled,
  onChange,
  placeholder,
  state,
  value,
}: BaseTextFieldInputProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [height, setHeight] = useState(MIN_TEXTAREA_HEIGHT);
  const [isFocused, setIsFocused] = useState(false);
  const isActive = state === 'active';
  const isEmpty = value.length === 0;
  const showFakeCaret = isActive && isEmpty && !isFocused && !disabled;

  useEffect(() => {
    if (isActive && isEmpty && !disabled) {
      textareaRef.current?.focus();
    }
  }, [isActive, isEmpty, disabled]);

  const handleResizeStart = (event: PointerEvent<HTMLButtonElement>) => {
    if (disabled || !textareaRef.current) {
      return;
    }

    event.preventDefault();

    const startY = event.clientY;
    const startHeight = textareaRef.current.offsetHeight;

    const handleResizeMove = (moveEvent: globalThis.PointerEvent) => {
      const nextHeight = startHeight + moveEvent.clientY - startY;

      setHeight(Math.max(MIN_TEXTAREA_HEIGHT, nextHeight));
    };

    const handleResizeEnd = () => {
      document.removeEventListener('pointermove', handleResizeMove);
      document.removeEventListener('pointerup', handleResizeEnd);
    };

    document.addEventListener('pointermove', handleResizeMove);
    document.addEventListener('pointerup', handleResizeEnd);
  };

  return (
    <div className="relative w-full">
      {showFakeCaret && (
        <span
          className="storybook-textarea-field__caret pointer-events-none absolute top-[14px] left-[14px] z-[1] h-4 w-px bg-neutral-700"
          aria-hidden="true"
        />
      )}

      <textarea
        ref={textareaRef}
        value={value}
        disabled={disabled}
        placeholder={isActive && isEmpty ? '' : placeholder}
        onChange={(event: ChangeEvent<HTMLTextAreaElement>) => onChange(event.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        style={{ height, minHeight: MIN_TEXTAREA_HEIGHT }}
        className={getTextAreaFieldClassName(state)}
      />

      <button
        type="button"
        aria-label="Resize text area"
        disabled={disabled}
        className={getResizeMarkClassName(state)}
        onPointerDown={handleResizeStart}
      >
        <svg
          aria-hidden="true"
          width="4"
          height="12"
          viewBox="0 0 4 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <line
            x1="0.5"
            y1="0.5"
            x2="0.5"
            y2="11.5"
            stroke="currentColor"
            strokeLinecap="round"
          />
          <line
            x1="3.5"
            y1="3.5"
            x2="3.5"
            y2="9.5"
            stroke="currentColor"
            strokeLinecap="round"
          />
        </svg>
      </button>
    </div>
  );
}
