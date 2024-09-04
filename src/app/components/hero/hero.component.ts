import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css'
})
export class HeroComponent {
  @Input() title: string = 'Become a Angular Dev'
  @Input() subtitle: string = 'Find the Angular Job that fits your skill set'
}
