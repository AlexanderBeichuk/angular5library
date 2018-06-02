import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms'
import { LabelService } from '../../services/label.service';
import { ToastrService } from 'ngx-toastr';
import {Label} from "../../models/label";
import {FormService} from "../../services/form.service";


@Component({
  selector: 'app-labels',
  templateUrl: './labels.component.html',
  styleUrls: ['./labels.component.scss']
})
export class LabelsComponent implements OnInit {

    label:Label = {
        $key: null,
        name: '',
        color: ''
    };

    labelList: Label[];

    @ViewChild('labelModal') labelModal;

    event: string;

    resetForm = this.formService.resetForm;

    constructor(private labelService: LabelService, private tostr: ToastrService, private formService: FormService) { }

    ngOnInit() {
        this.labelList = this.labelService.getLabelList();
    }

    addLabel(labelForm: NgForm): void {
        debugger;
        if (this.label.$key == null) {
            this.labelService.addLabel(this.label);
        } else {
            this.labelService.updateLabel(this.label);
        }
        this.resetForm(labelForm, this.labelModal);
        this.tostr.success('Success');
        this.labelList = this.labelService.getLabelList();
    }

    openPopup(event: string): void {
        this.event = event + ' label';
        this.labelModal.show();
    }

    readLabel(label): void {
        this.label = {
            $key: label.$key,
            name: label.name,
            color: label.color
        };
        this.openPopup('Edit');
    }


}
