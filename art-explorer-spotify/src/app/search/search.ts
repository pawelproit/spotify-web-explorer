import { Component, OnInit, Inject } from '@angular/core';
import { isPlatformBrowser, CommonModule, NgIf } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';
import { SpotifyUser } from '../interfaces/spotify-user';
import { AccesToken } from '../services/access_token_service/acces-token';
import { Data } from '../services/data_service/data';
import { MaterialModule } from "../material/material-module";
import { SearchServ } from '../services/search_service/search-serv';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, NgIf, MaterialModule],
  templateUrl: './search.html',
  styleUrl: './search.scss'
})


export class Search implements OnInit {
  userInfo: SpotifyUser | null = null;
  searchQuery: string = '';

  get artists$() {
    return this._searchServ.artists$;
  }

  get selectedArtist$() {
    return this._searchServ.selectedArtist$;
  }

  get searchError$() {
    return this._searchServ.searchError$;
  }

  constructor(
    private _authService: AccesToken,
    private _dataService: Data,
    private _searchServ: SearchServ,
    @Inject(PLATFORM_ID) private _platformId: Object
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this._platformId)) {
      this._dataService.getSpotifyUser().subscribe({
        next: (user) => (this.userInfo = user),
        error: (err) => console.error('Błąd pobierania user info:', err),
      });
    }
  }

  onLogout(): void {
    this._authService.onLogout();
  }

  onSearchArtist(): void {
    this._searchServ.searchArtist(this.searchQuery);
  }

  onSelectArtist(artist: any): void {
    this._searchServ.selectArtist(artist);
  }
}
