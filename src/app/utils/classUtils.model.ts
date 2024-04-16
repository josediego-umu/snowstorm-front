export class ClassUtils {

    static getNameFields(typeOfClass: any){
        
        let instance = new typeOfClass();
        let array = Object.getOwnPropertyNames(instance);
        return array;

    }

}