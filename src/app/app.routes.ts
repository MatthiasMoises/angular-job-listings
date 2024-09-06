import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { JobsComponent } from './pages/jobs/jobs.component';
import { AddJobComponent } from './pages/add-job/add-job.component';
import { EditJobComponent } from './pages/edit-job/edit-job.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { JobComponent } from './pages/job/job.component';
import { jobResolver } from './resolvers/job.resolver';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'jobs', component: JobsComponent },
  { path: 'add-job', component: AddJobComponent },
  { path: 'edit-job/:id', component: EditJobComponent },
  { path: 'jobs/:id', component: JobComponent, resolve: { job: jobResolver } },
  { path: 'error', component: NotFoundComponent },
  { path: '**', component: NotFoundComponent },
];
