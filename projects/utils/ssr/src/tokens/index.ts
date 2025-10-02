import { InjectionToken } from '@angular/core';
import { Request, Response } from 'express';

export const REQUEST: InjectionToken<Request> = new InjectionToken<Request>('REQUEST_TOKEN');
export const RESPONSE: InjectionToken<Response> = new InjectionToken<Response>('RESPONSE_TOKEN');
