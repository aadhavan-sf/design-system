// @ts-nocheck
import { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Question,
  Warning,
} from '@phosphor-icons/react';

import { Text } from '../../foundations/Typography';

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
        'box-border flex w-full cursor-pointer items-center gap-2 rounded-2 border border-solid border-neutral-100 bg-neutral-00 p-3 text-left font-sans text-neutral-600 transition-[background-color,border-color,color,box-shadow] duration-[160ms] enabled:hover:border-neutral-100 enabled:hover:bg-neutral-50 focus-visible:border-neutral-100 focus-visible:bg-neutral-00 focus-visible:outline-none focus-visible:shadow-focus-brand disabled:cursor-not-allowed disabled:border-neutral-100 disabled:bg-neutral-50 disabled:text-neutral-300',
        normalizedState === 'hover' && 'border-neutral-100 bg-neutral-50',
        normalizedState === 'focused' && 'border-neutral-100 bg-neutral-00 shadow-focus-brand',
        pressed && 'border-primary-400 bg-primary-25 text-primary-400 enabled:hover:border-primary-400 enabled:hover:bg-primary-25',
        pressed && isDisabled && 'border-primary-100 bg-primary-25 text-primary-100',
        className,
      ])}
      onClick={isDisabled ? undefined : onClick}
    >
      <Text
        as="span"
        variant="text-md"
        weight={pressed ? 'semibold' : 'medium'}
        color="currentColor"
        className="min-w-0 flex-1 overflow-hidden text-ellipsis whitespace-nowrap"
      >
        {label}
      </Text>
      {showIcon && (
        <Warning
          aria-hidden="true"
          className="shrink-0 text-current"
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
        'box-border flex h-[846px] w-[284px] flex-col items-center overflow-hidden rounded-6 border border-solid border-neutral-50 bg-neutral-00 p-6',
        className,
      ])}
    >
      <div className="flex w-full flex-col gap-6">
        <header className="flex w-full items-center gap-2">
          <Text
            as="h2"
            variant="text-md"
            weight="semibold"
            color="var(--neutral_900)"
            className="shrink-0 whitespace-nowrap"
          >
            {resolvedTitle}
          </Text>
          {showHelp && (
            <button
              type="button"
              className="inline-flex cursor-pointer items-center justify-center gap-1 rounded-2 border-0 bg-transparent p-0 text-primary-400 focus-visible:outline-none focus-visible:shadow-focus-brand"
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
