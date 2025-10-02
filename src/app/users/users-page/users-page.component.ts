import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { provideApiHub } from '@ngmd/utils/http';
import { provideState } from '@ngmd/utils/state';

import { UsersState } from '../user.state';
import { UsersApiHub } from '../users.api.hub';
import { UsersService } from '../users.service';

@Component({
  selector: 'ng-users-page',
  imports: [
    RouterOutlet,
  ],
  providers: [
    provideState(UsersState),
    provideApiHub(UsersApiHub),
    UsersService,
  ],
  templateUrl: './users-page.component.html',
  styleUrl: './users-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersPageComponent {}
