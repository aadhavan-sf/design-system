import { useEffect, useMemo, useRef, useState } from 'react';

import { Text } from '../../foundations/Typography';

export type CountdownTimerState = 'default';

export interface CountdownTime {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export interface CountdownTimerProps {
  /** Figma display preset; overrides manual values when set. */
  state?: CountdownTimerState;
  /** Manual segment values when not using a live target date. */
  days?: number;
  hours?: number;
  minutes?: number;
  seconds?: number;
  /** When set, the timer counts down live to this date/time. */
  targetDate?: Date | string | number;
  /** Ticks every second. Defaults to true when targetDate is set or no Figma state preset is used. */
  running?: boolean;
  className?: string;
  onComplete?: () => void;
}

const STATE_PRESETS: Record<CountdownTimerState, CountdownTime> = {
  default: { days: 2, hours: 10, minutes: 45, seconds: 5 },
};

const TIME_UNITS: Array<{ key: keyof CountdownTime; label: string }> = [
  { key: 'days', label: 'DAYS' },
  { key: 'hours', label: 'HOURS' },
  { key: 'minutes', label: 'MINS' },
  { key: 'seconds', label: 'SECS' },
];

function buildClassName(parts: Array<string | false | null | undefined>) {
  return parts.flat().filter(Boolean).join(' ');
}

function parseTargetDate(value: Date | string | number) {
  const parsed = value instanceof Date ? value : new Date(value);

  return Number.isNaN(parsed.getTime()) ? null : parsed;
}

function clampSegment(value: number) {
  return Math.max(0, Math.floor(value));
}

function resolveStaticTime({
  days = 0,
  hours = 0,
  minutes = 0,
  seconds = 0,
  state,
}: Pick<
  CountdownTimerProps,
  'days' | 'hours' | 'minutes' | 'seconds' | 'state'
>): CountdownTime {
  if (state && state in STATE_PRESETS) {
    return STATE_PRESETS[state];
  }

  return {
    days: clampSegment(days),
    hours: clampSegment(hours),
    minutes: clampSegment(minutes),
    seconds: clampSegment(seconds),
  };
}

function getTimeRemaining(targetDate: Date): CountdownTime {
  const totalMs = Math.max(0, targetDate.getTime() - Date.now());

  return {
    days: Math.floor(totalMs / (1000 * 60 * 60 * 24)),
    hours: Math.floor((totalMs / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((totalMs / (1000 * 60)) % 60),
    seconds: Math.floor((totalMs / 1000) % 60),
  };
}

function timeToMilliseconds(time: CountdownTime) {
  return (
    (((time.days * 24 + time.hours) * 60 + time.minutes) * 60) + time.seconds
  ) * 1000;
}

function formatSegment(value: number) {
  return String(clampSegment(value)).padStart(2, '0');
}

function getCountdownTimerShellClassName(className?: string) {
  return buildClassName([
    'storybook-countdown-timer inline-flex w-[375px] max-w-[430px] items-center justify-center gap-1 px-4 py-2 font-sans text-neutral-800',
    className,
  ]);
}

function CountdownSeparator() {
  return (
    <div
      aria-hidden="true"
      className="storybook-countdown-timer__separator flex h-[80px] max-h-[80px] min-h-[80px] w-5 shrink-0 items-center justify-center [box-sizing:border-box]"
    >
      <div className="flex w-1 flex-col gap-1">
        <span className="size-1 rounded-2 bg-neutral-400" />
        <span className="size-1 rounded-2 bg-neutral-400" />
      </div>
    </div>
  );
}

function CountdownUnit({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="storybook-countdown-timer__unit flex h-[80px] max-h-[80px] min-h-[80px] min-w-14 shrink-0 flex-1 flex-col items-center justify-center gap-1 overflow-hidden rounded-2 bg-neutral-50 px-1 text-center [box-sizing:border-box]">
      <Text
        as="span"
        variant="display-xs"
        weight="bold"
        color="currentColor"
        className="w-full tabular-nums leading-7"
      >
        {value}
      </Text>
      <Text
        as="span"
        variant="text-xs"
        weight="regular"
        color="currentColor"
        className="w-full uppercase leading-[18px] tracking-[0.2em]"
      >
        {label}
      </Text>
    </div>
  );
}

function getAriaLabel(time: CountdownTime) {
  return `${time.days} days, ${time.hours} hours, ${time.minutes} minutes, and ${time.seconds} seconds remaining`;
}

export function CountdownTimer({
  state,
  days,
  hours,
  minutes,
  seconds,
  targetDate,
  running,
  className,
  onComplete,
}: CountdownTimerProps) {
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  const parsedTargetDate = useMemo(
    () => (targetDate === undefined ? null : parseTargetDate(targetDate)),
    [targetDate],
  );
  const staticTime = useMemo(
    () => resolveStaticTime({ days, hours, minutes, seconds, state }),
    [days, hours, minutes, seconds, state],
  );
  const isRunning = running ?? (parsedTargetDate !== null || state === undefined);
  const [liveTime, setLiveTime] = useState<CountdownTime>(staticTime);

  useEffect(() => {
    if (isRunning) {
      return undefined;
    }

    setLiveTime(staticTime);
    return undefined;
  }, [isRunning, staticTime]);

  useEffect(() => {
    if (!isRunning) {
      return undefined;
    }

    const endTimestamp = parsedTargetDate
      ? parsedTargetDate.getTime()
      : Date.now() + timeToMilliseconds(staticTime);
    let hasCompleted = false;

    const tick = () => {
      const nextTime = getTimeRemaining(new Date(endTimestamp));
      setLiveTime(nextTime);

      const isComplete =
        nextTime.days === 0
        && nextTime.hours === 0
        && nextTime.minutes === 0
        && nextTime.seconds === 0;

      if (isComplete && !hasCompleted) {
        hasCompleted = true;
        onCompleteRef.current?.();
      }
    };

    tick();

    const intervalId = window.setInterval(tick, 1000);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [isRunning, parsedTargetDate, staticTime]);

  const time = isRunning ? liveTime : staticTime;

  return (
    <div
      className={getCountdownTimerShellClassName(className)}
      role="timer"
      aria-live="polite"
      aria-atomic="true"
      aria-label={getAriaLabel(time)}
    >
      {TIME_UNITS.map((unit, index) => (
        <div key={unit.key} className="contents">
          {index > 0 && <CountdownSeparator />}
          <CountdownUnit
            label={unit.label}
            value={formatSegment(time[unit.key])}
          />
        </div>
      ))}
    </div>
  );
}

CountdownTimer.displayName = 'Countdown Timer';
