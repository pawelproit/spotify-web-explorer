import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AccesToken {
  clientId = '6fa458202a164dcc917553462cc12ff1';
  url = 'https://accounts.spotify.com/api/token';
  redirectUri = 'http://127.0.0.1:53661/callback';

  constructor(private http: HttpClient) {};

  headers = new HttpHeaders({
    'Content-Type' : 'application/x-www-form-urlencoded',
  })

  getData (code: string , codeVerifier : string): Observable<any> {
    const body = new HttpParams()
    .set('code', code)
    .set('redirect_uri', this.redirectUri)
    .set('grant_type', 'authorization_code')
    .set('client_id', this.clientId)
    .set('code_verifier', codeVerifier)

    return this.http.post(this.url , body , {headers: this.headers})
  }

  onLogout(): void {
    localStorage.removeItem('auth_object');
    localStorage.removeItem('auth-state');
    localStorage.removeItem('code-verifier');
    window.location.href = '/';
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('auth_object');
  }
}
