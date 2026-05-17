import { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Question,
  Warning,
} from '@phosphor-icons/react';

import { Text } from '../../foundations/Typography';

import './settingsPanel.css';

const PANEL_TYPES = ['app-settings', 'app-distribution'];
const ITEM_STATES = ['default', 'hover', 'focused', 'disabled'];

const PANEL_CONTENT = {
  'app-settings': {
    title: 'App Settings',
    activeLabel: 'Metafields',
    items: [
      'Currency Format',
      'International Selling',
      'Fraud Protection',
      'Login & Accounts Page',
      'Policies',
      'Global CSS',
      'Metafields',
      'Other Options',
      'Product Badges',
      'Other Options',
    ],
    warningLabels: [],
  },
  'app-distribution': {
    title: 'App Distribution',
    activeLabel: 'App Release History',
    items: [
      'App Release History',
      'Launch Screen',
      'Store Listing',
      'App Info',
      'API Keys',
    ],
    warningLabels: ['Launch Screen', 'Store Listing', 'API Keys'],
  },
};

function buildClassName(parts) {
  return parts.filter(Boolean).join(' ');
}

function normalizeValue(value, aliases = {}) {
  return aliases[value] ?? value;
}

function getResolvedType(type) {
  return normalizeValue(type, {
    'App Settings': 'app-settings',
    'App Distribution': 'app-distribution',
    appSettings: 'app-settings',
    appDistribution: 'app-distribution',
  });
}

export function SettingsPanelItem({
  label = 'Label',
  pressed = false,
  showIcon = true,
  state = 'default',
  className,
  onClick,
}) {
  const normalizedState = normalizeValue(state, {
    Default: 'default',
    Hover: 'hover',
    Focused: 'focused',
    Disabled: 'disabled',
  });
  const isDisabled = normalizedState === 'disabled';

  return (
    <button
      type="button"
      disabled={isDisabled}
      className={buildClassName([
        'storybook-settings-panel-item',
        `storybook-settings-panel-item--${normalizedState}`,
        pressed && 'storybook-settings-panel-item--pressed',
        className,
      ])}
      onClick={isDisabled ? undefined : onClick}
    >
      <Text
        as="span"
        variant="text-md"
        weight={pressed ? 'semibold' : 'medium'}
        color="currentColor"
        className="storybook-settings-panel-item__label"
      >
        {label}
      </Text>
      {showIcon && (
        <Warning
          aria-hidden="true"
          className="storybook-settings-panel-item__icon"
          size={20}
          weight="regular"
        />
      )}
    </button>
  );
}

SettingsPanelItem.propTypes = {
  label: PropTypes.string,
  pressed: PropTypes.bool,
  showIcon: PropTypes.bool,
  state: PropTypes.oneOf([...ITEM_STATES, 'Default', 'Hover', 'Focused', 'Disabled']),
  className: PropTypes.string,
  onClick: PropTypes.func,
};

export function SettingsPanel({
  type = 'app-settings',
  title,
  helpLabel = 'Help Doc',
  items,
  activeLabel,
  warningLabels,
  showHelp = true,
  className,
  onHelpClick,
  onItemChange,
}) {
  const resolvedType = getResolvedType(type);
  const panelContent = PANEL_CONTENT[resolvedType] ?? PANEL_CONTENT['app-settings'];
  const resolvedItems = items ?? panelContent.items;
  const resolvedTitle = title ?? panelContent.title;
  const resolvedActiveLabel = activeLabel ?? panelContent.activeLabel;
  const resolvedWarningLabels = warningLabels ?? panelContent.warningLabels;
  const [selectedLabel, setSelectedLabel] = useState(resolvedActiveLabel);

  const handleItemClick = (itemLabel) => {
    setSelectedLabel(itemLabel);
    onItemChange?.(itemLabel);
  };

  return (
    <aside
      aria-label={resolvedTitle}
      className={buildClassName([
        'storybook-settings-panel',
        `storybook-settings-panel--${resolvedType}`,
        className,
      ])}
    >
      <div className="storybook-settings-panel__inner">
        <header className="storybook-settings-panel__header">
          <Text
            as="h2"
            variant="text-md"
            weight="semibold"
            color="var(--neutral_900)"
            className="storybook-settings-panel__title"
          >
            {resolvedTitle}
          </Text>
          {showHelp && (
            <button
              type="button"
              className="storybook-settings-panel__help"
              onClick={onHelpClick}
            >
              <Question aria-hidden="true" size={20} weight="regular" />
              <Text
                as="span"
                variant="text-sm"
                weight="semibold"
                color="currentColor"
              >
                {helpLabel}
              </Text>
            </button>
          )}
        </header>

        <nav className="storybook-settings-panel__nav">
          {resolvedItems.map((item, index) => {
            const itemLabel = typeof item === 'string' ? item : item.label;
            const disabled = typeof item === 'string' ? false : item.disabled;
            const state = typeof item === 'string' ? 'default' : item.state ?? 'default';
            const showIcon = typeof item === 'string'
              ? resolvedWarningLabels.includes(itemLabel)
              : item.showIcon ?? resolvedWarningLabels.includes(itemLabel);
            const pressed = itemLabel === selectedLabel;

            return (
              <SettingsPanelItem
                key={`${itemLabel}-${index}`}
                label={itemLabel}
                pressed={pressed}
                showIcon={showIcon}
                state={disabled ? 'disabled' : state}
                onClick={() => handleItemClick(itemLabel)}
              />
            );
          })}
        </nav>
      </div>
    </aside>
  );
}

SettingsPanel.propTypes = {
  type: PropTypes.oneOf([
    ...PANEL_TYPES,
    'App Settings',
    'App Distribution',
    'appSettings',
    'appDistribution',
  ]),
  title: PropTypes.string,
  helpLabel: PropTypes.string,
  items: PropTypes.arrayOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      disabled: PropTypes.bool,
      showIcon: PropTypes.bool,
      state: PropTypes.oneOf([...ITEM_STATES, 'Default', 'Hover', 'Focused', 'Disabled']),
    }),
  ])),
  activeLabel: PropTypes.string,
  warningLabels: PropTypes.arrayOf(PropTypes.string),
  showHelp: PropTypes.bool,
  className: PropTypes.string,
  onHelpClick: PropTypes.func,
  onItemChange: PropTypes.func,
};
