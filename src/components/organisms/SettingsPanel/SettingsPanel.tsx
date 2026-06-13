// @ts-nocheck
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
  return parts.flat().filter(Boolean).join(' ');
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

function getResolvedState(state) {
  return normalizeValue(state, {
    Default: 'default',
    Hover: 'hover',
    Focused: 'focused',
    Disabled: 'disabled',
  });
}

function getSettingsPanelItemClassName({
  state,
  pressed,
  className,
}) {
  const isDisabled = state === 'disabled';
  const isHover = state === 'hover';
  const isFocused = state === 'focused';

  return buildClassName([
    'storybook-settings-panel-item box-border flex h-12 w-full cursor-pointer items-center gap-2 rounded-2 border border-solid p-3 text-left font-sans transition-[background-color,border-color,color,box-shadow] duration-[160ms] ease-out focus-visible:outline-none focus-visible:shadow-focus-brand',
    pressed && !isDisabled && 'border-brand-400 bg-brand-25 text-brand-400',
    pressed && !isDisabled && isHover && 'bg-brand-25',
    pressed && !isDisabled && isFocused && 'border-brand-400 bg-brand-25 shadow-focus-brand',
    !pressed && !isDisabled && 'border-neutral-100 bg-neutral-0 text-neutral-600 enabled:hover:border-neutral-100 enabled:hover:bg-neutral-50',
    !pressed && !isDisabled && isHover && 'border-neutral-100 bg-neutral-50',
    !pressed && !isDisabled && isFocused && 'border-neutral-100 bg-neutral-0 shadow-focus-brand',
    isDisabled && !pressed && 'cursor-not-allowed border-neutral-100 bg-neutral-50 text-neutral-300',
    pressed && isDisabled && 'cursor-not-allowed border-brand-100 bg-brand-25 text-brand-100',
    isHover && 'storybook-settings-panel-item--hover',
    isFocused && 'storybook-settings-panel-item--focused',
    pressed && 'storybook-settings-panel-item--pressed',
    isDisabled && 'storybook-settings-panel-item--disabled',
    className,
  ]);
}

export function SettingsPanelItem({
  label = 'Label',
  pressed = false,
  showIcon = true,
  state = 'default',
  className,
  onClick,
}) {
  const resolvedState = getResolvedState(state);
  const isDisabled = resolvedState === 'disabled';

  return (
    <button
      type="button"
      disabled={isDisabled}
      className={getSettingsPanelItemClassName({
        state: resolvedState,
        pressed,
        className,
      })}
      onClick={isDisabled ? undefined : onClick}
    >
      <Text
        as="span"
        variant="text-md"
        weight={pressed && !isDisabled ? 'semibold' : 'medium'}
        color="currentColor"
        className="min-w-0 flex-[1_1_0] overflow-hidden text-ellipsis whitespace-nowrap"
      >
        {label}
      </Text>
      {showIcon && (
        <Warning
          aria-hidden="true"
          className="size-5 shrink-0"
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
        'storybook-settings-panel box-border flex h-full min-h-0 w-full flex-col items-center overflow-hidden rounded-6 border border-solid border-neutral-50 bg-neutral-0 p-6 font-sans',
        className,
      ])}
    >
      <div className="flex w-full flex-col gap-6">
        <header className="flex w-full items-center gap-2">
          <Text
            as="h2"
            variant="text-md"
            weight="semibold"
            className="shrink-0 whitespace-nowrap text-neutral-900"
          >
            {resolvedTitle}
          </Text>
          {showHelp && (
            <button
              type="button"
              className="storybook-settings-panel__help inline-flex cursor-pointer items-center justify-center gap-1 rounded-2 border-0 bg-transparent p-0 text-brand-400 focus-visible:outline-none focus-visible:shadow-focus-brand"
              onClick={onHelpClick}
            >
              <Question aria-hidden="true" className="size-5 shrink-0" size={20} weight="regular" />
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

        <nav className="flex w-full flex-col gap-4">
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
