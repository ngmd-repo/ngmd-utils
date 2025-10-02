import { ISimple } from '@ngmd/utils/interfaces';

export type TAnimationsParams = {
  animationName?: string;
  enableLeave?: boolean;
  selectors?: string;
  toStyle?: ISimple<string>;
  fromStyle?: ISimple<string>;
  fromState?: string;
  toState?: string;
  timing?: string;
  timingFrom?: string;
  timingTo?: string;
};
