/* eslint-disable rxjs/no-exposed-subjects */

import { Injectable } from '@angular/core';
import {
  ExtendsFactory,
  ServiceAction,
  ServiceManager,
  SignalState,
  State,
  UseManagers,
} from '@ngmd/utils/managers';
import { TSortDirection } from '@ngmd/utils/types';
import { BehaviorSubject } from 'rxjs';

import { RootDB } from '../db/root.db';
import { IProduct } from '../interfaces/product.interface';
import { ExampleDataFlags } from '../states/example.data.flags';
import { ExampleDataSignalFlags } from '../states/example.data.signal-flags';
import { ExampleDataSignalState } from '../states/example.data.signal-state';
import { ExampleDataState } from '../states/example.data.state';
import { ExampleApiService } from './example.api.service';

export type TDataAction =
  | ServiceAction<'edit-user', string>
  | ServiceAction<'get-payment', boolean>
  | ServiceAction<'save-url', number>
  | ServiceAction<'sort', TSortDirection>;

const DataManagers = UseManagers([
  'unsubscribe',
  'streams',
  'actions',
  'error',
  'detect',
]);
@Injectable()
export class ExampleDataService extends ExtendsFactory(
  State({
    state: ExampleDataState,
    flags: ExampleDataFlags,
    db: RootDB,
  }),
  SignalState({ state: ExampleDataSignalState, flags: ExampleDataSignalFlags }),
  ServiceManager<typeof DataManagers, TDataAction, ExampleDataService>(DataManagers),
) {
  public test$: BehaviorSubject<string> = new BehaviorSubject(null);
  public sub$: BehaviorSubject<number> = new BehaviorSubject(1);

  constructor(private apiService: ExampleApiService) {
    super();
  }

  public getProducts(): void {
    this.apiService
      .getProducts()
      .pipe(this.untilDestroyed())
      .subscribe((products: IProduct[]) => {
        console.log(products[0].title);
      });
  }
}
