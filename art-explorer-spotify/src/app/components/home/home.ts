import { Component, OnInit, Inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { MaterialModule } from '../../material/material-module';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, MaterialModule],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})

export class Home {
  constructor(@Inject(PLATFORM_ID) private _platformId: Object) {}

  async onAuthClick(): Promise <void> {
    if (isPlatformBrowser(this._platformId)) {
      const generatedState: string = this.randomString(16);
      const codeVerifier: string = this.randomString(128);
      const codeChallenge = await this.generateCodeChallenge(codeVerifier);

      localStorage.setItem('auth-state', generatedState);
      localStorage.setItem('code-verifier', codeVerifier);

      const baseURL: string = 'https://accounts.spotify.com/en/authorize?';
      const paramObject = {
        response_type: 'code',
        client_id: '6fa458202a164dcc917553462cc12ff1',
        scope: 'user-read-private user-read-email',
        redirect_uri: 'http://127.0.0.1:53661/callback',
        state: generatedState,
        code_challenge: codeChallenge,
        code_challenge_method: 'S256'
      };

      const paramString = new HttpParams({ fromObject: paramObject }).toString();
      const authLink = baseURL + paramString;
      window.location.href = authLink;
    }
  }

  private async  generateCodeChallenge(codeVerifier: string): Promise<string> {
    const encoder = new TextEncoder();
    const data = encoder.encode(codeVerifier);
    const digest = await window.crypto.subtle.digest('SHA-256', data);

    let hashArray = Array.from(new Uint8Array(digest));
    let hashString = String.fromCharCode(...hashArray);
    let base64 = btoa(hashString)
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');
    return base64;
  }

  private randomString(length: number): string {
    const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let result = '';
    for (let i = length; i > 0; i--) {
      result += chars[Math.floor(Math.random() * chars.length)];
    }
    return result;
  }
}
