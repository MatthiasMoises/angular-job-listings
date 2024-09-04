import { Component } from '@angular/core';
import { HeroComponent } from '../../components/hero/hero.component';
import { HomeCardsComponent } from '../../components/home-cards/home-cards.component';
import { JobListingsComponent } from '../../components/job-listings/job-listings.component';
import { ViewAllJobsComponent } from '../../components/view-all-jobs/view-all-jobs.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeroComponent, HomeCardsComponent, JobListingsComponent, ViewAllJobsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
