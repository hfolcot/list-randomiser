import { AbstractControl } from "@angular/forms";

export function notEmpty(itemArray: any[]) {
    return (control: AbstractControl) => {
        if(itemArray.length > 0) {
            return null;
        }

        return {
            contentMustExist: true
        }
    }
}