import { NgDocGlobalKeyword } from '@ng-doc/core';

import { makeModuleKeywords } from '../../../../../../../common/handlers';

export const HttpApiRequestKeywords: Record<string, NgDocGlobalKeyword> = Object.assign(
  {
    'api-req-connect-options': {
      title: 'ConnectionOptions<Response>',
      url: '/http/classes/api-request#connectionoptions',
    },
    'api-req-destroy-cfg': {
      title: 'DestroyConfig',
      url: '/http/classes/api-request#destroyconfig',
    },
  },
  makeModuleKeywords('/http/classes/api-request', [
    'ApiRequest',
    'RequestMeta',
    'RequestUrl',
    'RequestStrategy',
    'HttpRequestOptions',
    'SendRequestOptions',
  ]),
);
