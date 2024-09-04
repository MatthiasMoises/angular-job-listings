import { Component } from '@angular/core';
import { CardComponent } from '../card/card.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home-cards',
  standalone: true,
  imports: [RouterModule, CardComponent],
  templateUrl: './home-cards.component.html',
  styleUrl: './home-cards.component.css'
})
export class HomeCardsComponent {

}
