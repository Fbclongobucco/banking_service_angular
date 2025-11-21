// local.storage.ts
import { InjectionToken, PLATFORM_ID, inject } from "@angular/core";
import { isPlatformBrowser } from "@angular/common";


class MockStorage implements Storage {
  [name: string]: any;
  readonly length: number = 0;
  clear(): void {}
  getItem(key: string): string | null { return null; }
  key(index: number): string | null { return null; }
  removeItem(key: string): void {}
  setItem(key: string, value: string): void {}
}

export const LocalStorageToken = new InjectionToken<Storage>('Local Storage', {
    providedIn: 'root',
    factory: () => {
        const platformId = inject(PLATFORM_ID);
        if (isPlatformBrowser(platformId)) {
            return globalThis.localStorage;
        }
        return new MockStorage();
    }
});