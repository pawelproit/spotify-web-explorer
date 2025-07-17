import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Callback } from './callback/callback';
import { Search } from './search/search';
import { tokenLoginGuard } from './guards/token-login-guard';

export const routes: Routes = [
    { path: '', component: Home, canActivate: [tokenLoginGuard] },
    { path:'callback', component:Callback},
    { path: 'search', component: Search }
];
