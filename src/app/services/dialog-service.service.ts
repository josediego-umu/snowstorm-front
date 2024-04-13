import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogCustomComponent } from '../components/dialog-custom/dialog-custom.component';
import { DialogCustomData } from '../model/dialog-custom-data.model';
import { DialogWithTemplateData } from '../model/dialog-with-template-data';
import { DialogWithTemplateComponent } from '../components/dialog-with-template/dialog-with-template.component';

@Injectable({
  providedIn: 'root'
})
export class DialogServiceService {

  constructor(private _matDialog: MatDialog) { }

  openDialogCustom(data: DialogCustomData){
    return this._matDialog.open(DialogCustomComponent, {data});
  }

  openDialogWithTemplate(data: DialogWithTemplateData){
    return this._matDialog.open(DialogWithTemplateComponent, {data, hasBackdrop: false, disableClose: true});
  }

  closeDialog(){
    this._matDialog.closeAll();
  }


}
