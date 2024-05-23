import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Project } from '../model/project.model';
import * as Papa from 'papaparse';
import { StructuredData } from '../model/structured-Data.model';
import { ProjectDTO } from '../model/projectDTO.model';
import { authService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  URLAnalysis: string = 'http://localhost:8085/analyzer/project';
  URLCreateProject: string = 'http://localhost:8085/project/';
  URLExport: string = 'http://localhost:8085/project/csv/';
  URLLabel: string = 'http://localhost:8085/analyzer/labels';
  URLSearch: string = 'http://localhost:8085/project/filter';

  ProjectSelect: Project | null = null;

  constructor(private http: HttpClient, private _authService: authService) {}

  createProject(
    name: string,
    description: string,
    visibility: string,
    file: File
  ): Observable<Object> {
    const formData = new FormData();

    console.log('createProject:');
    formData.append('name', name);
    formData.append('description', description);
    formData.append('visibility', visibility);
    formData.append('file', file);

    console.log('Form Data:', formData);

    const result = this.http.post(this.URLCreateProject, formData);

    return result;
  }

  saveProject(project: Project): Project {
    console.log('saveProject:', project);
    this.http.put(this.URLCreateProject, project).subscribe(
      (data) => {
        console.log(data);
        return data as Project;
      },
      (error) => {
        console.log(error);
        return null;
      }
    );

    return this.ProjectSelect || new Project();
  }

  deleteProject(project: Project) {
    console.log('deleteProject:', project);
    const result = this.http.delete(this.URLCreateProject + project.id)

    return result;
  }

  getProject(id: string | null): Observable<Project> {
    return this.http.get<Project>(this.URLCreateProject + id);
  }

  getFilteredProjects(httpParams: HttpParams): Observable<any> {
    return this.http.get<Project[]>(this.URLSearch, { params: httpParams });
  }

  analyze(project: Project): Observable<any> {
    console.log('Analyze Project:', project);
    return this.http.post(this.URLAnalysis, project.structuredData);
  }

  exportToCSV(id: string | null): Observable<any> {
    return this.http.get(this.URLCreateProject + id + '/export');
  }

  exportToCsvLocal(project: Project) {
    console.log('Exporting to CSV');
    const result = this.getDataStructureResult(project.structuredData);
    const csv = Papa.unparse(result, { quotes: false, delimiter: ';' });
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', 'data.csv');
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.open(url);
    }
  }

  private getDataStructureResult(data: StructuredData): Array<Array<String>> {
    const result = new Array<Array<String>>(data.rows.length);

    for (let i = 0; i < data.rows.length; i++) {
      result[i] = new Array<String>(data.rows[i].valuesRow.length + 1);

      if (
        data.rows[i].labeledRow != null &&
        data.rows[i].valuesRow?.length !== data.rows[i].labeledRow?.length
      ) {
        result[i][0] = 'Row ${i} has different number of values and labels';
        return result;
      }

      for (let j = 0; j < data.rows[i].valuesRow.length; j++) {
        result[i][j] =
          data.rows[i].valuesRow[j] +
          (data.rows[i].labeledRow
            ? data.rows[i].labeledRow[j]
              ? ' | ' + data.rows[i].labeledRow[j]
              : ''
            : '');

        result[i][j] = result[i][j].replace(/['"]/g, '');
      }

      result[i][data.rows[i].valuesRow.length + 1] = '\n';
    }
    console.log('Result:', result);
    return result;
  }

  async searchLabels(
    value: string,
    offset: number,
    limit: number
  ): Promise<String[]> {
    let params = new HttpParams().set('value', value);

    if (offset !== null && offset !== undefined) {
      params = params.set('offset', offset);
    }

    if (limit !== null && limit !== undefined) {
      params = params.set('limit', limit);
    }

    return this.http.get(this.URLLabel, { params }).toPromise() as Promise<
      String[]
    >;
  }

  checPermission(project: ProjectDTO | Project) {
    const user = this._authService.getUserFromToken();

    if (user == null) {
      return false;
    }

    if (project.owner != null && project.owner.id == user.id) {
      return true;
    }

    if (
      project.writers != null &&
      project.writers.some((writer) => writer.id == user?.id)
    ) {
      return true;
    }

    return false;
  }

  checkOwner(project: ProjectDTO | Project) {
    const user = this._authService.getUserFromToken();

    if (user == null) {
      return false;
    }

    if (project.owner != null && project.owner.id == user.id) {
      return true;
    }

    return false;
  }

}
