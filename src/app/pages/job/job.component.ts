import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { NgIconsModule } from '@ng-icons/core';
import { ActivatedRoute } from '@angular/router';
import { JobsService } from '../../services/jobs.service';
import { ToastrService } from 'ngx-toastr';
import { CommonModule, DatePipe, NgIf } from '@angular/common';
import { Job } from '../../interfaces/job';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-job',
  standalone: true,
  imports: [RouterModule, NgIconsModule, CommonModule, DatePipe, NgIf],
  templateUrl: './job.component.html',
  styleUrl: './job.component.css'
})
export class JobComponent implements OnInit {
  job!: Job;

  private readonly activatedRoute = inject(ActivatedRoute)
  private readonly router = inject(Router)
  private readonly jobsService = inject(JobsService)
  private readonly toastr = inject(ToastrService)
  authService = inject(AuthService)

  ngOnInit(): void {
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
