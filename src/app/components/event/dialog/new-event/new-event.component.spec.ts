import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import {
  MatDialogModule,
  MAT_DIALOG_DATA,
  MatDialogRef,
} from '@angular/material/dialog';
import { NewEventComponent } from './new-event.component';
import { of } from 'rxjs';

describe('NewEventComponent', () => {
  let component: NewEventComponent;
  let fixture: ComponentFixture<NewEventComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NewEventComponent],
      imports: [HttpClientModule, MatDialogModule],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: {} },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('new Event',()=>{


    it('should call the close event',()=>{
      component.dialogRef = jasmine.createSpyObj({ afterClosed : of({}), close: null });
      component.submit();
      expect(component.dialogRef.close).toHaveBeenCalled();
    });

    it('should call the close event on cancel',()=>{
      component.dialogRef = jasmine.createSpyObj({ afterClosed : of({}), close: null });
      component.onNoClick();
      expect(component.dialogRef.close).toHaveBeenCalled();
    });


  });
});
