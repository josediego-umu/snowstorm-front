import { Component, OnInit } from '@angular/core';
import { User } from '../../model/user.model';
import { authService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { MessageHandlerService } from 'src/app/services/message-handler.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent {
  user: User;
  confirmPassword: string;

  constructor(
    private _authService: authService,
    private _userService: UserService,
    private handle: MessageHandlerService
  ) {
    this.user = new User(null, '', '', '', '', new Date());
    const userFromToken = this._authService.getUserFromToken();
    const user = _userService.getUser(userFromToken?.username || '');
    
    this.confirmPassword = '';

    user.subscribe(
      (data) => {

        if (data === null) {
          this._authService.logout();
        }

        this.user = data;
        const date = this.user.dateOfBirth;

        if (date !== null && Array.isArray(date)) {
          const dateArray = date as any[];
          this.user.dateOfBirth = new Date(
            dateArray[0],
            dateArray[1] - 1,
            dateArray[2]
          )
            .toISOString()
            .split('T')[0];
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  saveUser(): void {
    console.log('ProfileComponent.saveUser()');
    console.log(this.user);
    this._userService.update(this.user).subscribe(
      (data) => {
        console.log(data);
        this.handle.handlerSuccess('User updated successfully','', '/profile');
      },
      (error) => {
        console.log(error);
        this.handle.handlerError(error.error.detail);
      }
    );
  }
}
