import { Directive, HostListener, inject, input, InputSignal } from '@angular/core';

import { filename as getFileName } from './handler';
import { DownloadService } from './services/download.service';
import { DOWNLOAD_URL_TRANSFORMER } from './tokens';
import { TDownload } from './types';

@Directive({
  selector: '[ngDownload]',
  providers: [DownloadService],
})
export class DownloadDirective {
  // * Inputs
  public predicate: InputSignal<File | string> = input.required({ alias: 'ngDownload' });
  /**
   * @param ngDownloadType equal  "file" ngDownload === File
   * @param ngDownloadType equal  "request" ngDownload === url transformed via DOWNLOAD_URL_TRANSFORMER
   * @param ngDownloadType equal  "url" ngDownload === https://url.com
   */
  public type: InputSignal<TDownload> = input.required<TDownload>({ alias: 'ngDownloadType' });
  public filename: InputSignal<string> = input(null, { alias: 'ngDownloadName' });
  public disabled: InputSignal<boolean> = input(false, { alias: 'ngDownloadDisabled' });

  // * Inject
  private downloadService: DownloadService = inject(DownloadService);
  private transformUrl: (url: string) => string = inject(DOWNLOAD_URL_TRANSFORMER);

  @HostListener('click')
  private download(): void {
    const { predicate, disabled, type, filename } = this;

    if (predicate() && !disabled()) {
      switch (type()) {
        case 'file': {
          this.downloadService.downloadFile(
            predicate() as File,
            filename() || (predicate() as File).name,
          );
          break;
        }
        case 'url': {
          this.downloadService.downloadRequest(
            predicate() as string,
            filename() || getFileName(predicate() as string),
          );
          break;
        }
        case 'request': {
          this.downloadService.downloadRequest(
            this.transformUrl(predicate() as string),
            filename(),
          );
          break;
        }
      }
    }
  }
}
