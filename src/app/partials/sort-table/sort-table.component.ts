import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import * as _ from 'lodash';

@Component({
    selector: 'app-sort-table',
    templateUrl: './sort-table.component.html',
    styleUrls: ['./sort-table.component.scss']
})
export class SortTableComponent implements OnInit {

    @Input() list;
    @Input() field;
    @Output() listOutput = new EventEmitter();

    sortIndex: number;
    private defaultList;

    constructor() {
    }

    ngOnInit() {
        this.sortIndex = -1;
        this.defaultList = this.list;
    }

    sort(): void {
        let sortList = this.list;
        if (this.sortIndex === -1) {
            sortList = this.ascSortByField(this.list);
        } else if (this.sortIndex === 0) {
            sortList = this.descSortByField(this.list);
        } else {
            sortList = this.defaultList;
        }
        this.sortIndex = this.sortIndex === 1 ? -1 : this.sortIndex + 1;
        this.listOutput.emit(sortList);
    }

    private ascSortByField(list): any {
        return _.sortBy(list, item => {
            return item[this.field];
        });
    }
    private descSortByField(list): any {
        return _.reverse(list);
    }

}
