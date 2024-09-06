import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { NgIconsModule } from '@ng-icons/core';
import { ActivatedRoute } from '@angular/router';
import { JobsService } from '../../services/jobs.service';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { Job } from '../../interfaces/job';

@Component({
  selector: 'app-job',
  standalone: true,
  imports: [RouterModule, NgIconsModule, CommonModule],
  templateUrl: './job.component.html',
  styleUrl: './job.component.css'
})
export class JobComponent implements OnInit {
  job!: Job;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private jobsService: JobsService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    console.log(this.activatedRoute.data)
    this.activatedRoute.data.subscribe(({ job }) => {
      this.job = job
    })
  }

  onDeleteClick(jobId: string): void {
    const confirm = window.confirm('Are you sure you want to delete this listing?')

    if (!confirm) return

    this.jobsService.deleteJob(jobId).subscribe()

    this.toastr.success('Job deleted successfully')

    this.router.navigate(['/jobs'])
  }

}
