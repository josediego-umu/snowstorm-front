import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Project } from './model/project.model';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  URLCreateProject : string = 'http://localhost:8085/project/';
  ProjectSelect : Project | null = null;

  constructor(private http: HttpClient) { }

  createProject(name : string, description : string, visibility : string ,file : File): Project | null {
    const formData = new FormData();

    console.log('createProject:');
    formData.append('name', name);
    formData.append('description', description);
    formData.append('visibility', visibility);
    formData.append('file', file);

    console.log('Form Data:', formData);

     this.http.post(this.URLCreateProject, formData).subscribe(
        (data) => {
          console.log(data);
          this.ProjectSelect = data as Project;
        },
        (error) => {
          console.log(error);
        }
     )
     
     
     return this.ProjectSelect || new Project();


  }


}
