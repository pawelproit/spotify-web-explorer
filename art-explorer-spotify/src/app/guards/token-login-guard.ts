import { CanActivateFn ,Router} from '@angular/router';
import { inject, Injectable } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';


export const tokenLoginGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const platformId = inject(PLATFORM_ID);

  if(isPlatformBrowser(platformId)){
    const authObject = localStorage.getItem('auth_object');

    if (authObject) {
      router.navigate(['/search']);
      return false;
    }

  }
  
  return true;
};
