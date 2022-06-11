import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FeaturesComponent } from './components/features/features.component';
import { OurStoryComponent } from './components/our-story/our-story.component';
import { StepsComponent } from './components/steps/steps.component';
import { UseCaseComponent } from './components/use-case/use-case.component';
import { DemoGuard } from './guards/demo.guard';
import { HomeComponent } from './pages/home/home.component';
import { IndustryUseCaseComponent } from './pages/industry-use-case/industry-use-case.component';
import { LearningPhaseComponent } from './pages/learning-phase/learning-phase.component';
import { LearningReportComponent } from './pages/learning-report/learning-report.component';
import { TestingPhaseComponent } from './pages/testing-phase/testing-phase.component';
import { TestingReportComponent } from './pages/testing-report/testing-report.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      { path: 'features', component: FeaturesComponent },
      { path: 'story', component: OurStoryComponent },
      { path: 'steps', component: StepsComponent },
      { path: 'use-cases', component: UseCaseComponent },
      { path: 'home', redirectTo: '' },
    ],
  },
  { path: 'usecase/finance', component: IndustryUseCaseComponent },
  { path: 'usecase/manufacturing', component: IndustryUseCaseComponent },
  { path: 'usecase/marketing', component: IndustryUseCaseComponent },
  { path: 'usecase/transport', component: IndustryUseCaseComponent },
  { path: 'usecase', redirectTo: 'usecase/finance' },
  { path: 'en', redirectTo: '' },
  { path: 'demo', redirectTo: 'demo/learning' },
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
