import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HttpParams } from '@angular/common/http';


function randomString(lenght:number){
  const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  var result = '';
  for (var i = lenght; i > 0 ; i--){
    result += chars[Math.floor(Math.random() * chars.length)];
  }

  return result
}

async function generateCodeChallenge(codeVerifier: string): Promise<string> {
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

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})

export class App {
  protected readonly title = signal('art-explorer-spotify');

  async onAuthClick() {
    const generated_state: string = randomString(16);
    const codeVerifier: string = randomString(128);

    const codeChallenge = await generateCodeChallenge(codeVerifier);


    localStorage.setItem('auth-state',generated_state);
    localStorage.setItem('code-verifier', codeVerifier)

    const baseURL:string = 'https://accounts.spotify.com/en/authorize?';

    const paramObject = {
      response_type: 'code',
      client_id: '6fa458202a164dcc917553462cc12ff1',
      scope: 'user-read-private user-read-email',
      redirect_uri: 'http://127.0.0.1:53661/callback',
      state: generated_state,
      code_challenge: codeChallenge,
      code_challenge_method: 'S256'
    }

    const paramString = new HttpParams({fromObject:paramObject}).toString();
    const authLink = baseURL + paramString;
    window.location.href = authLink;
  }

  //test
}
