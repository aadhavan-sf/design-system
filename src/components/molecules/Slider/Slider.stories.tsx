// @ts-nocheck
import { useArgs } from 'storybook/preview-api';

import { Slider } from './Slider';

export default {
  title: 'Molecules/Slider',
  component: Slider,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Slider with classic and dotted styles, single-value (Normal) and range (Difference) modes, and Figma label placements.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    style: {
      control: 'select',
      options: ['classic', 'dotted'],
    },
    mode: {
      control: 'select',
      options: ['single', 'range'],
    },
    labelPosition: {
      control: 'select',
      options: ['none', 'bottom', 'top', 'floating-bottom', 'floating-top'],
    },
    disabled: {
      control: 'boolean',
    },
    value: {
      control: 'number',
    },
    startValue: {
      control: 'number',
    },
    endValue: {
      control: 'number',
    },
  },
};

export const Playground = {
  render: (args) => {
    const [{ endValue, startValue, value }, updateArgs] = useArgs();

    return (
      <Slider
        {...args}
        endValue={endValue}
        startValue={startValue}
        value={value}
        onChange={(nextValue) => updateArgs({ value: nextValue })}
        onRangeChange={(nextRange) => updateArgs({
          startValue: nextRange[0],
          endValue: nextRange[1],
        })}
      />
    );
  },
  args: {
    style: 'classic',
    mode: 'single',
    labelPosition: 'none',
    value: 25,
    startValue: 25,
    endValue: 50,
    disabled: false,
  },
};

const SINGLE_VALUES = [25, 50, 75, 100];
const RANGE_VALUES = [
  [25, 50],
  [25, 75],
  [25, 100],
];

function SliderGrid({
  style = 'classic',
  mode = 'single',
  labelPosition = 'none',
  values = SINGLE_VALUES,
}) {
  return (
    <div className="flex flex-wrap items-start gap-x-16 gap-y-12">
      {values.map((entry) => {
        const key = Array.isArray(entry) ? entry.join('-') : entry;

        return mode === 'range' ? (
          <Slider
            key={key}
            style={style}
            mode="range"
            labelPosition={labelPosition}
            startValue={entry[0]}
            endValue={entry[1]}
          />
        ) : (
          <Slider
            key={key}
            style={style}
            labelPosition={labelPosition}
            value={entry}
          />
        );
      })}
    </div>
  );
}

function StyleSection({ style, title }) {
  return (
    <div className="flex flex-col gap-12">
      <h3 className="text-ds-text-md font-medium text-neutral-800">{title}</h3>

      <div className="flex flex-col gap-12">
        <div>
          <p className="mb-2 text-ds-text-sm text-neutral-600">Single · None · Bottom · Floating bottom</p>
          <SliderGrid style={style} labelPosition="none" />
          <SliderGrid style={style} labelPosition="bottom" />
          <SliderGrid style={style} labelPosition="floating-bottom" />
        </div>

        <div>
          <p className="mb-2 text-ds-text-sm text-neutral-600">Single · Top · Floating top</p>
          <SliderGrid style={style} labelPosition="top" />
          <SliderGrid style={style} labelPosition="floating-top" />
        </div>

        <div>
          <p className="mb-2 text-ds-text-sm text-neutral-600">Range · None · Bottom · Floating bottom</p>
          <SliderGrid style={style} mode="range" labelPosition="none" values={RANGE_VALUES} />
          <SliderGrid style={style} mode="range" labelPosition="bottom" values={RANGE_VALUES} />
          <SliderGrid style={style} mode="range" labelPosition="floating-bottom" values={RANGE_VALUES} />
        </div>

        <div>
          <p className="mb-2 text-ds-text-sm text-neutral-600">Range · Top · Floating top</p>
          <SliderGrid style={style} mode="range" labelPosition="top" values={RANGE_VALUES} />
          <SliderGrid style={style} mode="range" labelPosition="floating-top" values={RANGE_VALUES} />
        </div>
      </div>
    </div>
  );
}

export const FigmaDesign = {
  parameters: {
    layout: 'padded',
  },
  render: () => (
    <div className="flex flex-col gap-12">
      <StyleSection style="classic" title="Classic" />
      <StyleSection style="dotted" title="Dotted" />
    </div>
  ),
};

export const Classic = {
  render: () => (
    <div className="flex flex-col gap-12">
      <SliderGrid />
      <SliderGrid labelPosition="bottom" />
      <SliderGrid labelPosition="top" />
      <SliderGrid labelPosition="floating-bottom" />
      <SliderGrid labelPosition="floating-top" />
    </div>
  ),
};

export const Dotted = {
  render: () => (
    <div className="flex flex-col gap-12">
      <SliderGrid style="dotted" />
      <SliderGrid style="dotted" labelPosition="bottom" />
      <SliderGrid style="dotted" labelPosition="top" />
      <SliderGrid style="dotted" labelPosition="floating-bottom" />
      <SliderGrid style="dotted" labelPosition="floating-top" />
    </div>
  ),
};

export const Range = {
  render: () => (
    <div className="flex flex-wrap items-start gap-x-16 gap-y-12">
      <div className="flex flex-col gap-8">
        <Slider mode="range" startValue={25} endValue={50} />
        <Slider mode="range" startValue={25} endValue={75} labelPosition="bottom" />
        <Slider mode="range" startValue={25} endValue={100} labelPosition="floating-top" />
      </div>
      <div className="flex flex-col gap-8">
        <Slider mode="range" style="dotted" startValue={25} endValue={50} />
        <Slider mode="range" style="dotted" startValue={25} endValue={75} labelPosition="bottom" />
        <Slider mode="range" style="dotted" startValue={25} endValue={100} labelPosition="floating-top" />
      </div>
    </div>
  ),
};
