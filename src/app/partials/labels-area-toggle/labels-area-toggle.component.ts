import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Label } from '../../models/label';
import * as _ from 'lodash';
import {HelperService} from '../../services/helper.service';

@Component({
  selector: 'app-labels-area-toggle',
  templateUrl: './labels-area-toggle.component.html',
  styleUrls: ['./labels-area-toggle.component.scss']
})
export class LabelsAreaToggleComponent implements OnInit {

    @Input() title;
    @Input() labels;
    @Input() activeLabels;
    @Output() active = new EventEmitter();

    labelTitle: string = null;
    componentLabels = {
        active: [],
        all: []
    };

    constructor(private helperService: HelperService) { }

    ngOnInit() {
        this.labelTitle = this.title;
        this.subscribeAllLabels();
    }

    toggleLabelsInArray(arrayFrom, arrayTo, item): void {
        const index = arrayFrom.indexOf(item);
        if (index > -1) {
            arrayFrom.splice(index, 1);
            arrayTo.push({
                name: item.name,
                color: item.color
            });
        }
        this.active.emit(this.componentLabels.active);
    }

    private subscribeAllLabels(): void {
        this.labels.subscribe(labels => {
            this.activeLabels = this.helperService.objectToArray(this.activeLabels);
            this.componentLabels.active = this.activeLabels;
            this.componentLabels.all = this.activeLabels.length > 0 ? _.intersection(labels, this.activeLabels) : labels as Label[];

        });
    }
}
