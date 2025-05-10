import { Component } from '@angular/core';
import { sharedService } from './services/sharedService.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'digital-property-insurance';

  constructor(
    public sharedService: sharedService
  ){}

  ngAfterViewInit() {
    this.sharedService.isLoading(false)
  }

}
