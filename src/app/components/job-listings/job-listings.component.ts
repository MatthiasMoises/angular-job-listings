import { Component, input, signal, inject, OnInit } from '@angular/core';
import { JobsService } from '../../services/jobs.service';
import { JobListingComponent } from '../job-listing/job-listing.component';
import { SpinnerComponent } from '../spinner/spinner.component';
import { Job } from '../../interfaces/job';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { LoggerService, LogLevel } from '../../services/logger.service';

@Component({
  selector: 'app-job-listings',
  standalone: true,
  imports: [AsyncPipe, JobListingComponent, SpinnerComponent],
  templateUrl: './job-listings.component.html',
  styleUrl: './job-listings.component.css'
})
export class JobListingsComponent implements OnInit {
  isHome = input<boolean>(false)
  limit = input<number | undefined>(undefined)

  jobs$!: Observable<Job[]>
  loading = signal<boolean>(true)

  private jobsService = inject(JobsService)
  private loggerService = inject(LoggerService)

  ngOnInit(): void {
    try {
      this.jobs$ = this.jobsService.getJobs(this.limit())
    } catch (error) {
      this.loggerService.writeToLog(error as string, LogLevel.ERROR)
    } finally {
      this.loading.set(false)
    }
  }
}
