import {
  animate,
  animateChild,
  animation,
  AnimationReferenceMetadata,
  AnimationTransitionMetadata,
  AnimationTriggerMetadata,
  query,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

import { EnAnimations } from './enums/animations.enum';
import { queryOptions } from './handlers/animations.handlers';
import { TAnimationsParams } from './types/animations.types';

/**
 * @deprecated Use native animations
 */
export const ANFade: AnimationReferenceMetadata = animation(
  [
    style({ opacity: '{{ fromState }}' }),
    animate('{{ timing }}', style({ opacity: '{{ toState }}' })),
  ],
  {
    params: {
      timing: EnAnimations.DEFAULT_TIMING,
      fromState: '0',
      toState: '1',
    },
  },
);

/**
 * @deprecated Use native animations
 */
export const ANShowFade: (
  params: Pick<TAnimationsParams, 'animationName' | 'timingFrom' | 'timingTo'>,
) => AnimationTriggerMetadata = ({
  timingFrom = '200ms ease-in',
  timingTo = timingFrom as string,
  animationName = 'ANShowFade',
} = {}) =>
  trigger(animationName, [
    transition(':enter', [
      style({ opacity: 0 }),
      animate(timingFrom, style({ opacity: 1 })),
    ]),
    transition(':leave', [
      style({ opacity: 1 }),
      animate(timingTo, style({ opacity: 0 })),
    ]),
  ]);

/**
 * @deprecated Use native animations
 */
export const ANStyles: (
  params: Pick<
    TAnimationsParams,
    'animationName' | 'enableLeave' | 'fromStyle' | 'timingFrom' | 'timingTo' | 'toStyle'
  >,
) => AnimationTriggerMetadata = ({
  fromStyle = {},
  toStyle = {},
  timingFrom = EnAnimations.DEFAULT_TIMING as string,
  timingTo = timingFrom as string,
  animationName = 'ANStyles',
  enableLeave = true,
} = {}): AnimationTriggerMetadata => {
  const transitions: AnimationTransitionMetadata[] = [
    transition(`:enter`, [
      style(fromStyle),
      animate(timingFrom, style(toStyle)),
    ]),
  ];

  if (enableLeave) {
    transitions.push(transition(`:leave`, [style(toStyle), animate(timingTo, style(fromStyle))]));
  }

  return trigger(animationName, transitions);
};

/**
 * @deprecated Use native animations
 */
export const ANStylesHide: (
  params: Pick<TAnimationsParams, 'animationName' | 'fromStyle' | 'timing' | 'toStyle'>,
) => AnimationTriggerMetadata = ({
  fromStyle = {},
  toStyle = {},
  timing = EnAnimations.DEFAULT_TIMING as string,
  animationName = 'ANStylesHide',
} = {}) =>
  trigger(animationName, [
    transition(':leave', [style(fromStyle), animate(timing, style(toStyle))]),
  ]);

/**
 * @deprecated Use native animations
 */
export const ANStylesState: (
  params: Pick<
    TAnimationsParams,
    'animationName' | 'fromState' | 'fromStyle' | 'timing' | 'toState' | 'toStyle'
  >,
) => AnimationTriggerMetadata = ({
  fromStyle = {},
  fromState = '*',
  toStyle = {},
  toState = '*',
  timing = EnAnimations.DEFAULT_TIMING,
  animationName = 'ANStylesState',
} = {}) => {
  return trigger(animationName, [
    state(fromState, style(fromStyle)),
    state(toState, style(toStyle)),
    transition(`${fromState}<=>${toState}`, animate(timing)),
  ]);
};

/**
 * @deprecated Use native animations
 */
export const ANStylesQueryState: (
  params: Pick<
    TAnimationsParams,
    'animationName' | 'fromState' | 'fromStyle' | 'selectors' | 'timing' | 'toState' | 'toStyle'
  >,
) => AnimationTriggerMetadata = ({
  fromStyle = {},
  fromState = '*',
  toStyle = {},
  toState = '*',
  timing = EnAnimations.DEFAULT_TIMING as string,
  selectors = '@*',
  animationName = 'ANStylesState',
} = {}) => {
  return trigger(animationName, [
    transition(`${fromState}=>${toState}`, [
      query(selectors, [style(fromStyle), animate(timing, style(toStyle))], queryOptions()),
    ]),
    transition(`${toState}=>${fromState}`, [
      query(selectors, [style(toStyle), animate(timing, style(fromStyle))], queryOptions()),
    ]),
  ]);
};

/**
 * @deprecated Use native animations
 */
export const ANShowQuery: (
  params: Pick<
    TAnimationsParams,
    'animationName' | 'fromStyle' | 'selectors' | 'timing' | 'toStyle'
  >,
) => AnimationTriggerMetadata = ({
  selectors = '@*',
  fromStyle = {},
  toStyle = {},
  timing = EnAnimations.DEFAULT_TIMING,
  animationName = 'ANShowQuery',
} = {}) => {
  return trigger(animationName, [
    transition(':enter', [
      query(selectors, [style(fromStyle), animate(timing, style(toStyle))], queryOptions()),
    ]),
    transition(':leave', [
      query(selectors, [style(toStyle), animate(timing, style(fromStyle))], queryOptions()),
    ]),
  ]);
};

/**
 * @deprecated Use native animations
 */
export const ANShowTriggerQuery: (
  params: Pick<TAnimationsParams, 'animationName' | 'selectors'>,
) => AnimationTriggerMetadata = ({
  selectors = '@*',
  animationName = 'ANShowTriggerQuery',
} = {}) => {
  return trigger(animationName, [
    transition(':enter, :leave', [
      query(selectors, [animateChild()], queryOptions()),
    ]),
  ]);
};

/**
 * @deprecated Use native animations
 */
export const ANRepeatState: (
  params: Pick<
    TAnimationsParams,
    'animationName' | 'fromState' | 'fromStyle' | 'selectors' | 'timing' | 'toState' | 'toStyle'
  >,
) => AnimationTriggerMetadata = ({
  fromState = '*',
  toState = '*',
  fromStyle = {},
  toStyle = {},
  timing = EnAnimations.DEFAULT_TIMING,
  animationName = 'ANRepeatState',
} = {}) =>
  trigger(animationName, [
    transition(`${fromState} <=> ${toState}`, [
      style(fromStyle),
      animate(timing, style(toStyle)),
    ]),
  ]);
