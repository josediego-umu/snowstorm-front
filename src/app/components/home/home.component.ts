import { Component } from '@angular/core';
import { authService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {


  constructor(private _authService: authService) { }

  isLogged() {
    return this._authService.isLogged();
  }


}
