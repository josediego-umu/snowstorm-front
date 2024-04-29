import { Component, OnInit, TemplateRef } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Project } from 'src/app/model/project.model';
import { User } from 'src/app/model/user.model';
import { ProjectService } from 'src/app/services/project.service';
import { SelectionModel } from '@angular/cdk/collections';
import { MatSelectChange } from '@angular/material/select';
import { DialogServiceService } from 'src/app/services/dialog-service.service';
import { UserService } from 'src/app/services/user.service';
import { MessageHandlerService } from 'src/app/services/message-handler.service';

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.css'],
})
export class ConfigComponent implements OnInit {
  id: string | null = '';
  project: Project | null = null;
  optionTable: string = 'Readers';
  optionTableBackup: string = 'Readers';

  displayedColumnsMain: string[] = ['select', 'username', 'name', 'email'];
  dataSourceMain!: MatTableDataSource<User>;
  dataSourceDialog!: MatTableDataSource<User>;
  selection = new SelectionModel<User>(true, []);

  constructor(
    private _route: ActivatedRoute,
    private _projectService: ProjectService,
    private _dialogService: DialogServiceService,
    private _userService: UserService,
    private _handleMessage: MessageHandlerService
  ) {
    this._route.paramMap.subscribe((params) => {
      this.id = params.get('id');
    });
  }

  async ngOnInit() {
    await this.loadProject();

    if (this.project != null) {
      this.dataSourceMain = new MatTableDataSource<User>(this.project?.readers);
    }
  }

  async loadProject() {
    const project = await this._projectService.getProject(this.id).toPromise();
    console.log('Load Project:', project);
    this.project = project as Project;
  }

  saveProject() {
    const projectSaved = this.project as Project;
    this._projectService.saveProject(projectSaved);
    console.log('Project Saved');
    console.log(projectSaved);
  }

  applyFilter(event: Event) {
    if (this.optionTable === 'Dialog') {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSourceDialog.filter = filterValue.trim().toLowerCase();
    } else {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSourceMain.filter = filterValue.trim().toLowerCase();
    }

    if (this.dataSourceMain?.paginator) {
      this.dataSourceMain?.paginator.firstPage();
    }
  }


  isAllSelected() {
    if (this.dataSourceMain?.data?.length === 0) {
      return false;
    }

    let numRows = 0;

    if (this.optionTable === 'Dialog') {
      numRows = this.dataSourceDialog?.data?.length;
    } else {
      numRows = this.dataSourceMain?.data?.length;
    }

    const numSelected = this.selection?.selected?.length;

    return numSelected === numRows;
  }

 
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    if (this.optionTable === 'Dialog') {
      this.selection.select(...this.dataSourceDialog?.data);
    } else {
      this.selection.select(...this.dataSourceMain?.data);
    }
  }


  checkboxLabel(row?: User): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'}`;
  }

  removeSelectedRows() {
    this.selection.selected.forEach((item) => {
      let index: number = this.dataSourceMain.data.findIndex((d) => d === item);
      this.dataSourceMain?.data.splice(index, 1);
      this.dataSourceMain = new MatTableDataSource<User>(
        this.dataSourceMain?.data
      );

      if (this.optionTable === 'Readers' && this.project != null) {
        this.project.readers = this.dataSourceMain?.data;
      } else if (this.optionTable === 'Writers' && this.project != null) {
        this.project.writers = this.dataSourceMain?.data;
      }
    });
  }

  onEnterKeydown(event: KeyboardEvent) {
    event.preventDefault();
  }

  changeTable(option: MatSelectChange) {
    console.log('Change Table:', option);

    if (option.value === 'Readers') {
      this.dataSourceMain = new MatTableDataSource<User>(this.project?.readers);
    } else if (option.value === 'Writers') {
      this.dataSourceMain = new MatTableDataSource<User>(this.project?.writers);
    }

    this.selection.clear();
    this.optionTable = option.value as string;
  }

  openDialogWithTemplateRef(template: TemplateRef<any>) {
    console.log('Open Dialog:', template);
    this.searchUsers();
    this._dialogService.openDialogWithTemplate({ template });
    this.selection.clear();
    this.optionTableBackup = this.optionTable;
    this.optionTable = 'Dialog';
  }

  closeDialog() {
    this.optionTable = this.optionTableBackup;
    this.optionTableBackup = '';
    this._dialogService.closeDialog();
  }

  searchUsers() {
    this._userService.getUsers().subscribe((users) => {
      console.log('Search Users:', users);
      this.dataSourceDialog = new MatTableDataSource<User>(users);
    });
  }

  addUsers() {
    console.log('Add Users:');

    this.selection.selected.forEach((item) => {
      if (this.optionTableBackup === 'Readers') {
        if (
          (this.project && this.project?.readers === undefined) ||
          this.project?.readers === null
        )
          this.project.readers = new Array<User>();

        this.project?.readers.push(item);

        this.dataSourceMain = new MatTableDataSource<User>(
          this.project?.readers
        );
      } else if (this.optionTableBackup === 'Writers') {
        if (
          (this.project && this.project?.writers === undefined) ||
          this.project?.writers === null
        )
          this.project.writers = new Array<User>();

        this.project?.writers.push(item);
        this.dataSourceMain = new MatTableDataSource<User>(
          this.project?.writers
        );
      }
    });

    this.selection.clear();
    this.closeDialog();
  }

  deleteProject(){
    this._projectService.deleteProject(this.project as Project).subscribe(
      (data) => {
        console.log('Delete Project:', data);
        this._handleMessage.handlerSuccess('Project successfully deleted','','/search');
      },
      (error) => {
        console.log('Error:', error);
        this._handleMessage.handlerError(error.error.detail);
      }
    );
  }
}
