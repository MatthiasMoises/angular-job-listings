import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgIconsModule } from '@ng-icons/core';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [RouterModule, NgIconsModule],
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.css'
})
export class NotFoundComponent {

}
