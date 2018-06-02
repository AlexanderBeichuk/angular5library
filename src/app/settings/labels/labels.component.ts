import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms'
import { LabelService } from '../../services/label.service';
import { ToastrService } from 'ngx-toastr';
import {Label} from "../../models/label";


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

    @ViewChild('addLabelModal') addLabelModal;

    constructor(private labelService: LabelService, private tostr: ToastrService) { }

    ngOnInit() {
        this.labelList = this.labelService.getLabelList();
        console.log(this.labelList);
    }

    addLabel(labelForm: NgForm): void {
        if (labelForm.value.$key == null)
            this.labelService.addLabel(this.label);
        else
            this.labelService.updateLabel(this.label);
        this.resetForm(labelForm);
        this.tostr.success('Succcess');
        this.labelList = this.labelService.getLabelList();

    }

    resetForm(employeeForm?: NgForm) {
        if (employeeForm != null) {
            employeeForm.reset();
            this.addLabelModal.hide();
        }
    }


}
