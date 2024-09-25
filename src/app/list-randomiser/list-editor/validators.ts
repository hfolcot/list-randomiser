import { AbstractControl } from "@angular/forms";

export function notEmpty(itemArray: any[]) {
    console.log(itemArray)
    return (control: AbstractControl) => {
        if(itemArray.length > 0) {
            return null;
        }

        return {
            contentMustExist: true
        }
    }
}