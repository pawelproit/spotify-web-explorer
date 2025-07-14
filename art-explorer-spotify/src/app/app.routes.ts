import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Callback } from './callback/callback';
import { Search } from './search/search';

export const routes: Routes = [
    { path: '', component: Home },
    { path:'callback', component:Callback},
    { path: 'search', component: Search }
];
