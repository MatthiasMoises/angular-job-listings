import { Component, inject, Renderer2, RendererFactory2, AfterViewInit } from '@angular/core';
import { DOCUMENT } from "@angular/common";

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent implements AfterViewInit {
  private renderer = inject(Renderer2);
  private rendererFactory = inject(RendererFactory2);
  private document = inject(DOCUMENT);

  ngAfterViewInit(): void {
    this.renderer = this.rendererFactory.createRenderer(null, null);
    this.addStructuredData();
  }

  addStructuredData(): void {
    const script = this.renderer.createElement('script');
    script.type = 'application/ld+json';
    script.text = `
    {
      "@context": "http://schema.org",
      "@type": "Organization",
      "name": "Angular Job Listings App",
      "url": "https://your-angular-app.com",
      "logo": "https://your-angular-app.com/logo.png",
      "description": "Find the best fitting Angular Job for you"
    }`;

    if (typeof document !== 'undefined') {
      this.renderer.appendChild(this.document.head, script);
    }
  }
}
