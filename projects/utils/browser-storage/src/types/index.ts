/* eslint-disable @typescript-eslint/naming-convention */
export type BrowserStorageType = 'localStorage' | 'sessionStorage';
export type BrowserStorageStrategy = 'default' | 'json';
export type BrowserStorageConfig = {
  storage?: BrowserStorageType;
  strategy?: BrowserStorageStrategy;
};
