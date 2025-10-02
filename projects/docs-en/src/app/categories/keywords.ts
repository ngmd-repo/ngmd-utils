import { NgDocGlobalKeyword } from '@ng-doc/core';

import { BrowserStorageKeywords } from './browser-storage/_keywords';
import { CookiesKeywords } from './cookies/_keywords';
import { DBKeywords } from './db/_keywords';
import { DecoratorsKeywords } from './decorators/_keywords';
import { DirectivesKeywords } from './directives/_keywords';
import { HttpKeywords } from './http/_keywords';
import { InitializerKeywords } from './initializer/_keywords';
import { InterceptorKeywords } from './interceptor/_keywords';
import { PipesKeywords } from './pipes/_keywords';
import { SsrKeywords } from './ssr/_keywords';
import { StateKeywords } from './state/_keywords';
import { StoreKeywords } from './store/_keywords';
import { StrategiesKeywords } from './strategies/_keywords';

export const DocsKeywords: Record<string, NgDocGlobalKeyword> = Object.assign(
  {},
  HttpKeywords,
  StateKeywords,
  StoreKeywords,
  StateKeywords,
  DBKeywords,
  InterceptorKeywords,
  InitializerKeywords,
  PipesKeywords,
  DirectivesKeywords,
  DecoratorsKeywords,
  StrategiesKeywords,
  BrowserStorageKeywords,
  CookiesKeywords,
  SsrKeywords,
);
