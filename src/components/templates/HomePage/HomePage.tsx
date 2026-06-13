import {
  ArrowSquareOut,
  CaretRight,
  Eye,
  EyeSlash,
  PencilSimple,
} from '@phosphor-icons/react';
import type { Icon } from '@phosphor-icons/react';
import { useState, type ComponentType, type KeyboardEvent } from 'react';

import { RadioButton } from '../../atoms/RadioButton';
import { Button } from '../../molecules/Button';
import { TextField } from '../../molecules/TextField';
import { Text } from '../../foundations/Typography';
import { LeftPanel } from '../../organisms/LeftPanel';
import { Sidebar } from '../../organisms/Sidebar';
import { TopNavigation } from '../../organisms/TopNavigation';

import eyeConditionIcon from './assets/eye-condition.svg';
import mobilePreviewImage from './assets/mobile-preview.png';
import './homePage.css';

type VisibilityId = 'visible' | 'hidden' | 'conditional';
type VisibilityIcon = Icon | string;

type DatePartValues = {
  day?: string;
  month?: string;
  year?: string;
  hour?: string;
  minute?: string;
};

type VisibilityOptionProps = {
  checked: boolean;
  icon: VisibilityIcon;
  label: string;
  onSelect: () => void;
};

type ConditionalFilterCardProps = {
  isConditional: boolean;
};

type RightPanelProps = {
  onDesignChange?: () => void;
};

const TemplateLeftPanel = LeftPanel as unknown as ComponentType<Record<string, unknown>>;
const TemplateSidebar = Sidebar as unknown as ComponentType<Record<string, unknown>>;

const scrollStyleOptions = [
  'Scroll with parent',
  'Fixed to top',
  'Sticky',
];

const visibilityOptions = [
  {
    id: 'visible',
    icon: Eye,
    label: 'Visible',
    helper: 'This block will always be visible.',
  },
  {
    id: 'hidden',
    icon: EyeSlash,
    label: 'Hidden',
    helper: 'This block will always be hidden.',
  },
  {
    id: 'conditional',
    icon: eyeConditionIcon,
    label: 'Conditional visibility',
    helper: '',
  },
];

function buildClassName(parts: Array<string | false | null | undefined>) {
  return parts.flat().filter(Boolean).join(' ');
}

function formatLastSavedAt(date = new Date()) {
  const parts = new Intl.DateTimeFormat('en-IN', {
    timeZone: 'Asia/Kolkata',
    day: 'numeric',
    month: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).formatToParts(date);

  const valueByType = parts.reduce<DatePartValues>((values, part) => {
    if (
      part.type === 'day'
      || part.type === 'month'
      || part.type === 'year'
      || part.type === 'hour'
      || part.type === 'minute'
    ) {
      values[part.type] = part.value;
    }

    return values;
  }, {});

  return `${valueByType.day}/${valueByType.month}/${valueByType.year} ${valueByType.hour}:${valueByType.minute} IST`;
}

function PhonePreview() {
  return (
    <img
      className="storybook-home-page-phone block h-auto object-contain drop-shadow-[0_32px_52px_rgba(10,13,18,0.14)]"
      src={mobilePreviewImage}
      alt="Mobile storefront preview"
    />
  );
}

function VisibilityOption({
  checked,
  icon,
  label,
  onSelect,
}: VisibilityOptionProps) {
  const isImageIcon = typeof icon === 'string';
  const IconComponent = icon;

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onSelect();
    }
  };

  return (
    <div
      className={buildClassName([
        'storybook-home-page-visibility-option',
        'flex min-h-5 w-full cursor-pointer items-center gap-2 rounded-1 border-0 bg-transparent p-0 text-neutral-700',
        'focus-visible:outline-none focus-visible:shadow-focus-brand',
      ])}
      role="radio"
      aria-checked={checked}
      tabIndex={0}
      onClick={onSelect}
      onKeyDown={handleKeyDown}
    >
      <RadioButton
        size="sm"
        pressed={checked}
        aria-label={label}
        className="pointer-events-none shrink-0"
        tabIndex={-1}
      />
      <Text
        as="span"
        variant="text-sm"
        weight="medium"
        className="text-neutral-700"
      >
        {label}
      </Text>
      {isImageIcon ? (
        <img
          aria-hidden="true"
          className="storybook-home-page-visibility-option__icon storybook-home-page-visibility-option__icon--image block size-4 shrink-0"
          src={icon}
          alt=""
        />
      ) : (
        <IconComponent
          aria-hidden="true"
          className="size-4 shrink-0 text-neutral-600"
          size={16}
          weight="regular"
        />
      )}
    </div>
  );
}

function ConditionalFilterCard({
  isConditional,
}: ConditionalFilterCardProps) {
  return (
    <article
      className={buildClassName([
        'storybook-home-page-filter-card',
        'grid gap-2 rounded-16 bg-neutral-25 p-4',
      ])}
    >
      <img
        aria-hidden="true"
        className="storybook-home-page-filter-card__icon size-5"
        src={eyeConditionIcon}
        alt=""
      />
      <div className="flex min-w-0 flex-col gap-4">
        <div className="flex flex-col gap-2">
          <Text
            as="h3"
            variant="text-sm"
            weight="semibold"
            className="text-neutral-900"
          >
            Conditional Filter
          </Text>
          {isConditional ? (
            <ul className="storybook-home-page-filter-card__conditions m-0 list-none p-0">
              <li className="storybook-home-page-filter-card__condition">
                <span
                  aria-hidden="true"
                  className="storybook-home-page-filter-card__condition-marker"
                />
                <Text as="span" variant="text-xs" weight="medium" className="text-neutral-600">
                  Customers (x3)
                </Text>
              </li>
              <li className="storybook-home-page-filter-card__condition">
                <span
                  aria-hidden="true"
                  className="storybook-home-page-filter-card__condition-marker"
                />
                <Text as="span" variant="text-xs" weight="medium" className="text-neutral-600">
                  Time (x1)
                </Text>
              </li>
            </ul>
          ) : (
            <Text
              as="p"
              variant="text-xs"
              weight="medium"
              className="text-neutral-600"
            >
              Set up logic to show each widget to the right users at the right time.
            </Text>
          )}
        </div>
        <button
          type="button"
          className={buildClassName([
            'storybook-home-page-filter-card__setup',
            'inline-flex w-max max-w-full cursor-pointer items-center justify-start gap-2 border-0 bg-transparent p-0 text-brand-400',
            'focus-visible:outline-none focus-visible:shadow-focus-brand',
          ])}
        >
          {isConditional && (
            <PencilSimple
              aria-hidden="true"
              size={18}
              weight="regular"
            />
          )}
          <Text
            as="span"
            variant="text-xs"
            weight="semibold"
            color="currentColor"
          >
            {isConditional ? 'Edit Condition' : 'Setup'}
          </Text>
          {!isConditional && (
            <CaretRight
              aria-hidden="true"
              size={18}
              weight="bold"
            />
          )}
        </button>
      </div>
    </article>
  );
}

function RightPanel({
  onDesignChange = () => {},
}: RightPanelProps) {
  // Demo default for Storybook only. In production, initialize from saved block settings
  // (e.g. API response) so visibility survives refresh.
  const [visibility, setVisibility] = useState<VisibilityId>('visible');
  const selectedVisibility = visibilityOptions.find((option) => option.id === visibility);
  const isConditional = visibility === 'conditional';

  const handleVisibilitySelect = (nextVisibility: VisibilityId) => {
    if (nextVisibility === visibility) {
      return;
    }

    setVisibility(nextVisibility);
    onDesignChange();
  };

  return (
    <aside
      className={buildClassName([
        'storybook-home-page-right-panel',
        'box-border flex h-full w-full flex-col gap-6 overflow-y-auto rounded-6 border border-solid border-neutral-100 bg-neutral-0 py-6 text-neutral-900',
      ])}
      aria-label="Home page properties"
    >
      <div className="flex flex-col gap-3">
        <Button
          label="Publish Theme"
          hierarchy="primary"
          size="medium"
          className="w-full min-w-0"
        />
        <span className="block h-px w-full bg-neutral-100" />
      </div>

      <section className="flex flex-col gap-3">
        <Text as="h2" variant="text-md" weight="semibold" className="text-neutral-900">
          Properties
        </Text>
        <div className="flex flex-col gap-3 text-neutral-600">
          <Text as="p" variant="text-xs" weight="regular" className="text-neutral-600">
            To customise custom blocks, go to the custom blocks settings under theme settings.
          </Text>
          <button
            type="button"
            className={buildClassName([
              'storybook-home-page-custom-blocks-link',
              'inline-flex w-max max-w-full cursor-pointer items-center justify-start gap-1 border-0 bg-transparent p-0 text-brand-400',
              'focus-visible:outline-none focus-visible:shadow-focus-brand',
            ])}
          >
            <Text as="span" variant="text-xs" weight="semibold" color="currentColor">
              Edit Custom Blocks
            </Text>
            <ArrowSquareOut
              aria-hidden="true"
              size={16}
              weight="regular"
            />
          </button>
        </div>
      </section>

      <TextField
        type="dropdown"
        fluid
        labelText="Scroll Style"
        placeholder="Scroll with parent"
        options={scrollStyleOptions}
        dropdownListItems={scrollStyleOptions}
        onSelectedOptionsChange={onDesignChange}
        tooltip={false}
        astriks={false}
      />

      <section className="flex flex-col gap-3">
        <Text as="h2" variant="text-md" weight="semibold" className="text-neutral-900">
          Visibility
        </Text>
        <div
          className="flex flex-col gap-2"
          role="radiogroup"
          aria-label="Visibility"
        >
          {visibilityOptions.map((option) => (
            <VisibilityOption
              key={option.id}
              checked={visibility === option.id}
              icon={option.icon}
              label={option.label}
              onSelect={() => handleVisibilitySelect(option.id as VisibilityId)}
            />
          ))}
        </div>
        {selectedVisibility?.helper && (
          <Text as="p" variant="text-xs" weight="regular" className="text-neutral-600">
            {selectedVisibility.helper}
          </Text>
        )}
      </section>

      {isConditional && (
        <ConditionalFilterCard isConditional={isConditional} />
      )}
    </aside>
  );
}

export function HomePage() {
  const [lastSavedAt, setLastSavedAt] = useState(() =>
    formatLastSavedAt()
  );

  const handleDesignChange = () => {
    setLastSavedAt(formatLastSavedAt());
  };

  return (
    <div className="storybook-home-page box-border bg-neutral-25 font-sans text-neutral-900">
      <TemplateSidebar
        activeItemId="active-theme"
        className="storybook-home-page__sidebar"
      />

      <div className="storybook-home-page__left-panel box-border bg-transparent">
        <TemplateLeftPanel
          className="storybook-home-page__left-panel-surface rounded-6"
          type="fixed-blocks"
          title="Version 1"
          status="draft"
          pageTitle="Home"
          scrollItems={[
            { id: 'imager-banner', label: 'Imager Banner' },
            { id: 'content-block', label: 'Content Block' },
            { id: 'custom-blocks-1', label: 'Custom Blocks #1' },
            { id: 'custom-blocks-2', label: 'Custom Blocks #1' },
            { id: 'image-slider', label: 'Image Slider' },
            { id: 'content-block-2', label: 'Content Block' },
          ]}
          selectedItemId="custom-blocks-1"
        />
      </div>

      <main className="storybook-home-page__canvas box-border flex flex-col items-center gap-8 bg-transparent px-4">
        <TopNavigation />
        <div className="storybook-home-page__preview-lane grid gap-8">
          <div className="storybook-home-page__collection-select">
            <TextField
              type="dropdown"
              fluid
              label={false}
              placeholder="Mens Collection"
              options={['Mens Collection', 'Womens Collection', 'Lifestyle']}
              dropdownListItems={['Mens Collection', 'Womens Collection', 'Lifestyle']}
              onSelectedOptionsChange={handleDesignChange}
              tooltip={false}
              astriks={false}
            />
          </div>
          <div className="storybook-home-page__preview-stack flex flex-col items-center justify-center gap-4">
            <PhonePreview />
          </div>
          <Text
            as="span"
            variant="text-xs"
            weight="regular"
            className="storybook-home-page__last-saved text-neutral-600"
          >
            Last saved: {lastSavedAt}
          </Text>
        </div>
      </main>

      <div className="storybook-home-page__right-panel flex bg-transparent">
        <RightPanel onDesignChange={handleDesignChange} />
      </div>
    </div>
  );
}
