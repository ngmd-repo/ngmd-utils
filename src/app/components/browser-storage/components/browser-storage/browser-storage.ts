import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BrowserStorage, useBrowserStorage } from '@ngmd/utils/browser-storage';

import { EnAppStatus, ILocalStorage } from '../../interfaces/local-storage.interface';

@Component({
  selector: 'ng-browser-storage',
  imports: [],
  templateUrl: './browser-storage.html',
  styleUrl: './browser-storage.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BrowserStorageComponent {
  private browserStorage: BrowserStorage<ILocalStorage> = useBrowserStorage();

  protected getStorage(): void {
    console.log(
      this.browserStorage.get([
        'mode',
        'role',
        'status',
        'obj',
      ]),
    );
  }

  protected patchStorage(): void {
    this.browserStorage.patch({
      mode: 'Write',
      role: 'User',
      status: EnAppStatus.BLOCK,
      obj: {
        a: 1,
        b: '7',
      },
    });
  }

  protected setStorage(): void {
    this.browserStorage.set('mode', 'Read');
    this.browserStorage.set('status', EnAppStatus.ENABLED);
    this.browserStorage.set('role', 'Admin');
    this.browserStorage.set('obj', {
      a: 7,
      b: '17',
    });
  }

  protected removeItem(): void {
    this.browserStorage.remove(['status', 'role']);
  }

  protected clearStorage(): void {
    this.browserStorage.clear();
  }
}
