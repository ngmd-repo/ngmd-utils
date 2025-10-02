/* eslint-disable @typescript-eslint/ban-types */

import { SERVICE_MANAGERS_MAP } from '../constants/service.const';
import { ActionsManager, TExcludeActionsFields } from '../managers/actions/manager/actions.manager';
import { DetectManager, TExcludeDetectFields } from '../managers/detect/manager/detect.manager';
import { ErrorManager, TExcludeErrorFields } from '../managers/error/manager/error.manager';
import { ServiceAction } from '../managers/public-api';
import { StreamsManager } from '../managers/streams/manager/streams.manager';
import {
  TExcludeUnsubscribeFields,
  UnsubscribeManager,
} from '../managers/unsubscribe/manager/unsubscribe.manager';

export type TServiceManagers<ExtendsClass extends object, Actions extends ServiceAction = null> = {
  unsubscribe: Omit<UnsubscribeManager<Actions['type']>, TExcludeUnsubscribeFields>;
  actions: Omit<ActionsManager<Actions>, TExcludeActionsFields>;
  error: Omit<ErrorManager<Actions['type']>, TExcludeErrorFields>;
  detect: Omit<DetectManager<Actions['type']>, TExcludeDetectFields>;
  streams: StreamsManager<ExtendsClass>;
};
export type TServiceManagersInstances<Managers extends TServiceManager[]> = InstanceType<
  (typeof SERVICE_MANAGERS_MAP)[Managers[number]]
>[];
export type TServiceManager = keyof TServiceManagers<null>;
export type TServiceInstance<
  Managers extends TServiceManager[],
  ExtendsClass extends object,
  Actions extends ServiceAction,
> = Managers extends [
  infer CurrentManager extends Managers[number],
  ...infer Arr extends TServiceManager[],
]
  ? TServiceInstance<Arr, ExtendsClass, Actions> &
      TServiceManagers<ExtendsClass, Actions>[CurrentManager]
  : {};

export type TOnlyActions = ['actions'];
export type TOnlyDetect = ['detect'];
export type TOnlyError = ['error'];
export type TOnlyStreams = ['streams'];
export type TOnlyUnsubscribe = ['unsubscribe'];
export type TFullManagers = ['actions', 'detect', 'error', 'streams', 'unsubscribe'];
