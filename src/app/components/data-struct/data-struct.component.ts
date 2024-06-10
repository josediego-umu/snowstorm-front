import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from '../../services/project.service';
import { DialogServiceService } from 'src/app/services/dialog-service.service';
import { DialogWithTemplateComponent } from '../dialog-with-template/dialog-with-template.component';
import { MatDialogRef } from '@angular/material/dialog';
import { MessageHandlerService } from 'src/app/services/message-handler.service';
import { Project } from 'src/app/model/project.model';
import { tick } from '@angular/core/testing';
import { StructuredData } from 'src/app/model/structured-Data.model';

@Component({
  selector: 'app-data-struct',
  templateUrl: './data-struct.component.html',
  styleUrls: ['./data-struct.component.css'],
})
export class DataStructComponent implements OnInit {
  [x: string]: any;

  id: string | null = '';
  project: Project | null = null;
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
    private _dialogService: DialogServiceService,
    private _messageHandler: MessageHandlerService
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
    this.project = project as Project;
  }

  analyze() {
    console.log('Analyzing');
    this.dataReceived = false;

    if (this.project == null) {
      return;
    }

    this._projectService.analyze(this.project).subscribe(
      (res) => {
        console.log(res);

        if (this.project == null) {
          return;
        }

        this.project.structuredData = res;
        this.dataReceived = true;
      },
      (error) => {
        console.log(error);
        this._messageHandler.handlerError(error.error.detail);
      }
    );
  }

  exportToCSV() {
    console.log('Exporting to CSV');
    this._projectService.exportToCSV(this.id).subscribe((res) => {});
  }

  exportToCsvLocal() {
    console.log('Exporting to CSV');
    if (this.project == null) {
      return;
    }
    this._projectService.exportToCsvLocal(this.project);
  }

  saveProject() {
    console.log('Saving Project');
    if (this.project == null) {
      return;
    }
    const projectSaved = this._projectService.saveProject(this.project);
    console.log('Project Saved');
    console.log(projectSaved);
  }

  deleteProject() {
    console.log('Deleting Project');
    if (this.project == null) {
      return;
    }
    this._projectService.deleteProject(this.project).subscribe(
      (res) => {
        console.log('Project Deleted');
        console.log(res);
        this._messageHandler.handlerSuccess(
          'Project successfully deleted',
          '',
          '/search'
        );
      },
      (error) => {
        console.log(error);
        this._messageHandler.handlerError(error.error.detail);
      }
    );
  }

  searchLabels() {
    console.log('Searching Labels');
    console.log('Value:', this.value, 'Index:', this.index);
    this._projectService
      .searchLabels(this.value, this.index * 10, this.limit)
      .then(
        (res) => {
          console.log('Labels:', res);
          this.labels = res as string[];
        },
        (error) => {
          console.log(error);
          this._messageHandler.handlerError(error.error.detail);
        }
      );
  }

  

  openDialogWithTemplate(template: TemplateRef<any>) {
    this.matDialogRef = this._dialogService.openDialogWithTemplate({
      template,
    });
  }

  closeDialog() {
    this._dialogService.closeDialog();
  }

  havePermission(): boolean {
    if (this.project == null) {
      return false;
    }
    return this._projectService.checPermission(this.project);
  }

  ownerPermission() {
    if (this.project == null) {
      return false;
    }
    return this._projectService.checkOwner(this.project);
  }

  getProject(): Project {

    if (this.project == null) {
      return new Project();
    }

    return this.project;
  }

  getDataStruct(): StructuredData {
    if (this.project == null) {
      return new StructuredData();
    }

    return this.project.structuredData;
  }

  getRows(): Array<Array<String>> {
  
    if (this.project == null) {
      return new Array<Array<String>>();
    }

    return this.getDataStruct().rows;

  }

  getLabels(): Map<string, string> {
    if (this.project == null) {
      return new Map<string, string>();
    }

    return this.getDataStruct().labels;
  }

  getHeaders(): string[] {
    if (this.project == null) {
      return new Array<string>();
    }

    return this.project.structuredData.rows[0];
  }

  getKeys(): IterableIterator<string> {
    if (this.project == null) {
      return new Map<string, string>().keys();
    }

    return this.project.structuredData.labels.keys();
  }

  getValue(key : string): string {
    if (this.project == null || key == null)  {
      return '';
    }

    return this.project.structuredData.labels.get(key)?.toString() || '';
  }

}
