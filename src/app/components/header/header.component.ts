import { Component } from '@angular/core';
import { authService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  private searchVisible = false;
  
  constructor(private _authService : authService) { }

  isLogged() {
    return this._authService.isLogged();
  }

  toggleSearch() {
    this.searchVisible = !this.searchVisible;
  }

  isSearchVisible() {
    return this.searchVisible;
  }

}
