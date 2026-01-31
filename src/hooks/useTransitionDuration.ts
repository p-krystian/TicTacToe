import { useCSSVariable } from 'uniwind';
import parse from 'parse-duration';

const multipliers = {
  xFast: 0.5,
  fast: 0.75,
  default: 1,
  slow: 2,
  xSlow: 4,
  xxSlow: 8
};

type Variants = keyof typeof multipliers;

function useTransitionDuration(variant: Variants = 'default') {
  const cssDuration = useCSSVariable('--default-transition-duration')?.toString() || '0';

  const transitionDuration = parse(cssDuration) || 0;

  return transitionDuration * multipliers[variant];
}

export default useTransitionDuration;
