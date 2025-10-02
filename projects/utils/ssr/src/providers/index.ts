import { Provider } from '@angular/core';
import { Request, Response } from 'express';

import { REQUEST, RESPONSE } from '../tokens';

export function provideUtilsSsr(request: Request, response: Response): Provider[] {
  return [
    { provide: REQUEST, useValue: request },
    { provide: RESPONSE, useValue: response },
  ];
}
