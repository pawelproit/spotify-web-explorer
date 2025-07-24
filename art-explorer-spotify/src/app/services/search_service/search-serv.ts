import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Data } from '../data_service/data';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SearchServ {
  public artists$ = new BehaviorSubject<any[]>([]);
  public selectedArtist$ = new BehaviorSubject<any | null>(null);
  public searchError$ = new BehaviorSubject<string>("");

  constructor(
    private _dataService: Data,
    @Inject(PLATFORM_ID) private _platformId: Object
  ) {}

  searchArtist(searchQuery: string): void {
    this.artists$.next([]);
    this.selectedArtist$.next(null);
    this.searchError$.next('');

    if (searchQuery && isPlatformBrowser(this._platformId)) {
      this._dataService.searchArtist(searchQuery).subscribe({
        next: (res) => {
          const items = res?.artists?.items ?? [];
          if (items.length > 0) {
            this.artists$.next(items);
          } else {
            this.artists$.next([]);
            this.searchError$.next('Nie znaleziono artysty');
          }
        },
        error: (err) => {
          this.artists$.next([]);
          this.searchError$.next('Błąd pobierania artysty');
          console.error('[SearchServ] Błąd:', err);
        }
      });
    }
  }

  selectArtist(artist: any): void {
    this.selectedArtist$.next(artist);
  }
}
