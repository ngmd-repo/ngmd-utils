import { TConstructor } from '@ngmd/utils/types';

export type TSignalStatesObject = { flags?: TConstructor; state?: TConstructor };
export type TSignalStateSelectOptions<StateValue, TransformValue> = {
  transform(param: StateValue): TransformValue;
};
