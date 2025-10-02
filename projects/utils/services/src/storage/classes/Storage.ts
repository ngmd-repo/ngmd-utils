export class Storage {
  private storage: any = {};

  public setItem(key: string, value: unknown): void {
    this.storage[key] = value;
  }

  public getItem<T>(key: string): T {
    return this.storage[key] ?? null;
  }

  public removeItem(key: string): void {
    delete this.storage?.[key];
  }

  public clear(): void {
    this.storage = {};
  }

  public getKeys(): string[] {
    return Object.keys(this.storage);
  }
}
