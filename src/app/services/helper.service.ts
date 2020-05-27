import { Injectable } from '@angular/core';
import {  Subject } from 'rxjs';
import { Event } from '../shared/interface/event';

@Injectable({
  providedIn: 'root',
})
export class HelperService {
  eventSubject$ = new Subject<Event>();
  readonly eventSusb = this.eventSubject$.asObservable();
  constructor() {
    
  }
}
