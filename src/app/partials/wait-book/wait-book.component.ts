import { Component, OnInit, Input } from '@angular/core';
import { AuthorizeService } from '../../services/authorize.service';
import { ToastrService } from 'ngx-toastr';
import {WaitBookService} from '../../services/wait-book.service';
import {WaitBook} from '../../models/reserveBook';
import * as _ from 'lodash';


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

    constructor(private authorizeService: AuthorizeService, private toast: ToastrService, private waitBookService: WaitBookService) {
    }

    ngOnInit() {
        this.setReservation();
    }

    reserveBook(): void {
        this.waitBookService.add({
            $key: null,
            book: this.book,
            user: this.user.id || this.authorizeService.getUser().id
        });
        this.toast.success('You add-book ' + this.book.name + ' to waiting book-list!');
        console.log('reserve');
    }

    private setReservation(): void {
        this.waitBookService.getConectToList().snapshotChanges().subscribe(item => {
            this.reservations = [];
            item.forEach(element => {
                const reservation = element.payload.toJSON();
                reservation['$key'] = element.key;
                this.reservations.push(reservation as WaitBook);
            });
        });
    }

    findReservation(): boolean {
        let find = false;
        this.user = this.user || this.authorizeService.getUser();
        _.map(this.reservations, reservation => {
            if (reservation.user === this.user.id && reservation.book.id === (this.book['$key'] || this.book.id)) {
                find = true;
            }
            return reservation;
        });
        return find;
    }

    deleteReservation(): void {
        this.waitBookService.getConectToList().snapshotChanges().subscribe(item => {
            item.forEach(element => {
                const reservation: any = element.payload.toJSON();
                reservation['$key'] = element.key;
                if (reservation.user === this.user.id && reservation.book.id === (this.book['$key'] || this.book.id)) {
                    console.log('delete');
                    this.waitBookService.delete(reservation['$key']);
                }
            });
        });
    }
}
