import { Component } from '@angular/core';
import { MessageHandlerService } from '../../services/message-handler.service';

@Component({
  selector: 'app-handler-message',
  templateUrl: './handler-message.component.html',
  styleUrls: ['./handler-message.component.css']
})
export class HandlerMessageComponent {

  constructor(private _messageHandler : MessageHandlerService) { }

  getMessage() {
    return this._messageHandler.getMessage();
  }

  getType() {
    return this._messageHandler.getType();
  }

  getRedirectUrl() {
    return this._messageHandler.getRedirectUrl();
  }

  getCode() {
    return this._messageHandler.getCode();
  }

}
