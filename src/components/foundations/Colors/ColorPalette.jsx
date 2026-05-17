import PropTypes from 'prop-types';
import { Text } from '../Typography';
import { colorHex } from '../../../styling/theme/colors';
import './colorPalette.css';

function Swatch({ group, step, hex, showHex }) {
  const cssVar =
    group === 'neutral' && step === 0 ? '--neutral_00' : `--${group}_${String(step)}`;

  return (
    <div className="ds-swatch" title={`${group} ${step}`}>
      <div className="ds-swatch__chip" style={{ backgroundColor: `var(${cssVar})` }} />
      <div className="ds-swatch__meta">
        <Text as="span" variant="text-lg" weight="medium" className="ds-swatch__name">
          {step}
        </Text>
        {showHex ? (
          <Text as="span" variant="text-md" weight="regular" color="var(--neutral_500)" className="ds-swatch__hex">
            {hex}
          </Text>
        ) : null}
      </div>
    </div>
  );
}

Swatch.propTypes = {
  group: PropTypes.oneOf(['neutral', 'brand', 'error', 'warning', 'success']).isRequired,
  step: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  hex: PropTypes.string.isRequired,
  showHex: PropTypes.bool.isRequired,
};

function SpecialSwatch({ name, cssVar, hex, showHex }) {
  return (
    <div className="ds-swatch" title={name}>
      <div className="ds-swatch__chip" style={{ backgroundColor: `var(${cssVar})` }} />
      <div className="ds-swatch__meta">
        <Text as="span" variant="text-lg" weight="medium" className="ds-swatch__name">
          {name}
        </Text>
        {showHex ? (
          <Text as="span" variant="text-md" weight="regular" color="var(--neutral_500)" className="ds-swatch__hex">
            {hex}
          </Text>
        ) : null}
      </div>
    </div>
  );
}

SpecialSwatch.propTypes = {
  name: PropTypes.string.isRequired,
  cssVar: PropTypes.string.isRequired,
  hex: PropTypes.string.isRequired,
  showHex: PropTypes.bool.isRequired,
};

export function ColorPalette({ showHex = true }) {
  return (
    <div className="ds-palette">
      <Section title="Neutral" group="neutral" steps={[0, 25, 50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000]} showHex={showHex} />
      <Section title="Brand" group="brand" steps={[25, 50, 100, 200, 300, 400, 500, 600, 700, 800, 900]} showHex={showHex} />
      <Section title="Error" group="error" steps={[25, 50, 100, 200, 300, 400, 500, 600, 700, 800, 900]} showHex={showHex} />
      <Section title="Warning" group="warning" steps={[25, 50, 100, 200, 300, 400, 500, 600, 700, 800, 900]} showHex={showHex} />
      <Section title="Success" group="success" steps={[25, 50, 100, 200, 300, 400, 500, 600, 700, 800, 900]} showHex={showHex} />

      <div className="ds-section">
        <div className="ds-section__header">
          <Text as="h2" variant="text-lg" weight="semibold" className="ds-section__title">
            Special Colors
          </Text>
        </div>
        <div className="ds-section__grid">
          <SpecialSwatch name="off-white" cssVar="--off-white" hex={colorHex.special.offwhite} showHex={showHex} />
          <SpecialSwatch name="lightening" cssVar="--lightening" hex={colorHex.special.lightening} showHex={showHex} />
          <SpecialSwatch name="midnight-black" cssVar="--midnight-black" hex={colorHex.special.midnightBlack} showHex={showHex} />
        </div>
      </div>
    </div>
  );
}

function Section({ title, group, steps, showHex }) {
  return (
    <div className="ds-section">
      <div className="ds-section__header">
        <Text as="h2" variant="text-lg" weight="semibold" className="ds-section__title">
          {title}
        </Text>
      </div>
      <div className="ds-section__grid">
        {steps.map((step) => (
          <Swatch
            key={`${group}-${step}`}
            group={group}
            step={step}
            hex={colorHex[group][step]}
            showHex={showHex}
          />
        ))}
      </div>
    </div>
  );
}

Section.propTypes = {
  title: PropTypes.string.isRequired,
  group: PropTypes.oneOf(['neutral', 'brand', 'error', 'warning', 'success']).isRequired,
  steps: PropTypes.arrayOf(PropTypes.number).isRequired,
  showHex: PropTypes.bool.isRequired,
};

ColorPalette.propTypes = {
  showHex: PropTypes.bool,
};
