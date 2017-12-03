import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';

import { RouterModule, Routes } from '@angular/router';

import { FormsModule, ReactiveFormsModule }   from '@angular/forms';

import { CommonModule } from '@angular/common';

import { MatButtonModule,
         MatSidenavModule,
         MatInputModule,
         MatTabsModule,
         MatCheckboxModule,
         MatSelectModule } from '@angular/material';

import 'hammerjs';

import { JobsComponent } from './jobs/jobs.component';
import { ThumbnailComponent } from './thumbnail/thumbnail.component';
import { JobFormComponent } from './job-form/job-form.component';


const appRoutes: Routes = [
  { path: 'jobs', component: JobsComponent },
  { path: '',
    redirectTo: '/jobs',
    pathMatch: 'full'
  },
  { path: '**', component: JobsComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    JobsComponent,
    ThumbnailComponent,
    JobFormComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatSidenavModule,
    MatInputModule,
    MatTabsModule,
    MatCheckboxModule,
    MatSelectModule,
    RouterModule.forRoot(
      appRoutes
      //{ enableTracing: true } // <-- debugging purposes only
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
