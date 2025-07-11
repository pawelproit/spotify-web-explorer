import { Component , OnInit } from '@angular/core';
import { CommonModule, JsonPipe, NgIf , isPlatformBrowser } from '@angular/common';
import { Inject, PLATFORM_ID } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, JsonPipe, NgIf ],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home implements OnInit {
  authObject: string | null = null;
  userAuthenticated: boolean = false;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}


  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId))
    {
      const authObjectJson = localStorage.getItem('auth_object');

      if(authObjectJson){
        this.authObject = JSON.parse(authObjectJson);
        this.userAuthenticated = true;
      }

    }

  }

}
