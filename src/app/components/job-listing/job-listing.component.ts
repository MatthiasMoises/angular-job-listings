import { Component, Input, OnInit, signal, } from '@angular/core';
import { NgIconsModule } from '@ng-icons/core';
import { RouterModule } from '@angular/router';
import { Job } from '../../interfaces/job';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-job-listing',
  standalone: true,
  imports: [RouterModule, NgIconsModule, DatePipe],
  templateUrl: './job-listing.component.html',
  styleUrl: './job-listing.component.css'
})
export class JobListingComponent implements OnInit {
  @Input()
  job!: Job;

  description = signal<string>('')
  showFullDescription = signal<boolean>(false)

  ngOnInit(): void {
    this.truncateDescription()
  }

  toggleJobDescriptionLength() {
    this.showFullDescription.update(value => !value)

    if (!this.showFullDescription()) {
      this.truncateDescription()
    } else {
      this.description.set(this.job.description)
    }
  }

  private truncateDescription(characters = 90, start = 0) {
    this.description.set(this.job.description.substring(start, characters) + '...')
  }
}
