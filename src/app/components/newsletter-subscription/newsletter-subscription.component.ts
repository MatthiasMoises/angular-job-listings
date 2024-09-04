import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NewsletterService } from '../../services/newsletter.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-newsletter-subscription',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './newsletter-subscription.component.html',
  styleUrl: './newsletter-subscription.component.css'
})
export class NewsletterSubscriptionComponent {
  model = {
    recipientEmail: ''
  }
  subscribed: boolean = false

  constructor(private newsletterService: NewsletterService) { }

  onSubmit() {
    this.newsletterService.subscribeUser().subscribe(data => {
      this.subscribed = data
      this.model.recipientEmail = ''
    })
  }
}
