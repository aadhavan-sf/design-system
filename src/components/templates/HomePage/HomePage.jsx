import {
  ArrowsClockwise,
  Bell,
  Heart,
  MagnifyingGlass,
  Plus,
  ShoppingBag,
  ShoppingCart,
  Tag,
  Trash,
  UserCircle,
} from '@phosphor-icons/react';

import { Toggle } from '../../atoms/Toggle';
import { Button } from '../../molecules/Button';
import { TextField } from '../../molecules/TextField';
import { Text } from '../../foundations/Typography';
import { LeftPanel } from '../../organisms/LeftPanel';
import { Sidebar } from '../../organisms/Sidebar';
import { TopNavigation } from '../../organisms/TopNavigation';

import './homePage.css';

const RIGHT_PANEL_IMAGES = [
  { id: 'image-1', enabled: false },
  { id: 'image-2', enabled: false, actionsVisible: true },
];

function PhonePreview() {
  const navItems = [
    { label: 'Home', icon: ShoppingBag },
    { label: 'Cart', icon: ShoppingCart },
    { label: 'Bestsellers', icon: Tag },
    { label: 'Wishlist', icon: Heart },
    { label: 'Account', icon: UserCircle },
  ];

  return (
    <div className="storybook-home-page-phone" aria-label="Mobile storefront preview">
      <div className="storybook-home-page-phone__notch" />
      <div className="storybook-home-page-phone__status">
        <Text as="span" variant="text-xs" weight="semibold" color="var(--neutral_900)">
          9:41
        </Text>
        <span className="storybook-home-page-phone__status-dots" aria-hidden="true" />
      </div>

      <div className="storybook-home-page-phone__toolbar">
        <Bell size={16} weight="regular" />
        <div className="storybook-home-page-phone__toolbar-actions">
          <MagnifyingGlass size={16} weight="regular" />
          <ShoppingCart size={16} weight="regular" />
        </div>
      </div>

      <div className="storybook-home-page-category-row">
        {['Running', 'The Jogger', 'Lifestyle'].map((label, index) => (
          <div key={label} className="storybook-home-page-category">
            <span className={`storybook-home-page-category__image storybook-home-page-category__image--${index + 1}`} />
            <Text as="span" variant="text-xs" weight="medium" color="var(--neutral_900)">
              {label}
            </Text>
          </div>
        ))}
      </div>

      <div className="storybook-home-page-hero-image" aria-hidden="true">
        <span className="storybook-home-page-shoe storybook-home-page-shoe--one" />
        <span className="storybook-home-page-shoe storybook-home-page-shoe--two" />
        <span className="storybook-home-page-shoe storybook-home-page-shoe--three" />
        <span className="storybook-home-page-shoe storybook-home-page-shoe--four" />
      </div>

      <div className="storybook-home-page-phone__copy">
        <Text as="span" variant="text-xs" weight="medium" color="var(--neutral_700)">
          BESTSELLING FAVOURITES
        </Text>
        <Text as="h2" variant="text-lg" weight="semibold" color="var(--neutral_900)">
          Back in Stock
        </Text>
        <Text as="p" variant="text-xs" weight="regular" color="var(--neutral_700)">
          The wait is over. Your favorite Core Collection bestsellers are finally back in stock.
        </Text>
      </div>

      <div className="storybook-home-page-phone__bottom-nav">
        {navItems.map(({ label, icon: Icon }, index) => (
          <span key={label} className="storybook-home-page-phone__nav-item">
            <Icon size={16} weight={index === 0 ? 'fill' : 'regular'} />
            <Text as="span" variant="text-xs" weight={index === 0 ? 'semibold' : 'medium'} color="currentColor">
              {label}
            </Text>
          </span>
        ))}
      </div>
    </div>
  );
}

function RightPanelImageCard({ actionsVisible = false, enabled = false }) {
  return (
    <article className="storybook-home-page-right-card">
      <span className="storybook-home-page-right-card__drag" aria-hidden="true" />
      <div className="storybook-home-page-right-card__body">
        <div className="storybook-home-page-right-card__image">
          {actionsVisible && (
            <div className="storybook-home-page-right-card__actions">
              <button type="button" className="storybook-home-page-right-card__action" aria-label="Replace image">
                <ArrowsClockwise size={20} weight="regular" />
              </button>
              <button type="button" className="storybook-home-page-right-card__action" aria-label="Delete image">
                <Trash size={20} weight="regular" />
              </button>
            </div>
          )}
        </div>
        <div className="storybook-home-page-right-card__footer">
          <Text as="span" variant="text-sm" weight="medium" color="var(--neutral_700)">
            Redirect to
          </Text>
          <Toggle pressed={enabled} size="sm" />
        </div>
      </div>
    </article>
  );
}

function RightPanel() {
  return (
    <aside className="storybook-home-page-right-panel" aria-label="Home page properties">
      <div className="storybook-home-page-right-panel__top">
        <Button label="Publish Theme" hierarchy="primary" size="medium" className="storybook-home-page-right-panel__publish" />
        <span className="storybook-home-page-right-panel__divider" />
      </div>

      <section className="storybook-home-page-right-section">
        <header className="storybook-home-page-right-section__header">
          <Text as="h2" variant="text-md" weight="semibold" color="var(--neutral_900)">
            Properties
          </Text>
          <button type="button" className="storybook-home-page-add-image">
            <Plus size={20} weight="regular" />
            <Text as="span" variant="text-sm" weight="semibold" color="currentColor">
              Add Image
            </Text>
          </button>
        </header>

        <div className="storybook-home-page-right-section__stack">
          {RIGHT_PANEL_IMAGES.map((image) => (
            <RightPanelImageCard
              key={image.id}
              actionsVisible={image.actionsVisible}
              enabled={image.enabled}
            />
          ))}
        </div>
      </section>

      <span className="storybook-home-page-right-panel__divider" />

      <section className="storybook-home-page-right-section">
        <Text as="h2" variant="text-md" weight="semibold" color="var(--neutral_900)">
          Customize
        </Text>
        <div className="storybook-home-page-customize">
          <div className="storybook-home-page-customize__toggle-row">
            <Text as="span" variant="text-sm" weight="medium" color="var(--neutral_700)">
              Full Width
            </Text>
            <Toggle size="sm" />
          </div>
          <TextField
            type="dropdown"
            labelText="Aspect Ratio"
            placeholder="Smart Pick"
            options={['Smart Pick', 'Square', 'Portrait']}
            dropdownListItems={['Smart Pick', 'Square', 'Portrait']}
            tooltip={false}
            astriks={false}
          />
          <TextField
            type="dropdown"
            labelText="Image Position"
            placeholder="Fill"
            options={['Fill', 'Center', 'Top']}
            dropdownListItems={['Fill', 'Center', 'Top']}
            tooltip={false}
            astriks={false}
          />
          <TextField
            type="dropdown"
            labelText="Image Display"
            placeholder="Fit"
            options={['Fit', 'Cover', 'Contain']}
            dropdownListItems={['Fit', 'Cover', 'Contain']}
            tooltip={false}
            astriks={false}
          />
          <TextField
            type="dropdown"
            labelText="Scroll Style"
            placeholder="Default"
            options={['Default', 'Snap', 'Free']}
            dropdownListItems={['Default', 'Snap', 'Free']}
            tooltip={false}
            astriks={false}
          />
        </div>
      </section>
    </aside>
  );
}

export function HomePage() {
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
          selectedItemId="imager-banner"
          footerLabel="Edit Search Page"
        />
      </div>

      <main className="storybook-home-page__canvas">
        <TopNavigation />
        <div className="storybook-home-page__collection-select">
          <TextField
            type="dropdown"
            label={false}
            placeholder="Mens Collection"
            options={['Mens Collection', 'Womens Collection', 'Lifestyle']}
            dropdownListItems={['Mens Collection', 'Womens Collection', 'Lifestyle']}
            tooltip={false}
            astriks={false}
          />
        </div>
        <PhonePreview />
        <Text as="span" variant="text-xs" weight="regular" color="var(--neutral_600)">
          Last saved: 26/2/2024 20:15 IST
        </Text>
      </main>

      <div className="storybook-home-page__right-panel">
        <RightPanel />
      </div>
    </div>
  );
}
