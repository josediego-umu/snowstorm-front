import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from '../project.service';
import { Project } from '../model/project.model';

@Component({
  selector: 'app-data-struct',
  templateUrl: './data-struct.component.html',
  styleUrls: ['./data-struct.component.css'],
})
export class DataStructComponent implements OnInit {
  id: string | null = '';
  project: any | null = null;
  dataReceived: boolean = false;

  constructor(
    private _route: ActivatedRoute,
    private _projectService: ProjectService
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

  getLabel() {
    console.log('nada');
    return 'nada';
  }

  analyze() {
    console.log('Analyzing');
    this.dataReceived = false;
    this._projectService.analyze(this.project).subscribe((res) => {
      console.log(res);
      this.project.structuredData = res;
      this.dataReceived = true;
    }, (error) => {
      console.log(error);
      this.dataReceived = true;
    });
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
}
