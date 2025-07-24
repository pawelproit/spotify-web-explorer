import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { AccesToken } from '../../services/access_token_service/acces-token';
import { isPlatformBrowser } from '@angular/common';


@Component({
  selector: 'app-callback',
  standalone: true,
  imports: [],
  templateUrl: './callback.html',
  styleUrl: './callback.scss'
})

export class Callback implements OnInit {
  constructor(private _accessTokenService: AccesToken, private _router: Router, @Inject(PLATFORM_ID) private _platformId: Object) { }
  
  ngOnInit(): void {
    if (isPlatformBrowser(this._platformId))
    {
      this._accessTokenService.handleAuthCallback();
    }
  }
}

