import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { IndustryUseCaseComponent } from './pages/industry-use-case/industry-use-case.component';

const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'ro', component: HomeComponent },
  { path: 'usecase', component: IndustryUseCaseComponent },
  { path: 'en', redirectTo: '' },
  { path: 'features', redirectTo: '' },
  { path: 'story', redirectTo: '' },
  { path: 'steps', redirectTo: '' },
  { path: 'use-cases', redirectTo: '' },
  { path: 'home', redirectTo: '' },
  { path: 'steps', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: "top"})],
  exports: [RouterModule],
})
export class AppRoutingModule {}
