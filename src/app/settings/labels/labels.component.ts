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

    label:Label = this.resetLabel();
    selectLabel:Label = this.resetLabel();

    labelList: Label[];

    @ViewChild('labelModal') labelModal;

    event: string;

    resetForm = this.formService.resetForm;

    constructor(private labelService: LabelService, private tostr: ToastrService, private formService: FormService) { }

    ngOnInit() {
        this.labelList = this.labelService.getList();
    }

    addLabel(labelForm: NgForm): void {
        if (this.selectLabel.$key == null) {
            this.labelService.add(this.selectLabel);
        } else {
            this.labelService.update(this.selectLabel);
        }
        this.resetForm(labelForm, this.labelModal);
        this.tostr.success('Success');
        this.labelList = this.labelService.getList();
    }

    readLabel(label): void {
        this.selectLabel = {
            $key: label.$key,
            name: label.name,
            color: label.color
        };
        this.openPopup('edit', label);
    }

    deleteLabel(key: string): void {
        this.labelService.delete(key);
        this.resetLabel();
        this.labelModal.hide();
        this.labelList = this.labelService.getList();
    }

    resetLabel(): Label {
        return {
            $key: null,
            name: '',
            color: ''
        }
    }

    openPopup(event: string, label: Label): void {
        this.event = event;
        this.label = label;
        this.labelModal.show();
    }
}
