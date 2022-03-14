import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { canActivate, redirectUnauthorizedTo, redirectLoggedInTo } from '@angular/fire/auth-guard';
import { TabsPage } from './pages/tabs/tabs.page';

// Send unauthorized users to login
const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['/']);

// Automatically log in users
const redirectLoggedInToChat = () => redirectLoggedInTo(['/tabs']);

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule),
    ...canActivate(redirectLoggedInToChat)
  },
  {
    path: 'signup',
    loadChildren: () => import('./pages/signup/signup.module').then( m => m.SignupPageModule)
  },
  {
    path: 'tabs',
    loadChildren: () => import('./pages/tabs/tabs.module').then( m => m.TabsPageModule),
    ...canActivate(redirectUnauthorizedToLogin),
  },
  {
    path: 'current',
    loadChildren: () => import('./pages/current/current.module').then( m => m.CurrentPageModule)
  },
  {
    path: 'forecast',
    loadChildren: () => import('./pages/forecast/forecast.module').then( m => m.ForecastPageModule)
  },
  {
    path: 'settings',
    loadChildren: () => import('./pages/settings/settings.module').then( m => m.SettingsPageModule)
  },
  {
    path: '',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },  {
    path: 'abouts',
    loadChildren: () => import('./pages/abouts/abouts.module').then( m => m.AboutsPageModule)
  },
  {
    path: 'conditions',
    loadChildren: () => import('./pages/conditions/conditions.module').then( m => m.ConditionsPageModule)
  },
  {
    path: 'confidentialites',
    loadChildren: () => import('./pages/confidentialites/confidentialites.module').then( m => m.ConfidentialitesPageModule)
  },
  {
    path: 'alertes',
    loadChildren: () => import('./pages/alertes/alertes.module').then( m => m.AlertesPageModule)
  },
  {
    path: 'localites',
    loadChildren: () => import('./pages/localites/localites.module').then( m => m.LocalitesPageModule)
  }



];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
