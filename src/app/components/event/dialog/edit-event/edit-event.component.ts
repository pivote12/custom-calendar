import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CustomErrorStateMatcher } from '../../../../shared/class/custom_error-state-matcher';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HelperService } from '../../../../services/helper.service';
import { Event } from '../../../../shared/interface/event';

@Component({
  selector: 'app-edit-event',
  templateUrl: './edit-event.component.html',
  styleUrls: ['./edit-event.component.css'],
})
export class EditEventComponent implements OnInit {
  edit = new FormGroup({
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
    public dialogRef: MatDialogRef<EditEventComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Event,
    public helper: HelperService
  ) {}

  ngOnInit(): void {
    this.edit.controls.city.setValue(this.data.city);
    this.edit.controls.color.setValue(this.data.color);
    this.edit.controls.date.setValue(this.data.date);
    this.edit.controls.display.setValue(this.data.display);
    this.edit.controls.hour.setValue(this.data["hour"]);
    this.edit.controls.min.setValue(this.data["min"]);
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

  submit() {
    let event = this.data;
    event.city =  this.edit.controls.city.value;
    event.color =  this.edit.controls.color.value;
    event.date =  this.edit.controls.date.value;
    event.display =  this.edit.controls.display.value;
    event["hour"] =  this.edit.controls.hour.value;
    event["min"] =  this.edit.controls.min.value;
    this.helper.eventSubject$.next(event);
    this.dialogRef.close();
  }

  delete(){
    let event = this.data;
    event.delete = true;
    this.helper.eventSubject$.next(event);
    this.dialogRef.close();
  }
}
