/* eslint-disable @typescript-eslint/ban-types */

import { DatabaseManager, TExcludeDatabaseFields } from '../managers/db/database.manager';
import { StatesManager, TExcludeStateFields } from '../managers/state/manager/states.manager';
import { TStateFlags, TStateObject } from '../managers/state/types/state.types';

export type TStateMeta<Manager extends DatabaseManager<any> | StatesManager<any> = any> = {
  instance: Manager;
  enumerablePrototype: object;
};

export type TStatesObject = {
  flags?: TStateFlags;
  state?: TStateObject;
  db?: object;
};

export type TCheckStates<States extends TStatesObject> =
  Extract<keyof States, 'flags' | 'state'> extends never
    ? {}
    : Omit<StatesManager<Omit<States, 'db'>>, TExcludeStateFields>;
export type TCheckDB<States extends TStatesObject> = 'db' extends keyof States
  ? Omit<DatabaseManager<States['db']>, TExcludeDatabaseFields>
  : {};
