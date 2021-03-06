import {Component, OnInit, Input} from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import {WaitBookService} from '../../services/wait-book.service';
import {WaitBook} from '../../models/reserveBook';
import * as _ from 'lodash';
import {EventService} from '../../services/event.service';
import {Event} from '../../models/event';


@Component({
    selector: 'app-wait-book',
    templateUrl: './wait-book.component.html',
    styleUrls: ['./wait-book.component.scss']
})
export class WaitBookComponent implements OnInit {

    @Input() book;
    @Input() taken;
    @Input() user;

    reservations: WaitBook[];

    constructor(private toast: ToastrService, private waitBookService: WaitBookService, private eventService: EventService) {
    }

    ngOnInit() {
        this.setReservation();
    }

    reserveBook(): void {
        this.waitBookService.add({
            $key: null,
            book: this.book,
            user: this.user.id
        });
        this.toast.success('You add ' + this.book.name + ' to waiting list!');
        this.eventService.add(new Event(
            this.user.id,
            `reserved ${this.book.name}`,
            new Date().toString()
        ));
    }

    private setReservation(): void {
        this.waitBookService.getConnectToList().snapshotChanges().subscribe(item => {
            this.reservations = [];
            item.forEach(element => {
                const reservation = element.payload.toJSON();
                reservation['$key'] = element.key;
                this.reservations.push(reservation as WaitBook);
            });
        });
    }

    findReservation(): boolean {
        return _.find(this.reservations, reservation => {
            return reservation.book.id === (this.book['$key'] || this.book.id) && reservation.user === this.user.id;
        });
    }

    getCountReservationByBook(): any[] {
        const filterByBook = _.filter(this.reservations, reservation => {
            return reservation.book.id === (this.book['$key'] || this.book.id);
        });
        return _.findIndex(filterByBook, reservation => {
            return reservation.user === this.user.id;
        }) + 1 || filterByBook.length;
    }

    deleteReservation(): void {
        this.waitBookService.getConnectToList().snapshotChanges().subscribe(item => {
            item.forEach(element => {
                const reservation: any = element.payload.toJSON();
                reservation['$key'] = element.key;
                if (reservation.user === this.user.id && reservation.book.id === (this.book['$key'] || this.book.id)) {
                    this.waitBookService.delete(reservation['$key']);
                    this.eventService.add(new Event(
                        this.user.id,
                        `canceled reservarvation on ${this.book.name}`,
                        new Date().toString()
                    ));
                }
            });
        });
    }
}
