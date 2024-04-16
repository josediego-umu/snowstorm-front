import { Component, ViewChild } from '@angular/core';
import { ProjectService } from '../../services/project.service';
import { ClassUtils } from '../../utils/classUtils.model';
import { ProjectDTO } from '../../model/projectDTO.model';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent {
  fieldSearch: string[];
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(_projectService: ProjectService) {
    this.fieldSearch = ClassUtils.getNameFields(ProjectDTO);
  }

  submitForm(formValues: any) {
    console.log(formValues);
  }
}
