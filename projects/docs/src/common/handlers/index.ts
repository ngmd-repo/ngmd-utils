import { NgDocGlobalKeyword } from '@ng-doc/core';

export function makeModuleKeywords(
  host: string,
  fragments: string[],
): Record<string, NgDocGlobalKeyword> {
  return fragments.reduce((accum: Record<string, NgDocGlobalKeyword>, fragment: string) => {
    accum[fragment] = {
      url: `${host}#${fragment.toLocaleLowerCase()}`,
    };

    return accum;
  }, {});
}
