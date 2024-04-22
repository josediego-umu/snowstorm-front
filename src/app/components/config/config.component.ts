import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Project } from 'src/app/model/project.model';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.css'],
})
export class ConfigComponent implements OnInit {

  id: string | null = '';
  project: Project | null = null;


  constructor(
    private _route: ActivatedRoute,
    private _projectService: ProjectService
  ) {
    this._route.paramMap.subscribe((params) => {
      this.id = params.get('id');
    });

  }


  async ngOnInit() {
    await this.loadProject();
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


}

