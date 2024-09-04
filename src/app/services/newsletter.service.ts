import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NewsletterService {

  constructor() { }

  subscribeUser() {
    return of(true)
  }

  unsubscribeUser() {
    return of(false)

  }
}
