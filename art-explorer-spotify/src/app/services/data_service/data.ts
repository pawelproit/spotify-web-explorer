import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SpotifyUser } from '../../interfaces/spotify-user';

@Injectable({
  providedIn: 'root'
})

export class Data {
  private _userEndpoint = 'https://api.spotify.com/v1/me';
  private _searchEndpoint = 'https://api.spotify.com/v1/search';

  constructor(private _http: HttpClient) {}

  getSpotifyUser(): Observable<SpotifyUser> {
    return this._http.get<SpotifyUser>(this._userEndpoint);
  }

  searchArtist(query:string): Observable<any> {
    const accessToken = JSON.parse(localStorage.getItem('auth_object') || '{}').access_token;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${accessToken}`
    });
    const params = new HttpParams()
      .set('q',query)
      .set('type','artist')
      .set('limit','10')
    return this._http.get<any>(this._searchEndpoint, {headers,params});
  }
  
}
