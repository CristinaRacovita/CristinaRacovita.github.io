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
import { AngularFireModule} from '@angular/fire/compat';
import { environment } from 'src/environments/environment';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database'
import { SiteService } from './shared/services/site.service';
import { ScullyLibModule } from '@scullyio/ng-lib';
import { NgxJsonLdModule } from '@ngx-lite/json-ld';
import {LayoutModule} from '@angular/cdk/layout'; 
import {MatMenuModule} from '@angular/material/menu';
import { HttpClientModule } from '@angular/common/http';
import { TranslocoRootModule } from './transloco-root.module'; 

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
    TranslocoRootModule
  ],
  providers: [SiteService],
  bootstrap: [AppComponent],
})
export class AppModule {}
