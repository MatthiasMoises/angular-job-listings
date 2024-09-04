import { Component, Input, OnInit } from '@angular/core';
import { Job } from '../../types/job.type';
import { JobsService } from '../../services/jobs.service';
import { JobListingComponent } from '../job-listing/job-listing.component';
import { SpinnerComponent } from '../spinner/spinner.component';

@Component({
  selector: 'app-job-listings',
  standalone: true,
  imports: [JobListingComponent, SpinnerComponent],
  templateUrl: './job-listings.component.html',
  styleUrl: './job-listings.component.css'
})
export class JobListingsComponent implements OnInit {
  @Input() isHome: boolean = false
  @Input() limit: number | undefined
  jobs: Job[] = []
  loading: boolean = true

  constructor(private jobsService: JobsService) { }

  ngOnInit(): void {
    try {
      this.jobsService.getJobs(this.limit).subscribe(data => {
        this.jobs = data
      })
    } catch (error) {
      console.error(error)
    } finally {
      this.loading = false
    }
  }
}
