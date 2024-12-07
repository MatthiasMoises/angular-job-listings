import { Component, input } from '@angular/core';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css'
})
export class HeroComponent {
  title = input<string>('Become a Angular Dev')
  subtitle = input<string>('Find the Angular Job that fits your skill set')
}
