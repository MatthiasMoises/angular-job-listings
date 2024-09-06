import { Component, Input, OnInit } from '@angular/core';
import { JobsService } from '../../services/jobs.service';
import { JobListingComponent } from '../job-listing/job-listing.component';
import { SpinnerComponent } from '../spinner/spinner.component';
import { Job } from '../../interfaces/job';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-job-listings',
  standalone: true,
  imports: [AsyncPipe, JobListingComponent, SpinnerComponent],
  templateUrl: './job-listings.component.html',
  styleUrl: './job-listings.component.css'
})
export class JobListingsComponent implements OnInit {
  @Input() isHome: boolean = false
  @Input() limit: number | undefined
  jobs$!: Observable<Job[]>
  loading: boolean = true

  constructor(private jobsService: JobsService) { }

  ngOnInit(): void {
    try {
      this.jobs$ = this.jobsService.getJobs()
    } catch (error) {
      console.error(error)
    } finally {
      this.loading = false
    }
  }
}
