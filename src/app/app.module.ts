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
         MatSelectModule,
         MatDatepickerModule,
         MatNativeDateModule,
         MatTooltipModule,
         MatExpansionModule,
         MatAutocompleteModule } from '@angular/material';

import 'hammerjs';

import { JobsComponent } from './jobs/jobs.component';
import { ThumbnailComponent } from './thumbnail/thumbnail.component';
import { JobFormComponent } from './job-form/job-form.component';
import { JobComponent } from './job/job.component';
import { EntitiesComponent } from './entities/entities.component';

import { FirstLetterPipe } from './pipes/first-letter.pipe';

import { SidenavService } from './sidenav.service';
import { EntityFormComponent } from './entity-form/entity-form.component';
import { TaskFormComponent } from './task-form/task-form.component';


const appRoutes: Routes = [
  { path: 'jobs', component: JobsComponent },
  { path: 'job/:jobId', component: JobComponent },
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
    JobFormComponent,
    JobComponent,
    EntitiesComponent,
    FirstLetterPipe,
    EntityFormComponent,
    TaskFormComponent
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
    MatDatepickerModule,
    MatNativeDateModule,
    MatTooltipModule,
    MatExpansionModule,
    MatAutocompleteModule,
    RouterModule.forRoot(
      appRoutes
      //{ enableTracing: true } // <-- debugging purposes only
    )
  ],
  providers: [SidenavService],
  bootstrap: [AppComponent]
})
export class AppModule { }
