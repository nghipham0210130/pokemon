import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { NotAuthenticatedComponent } from './components/not-authenticated/not-authenticated.component';
import { AuthenticatedGuard } from './guards/authenticated.guard';
import { AuthService } from './services/auth.service';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        redirectTo: 'pokemons',
        pathMatch: 'full'
      },
      {
        path: 'pokemons',
        canLoad: [AuthenticatedGuard],
        loadChildren: () =>
          import('./pokemons/pokemons.module').then(m => m.PokemonsModule)
      }
    ]
  },
  {
    path: 'not-auth',
    component: NotAuthenticatedComponent
  }
];

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes, { enableTracing: true })
  ],
  providers: [AuthService],
  declarations: [AppComponent, NavbarComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
