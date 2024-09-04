import { Component, Input, OnInit } from '@angular/core';
import { NgxSpinnerModule } from "ngx-spinner";
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-spinner',
  standalone: true,
  imports: [NgxSpinnerModule],
  templateUrl: './spinner.component.html',
  styleUrl: './spinner.component.css'
})
export class SpinnerComponent implements OnInit {
  constructor(private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.spinner.show()

    setTimeout(() => {
      this.spinner.hide()
    }, 5000)
  }
}
