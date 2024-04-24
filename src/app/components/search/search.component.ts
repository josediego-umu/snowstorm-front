import { Component, ViewChild } from '@angular/core';
import { ProjectService } from '../../services/project.service';
import { ClassUtils } from '../../utils/classUtils.model';
import { ProjectDTO } from '../../model/projectDTO.model';
import { MatPaginator } from '@angular/material/paginator';
import { HttpParams } from '@angular/common/http';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/model/user.model';
import { authService } from 'src/app/services/auth.service';
import { MatRadioGroup } from '@angular/material/radio';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatRadioGroup) radioGroup!: MatRadioGroup;

  defaultValue = 'name';
  valueSearch = '';
  optionDefault = 'all';
  fieldSearch: string[];
  ProjectDTOList: ProjectDTO[] | null = null;
  private user: User | null = null;

  constructor(
    private _projectService: ProjectService,
    private _router: Router,
    private _authService: authService
  ) {
    this.fieldSearch = ClassUtils.getNameFields(ProjectDTO).filter(
      (item) =>
        item !== 'visibility' &&
        item !== 'id' &&
        item !== 'owner' &&
        item !== 'readers' &&
        item !== 'writers'
    );

    this.user = this._authService.getUserFromToken();
  }

  ngAfterViewInit(): void {
    this.paginator.page.subscribe(() => {
      this.submitForm();
    });

    this.sort.sortChange.subscribe(() => {
      this.submitForm();
    });

    this.radioGroup.change.subscribe(() => {
      this.submitForm();
    });
  }

  submitForm() {
    let httpParams = new HttpParams();

    if (this.valueSearch != null && this.valueSearch != '') {
      console.log('valueSearch:', this.valueSearch);
      console.log('defaultValue:', this.defaultValue);
      httpParams = httpParams.set(this.defaultValue, this.valueSearch);
    }

    if (this.paginator.pageIndex != null)
      httpParams = httpParams.set('page', this.paginator.pageIndex.toString());

    if (this.paginator.pageSize != null)
      httpParams = httpParams.set(
        'pageSize',
        this.paginator.pageSize.toString()
      );

    if (this.sort.active != null && this.sort.direction != null) {
      httpParams = httpParams.set('orderField', this.sort.active);
      httpParams = httpParams.set('orderDirection', this.sort.direction);
    }

    if (this.radioGroup.value != null) {
      httpParams = httpParams.set('visibility', this.radioGroup.value);
    }

    this._projectService.getFilteredProjects(httpParams).subscribe(
      (data) => {
        this.ProjectDTOList = data.content as ProjectDTO[];
        this.paginator.length = data.totalElements;
        console.log('ProjectDTOList:', this.ProjectDTOList);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  redirectoToProject(id: String) {
    this._router.navigate(['/project/' + id]);
  }

  redirectToConfig(id: String) {
    this._router.navigate(['/project/' + id + '/config/']);
    }

  checPermission(projectDTO: ProjectDTO) {
    if (this.user == null) {
      return false;
    }

    if (projectDTO.owner != null && projectDTO.owner.id == this.user.id) {
      return true;
    }

    if (
      projectDTO.writers != null &&
      projectDTO.writers.some((writer) => writer.id == this.user?.id)
    ) {
      return true;
    }

    return false;
  }
}
