import { Component, OnInit, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { isPlatformBrowser , CommonModule , NgIf} from '@angular/common';
import { PLATFORM_ID } from '@angular/core';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule , NgIf],
  templateUrl: './search.html',
  styleUrl: './search.scss'
})
export class Search implements OnInit {
  userInfo:any = null;

  constructor(private http: HttpClient, @Inject(PLATFORM_ID) private platformId: Object) {};

  ngOnInit(): void {
    if(isPlatformBrowser(this.platformId)){
      const authObjectJson = localStorage.getItem('auth_object');
      if(authObjectJson) {
        const authObject = JSON.parse(authObjectJson);
        const accessToken = authObject.access_token;
        if(accessToken) {
          this.http.get('https://api.spotify.com/v1/me',{
            headers: { Authorization: `Bearer ${accessToken}` }
          }).subscribe({
            next: (user) => this.userInfo = user,
            error: (err) => console.error('Błąd pobierania user info: ',err)
          });
        }
      }
    }
  }
}
