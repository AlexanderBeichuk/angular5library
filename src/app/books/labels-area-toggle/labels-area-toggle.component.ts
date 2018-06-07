import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {Label} from "../../models/label";

@Component({
  selector: 'app-labels-area-toggle',
  templateUrl: './labels-area-toggle.component.html',
  styleUrls: ['./labels-area-toggle.component.scss']
})
export class LabelsAreaToggleComponent implements OnInit {

    @Input() title;
    @Input() labels;
    @Output() active = new EventEmitter();

    labelTitle: string = null;
    componentLabels = {
        active: [],
        all: []
    };

    constructor() { }

    ngOnInit() {
        this.labelTitle = this.title;
        this.labels.subscribe(labels => {
            this.componentLabels.all = labels as Label[];
        });
        console.log(this.componentLabels);
    }

    toggleLabelsInArray(arrayFrom, arrayTo, item): void {
        let index = arrayFrom.indexOf(item);
        if (index > -1) {
            arrayFrom.splice(index, 1);
            arrayTo.push({
                name: item.name,
                color: item.color
            });
        }
        this.active.emit(this.componentLabels.active);
    }

}
