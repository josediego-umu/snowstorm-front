import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent {
  
  @Input() type: string = 'info';
  @Input() code: string = ''; 
  @Input() message: string = 'Mensaje por defecto';
  @Input() redirectUrl: string = ''; 

}