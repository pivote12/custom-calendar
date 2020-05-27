import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { AbstractCalendar } from '../../shared/class/abstract-calendar';
import { HelperService } from '../../services/helper.service';
import { MatDialog } from '@angular/material/dialog';
import { EditEventComponent } from '../event/dialog/edit-event/edit-event.component';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
})
export class CalendarComponent extends AbstractCalendar implements OnInit {
  constructor(public helper: HelperService, public dialog: MatDialog,public httpClient: HttpClient) {
    super(httpClient);

    this.helper.eventSusb.subscribe((val) => {
      if (val.id != undefined) {
        if (val.delete) {
          this.delete(val.id);
        } else {
          this.events[val.id] = val;
        }
      } else {
        val.id = '' + this.events.length;
        this.events.push(val);
      }
      this.start();
    });
  }

  ngOnInit(): void {
    this.start();
  }

  start() {
    this.selected = this.removeTime(moment());
    this.month = this.selected.clone();
    let start = this.selected.clone();
    start.date(1);
    this.removeTime(start.day(0));
    this.buildMonth(start, this.month);
  }

  prev() {
    this.previous();
  }
  forward() {
    this.next();
  }

  selection(day) {
    this.select(day);
  }

  edit(event) {
    const dialogRef = this.dialog.open(EditEventComponent, {
      width: '300px',
      data: event,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }
}
