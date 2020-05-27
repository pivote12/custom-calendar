import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { CalendarComponent } from './calendar.component';
import { HelperService } from '../../services/helper.service';
import * as moment from 'moment';
import { Event } from "../../shared/interface/event";


describe('CalendarComponent', () => {
  let component: CalendarComponent;
  let fixture: ComponentFixture<CalendarComponent>;
  let helperService= new HelperService();
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CalendarComponent],
      imports: [MatDialogModule, HttpClientModule],
      providers:[{
        provide:HelperService,useValue: helperService
      }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  fdescribe('new Event',()=>{


    it('should call and create the new event',()=>{

      let event:Event = {
        city: "london",
        display: "this is a test to make sure its works",
        date: ''+moment(),
        color: "red",
      }
      event['hour'] = 12;
      event['min'] = 12;
      helperService.eventSubject$.next(event);
      expect(component.events.length).toBeGreaterThan(0);
    });


  });
});
