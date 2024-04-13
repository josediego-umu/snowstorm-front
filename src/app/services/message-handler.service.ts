import { Injectable } from '@angular/core';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class MessageHandlerService {
  private url: string = '/message';
  private message: string = 'Mensaje por defecto';
  private type: string = 'info';

  constructor(private _router: Router) { }


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

  handlerSuccess(message : string) {

    this.message = message;
    this.type = 'success';
    this._router.navigate([this.url]);
  }

  handlerError(message : string) {

    this.message = message;
    this.type = 'error';
    this._router.navigate([this.url]);
  }

  getMessage() {
    return this.message;
  }

  getType() {
    return this.type;
  }

  setMessage(message: string) {
    this.message = message;
  }

  setType(type: string) {
    this.type = type;
  }

}
