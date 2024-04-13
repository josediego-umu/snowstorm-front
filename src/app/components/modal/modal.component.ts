import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit{

  constructor(private modal : NgbModal) { }

  ngOnInit(): void {
  }

  open(content : any){
    this.modal.open(content, {});
  }

  dismiss(){
    this.modal.dismissAll();
  }

  close(){
    this.modal.dismissAll();
  }



}
