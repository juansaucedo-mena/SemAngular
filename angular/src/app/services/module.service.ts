import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, shareReplay } from 'rxjs';
import { Module } from '../interfaces/module.interface';

@Injectable({
  providedIn: 'root'
})
export class ModuleService {
  private apiUrl = 'http://localhost:8001/api';
  private modules$: Observable<Module[]> | null = null;

  constructor(private http: HttpClient) {}

  getModules(): Observable<Module[]> {
    if (!this.modules$) {
      this.modules$ = this.http.get<Module[]>(`${this.apiUrl}/modules`).pipe(
        shareReplay(1)
      );
    }
    return this.modules$;
  }

  clearCache(): void {
    this.modules$ = null;
  }
}
