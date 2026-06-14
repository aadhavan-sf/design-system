// @ts-nocheck
import {
  Bell,
  BellRinging,
  HouseSimple,
  Repeat,
} from '@phosphor-icons/react';
import { useState } from 'react';

import {
  IconLibrary,
  IconLibraryGrid,
  IconLibraryItem,
} from './IconLibrary';
import { iconLibraryOptions } from './iconLibrary.constants';
import { Text } from '../../foundations/Typography';

export default {
  title: 'Molecules/Icon Library',
  component: IconLibrary,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Icon library molecule with selectable Phosphor icons, compact picker, upload state, and icon item states from Figma.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    categoryValue: {
      control: 'select',
      options: [
        'notifications',
        'wishlist',
        'cart',
        'bag',
        'search',
        'hamburger-menu',
        'account',
      ],
    },
    state: {
      control: 'select',
      options: ['default', 'dropdown-upload-icon', 'uploaded-icon'],
    },
    selectedValue: {
      control: 'select',
      options: iconLibraryOptions.map((option) => option.value),
    },
    selectedLabel: {
      control: 'text',
    },
    size: {
      control: 'select',
      options: ['small', 'large'],
    },
  },
};

export const Playground = {
  render: (args) => {
    const [selectedOption, setSelectedOption] = useState({
      value: args.selectedValue,
    });
    const [categoryValue, setCategoryValue] = useState(args.categoryValue);

    return (
      <IconLibrary
        {...args}
        categoryValue={categoryValue}
        selectedValue={selectedOption.value}
        selectedLabel={args.selectedLabel}
        onCategorySelect={(option) => setCategoryValue(option.value)}
        onIconSelect={setSelectedOption}
      />
    );
  },
  args: {
    categoryValue: 'notifications',
    size: 'small',
    state: 'default',
    selectedValue: 'bell',
  },
};

export const SmallStates = {
  render: () => (
    <div className="flex flex-wrap items-start gap-10">
      <IconLibrary state="default" />
      <IconLibrary state="dropdown-upload-icon" />
      <IconLibrary state="uploaded-icon" />
    </div>
  ),
};

export const LargePicker = {
  render: () => {
    const [selectedValue, setSelectedValue] = useState('bell');
    const [emptySelectedValue, setEmptySelectedValue] = useState('empty');

    return (
      <div className="flex flex-wrap items-start gap-10">
        <IconLibraryGrid
          selectedValue={selectedValue}
          state="default"
          onIconSelect={(option) => setSelectedValue(option.value)}
        />
        <IconLibraryGrid
          selectedValue={emptySelectedValue}
          state="icon-not-selected"
          onIconSelect={(option) => setEmptySelectedValue(option.value)}
        />
      </div>
    );
  },
};

export const IconItemStates = {
  render: () => (
    <div className="flex flex-col gap-4">
      {[
        { state: 'default', label: 'Default' },
        { state: 'hover', label: 'Hover' },
        { state: 'focused', label: 'Focused' },
        { state: 'disabled', label: 'Disabled' },
      ].map(({ state, label }) => (
        <div
          key={state}
          className="flex items-center gap-4"
        >
          <Text
            as="span"
            variant="text-xs"
            weight="medium"
            className="w-16 text-neutral-600"
          >
            {label}
          </Text>
          <IconLibraryItem
            icon={HouseSimple}
            size="md"
            state={state}
          />
          <IconLibraryItem
            icon={HouseSimple}
            pressed
            size="md"
            state={state}
          />
          <IconLibraryItem
            icon={HouseSimple}
            size="sm"
            state={state}
          />
          <IconLibraryItem
            icon={HouseSimple}
            pressed
            size="sm"
            state={state}
          />
        </div>
      ))}
    </div>
  ),
};

export const CustomIcons = {
  render: () => (
    <IconLibrary
      state="dropdown-upload-icon"
      selectedValue="bell"
      iconOptions={[
        { value: 'bell', label: 'Notifications', icon: Bell },
        { value: 'bell-ringing', label: 'Ringing', icon: BellRinging },
        { value: 'repeat', label: 'Repeat', icon: Repeat },
      ]}
    />
  ),
};
