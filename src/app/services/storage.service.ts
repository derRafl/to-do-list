import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
    public set(key: string, value: any) {
        localStorage.setItem(key, JSON.stringify(value));
    }

    public get<T = unknown>(key: string) {
        const stored = localStorage.getItem(key);
        return stored ? (JSON.parse(stored) as T) : undefined;
    }
}
