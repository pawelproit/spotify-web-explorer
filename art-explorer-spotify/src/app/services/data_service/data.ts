import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SpotifyUser } from '../../interfaces/spotify-user';

@Injectable({
  providedIn: 'root'
})

export class Data {
  private userEndpoint = 'https://api.spotify.com/v1/me';

  constructor(private http: HttpClient) {}

  getSpotifyUser(): Observable<SpotifyUser> {
    return this.http.get<SpotifyUser>(this.userEndpoint);
  }
  
}
