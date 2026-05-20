import {
  ArrowsClockwise,
  Plus,
  Trash,
} from '@phosphor-icons/react';

import { Toggle } from '../../atoms/Toggle';
import { Button } from '../../molecules/Button';
import { TextField } from '../../molecules/TextField';
import { Text } from '../../foundations/Typography';
import { LeftPanel } from '../../organisms/LeftPanel';
import { Sidebar } from '../../organisms/Sidebar';
import { TopNavigation } from '../../organisms/TopNavigation';

import mobilePreviewImage from './assets/mobile-preview.png';
import panelCardPreviewImage from './assets/panel-card-preview.png';
import './homePage.css';

const RIGHT_PANEL_IMAGES = [
  { id: 'image-1', enabled: false },
  { id: 'image-2', enabled: false, actionsVisible: true },
];

function PhonePreview() {
  return (
    <img
      className="storybook-home-page-phone"
      src={mobilePreviewImage}
      alt="Mobile storefront preview"
    />
  );
}

function RightPanelImageCard({ actionsVisible = false, enabled = false }) {
  return (
    <article className="storybook-home-page-right-card">
      <span className="storybook-home-page-right-card__drag" aria-hidden="true" />
      <div className="storybook-home-page-right-card__body">
        <div className="storybook-home-page-right-card__image">
          <img
            className="storybook-home-page-right-card__preview"
            src={panelCardPreviewImage}
            alt=""
            aria-hidden="true"
          />
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
