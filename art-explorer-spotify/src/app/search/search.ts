import { Component, OnInit, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { isPlatformBrowser , CommonModule , NgIf} from '@angular/common';
import { PLATFORM_ID } from '@angular/core';
import { SpotifyUser } from '../interfaces/spotify-user';
import { AccesToken } from '../services/access_token_service/acces-token';
import { Data } from '../services/data_service/data';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule , NgIf],
  templateUrl: './search.html',
  styleUrl: './search.scss'
})
export class Search implements OnInit {
  userInfo: SpotifyUser | null = null;


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
}

