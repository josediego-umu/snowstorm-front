import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from '../../services/project.service';
import { DialogServiceService } from 'src/app/services/dialog-service.service';
import { DialogWithTemplateComponent } from '../dialog-with-template/dialog-with-template.component';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-data-struct',
  templateUrl: './data-struct.component.html',
  styleUrls: ['./data-struct.component.css'],
})
export class DataStructComponent implements OnInit {
  [x: string]: any;

  id: string | null = '';
  project: any = null;
  dataReceived: boolean = false;
  row: number = 0;
  cell: number = 0;
  value: string = '';
  index: number = 0;
  limit: number = 10;
  labels: string[] = [];

  private matDialogRef!: MatDialogRef<DialogWithTemplateComponent>;

  constructor(
    private _route: ActivatedRoute,
    private _projectService: ProjectService,
    private _dialogService: DialogServiceService
  ) {
    this._route.paramMap.subscribe((params) => {
      this.id = params.get('id');
    });
  }

  async ngOnInit(): Promise<void> {
    await this.loadProject();
    console.log('Project:', this.project);
    this.dataReceived = true;
  }

  async loadProject() {
    const project = await this._projectService.getProject(this.id).toPromise();
    console.log('Load Project:', project);
    this.project = project;
  }

  analyze() {
    console.log('Analyzing');
    this.dataReceived = false;
    this._projectService.analyze(this.project).subscribe(
      (res) => {
        console.log(res);
        this.project.structuredData = res;
        this.dataReceived = true;
      },
      (error) => {
        console.log(error);
        this.dataReceived = true;
      }
    );
  }

  exportToCSV() {
    console.log('Exporting to CSV');
    this._projectService.exportToCSV(this.id).subscribe((res) => {});
  }

  exportToCsvLocal() {
    console.log('Exporting to CSV');
    this._projectService.exportToCsvLocal(this.project);
  }

  saveProject() {
    console.log('Saving Project');
    const projectSaved = this._projectService.saveProject(this.project);
    console.log('Project Saved');
    console.log(projectSaved);
  }

  async SelectCell(row: number, cell: number) {
    console.log('Selecting Cell:', row, cell);
    this.index = 1;
    this.row = row;
    this.cell = cell;
    this.value = this.project.structuredData.rows[row].valuesRow[cell];
    console.log('Label:', this.value);
    const res = await this._projectService.searchLabels(this.value, 0, 10);

    this.labels = res as string[];
    console.log('Labels:', res);
  }

  searchLabels() {
    console.log('Searching Labels');
    console.log('Value:', this.value, 'Index:', this.index);
    this._projectService
      .searchLabels(this.value, this.index * 10, this.limit)
      .then((res) => {
        console.log('Labels:', res);
        this.labels = res as string[];
      });
  }

  selectOption(option: string) {
    console.log('Selecting Option:', option);
    console.log('Row:', this.row);
    console.log('Cell:', this.cell);
    console.log('Labels:', this.project.structuredData.rows[this.row]);

    if (!this.project.structuredData.rows[this.row].labeledRow) {
      this.project.structuredData.rows[this.row].labeledRow = [];
    }

    this.project.structuredData.rows[this.row].labeledRow[this.cell] = option;
    this.index = 0;
  }

  resetLabel() {
    this.index = 0;
  }

  nextLabel() {
    this.index++;
    this.searchLabels();
  }

  previousLabel() {
    if (this.index > 0) {
      this.index--;
    }

    this.searchLabels();
  }

  openDialogCustom() {
    this._dialogService.openDialogCustom({
      title: 'Custom Dialog',
      content: 'This is a custom dialog',
    });
  }

  openDialogWithTemplate(template: TemplateRef<any>) {
    this.matDialogRef = this._dialogService.openDialogWithTemplate({
      template,
    });
  }

  havePermission() : boolean {
    return this._projectService.checPermission(this.project);
  }
  
}
