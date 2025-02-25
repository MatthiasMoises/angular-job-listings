import { Component, OnInit, signal, input } from '@angular/core';
import { NgIconsModule } from '@ng-icons/core';
import { RouterModule } from '@angular/router';
import { Job } from '../../interfaces/job';
import { DatePipe } from '@angular/common';
import { HighlightDirective } from '../../directives/highlight.directive';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-job-listing',
  standalone: true,
  imports: [RouterModule, NgIconsModule, DatePipe, HighlightDirective],
  templateUrl: './job-listing.component.html',
  styleUrl: './job-listing.component.css',
  animations: [
    trigger('toggleDescription', [
      state(
        'more',
        style({
          height: '110px',
        }),
      ),
      state(
        'less',
        style({
          height: '50px',
        }),
      ),
      transition('more => less', [animate('0.1s')]),
      transition('less => more', [animate('0.1s')]),
    ]),
  ]
})
export class JobListingComponent implements OnInit {
  job = input.required<Job>()

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
      this.description.set(this.job().description)
    }
  }

  private truncateDescription(characters = 90, start = 0) {
    this.description.set(this.job().description.substring(start, characters) + '...')
  }
}
