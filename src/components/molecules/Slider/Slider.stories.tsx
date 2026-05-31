// @ts-nocheck
import { useArgs } from 'storybook/preview-api';

import { Slider } from './Slider';
import './slider.css';

export default {
  title: 'Molecules/Slider',
  component: Slider,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Slider atom with classic and dotted styles, single-value and range modes, and Figma label placements.',
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

export const Classic = {
  render: () => (
    <div className="slider-story-stack">
      <div className="slider-story-row">
        <Slider value={25} />
        <Slider value={50} />
        <Slider value={75} />
        <Slider value={100} />
      </div>
      <div className="slider-story-row">
        <Slider value={25} labelPosition="bottom" />
        <Slider value={50} labelPosition="bottom" />
        <Slider value={75} labelPosition="top" />
        <Slider value={100} labelPosition="top" />
      </div>
      <div className="slider-story-row">
        <Slider value={25} labelPosition="floating-bottom" />
        <Slider value={50} labelPosition="floating-bottom" />
        <Slider value={75} labelPosition="floating-top" />
        <Slider value={100} labelPosition="floating-top" />
      </div>
    </div>
  ),
};

export const Dotted = {
  render: () => (
    <div className="slider-story-stack">
      <div className="slider-story-row">
        <Slider style="dotted" value={25} />
        <Slider style="dotted" value={50} />
        <Slider style="dotted" value={75} />
        <Slider style="dotted" value={100} />
      </div>
      <div className="slider-story-row">
        <Slider style="dotted" value={25} labelPosition="bottom" />
        <Slider style="dotted" value={50} labelPosition="bottom" />
        <Slider style="dotted" value={75} labelPosition="top" />
        <Slider style="dotted" value={100} labelPosition="top" />
      </div>
      <div className="slider-story-row">
        <Slider style="dotted" value={25} labelPosition="floating-bottom" />
        <Slider style="dotted" value={50} labelPosition="floating-bottom" />
        <Slider style="dotted" value={75} labelPosition="floating-top" />
        <Slider style="dotted" value={100} labelPosition="floating-top" />
      </div>
    </div>
  ),
};

export const Range = {
  render: () => (
    <div className="slider-story-row">
      <div className="slider-story-column">
        <Slider mode="range" startValue={25} endValue={50} />
        <Slider mode="range" startValue={25} endValue={75} labelPosition="bottom" />
        <Slider mode="range" startValue={25} endValue={100} labelPosition="floating-top" />
      </div>
      <div className="slider-story-column">
        <Slider mode="range" style="dotted" startValue={25} endValue={50} />
        <Slider mode="range" style="dotted" startValue={25} endValue={75} labelPosition="bottom" />
        <Slider mode="range" style="dotted" startValue={25} endValue={100} labelPosition="floating-top" />
      </div>
    </div>
  ),
};
