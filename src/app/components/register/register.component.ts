import { Component } from '@angular/core';
import { MessageHandlerService } from '../../services/message-handler.service';
import { User } from '../../model/user.model';
import { DatePipe } from '@angular/common';
import { authService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  user: User = new User(null, '', '', '', '', new Date());
  confirmPassword: string = '';
  birthDate: Date = new Date();

  usernameFormControl = new FormControl('', [Validators.required]);
  passwordFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(8),
    Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*d)[a-zA-ZdS]+$'),
  ]);
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  nameFormControl = new FormControl('', [Validators.required]);
  BirthDateFormControl = new FormControl('', [Validators.required]);
  confirmPasswordFormControl = new FormControl('', [Validators.required]);

  constructor(
    private _authService: authService,
    private _messageHandlerService: MessageHandlerService,
    private _userService: UserService
  ) {}

  public register() {
    console.log('RegisterComponent.register()');
    this._userService.register(this.user).subscribe(
      (data) => {
        console.log(data);
        this._messageHandlerService.handlerSuccess(
          'User registered successfully'
        );
      },
      (error) => {
        console.log(error);
        this._messageHandlerService.handlerError(error.error.detail);
      }
    );
  }

 
}
