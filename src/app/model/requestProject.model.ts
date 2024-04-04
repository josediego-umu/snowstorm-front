import { Project } from "./project.model";

export
class RequestProject {
    
    project : Project;
    file : File;

    constructor(project : Project, file : File){
        this.project = project;
        this.file = file;
    }
}