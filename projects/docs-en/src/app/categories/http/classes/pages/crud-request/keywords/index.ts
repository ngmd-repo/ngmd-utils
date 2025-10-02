import { NgDocGlobalKeyword } from '@ng-doc/core';

import { makeModuleKeywords } from '../../../../../../../common/handlers';

export const HttpCrudRequestKeywords: Record<string, NgDocGlobalKeyword> = Object.assign(
  {
    sendOptions: {
      url: '/http/classes/crud-request#sendoptions',
    },
  },
  makeModuleKeywords('/http/classes/crud-request', [
    'CrudRequest',
    'RequestUrl',
    'UrlOptions',
    'RequestUrlOptions',
    'HttpClientRequestOptions',
    'CrudRequestMeta',
    'SendOptions',
    'SendOptionsPipe',
  ]),
);
