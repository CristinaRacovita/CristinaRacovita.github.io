import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeroComponent } from './components/hero/hero.component';
import { FeaturesComponent } from './components/features/features.component';
import { StepsComponent } from './components/steps/steps.component';
import { OurStoryComponent } from './components/our-story/our-story.component';
import { ContactComponent } from './components/contact/contact.component';
import { FooterComponent } from './components/footer/footer.component';
import { ProfilePictureComponent } from './components/profile-picture/profile-picture.component';
import { RequestDemoDialogComponent } from './components/request-demo-dialog/request-demo-dialog.component';
import { WorkInProgressDialogComponent } from './components/work-in-progress-dialog/work-in-progress-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { SiteService } from './shared/services/site.service';
import { ScullyLibModule } from '@scullyio/ng-lib';
import { NgxJsonLdModule } from '@ngx-lite/json-ld';
import { LayoutModule } from '@angular/cdk/layout';
import { MatMenuModule } from '@angular/material/menu';
import { HttpClientModule } from '@angular/common/http';
import { TranslocoRootModule } from './transloco-root.module';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { IndustryCardComponent } from './components/industry-card/industry-card.component';
import { UseCaseComponent } from './components/use-case/use-case.component';
import { IndustryService } from './shared/services/industry.service';
import { LanguageService } from './shared/services/language.service';
import { ContactUsDialogComponent } from './components/contact-us-dialog/contact-us-dialog.component';
import { GenericTableComponent } from './components/generic-table/generic-table.component';
import { IndustryUseCaseComponent } from './pages/industry-use-case/industry-use-case.component';
import { HomeComponent } from './pages/home/home.component';
import { SectionService } from './shared/services/section.service';
import { CsvService } from './shared/services/csv.service';
import { MatTableModule } from '@angular/material/table';
import { CdkTableModule } from '@angular/cdk/table';
import { LearningPhaseComponent } from './pages/learning-phase/learning-phase.component';
import { UploadFileComponent } from './components/upload-file/upload-file.component';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TestingPhaseComponent } from './pages/testing-phase/testing-phase.component';
import { TestingReportComponent } from './pages/testing-report/testing-report.component';
import { LearningReportComponent } from './pages/learning-report/learning-report.component';
import { ReportComponent } from './components/report/report.component';
import { AutoMLService } from './shared/services/autoML.service';
import { DemoGuard } from './guards/demo.guard';

@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    HeroComponent,
    FeaturesComponent,
    StepsComponent,
    OurStoryComponent,
    ContactComponent,
    FooterComponent,
    ProfilePictureComponent,
    RequestDemoDialogComponent,
    WorkInProgressDialogComponent,
    IndustryCardComponent,
    UseCaseComponent,
    ContactUsDialogComponent,
    GenericTableComponent,
    IndustryUseCaseComponent,
    HomeComponent,
    LearningPhaseComponent,
    UploadFileComponent,
    TestingPhaseComponent,
    TestingReportComponent,
    LearningReportComponent,
    ReportComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatSnackBarModule,
    ReactiveFormsModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    ScullyLibModule,
    NgxJsonLdModule,
    LayoutModule,
    MatMenuModule,
    HttpClientModule,
    TranslocoRootModule,
    MatTableModule,
    BrowserAnimationsModule,
    HttpClientModule,
    CdkTableModule,
    MatIconModule,
    MatFormFieldModule,
    MatTableModule,
    MatSelectModule,
    MatOptionModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
  ],
  providers: [
    SiteService,
    IndustryService,
    LanguageService,
    SectionService,
    CsvService,
    AutoMLService,
    DemoGuard,
    { provide: LocationStrategy, useClass: HashLocationStrategy },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
