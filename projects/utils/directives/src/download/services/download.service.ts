import { DOCUMENT } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { TWindowDocument, WINDOW } from '@ngmd/utils/injection';

import { filename as getFileName } from '../handler';

@Injectable()
export class DownloadService {
  private document: Document = inject(DOCUMENT);
  private window: TWindowDocument = inject(WINDOW);
  private http: HttpClient = inject(HttpClient);

  public downloadRequest(url: string, filename: string): void {
    this.http.get(url, { responseType: 'blob' }).subscribe((response: Blob): void => {
      const { type }: Blob = response;

      const blob: Blob = new Blob([response], { type });
      const fileUrl: string = this.window.URL.createObjectURL(blob);

      this.download(fileUrl, filename);
    });
  }

  public downloadFile(file: File, filename: string): void {
    const url: string = this.window.URL.createObjectURL(file);

    this.download(url, filename);
  }

  public download(url: string, filename: string = getFileName(url)): void {
    const link$: HTMLAnchorElement = this.document.createElement('a');

    link$.setAttribute('href', url);
    link$.setAttribute('download', filename);

    link$.click();
    link$.remove();
  }
}
