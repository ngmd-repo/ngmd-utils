export class BrowserStorageStub<T extends object> {
  private storage: T = {} as unknown as T;

  public getItem<K extends keyof T>(key: K): T[K] {
    return this.storage[key] ?? null;
  }

  public setItem<K extends keyof T>(key: K, value: T[K]): void {
    this.storage[key] = value;
  }

  public removeItem<K extends keyof T>(key: K): void {
    delete this.storage?.[key];
  }

  public clear(): void {
    this.storage = {} as unknown as T;
  }

  public keys(): string[] {
    return Object.keys(this.storage);
  }
}
