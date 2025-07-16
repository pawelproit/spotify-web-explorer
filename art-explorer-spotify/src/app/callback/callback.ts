import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { AccesToken } from '../services/access_token_service/acces-token';
import { isPlatformBrowser } from '@angular/common';


@Component({
  selector: 'app-callback',
  standalone: true,
  imports: [],
  templateUrl: './callback.html',
  styleUrl: './callback.scss'
})

export class Callback implements OnInit {
  constructor(private accessTokenService: AccesToken, private _router: Router, @Inject(PLATFORM_ID) private platformId: Object) { }
  
  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId))
    {
      const previousState = localStorage.getItem('auth-state');
      const previousCodeVerifier = localStorage.getItem('code-verifier');

      const returnedData = new URLSearchParams(window.location.search);
      const returnedState = returnedData.get('state');
      const returnedCode = returnedData.get('code');

      if (returnedState && returnedCode && previousState && previousCodeVerifier){
          if (returnedState != previousState){
            this._router.navigate(['']);
          }
          else {
            this.accessTokenService
              .getData(returnedCode,previousCodeVerifier)
              .subscribe({
                next:(result:any) => {
                  console.log(result); 
                  localStorage.setItem('auth_object',JSON.stringify(result))
                },
                error: (err) => {
                  console.error('Błąd pobierania tokenu: ', err);
                  this._router.navigate(['']);
                },
                complete:() => {
                  console.log('done');
                  localStorage.removeItem('auth-state');
                  localStorage.removeItem('code-verifier');
                  this._router.navigate(['search']);
                }
              })
          }
      }
      else{ 
        this._router.navigate(['']);
      }
    }
  }
}
