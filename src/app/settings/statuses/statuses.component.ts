import { Component, OnInit, ViewChild } from '@angular/core';
import {Status} from "../../models/status";
import {NgForm} from "@angular/forms";
import {FormService} from "../../services/form.service";
import {ToastrService} from "ngx-toastr";
import {StatusService} from "../../services/status.service";

@Component({
  selector: 'app-statuses',
  templateUrl: './statuses.component.html',
  styleUrls: ['./statuses.component.scss']
})
export class StatusesComponent implements OnInit {

    status: Status = this.resetStatus();

    statusList: Status[];

    @ViewChild('statusModal') statusModal;

    event: string;

    resetForm = this.formService.resetForm;

    constructor(private statusService: StatusService, private tostr: ToastrService, private formService: FormService) { }

    ngOnInit() {
        this.statusList = this.statusService.getList();
    }

    addStatus(statusForm: NgForm): void {
        if (this.status.$key == null) {
            this.statusService.add(this.status);
        } else {
            this.statusService.update(this.status);
        }
        this.resetForm(statusForm, this.statusModal);
        this.tostr.success('Success');
        this.statusList = this.statusService.getList();
    }

    readstatus(status): void {
        this.status = {
            $key: status.$key,
            name: status.name,
            color: status.color
        };
        this.openPopup('edit', status);
    }

    deleteStatus(key: string): void {
        this.statusService.delete(key);
        this.resetStatus();
        this.statusModal.hide();
        this.statusList = this.statusService.getList();
    }

    openPopup(event: string, status: Status): void {
        this.event = event;
        this.status = status;
        this.statusModal.show();
    }

    resetStatus(): Status {
        return {
            $key: null,
            name: '',
            color: ''
        }
    }

}