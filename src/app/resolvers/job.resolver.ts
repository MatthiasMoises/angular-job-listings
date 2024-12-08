import { inject } from '@angular/core';
import { RedirectCommand, ResolveFn, Router } from '@angular/router';
import { JobsService } from '../services/jobs.service';
import { Job } from '../interfaces/job';

export const jobResolver: ResolveFn<Job> = (route) => {
  const router = inject(Router)
  const jobsService = inject(JobsService)
  try {
    return jobsService.getJobById(route.paramMap.get('id')!)
  } catch {
    return new RedirectCommand(router.parseUrl('/'))
  }
}
