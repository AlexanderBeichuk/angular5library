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

    @ViewChild('addLabelModal') addLabelModal;

    resetForm = this.formService.resetForm;

    constructor(private labelService: LabelService, private tostr: ToastrService, private formService: FormService) { }

    ngOnInit() {
        this.labelList = this.labelService.getLabelList();
        console.log(this.labelList);
    }

    addLabel(labelForm: NgForm): void {
        if (labelForm.value.$key == null)
            this.labelService.addLabel(this.label);
        else
            this.labelService.updateLabel(this.label);
        this.resetForm(labelForm, this.addLabelModal);
        this.tostr.success('Success');
        this.labelList = this.labelService.getLabelList();
    }


}
