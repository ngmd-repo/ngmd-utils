import { ChangeDetectionStrategy, Component } from '@angular/core';
import { getDataFromDB, StaticDB, useDB, useRootDB } from '@ngmd/utils/db';
import { TShowState } from '@ngmd/utils/types';
import { RootDB } from 'src/app/db/root.db';

import { ChildDB } from './db/child.db';

type TRole = 'Admin' | 'Editor' | 'Merchant' | 'Viewer';
type TUser = { id: number; name: string; role: TRole; address: { city: string } };

@Component({
  selector: 'ng-db',
  imports: [],
  templateUrl: './db.component.html',
  styleUrl: './db.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DbComponent {
  public rootDB: StaticDB<typeof RootDB> = useRootDB();
  public childDB: StaticDB<typeof ChildDB> = useDB(ChildDB);
  public x: number[] = this.childDB.get(['numbers']);

  constructor() {
    const x: TUser[] = this.childDB.get(['users']);
    const y: TShowState = this.childDB.get(['mode']);
    const z: TShowState = getDataFromDB(ChildDB, ['mode']);
    const u: TUser = this.childDB.get(['user']);

    // u.role === ''
    // z === 'hide';
    // x[0].address.city === '123'
    // x[0].role === 'Merchant';
  }
}
