import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Event } from '../../../../shared/interface/event';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { CustomErrorStateMatcher } from '../../../../shared/class/custom_error-state-matcher';
import { HelperService } from '../../../../services/helper.service';

@Component({
  selector: 'app-new-event',
  templateUrl: './new-event.component.html',
  styleUrls: ['./new-event.component.css'],
})
export class NewEventComponent implements OnInit {
  newEvent = new FormGroup({
    display: new FormControl('', [
      Validators.maxLength(30),
      Validators.required,
    ]),
    city: new FormControl('', Validators.required),
    date: new FormControl('', Validators.required),
    hour: new FormControl('', [
      Validators.required,
      Validators.min(1),
      Validators.max(23),
    ]),
    min: new FormControl('', [
      Validators.required,
      Validators.min(1),
      Validators.max(59),
    ]),
    color: new FormControl('', Validators.required),
  });
  colors = ['red', 'blue', 'yellow', 'green', 'orange', 'black', 'purple'];
  matcher = new CustomErrorStateMatcher();
  constructor(
    public dialogRef: MatDialogRef<NewEventComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Event,
    public helper: HelperService
  ) {}

  ngOnInit(): void {}
  onNoClick(): void {
    this.dialogRef.close();
  }

  submit() {
    this.helper.eventSubject$.next(<Event>this.newEvent.getRawValue());
    this.dialogRef.close();
  }
}
