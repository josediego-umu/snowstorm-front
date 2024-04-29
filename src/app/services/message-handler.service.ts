import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class MessageHandlerService {
  private url: string = '/message';
  private redirectUrl: string = '/home';
  private message: string = 'Mensaje por defecto';
  private type: string = 'info';
  private code: string = '';

  constructor(private _router: Router) {}

  handler404Error() {
    this.message = 'La página solicitada no existe';
    this.type = 'warning';
    this._router.navigate([this.url]);
  }

  handler500Error() {
    this.message = 'Error en el servidor';
    this.type = 'error';
    this._router.navigate([this.url]);
  }

  handleDefaultrSuccess() {
    this.message = 'Operación realizada con éxito';
    this.type = 'success';
    this._router.navigate([this.url]);
  }

  handlerSuccess(message: string, code: string = '', redirectUrl: string = '') {
    this.message = message;
    this.type = 'success';
    this.redirectUrl = redirectUrl;
    this._router.navigate([this.url]).then(() => {
      setTimeout(() => {
        this._router.navigate([redirectUrl]);
      }, 3000);
    });
  }

  handlerError(message: string, code: string = '', redirectUrl: string = '') {
    this.message = message;
    this.type = 'error';
    this.code = code;
    this.redirectUrl = redirectUrl;
    this._router.navigate([this.url]);
  }

  getMessage() {
    return this.message;
  }

  getType() {
    return this.type;
  }

  getRedirectUrl() {
    return this.redirectUrl;
  }

  getCode() {
    return this.code;
  }

  setMessage(message: string) {
    this.message = message;
  }

  setType(type: string) {
    this.type = type;
  }

  setCode(code: string) {
    this.url = code;
  }

  setRedirectUrl(url: string) {
    this.redirectUrl = url;
  }
}
