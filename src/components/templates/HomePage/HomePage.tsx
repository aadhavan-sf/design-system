import {
  ArrowSquareOut,
  CaretRight,
  Eye,
  EyeSlash,
  PencilSimple,
} from '@phosphor-icons/react';
import type { Icon } from '@phosphor-icons/react';
import {
  useState,
  type ComponentType,
  type CSSProperties,
  type KeyboardEvent,
} from 'react';

import { RadioButton } from '../../atoms/RadioButton';
import { Button } from '../../molecules/Button';
import { TextField } from '../../molecules/TextField';
import { Text } from '../../foundations/Typography';
import { LeftPanel } from '../../organisms/LeftPanel';
import { Sidebar } from '../../organisms/Sidebar';
import { TopNavigation } from '../../organisms/TopNavigation';

import eyeConditionIcon from './assets/eye-condition.svg';
import lineBackground from './assets/line-background.svg';
import mobilePreviewImage from './assets/mobile-preview.png';

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
      className="block h-auto max-h-[calc(100dvh-240px)] w-[322px] max-w-full object-contain min-[1537px]:w-[400px]"
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
  const Icon = icon;

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onSelect();
    }
  };

  return (
    <div
      className="flex min-h-5 w-full cursor-pointer items-center gap-2 rounded-1 border-0 bg-transparent p-0 text-neutral-700 focus-visible:outline-none focus-visible:shadow-focus-brand"
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
        color="var(--neutral_700)"
      >
        {label}
      </Text>
      {isImageIcon ? (
        <img
          aria-hidden="true"
          className="block h-4 w-4 shrink-0 text-neutral-600"
          src={icon}
          alt=""
        />
      ) : (
        <Icon
          aria-hidden="true"
          className="h-4 w-4 shrink-0 text-neutral-600"
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
    <article className="grid grid-cols-[20px_1fr] gap-2 rounded-4 bg-neutral-25 p-4">
      <img
        aria-hidden="true"
        className="mt-px h-5 w-5"
        src={eyeConditionIcon}
        alt=""
      />
      <div className="flex min-w-0 flex-col gap-1">
        <Text
          as="h3"
          variant="text-sm"
          weight="semibold"
          color="var(--neutral_900)"
          className="m-0"
        >
          Conditional Filter
        </Text>
        {isConditional ? (
          <ul className="m-0 pl-[18px] text-neutral-600">
            <li>
              <Text as="span" variant="text-xs" weight="medium" color="var(--neutral_600)">
                Customers (x3)
              </Text>
            </li>
            <li>
              <Text as="span" variant="text-xs" weight="medium" color="var(--neutral_600)">
                Time (x1)
              </Text>
            </li>
          </ul>
        ) : (
          <Text
            as="p"
            variant="text-xs"
            weight="medium"
            color="var(--neutral_600)"
            className="m-0"
          >
            Set up logic to show each widget to the right users at the right time.
          </Text>
        )}
        <button
          type="button"
          className="mt-1 inline-flex w-max max-w-full cursor-pointer items-center justify-start gap-1 border-0 bg-transparent p-0 text-brand-400 focus-visible:outline-none focus-visible:shadow-focus-brand"
        >
          {isConditional && (
            <PencilSimple
              aria-hidden="true"
              size={16}
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
              size={16}
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
      className="box-border flex h-full w-full flex-col gap-6 overflow-y-auto rounded-6 border border-solid border-neutral-100 bg-neutral-00 px-6 py-6 max-[1299px]:px-4"
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
        <Text as="h2" variant="text-md" weight="semibold" color="var(--neutral_900)">
          Properties
        </Text>
        <div className="flex flex-col gap-3">
          <Text as="p" variant="text-xs" weight="regular" color="var(--neutral_600)" className="m-0">
            To customise custom blocks, go to the custom blocks settings under theme settings.
          </Text>
          <button
            type="button"
            className="inline-flex w-max max-w-full cursor-pointer items-center justify-start gap-1 border-0 bg-transparent p-0 text-brand-400 focus-visible:outline-none focus-visible:shadow-focus-brand"
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
        <Text as="h2" variant="text-md" weight="semibold" color="var(--neutral_900)">
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
          <Text as="p" variant="text-xs" weight="regular" color="var(--neutral_600)" className="m-0">
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
  const shellStyle = {
    backgroundImage: `url(${lineBackground})`,
    backgroundPosition: 'center top',
    backgroundSize: '1280px 1080px',
  } satisfies CSSProperties;

  const handleDesignChange = () => {
    setLastSavedAt(formatLastSavedAt());
  };

  return (
    <div
      className="grid h-dvh w-full min-w-[1280px] overflow-hidden bg-neutral-25 bg-repeat font-sans text-neutral-900 [grid-template-columns:216px_8px_248px_minmax(0,1fr)_8px_248px_8px] max-[1279px]:w-[1280px] min-[1537px]:[grid-template-columns:240px_16px_312px_minmax(0,1fr)_16px_312px_16px]"
      style={shellStyle}
    >
      <TemplateSidebar
        activeItemId="active-theme"
        className="!h-dvh !w-[216px] min-[1537px]:!w-[240px]"
      />

      <div className="col-start-3 h-dvh min-w-0 bg-transparent py-2 min-[1537px]:py-4">
        <TemplateLeftPanel
          className="!h-full !w-full max-[1299px]:!px-4 min-[1300px]:!px-6"
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
          footerLabel="Edit Search Page"
        />
      </div>

      <main className="col-start-4 flex h-dvh min-w-0 flex-col items-center gap-8 overflow-y-auto overflow-x-visible bg-transparent px-4 py-2 min-[1537px]:py-4">
        <TopNavigation className="max-w-full" />
        <div className="grid w-max max-w-full flex-1 grid-rows-[auto_minmax(0,1fr)_auto] items-center justify-items-center gap-8">
          <div className="mx-auto w-[216px] min-[1537px]:w-[280px]">
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
          <div className="flex h-full w-max max-w-full flex-col items-center justify-center gap-4">
            <PhonePreview />
          </div>
          <Text
            as="span"
            variant="text-xs"
            weight="regular"
            color="var(--neutral_600)"
          >
            Last saved: {lastSavedAt}
          </Text>
        </div>
      </main>

      <div className="col-start-6 flex h-dvh min-w-0 bg-transparent py-2 min-[1537px]:py-4">
        <RightPanel onDesignChange={handleDesignChange} />
      </div>
    </div>
  );
}
