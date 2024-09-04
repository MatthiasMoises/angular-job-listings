import { Component } from '@angular/core';
import { JobListingsComponent } from '../../components/job-listings/job-listings.component';

@Component({
  selector: 'app-jobs',
  standalone: true,
  imports: [JobListingsComponent],
  templateUrl: './jobs.component.html',
  styleUrl: './jobs.component.css'
})
export class JobsComponent {

}
