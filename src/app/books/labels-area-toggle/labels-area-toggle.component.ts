import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

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
        this.componentLabels.all = this.labels;
        console.log(this.labelTitle, '  ', this.componentLabels.all);
    }

    toggleLabelsInArray(arrayFrom, arrayTo, item): void {
        var index = arrayFrom.indexOf(item);
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
