import { Component, OnInit, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { isPlatformBrowser , CommonModule , NgIf} from '@angular/common';
import { PLATFORM_ID } from '@angular/core';
import { SpotifyUser } from '../interfaces/spotify-user';
import { AccesToken } from '../services/access_token_service/acces-token';
import { Data } from '../services/data_service/data';
import { MaterialModule } from "../material/material-module";

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, NgIf,  MaterialModule],
  templateUrl: './search.html',
  styleUrl: './search.scss'
})

export class Search implements OnInit {
  userInfo: SpotifyUser | null = null;
  searchQuery:string = '';
  artists: any[] = [];
  selectedArtist: any = null;
  searchError: string = '';


  constructor(private _http: HttpClient, @Inject(PLATFORM_ID) private _platformId: Object, private _authService: AccesToken , private _dataService: Data) {};

  ngOnInit(): void {
    if(isPlatformBrowser(this._platformId)){
      this._dataService.getSpotifyUser().subscribe({
        next: (user) => this.userInfo = user,
        error: (err) => console.error('Błąd pobierania user info: ', err)
        });
    }
  }

  onLogout () : void {
    this._authService.onLogout();
  }

  onSearchArtist(): void{
    this.artists = [];
    this.selectedArtist = null;
    this.searchError = '';

    if (this.searchQuery && isPlatformBrowser(this._platformId)) {
      this._dataService.searchArtist(this.searchQuery).subscribe({
        next: (res) => {
          const items = res.artists?.items ?? [];
          if (items.length > 0) {
            this.artists = items;
          }
          else {
            this.artists = [];
            this.searchError = 'Nie znaleziono artysty';
          }
        },
        error: (err) => {
          this.artists = [];
          this.searchError = 'Błąd pobierana artysty';
          console.error(err);
        }
      })
    }
  }

  onSelectArtist (artist: any): void {
    this.selectedArtist = artist;
  }
}

