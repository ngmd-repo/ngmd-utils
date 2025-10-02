import { NgDocConfiguration } from '@ng-doc/builder';
import { ngKeywordsLoader, rxjsKeywordsLoader } from '@ng-doc/keywords-loaders';

import { projectKeywordsLoader } from './keywords/ng-docs.keywords';

const config: NgDocConfiguration = {
  docsPath: 'projects/docs/src',
  outDir: 'projects/docs',
  cache: false,
  keywords: {
    loaders: [
      ngKeywordsLoader(),
      rxjsKeywordsLoader(),
      projectKeywordsLoader(),
    ],
  },
};

export default config;
