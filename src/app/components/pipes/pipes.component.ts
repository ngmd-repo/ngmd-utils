/* eslint-disable @typescript-eslint/member-ordering */
import { ChangeDetectionStrategy, Component } from '@angular/core';

import { PipesImports } from './imports';

@Component({
  selector: 'ng-pipes',
  imports: PipesImports,
  templateUrl: './pipes.component.html',
  styleUrl: './pipes.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PipesComponent {
  protected excludePropsValue: { a: number; b: number } = { a: 1, b: 2 };
  protected includesValue: number[] = [1, 2, 3];
  protected mapValue: number = 5;
  protected mapFn: (v: number) => number = (v: number) => Math.pow(v, 2);
  protected pickValue: { a: number; b: number } = { a: 3, b: 4 };
  protected sanitizerValue: string = '<p>Paragraph</p><script>console.log(123)</script>';
}
