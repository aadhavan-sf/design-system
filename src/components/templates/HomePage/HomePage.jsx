import {
  ArrowSquareOut,
  CaretRight,
  Eye,
  EyeSlash,
  PencilSimple,
} from '@phosphor-icons/react';
import { useState } from 'react';

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

  const valueByType = parts.reduce((values, part) => {
    if (part.type !== 'literal') {
      values[part.type] = part.value;
    }

    return values;
  }, {});

  return `${valueByType.day}/${valueByType.month}/${valueByType.year} ${valueByType.hour}:${valueByType.minute} IST`;
}

function PhonePreview() {
  return (
    <img
      className="storybook-home-page-phone"
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
}) {
  const isImageIcon = typeof icon === 'string';
  const Icon = icon;

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onSelect();
    }
  };

  return (
    <div
      className="storybook-home-page-visibility-option"
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
          className="storybook-home-page-visibility-option__icon storybook-home-page-visibility-option__icon--image"
          src={icon}
          alt=""
        />
      ) : (
        <Icon
          aria-hidden="true"
          className="storybook-home-page-visibility-option__icon"
          size={16}
          weight="regular"
        />
      )}
    </div>
  );
}

function ConditionalFilterCard({
  isConditional,
}) {
  return (
    <article className="storybook-home-page-filter-card">
      <img
        aria-hidden="true"
        className="storybook-home-page-filter-card__icon"
        src={eyeConditionIcon}
        alt=""
      />
      <div className="storybook-home-page-filter-card__content">
        <Text
          as="h3"
          variant="text-sm"
          weight="semibold"
          color="var(--neutral_900)"
        >
          Conditional Filter
        </Text>
        {isConditional ? (
          <ul className="storybook-home-page-filter-card__conditions">
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
          >
            Set up logic to show each widget to the right users at the right time.
          </Text>
        )}
        <button
          type="button"
          className="storybook-home-page-filter-card__setup"
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
}) {
  const [visibility, setVisibility] = useState('visible');
  const selectedVisibility = visibilityOptions.find((option) => option.id === visibility);
  const isConditional = visibility === 'conditional';

  const handleVisibilitySelect = (nextVisibility) => {
    if (nextVisibility === visibility) {
      return;
    }

    setVisibility(nextVisibility);
    onDesignChange();
  };

  return (
    <aside className="storybook-home-page-right-panel" aria-label="Home page properties">
      <div className="storybook-home-page-right-panel__top">
        <Button
          label="Publish Theme"
          hierarchy="primary"
          size="medium"
          className="storybook-home-page-right-panel__publish"
        />
        <span className="storybook-home-page-right-panel__divider" />
      </div>

      <section className="storybook-home-page-right-section">
        <Text as="h2" variant="text-md" weight="semibold" color="var(--neutral_900)">
          Properties
        </Text>
        <div className="storybook-home-page-properties-copy">
          <Text as="p" variant="text-xs" weight="regular" color="var(--neutral_600)">
            To customise custom blocks, go to the custom blocks settings under theme settings.
          </Text>
          <button
            type="button"
            className="storybook-home-page-custom-blocks-link"
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
        labelText="Scroll Style"
        placeholder="Scroll with parent"
        options={scrollStyleOptions}
        dropdownListItems={scrollStyleOptions}
        onSelectedOptionsChange={onDesignChange}
        tooltip={false}
        astriks={false}
      />

      <section className="storybook-home-page-right-section storybook-home-page-right-section--visibility">
        <Text as="h2" variant="text-md" weight="semibold" color="var(--neutral_900)">
          Visibility
        </Text>
        <div
          className="storybook-home-page-visibility-controls"
          role="radiogroup"
          aria-label="Visibility"
        >
          {visibilityOptions.map((option) => (
            <VisibilityOption
              key={option.id}
              checked={visibility === option.id}
              icon={option.icon}
              label={option.label}
              onSelect={() => handleVisibilitySelect(option.id)}
            />
          ))}
        </div>
        {selectedVisibility?.helper && (
          <Text as="p" variant="text-xs" weight="regular" color="var(--neutral_600)">
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
    <div className="storybook-home-page">
      <Sidebar activeItemId="active-theme" />

      <div className="storybook-home-page__left-panel">
        <LeftPanel
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

      <main className="storybook-home-page__canvas">
        <TopNavigation />
        <div className="storybook-home-page__preview-lane">
          <div className="storybook-home-page__collection-select">
            <TextField
              type="dropdown"
              label={false}
              placeholder="Mens Collection"
              options={['Mens Collection', 'Womens Collection', 'Lifestyle']}
              dropdownListItems={['Mens Collection', 'Womens Collection', 'Lifestyle']}
              onSelectedOptionsChange={handleDesignChange}
              tooltip={false}
              astriks={false}
            />
          </div>
          <div className="storybook-home-page__preview-stack">
            <PhonePreview />
            <Text as="span" variant="text-xs" weight="regular" color="var(--neutral_600)">
              Last saved: {lastSavedAt}
            </Text>
          </div>
        </div>
      </main>

      <div className="storybook-home-page__right-panel">
        <RightPanel onDesignChange={handleDesignChange} />
      </div>
    </div>
  );
}
