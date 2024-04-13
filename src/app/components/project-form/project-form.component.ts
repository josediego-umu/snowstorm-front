import { Component } from '@angular/core';
import { ProjectService } from '../../services/project.service';
import { Project } from '../../model/project.model';

@Component({
  selector: 'app-project-form',
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.css'],
})
export class ProjectFormComponent {
  file: File | null = null;
  name: string = '';
  description: string = '';
  visibility: string = 'private';
  
  constructor(private projectService: ProjectService) {}

  handleFileInput(event: any) {
    console.log('Evento:', event);
    const files: FileList = event.target.files;

    if (this.precondition(files)) {
      this.file = files.item(0);
    } else {
      this.file = null;
    }
  }

  onSubmit() {

    console.log('On Submit:', this.file, this.name, this.description, this.visibility);

    if (this.file !== null && this.name !== '') {
      const file: File = this.file;
      const Data = this.projectService.createProject(
        this.name,
        this.description,
        this.visibility,
        this.file
      );

      if (Data) {
        console.log('Project created:', Data);
      }
    }

  }

  private precondition(files: FileList): boolean {
    return (
      files &&
      files.length > 0 &&
      (files.item(0)?.type === 'text/csv' ||
        files.item(0)?.type === 'application/json')
    );
  }
}
