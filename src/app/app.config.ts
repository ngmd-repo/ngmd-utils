import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { ApplicationConfig, inject } from '@angular/core';
import {
  PreloadAllModules,
  provideRouter,
  withComponentInputBinding,
  withInMemoryScrolling,
  withPreloading,
} from '@angular/router';
import { environment, IConfig } from '@env';
import { provideBrowserStorage } from '@ngmd/utils/browser-storage';
import { provideRootDB } from '@ngmd/utils/db';
import { provideGql, withGqlConfig } from '@ngmd/utils/http/graphql';
import {
  InitializeState,
  provideUtilsInitializer,
  withInitializeState,
} from '@ngmd/utils/initializer';
import { provideUtilsInterceptor, withTagsUrlsMap } from '@ngmd/utils/interceptor';
import { provideRootState } from '@ngmd/utils/state';
import { provideRootStore } from '@ngmd/utils/store';
import { provideTitleStrategy } from '@ngmd/utils/strategies';

import { AppRoutes } from './app.routes';
import { RootDB } from './db/root.db';
import { RootState } from './states/root.state';
import { RootStore } from './store/root.store';

export const AppConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withInterceptorsFromDi()),
    provideRootState(RootState),
    provideRootDB(RootDB),
    provideUtilsInitializer(environment, withInitializeState()),
    provideBrowserStorage(),
    provideGql(
      withGqlConfig({
        url: '@graphql',
      }),
    ),
    provideUtilsInterceptor(
      withTagsUrlsMap(() => {
        const initializeState: InitializeState<IConfig> = inject(InitializeState);
        const { API_HOST, API_GRAPHQL_HOST }: IConfig = initializeState.config();

        return {
          '@': API_HOST,
          '@graphql': API_GRAPHQL_HOST,
          '@another-graphql': API_GRAPHQL_HOST,
        };
      }),
    ),
    provideRouter(
      AppRoutes,
      withPreloading(PreloadAllModules),
      withComponentInputBinding(),
      withInMemoryScrolling(),
    ),
    provideRootStore(RootStore),
    provideTitleStrategy({
      handler: (title: string) => `Utils: ${title}`,
    }),
  ],
};
