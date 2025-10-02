import { Injectable } from '@angular/core';
import { IUser, TGetUserUrlOptions } from '@data/users';
import { CacheRequest, toHttpHeaders, useCache } from '@ngmd/utils/http';

@Injectable()
export class RequestsItemsViewService {
  public cacheUsers$: CacheRequest<IUser, TGetUserUrlOptions> = useCache({
    url: '@/users/{{id}}',
    cache: {
      urlOptions: { params: { id: 3 } },
      requestOptions: {
        headers: toHttpHeaders({ 'Test-Header': 'Test Value' }),
      },
    },
  });
}
