// @ts-nocheck
import { BellRinging } from '@phosphor-icons/react';
import { fn } from 'storybook/test';
import { useState } from 'react';

import { DropdownList } from './DropdownList';

const listVariants = [
  'icon-left',
  'checkbox-left',
  'radio-left',
  'toggle-right',
  'icon-right',
  'check-right',
  'text',
];

const variants = [...listVariants, 'icon-picker'];

const sampleItems = [
  { label: 'Head Content Editor', value: 'editor' },
  { label: 'Head Content Editor', value: 'editor-active', selected: true },
  { label: 'Head Content Editor', value: 'editor-disabled', state: 'disabled' },
  { label: 'Remove language', value: 'remove-language', state: 'destructive' },
];

export default {
  title: 'Molecules/Dropdown List',
  component: DropdownList,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Dropdown list rows for menus and fields, plus an icon-picker variant with preset icons, an OR separator, and file upload.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: variants,
    },
    selectedValue: {
      control: 'text',
      if: { arg: 'variant', eq: 'icon-picker' },
    },
    iconOptions: {
      control: false,
      if: { arg: 'variant', eq: 'icon-picker' },
    },
    onIconSelect: {
      control: false,
      if: { arg: 'variant', eq: 'icon-picker' },
    },
    onUpload: {
      control: false,
      if: { arg: 'variant', eq: 'icon-picker' },
    },
    onRepeatUploadedIcon: {
      control: false,
      if: { arg: 'variant', eq: 'icon-picker' },
    },
    onRemoveUploadedIcon: {
      control: false,
      if: { arg: 'variant', eq: 'icon-picker' },
    },
    uploadedIcon: {
      control: false,
      if: { arg: 'variant', eq: 'icon-picker' },
    },
  },
};

export const Playground = {
  args: {
    items: sampleItems,
    variant: 'icon-left',
    selectedValue: 'bell',
    onIconSelect: fn(),
    onUpload: fn(),
    onRepeatUploadedIcon: fn(),
    onRemoveUploadedIcon: fn(),
  },
};

export const Variants = {
  render: () => (
    <div className="flex flex-col gap-16">
      <div className="grid grid-cols-[repeat(3,240px)] items-start gap-x-16 gap-y-24">
        {listVariants.map((variant) => (
          <DropdownList
            key={variant}
            items={sampleItems}
            variant={variant}
          />
        ))}
      </div>
      <DropdownList
        selectedValue="bell"
        variant="icon-picker"
      />
    </div>
  ),
};

export const IconPicker = {
  render: () => {
    const [selectedValue, setSelectedValue] = useState('bell');
    const [uploadedIcon, setUploadedIcon] = useState(null);

    return (
      <DropdownList
        selectedValue={selectedValue}
        uploadedIcon={uploadedIcon}
        variant="icon-picker"
        onIconSelect={(option) => {
          setSelectedValue(option.value);
          setUploadedIcon(null);
        }}
        onRemoveUploadedIcon={() => {
          setUploadedIcon(null);
          setSelectedValue('bell');
        }}
        onRepeatUploadedIcon={() => {}}
        onUpload={() => setUploadedIcon(BellRinging)}
      />
    );
  },
};
