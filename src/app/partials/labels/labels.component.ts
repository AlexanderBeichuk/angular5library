import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LabelService } from '../../services/label.service';
import { ToastrService } from 'ngx-toastr';
import { Label } from '../../models/label';
import { FormService } from '../../services/form.service';

@Component({
  selector: 'app-labels',
  templateUrl: './labels.component.html',
  styleUrls: ['./labels.component.scss']
})
export class LabelsComponent implements OnInit {

    label: Label = this.resetLabel();
    selectLabel: Label = this.resetLabel();

    labelList;

    @ViewChild('labelModal') labelModal;

    event: string;

    private resetForm = this.formService.resetForm;

    constructor(private labelService: LabelService, private tostr: ToastrService, private formService: FormService) { }

    ngOnInit() {
        this.setList();
    }

    addLabel(labelForm: NgForm): void {
        if (this.selectLabel.$key == null) {
            this.labelService.add(this.selectLabel);
        } else {
            this.labelService.update(this.selectLabel);
        }
        this.resetForm(labelForm, this.labelModal);
        this.tostr.success('Success');
    }

    readLabel(label): void {
        this.selectLabel = {
            $key: label.$key,
            name: label.name,
            color: label.color
        };
        this.openPopup('edit-book', label);
    }

    deleteLabel(key: string): void {
        this.labelService.delete(key);
        this.resetLabel();
        this.labelModal.hide();
    }

    resetLabel(): Label {
        return {
            $key: null,
            name: '',
            color: ''
        };
    }

    openPopup(event: string, label: Label): void {
        this.event = event;
        this.label = label;
        this.labelModal.show();
    }

    setList(): void {
        this.labelService.getConectToList().snapshotChanges().subscribe(item => {
            this.labelList = [];
            item.forEach(element => {
                const label = element.payload.toJSON();
                label['$key'] = element.key;
                this.labelList.push(label as Label);
            });
        });
    }
}
