import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { JobsService } from '../../services/jobs.service';
import { ToastrService } from 'ngx-toastr';
import { Job } from '../../interfaces/job';
import { LoggerService, LogLevel } from '../../services/logger.service';
import { CanDeactivateType } from '../../interfaces/can-deactivate';
import { takeWhile } from 'rxjs';

@Component({
  selector: 'app-edit-job',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule, CommonModule],
  templateUrl: './edit-job.component.html',
  styleUrl: './edit-job.component.css'
})
export class EditJobComponent implements OnInit {
  job!: Job
  jobForm: FormGroup = new FormGroup({})
  jobId: string | null = null

  private unsavedChanges: boolean = false

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private jobsService: JobsService,
    private toastr: ToastrService,
    private loggerService: LoggerService
  ) { }

  ngOnInit(): void {
    this.jobId = this.route.snapshot.paramMap.get('id')

    if (this.jobId) {
      this.jobsService.getJobById(this.jobId).subscribe(data => {
        this.job = data

        // Populate fields
        this.jobForm = new FormGroup({
          title: new FormControl(this.job.title, [Validators.required]),
          type: new FormControl(this.job.type, [Validators.required]),
          description: new FormControl(this.job.description, [Validators.required, Validators.minLength(10)]),
          location: new FormControl(this.job.location, [Validators.required]),
          salary: new FormControl(this.job.salary, [Validators.required]),
          company: new FormGroup({
            name: new FormControl(this.job.company.name, [Validators.required]),
            description: new FormControl(this.job.company.description, [Validators.required, Validators.minLength(10)]),
            contactEmail: new FormControl(this.job.company.contactEmail, [Validators.required, Validators.email]),
            contactPhone: new FormControl(this.job.company.contactPhone),
          })
        })

        // Check for form changes
        this.jobForm.valueChanges.pipe(takeWhile(() => this.unsavedChanges === false)).subscribe(_ => {
          this.unsavedChanges = true
        })
      })
    } else {
      this.loggerService.writeToLog('Missing Job ID', LogLevel.ERROR)
    }
  }

  get title() {
    return this.jobForm.get('title');
  }

  get type() {
    return this.jobForm.get('type')
  }

  get jobDescription() {
    return this.jobForm.get('description')
  }

  get location() {
    return this.jobForm.get('location')
  }

  get salary() {
    return this.jobForm.get('salary')
  }

  get companyName() {
    return this.jobForm.get('company.name')
  }

  get companyDescription() {
    return this.jobForm.get('company.description')
  }

  get companyEmail() {
    return this.jobForm.get('company.contactEmail')
  }

  onSubmit() {
    const jobData = this.jobForm.value as Job

    jobData.creationDate = this.job.creationDate

    this.jobsService.updateJob(this.jobId!, jobData).subscribe()

    this.toastr.success('Job updated successfully')

    this.router.navigate(['/jobs'])
  }

  canDeactivate(): CanDeactivateType {
    if (this.unsavedChanges) {
      if (confirm("Do you really want to leave this site? Don't forget unsaved changes!")) {
        return true
      } else {
        return false
      }
    }
    return true
  }
}
