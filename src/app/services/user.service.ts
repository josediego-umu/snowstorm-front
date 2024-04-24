import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../model/user.model';
import { Observable } from 'rxjs';
import { format } from 'date-fns';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private _registerUrl = "http://localhost:8085/user/register";
  private _getUserUrl = "http://localhost:8085/user/username/";
  private _updateUrl = "http://localhost:8085/user";

  constructor(private _http: HttpClient , private _datePipe : DatePipe) { }


  register(user: User) {

    console.log('RegisterService.register()');
    console.log(user);
    user.dateOfBirth = this._datePipe.transform(user.dateOfBirth, 'yyyy-MM-ddTHH:mm:ss');
    return this._http.post<any>(this._registerUrl, user);
  
  }

  update (user: User) {
    let userCopy = new User(user.id, user.name,user.username, user.password, user.email, user.dateOfBirth || new Date());
    console.log('RegisterService.update()');
    if (userCopy.dateOfBirth) {
      userCopy.dateOfBirth = format(userCopy.dateOfBirth, 'yyyy-MM-dd\'T\'HH:mm:ss');
    }
    console.log(userCopy);
    //const headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this._http.put<any>(this._updateUrl, userCopy);

  }

  getUser(username: string) : Observable<User> {

    console.log('RegisterService.getUser()');
    return this._http.get<User>(this._getUserUrl + username);
    
  }

  getUsers() : Observable<User[]> {
    return this._http.get<User[]>("http://localhost:8085/user");
  }

}
