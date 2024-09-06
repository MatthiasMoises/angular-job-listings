import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NewsletterService } from '../../services/newsletter.service';

@Component({
  selector: 'app-newsletter-subscription',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './newsletter-subscription.component.html',
  styleUrl: './newsletter-subscription.component.css'
})
export class NewsletterSubscriptionComponent {
  model = signal({
    recipientEmail: ''
  })
  subscribed = signal(false)

  constructor(private newsletterService: NewsletterService) { }

  onSubmit() {
    this.newsletterService.subscribeUser().subscribe(data => {
      this.subscribed.set(data)
      this.model.set({ recipientEmail: '' })
    })
  }
}
