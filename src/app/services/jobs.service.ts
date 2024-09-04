import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { Job } from '../types/job.type';

@Injectable({
  providedIn: 'root'
})
export class JobsService {
  jobsUrl: string = '/api/jobs'

  constructor(private http: HttpClient) { }

  getJobs(limit?: number): Observable<Job[]> {
    if (limit) {
      return this.http.get<Job[]>(this.jobsUrl + `?_limit=${limit}`)
    } else {
      return this.http.get<Job[]>(this.jobsUrl)
    }
  }

  getJobById(id: string): Observable<Job> {
    return this.http.get<Job>(this.jobsUrl + `/${id}`)
  }

  addJob(newJob: Job): Observable<Job> {
    return this.http.post<Job>(this.jobsUrl, newJob)
  }

  updateJob(id: string, updatedJob: Job) {
    return this.http.put<Job>(this.jobsUrl + `/${id}`, updatedJob)
  }

  deleteJob(id: string) {
    return this.http.delete<Job>(this.jobsUrl + `/${id}`)
  }
}
