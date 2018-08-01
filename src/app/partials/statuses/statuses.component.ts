import { Component, OnInit, ViewChild } from '@angular/core';
import {Status} from '../../models/status';
import {NgForm} from '@angular/forms';
import {FormService} from '../../services/form.service';
import {ToastrService} from 'ngx-toastr';
import {StatusService} from '../../services/status.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-statuses',
  templateUrl: './statuses.component.html',
  styleUrls: ['./statuses.component.scss']
})
export class StatusesComponent implements OnInit {

    status: Status = this.resetStatus();
    selectStatus: Status = this.resetStatus();

    statusList;

    @ViewChild('statusModal') statusModal;

    event: string;

    resetForm = this.formService.resetForm;

    constructor(private statusService: StatusService, private tostr: ToastrService, private formService: FormService) { }

    ngOnInit() {
        this.setList();
    }

    addStatus(statusForm: NgForm): void {
        if (this.selectStatus.$key == null) {
            this.statusService.add(this.selectStatus);
        } else {
            this.statusService.update(this.selectStatus);
        }
        this.resetForm(statusForm, this.statusModal);
        this.tostr.success('Success');
    }

    readStatus(status): void {
        this.selectStatus = {
            $key: status.$key,
            name: status.name,
            color: status.color
        };
        this.openPopup('edit-book', status);
    }

    deleteStatus(key: string): void {
        this.statusService.delete(key);
        this.resetStatus();
        this.statusModal.hide();
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
        };
    }

    setList(): void {
        this.statusService.getConectToList().snapshotChanges().subscribe(item => {
            this.statusList = [];
            item.forEach(element => {
                const status = element.payload.toJSON();
                status['$key'] = element.key;
                this.statusList.push(status as Status);
            });
        });
    }
}
