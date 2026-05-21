import {
  useRef,
  useState,
  type ChangeEvent,
  type PointerEvent,
} from 'react';

import { getFieldClassName } from '../textFieldState';
import type { BaseTextFieldInputProps } from './InputFields';

const MIN_TEXTAREA_HEIGHT = 112;

export function TextArea({
  disabled,
  hasValue,
  onChange,
  placeholder,
  state,
  value,
}: BaseTextFieldInputProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [height, setHeight] = useState(MIN_TEXTAREA_HEIGHT);

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
    <div className="storybook-textfield__textarea-wrap">
      <textarea
        ref={textareaRef}
        value={value}
        disabled={disabled}
        placeholder={placeholder}
        onChange={(event: ChangeEvent<HTMLTextAreaElement>) => onChange(event.target.value)}
        style={{ height }}
        className={getFieldClassName({
          state,
          hasValue,
          className: 'storybook-textfield__field--paragraph',
        })}
      />
      <button
        type="button"
        aria-label="Resize text area"
        disabled={disabled}
        className="storybook-textfield__resize-mark"
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
