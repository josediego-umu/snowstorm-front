import { Component } from '@angular/core';
import { MessageHandlerService } from '../../services/message-handler.service';
import { Router } from '@angular/router';
import { authService } from '../../services/auth.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

   username : string;
   password : string;

  constructor(private _authService: authService, private _messageHandler: MessageHandlerService, private _router: Router) { 
    this.username = '';
    this.password = '';

  }

  ngOnInit(): void { 
    this.username = '';
    this.password = '';
  }


public login() {

  this._authService.login(this.username,this.password).subscribe( response => { 
    this._authService.saveToken(response.token)
    console.log('Usuario logueado con éxito', response.token);
    this._router.navigate(['']);
  }, error => {
    console.error('Error al iniciar sesión', error);
  })

}

public getUserName(): string {
  return this.username; 

}

public setUsername(username: string): void {
  this.username = username;
}

public getPassword(): string {
  return this.password;
}

public setPassword(password: string): void {
  this.password = password;
}



}
