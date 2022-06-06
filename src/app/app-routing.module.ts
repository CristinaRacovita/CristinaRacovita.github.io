import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DemoGuard } from './guards/demo.guard';
import { HomeComponent } from './pages/home/home.component';
import { IndustryUseCaseComponent } from './pages/industry-use-case/industry-use-case.component';
import { LearningPhaseComponent } from './pages/learning-phase/learning-phase.component';
import { LearningReportComponent } from './pages/learning-report/learning-report.component';
import { TestingPhaseComponent } from './pages/testing-phase/testing-phase.component';
import { TestingReportComponent } from './pages/testing-report/testing-report.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'ro', component: HomeComponent },
  { path: 'usecase/finance', component: IndustryUseCaseComponent },
  { path: 'usecase/manufacturing', component: IndustryUseCaseComponent },
  { path: 'usecase/marketing', component: IndustryUseCaseComponent },
  { path: 'usecase/transport', component: IndustryUseCaseComponent },
  { path: 'usecase', redirectTo: 'usecase/finance' },
  { path: 'en', redirectTo: '' },
  { path: 'features', redirectTo: '' },
  { path: 'story', redirectTo: '' },
  { path: 'steps', redirectTo: '' },
  { path: 'use-cases', redirectTo: '' },
  { path: 'home', redirectTo: '' },
  { path: 'steps', redirectTo: '' },
  { path: 'demo/learning', component: LearningPhaseComponent },
  {
    path: 'demo/learning-report',
    component: LearningReportComponent,
    canActivate: [DemoGuard],
  },
  {
    path: 'demo/testing',
    component: TestingPhaseComponent,
    canActivate: [DemoGuard],
  },
  {
    path: 'demo/testing-report',
    component: TestingReportComponent,
    canActivate: [DemoGuard],
  },
  { path: 'http://odin-ai.net/#/', redirectTo: 'https://odin-ai.net/#/' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
