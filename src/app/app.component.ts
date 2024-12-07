import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  private readonly meta = inject(Meta);
  private readonly title = inject(Title);

  updateMetaTags() {
    this.title.setTitle('Angular Job Listings');

    this.meta.addTags([
      { name: 'description', content: 'A Job board for Angular Developers' },
      { name: 'keywords', content: 'Angular, Job, Jobs, JavaScript' }
    ]);

    this.meta.addTags([
      { property: 'og:title', content: 'Angular Job Listings' },
      { property: 'og:description', content: 'A Job board for Angular Developers' }
    ]);
  }

  ngOnInit(): void {
    this.updateMetaTags();
  }
}
