import { Component, Input, OnInit, } from '@angular/core';
import { NgIconsModule } from '@ng-icons/core';
import { RouterModule } from '@angular/router';
import { Job } from '../../interfaces/job';

@Component({
  selector: 'app-job-listing',
  standalone: true,
  imports: [RouterModule, NgIconsModule],
  templateUrl: './job-listing.component.html',
  styleUrl: './job-listing.component.css'
})
export class JobListingComponent implements OnInit {
  @Input()
  job!: Job;

  description: string = ''
  showFullDescription: boolean = false

  ngOnInit(): void {
    this.description = this.job.description.substring(0, 90) + '...'
  }

  toggleJobDescription() {
    this.showFullDescription = !this.showFullDescription

    if (!this.showFullDescription) {
      this.description = this.job.description.substring(0, 90) + '...'
    } else {
      this.description = this.job.description
    }
  }

}
