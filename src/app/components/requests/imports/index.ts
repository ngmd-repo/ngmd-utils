import { JsonPipe } from '@angular/common';
import { Type } from '@angular/core';

import { RequestsHubComponent } from '../components/requests-hub/requests-hub.component';
import { RequestsItemsComponent } from '../components/requests-items/requests-items.component';

export const RequestsImports: Type<unknown>[] = [
  RequestsItemsComponent,
  RequestsHubComponent,
  JsonPipe,
];
