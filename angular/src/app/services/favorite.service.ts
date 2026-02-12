import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {
  private apiUrl = 'http://localhost:8001/api';
  private favoriteIds = new BehaviorSubject<Set<number>>(new Set());

  favoriteIds$ = this.favoriteIds.asObservable();

  constructor(private http: HttpClient) {}

  loadFavorites(): void {
    this.http.get<number[]>(`${this.apiUrl}/favorites`).subscribe({
      next: (ids) => this.favoriteIds.next(new Set(ids))
    });
  }

  toggleFavorite(moduleId: number): void {
    const current = this.favoriteIds.value;
    const isFav = current.has(moduleId);

    // Optimistic update
    const updated = new Set(current);
    if (isFav) {
      updated.delete(moduleId);
    } else {
      updated.add(moduleId);
    }
    this.favoriteIds.next(updated);

    const request$ = isFav
      ? this.http.delete(`${this.apiUrl}/favorites/${moduleId}`)
      : this.http.post(`${this.apiUrl}/favorites/${moduleId}`, {});

    request$.subscribe({
      error: () => {
        // Rollback on error
        this.favoriteIds.next(current);
      }
    });
  }

  isFavorite(moduleId: number): boolean {
    return this.favoriteIds.value.has(moduleId);
  }

  clearFavorites(): void {
    this.favoriteIds.next(new Set());
  }
}
