import { Injectable } from '@angular/core';

export type TConfig = {
  paymentId: string;
};

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  private config: TConfig = {
    paymentId: null,
  };

  public set<K extends keyof TConfig>(key: K, value: TConfig[K]): void {
    this.config[key] = value;
  }

  public get<K extends keyof TConfig>(key: K): TConfig[K] {
    return this.config[key];
  }
}
