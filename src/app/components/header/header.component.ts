import { Component, EventEmitter, Output } from '@angular/core';
import { authService } from '../../services/auth.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  private searchVisible = false;
  @Output() sidebarToggle = new EventEmitter();

  constructor(private _authService: authService, private _router: Router) {}

  isLogged() {
    return this._authService.isLogged();
  }

  logout() {
    this._authService.logout();
  }

  toggleSidebar() {
    this.sidebarToggle.emit();
  }

}
