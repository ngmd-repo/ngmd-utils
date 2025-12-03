import {
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { toHttpHeaders } from '@ngmd/utils/http';
import { Observable } from 'rxjs';

import { INTERCEPTOR_DEFAULT_CONFIG, InterceptorDefaultConfig } from '../features/default-config';
import {
  INTERCEPTOR_TAGS_MAP_HANDLER,
  InterceptorTagsUrlsHandler,
} from '../features/tags-urls-handler';
import { INTERCEPTOR_TAGS_MAP, InterceptorTagsMap } from '../features/tags-urls-map';
import { INTERCEPTOR_HEADERS, InterceptorHeaders } from '../features/with-headers';
import {
  INTERCEPTOR_HEADERS_HANDLER,
  InterceptorHeadersHandler,
} from '../features/with-headers-handler';
import { SKIP_HEADERS_MODIFICATION, SKIP_REQUEST_MODIFICATION } from '../tokens';

type TRequestMetaData = Partial<{
  url: string;
  headers: HttpHeaders;
}>;

@Injectable()
export class RequestsInterceptor implements HttpInterceptor {
  private defaultConfig: InterceptorDefaultConfig | null = inject(INTERCEPTOR_DEFAULT_CONFIG, {
    optional: true,
  });
  private tagMapHandler: InterceptorTagsUrlsHandler | null = inject(INTERCEPTOR_TAGS_MAP_HANDLER, {
    optional: true,
  });
  private tagsMap: InterceptorTagsMap | null = inject(INTERCEPTOR_TAGS_MAP, {
    optional: true,
  });
  private headers: InterceptorHeaders | null = inject(INTERCEPTOR_HEADERS, {
    optional: true,
  });
  private headersHandler: InterceptorHeadersHandler | null = inject(INTERCEPTOR_HEADERS_HANDLER, {
    optional: true,
  });

  public intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const isCanModification: boolean = !req.context.get(SKIP_REQUEST_MODIFICATION);

    if (isCanModification) {
      const url: string = this.makeUrl(req);
      const isSkipHeaders: boolean = req.context.get(SKIP_HEADERS_MODIFICATION);
      const meta: TRequestMetaData = { url };
      const isExistHeaders: boolean =
        Boolean(this.headers?.headers) || Boolean(this.headersHandler);

      if (isExistHeaders && !isSkipHeaders) {
        const headers: InterceptorHeaders = this.headersHandler
          ? this.headersHandler(req)
          : this.headers;
        meta.headers = toHttpHeaders(headers.headers, req.headers);
      }

      const cloneReq: HttpRequest<unknown> = req.clone(meta);

      return next.handle(cloneReq);
    }

    return next.handle(req);
  }

  public makeUrl(req: HttpRequest<unknown>): string {
    if (this.tagMapHandler) {
      const url: string = this.tagMapHandler(req.url, req);

      if (url) return url;
    }

    return this.replaceHostTag(req.url);
  }

  protected replaceHostTag(url: string): string {
    const tagsMap: InterceptorTagsMap = Object.assign({}, this.tagsMap);

    if (this.defaultConfig) {
      const { API_HOST, API_TAG } = this.defaultConfig;

      tagsMap[API_TAG] = API_HOST;
    }

    const tagEntry = Object.entries(tagsMap).find(
      ([tag]) => url.startsWith(`${tag}/`) || url === tag,
    );

    if (tagEntry) {
      const [hostTag, replacement] = tagEntry;

      return url.replace(hostTag, replacement as any);
    }

    return url;
  }
}
