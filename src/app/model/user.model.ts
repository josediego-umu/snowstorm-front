export class User {

    id: number | null;
    name : string;
    username: string;
    password: string;
    email: string;
    dateOfBirth: string | Date | null;

    constructor(id: number | null, name: string, username: string, password: string, email: string, dateOfBirth: Date | string) {
        this.id = id;
        this.name = name;
        this.username = username;
        this.password = password;
        this.email = email;
        this.dateOfBirth = dateOfBirth;
    }
  
}