import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { JobsService } from '../../services/jobs.service';
import { Job } from '../../types/job.type';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-job',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule, CommonModule],
  templateUrl: './add-job.component.html',
  styleUrl: './add-job.component.css'
})
export class AddJobComponent {
  jobForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    type: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required, Validators.minLength(10)]),
    location: new FormControl('', [Validators.required]),
    salary: new FormControl('', [Validators.required]),
    company: new FormGroup({
      name: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required, Validators.minLength(10)]),
      contactEmail: new FormControl('', [Validators.required]),
      contactPhone: new FormControl(''),
    })
  })

  constructor(
    private router: Router,
    private jobsService: JobsService,
    private toastr: ToastrService
  ) { }

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
    this.jobsService.addJob(this.jobForm.value as Job).subscribe()

    this.toastr.success('Job added successfully')

    this.router.navigate(['/jobs'])
  }
}
