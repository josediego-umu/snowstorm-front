import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, ChildrenOutletContexts } from '@angular/router';
import { ProjectService } from '../../services/project.service';
import { DialogServiceService } from 'src/app/services/dialog-service.service';
import { DialogWithTemplateComponent } from '../dialog-with-template/dialog-with-template.component';
import { MatDialogRef } from '@angular/material/dialog';
import { MessageHandlerService } from 'src/app/services/message-handler.service';
import { Project } from 'src/app/model/project.model';
import { StructuredData } from 'src/app/model/structured-Data.model';
import { TreeNode } from 'primeng/api';
import { Panel } from 'primeng/panel';
import { MatPaginator } from '@angular/material/paginator';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-data-struct',
  templateUrl: './data-struct.component.html',
  styleUrls: ['./data-struct.component.css'],
})
export class DataStructComponent implements OnInit {
  @ViewChild('panel') panel!: Panel;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  private matDialogRef!: MatDialogRef<DialogWithTemplateComponent>;
  ontologyForm !: FormGroup;
  activeOntologyId: string = '';
  ontologies: any = {};
  ontologiesKeys: string[] = [];

  id: string | null = '';
  project: Project | null = null;
  dataReceived: boolean = false;

  value: string = '';
  index: number = 0;
  limit: number = 3;
  labels: string[] = [];
  totalLabels = 0;
  cols: any[] = [
    { field: 'value', header: 'Value' },
    { field: 'label', header: 'Label' },
  ];

  files!: TreeNode[];
  selectValue!: any | null;
  selectedFile: File | null = null;
  columnsToValue: Map<string, Set<string>> = new Map<string, Set<string>>();
  labelsMap: Map<string, string> = new Map<string, string>();


  constructor(
    private _route: ActivatedRoute,
    private _projectService: ProjectService,
    private _dialogService: DialogServiceService,
    private _messageHandler: MessageHandlerService,
    private _fb: FormBuilder
  ) {
    this._route.paramMap.subscribe((params) => {
      this.id = params.get('id');
    });
  }

  async ngOnInit(): Promise<void> {
    this.loadProject().then(() => {
      this.init();
      this.files = this.convertToTreeNode();
      this.dataReceived = true;
      this.activeOntologyId = this.project?.activeOntologyId || '';
      this.ontologies = this.project?.ontologies || {};
    });
    console.log('Project:', this.project);

    this.ontologyForm = this._fb.group({
      file: [null, Validators.required],
      name: ['', Validators.required],
      iri: ['', Validators.required]
    });
  }

  ngAfterViewInit(): void {}

  async loadProject() {
    try {
      const project = await this._projectService
        .getProject(this.id)
        .toPromise();
      console.log('Load Project:', project);
      this.project = project as Project;
    } catch (error) {
      console.log(error);
    }
  }

loadOntology() {

  const file = this.selectedFile || new File([], '');
  const name = this.ontologyForm.value.name;
  const iri = this.ontologyForm.value.iri;
  const id = this.project?.id || '';

  console.log('File:', this.selectedFile);
  this._projectService.loadOntology(id, name, iri, file).subscribe(
    (res) => {
      console.log(res);
      this.project = res as Project;
    },
    (error) => {
      console.log(error);
      this._messageHandler.handlerError(error.error.detail);
    });
  
    this.ontologyForm.reset();
}

  analyze() {
    console.log('Analyzing');
    this.dataReceived = false;

    if (this.project == null) {
      return;
    }

    this._projectService.analyze(this.project, this.activeOntologyId).subscribe(
      (res) => {
        console.log(res);

        if (this.project == null) {
          return;
        }

        this.init();
        this.project.structuredData = res;
        this.files = this.convertToTreeNode();
        this.dataReceived = true;
      },
      (error) => {
        console.log(error);
        this._messageHandler.handlerError(error.error.detail);
      }
    );
  }

  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
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

    this.project.activeOntologyId = this.activeOntologyId;
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

    this.paginator?.pageIndex != null
      ? (this.index = this.paginator.pageIndex)
      : (this.index = 0);
    this.paginator?.pageSize != null
      ? (this.limit = this.paginator.pageSize)
      : (this.limit = 3);

    this._projectService
      .searchLabels(this.value, this.index * this.limit, this.limit,this.activeOntologyId)
      .then(
        (res) => {
          console.log('Labels:', res);

          this.labels = res.labels as string[];
          this.totalLabels = res.totalLabels;
          this.paginator.length = this.totalLabels;

          if (this.totalLabels === 0) {
            this.labels = ['No results found'];
          }
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

  handleNodeSelection(event: any) {
    console.log('Event:', event);

    this.selectValue = event;
    this.value = this.selectValue.value;
    setTimeout(() => {
      //console.log('this.paginator:', this.paginator);
      this.paginator.page.subscribe(() => {
        this.searchLabels();
      });
      this.index = 0;
      this.paginator.pageIndex = 0;
    });

    this.searchLabels();
  }

  selectLabel(event: any) {
    console.log('Select Label:', event);

    for (let node of this.files) {
      if (node.data.value === this.value) {
        node.data.label = event;
      }

      if (node.children != null) {
        for (let child of node.children) {
          if (child.data.value === this.value) {
            child.data.label = event;
          }
        }
      }
    }
      this.labelsMap.set(this.value, event);

      if (this.project == null) {
        return;
      }

      this.project.structuredData.labels[this.value] = event;
      console.log('Labels Project Test:', this.project.structuredData.labels[this.value]);
  }

  searchLabelInput(value: any) {
    console.log('Value searchLabelInput:', value);
    this.value = value.trim();
    this.index = 0;
    this.searchLabels();
  }

  changePage(event: any) {
    if (this.paginator.pageIndex != null) {
      this.index = this.paginator.pageIndex;
    }

    if (this.paginator.pageSize != null) {
      this.limit = this.paginator.pageSize;
    }

    this.searchLabels();
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

  getOntologies(): any {
    if (this.project == null) {
      return new Map<string, string>();
    }

    return this.project.ontologies;
  }

  getOntologyKeys() : string[]{
    if (this.project == null) {
      return new Array<string>();
    }

    console.log('activeOntologyId:', this.activeOntologyId);
    console.log('Ontologies:', this.project.ontologies);
    return Object.keys(this.project.ontologies);

  }


  getActiveOntologyId(): string {
    if (this.project == null) {
      return '';
    }

    return this.project.activeOntologyId;
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

    return this.getDataStruct().labels as Map<string, string>;
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

  getValue(key: string): string {
    if (this.project == null || key == null) {
      return '';
    }

    return this.project.structuredData.labels.get(key)?.toString() || '';
  }

  private convertToTreeNode(): TreeNode[] {
    if (this.project == null) {
      return new Array<TreeNode>();
    }

    console.log('Converting to Tree Node');

    let headers = this.getHeaders();

    let labels = this.labelsMap;

    let columnsToValue = this.columnsToValue;

    console.log('Columns to Value:', columnsToValue);
    console.log('Labels:', labels);

    let files: TreeNode[] = new Array<TreeNode>();

    for (let i = 1; i < headers.length; i++) {
      let head = headers[i];
      let label = labels.get(head) || ''; // Aquí se asegura de que la clave exista en el mapa labels
      let node: TreeNode = {
        data: { value: head, label: label },
        children: [] as TreeNode[],
      };

      let row = columnsToValue.get(head) || new Set<string>();
      let child: TreeNode = { data: {}, children: [] };

      row.forEach((value) => {
        if (value != null && value != '') {
          child = { data: { value: value, label: labels.get(value) || '' } };
          node.children?.push(child);
        }
      });

      files.push(node);
    }

    console.log('Files:', files);
    return files;
  }

  init() {
    if (this.project == null) {
      return;
    }

    let entries = this.project.structuredData.columnsToValues;
    let labelsMap = new Map(Object.entries(this.getLabels()));

    let columnsToValue = new Map<string, Set<string>>();

    Object.entries(entries).forEach(([key, value]) => {
      columnsToValue.set(key, value);
    });

    this.columnsToValue = columnsToValue;
    this.labelsMap = labelsMap;
  }
}
