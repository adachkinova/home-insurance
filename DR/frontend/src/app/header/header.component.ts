import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {authService} from '../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public router: Router, public authService: authService) {
   }

  ngOnInit(): void {


  }

}
