import { Injectable } from '@angular/core';
import {NgForm} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class FormService {

    constructor() { }

    resetForm(form, modal?) {
        if (form != null) {
            form.reset();
        }
        if (modal) {
            modal.hide();

        }
    }
}
