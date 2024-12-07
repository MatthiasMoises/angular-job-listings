import { Routes } from '@angular/router';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { jobResolver } from './resolvers/job.resolver';

export const routes: Routes = [
  { path: '', loadComponent: () => import('../app/pages/home/home.component').then(c => c.HomeComponent) },
  { path: 'jobs', loadComponent: () => import('../app/pages/jobs/jobs.component').then(c => c.JobsComponent) },
  { path: 'add-job', loadComponent: () => import('../app/pages/add-job/add-job.component').then(c => c.AddJobComponent) },
  { path: 'edit-job/:id', loadComponent: () => import('../app/pages/edit-job/edit-job.component').then(c => c.EditJobComponent) },
  { path: 'jobs/:id', loadComponent: () => import('../app/pages/job/job.component').then(c => c.JobComponent), resolve: { job: jobResolver } },
  { path: 'error', component: NotFoundComponent },
  { path: '**', component: NotFoundComponent },
];
