import { HttpClient } from '@angular/common/http';

export abstract class AbstractCalendar {
  selected;
  day;
  month;
  weeks;
  events = [];
  constructor(public httpClient: HttpClient) {}

  protected removeTime(date) {
    return date.day(0).hour(0).minute(0).second(0).millisecond(0);
  }

  protected buildMonth(start, month) {
    this.weeks = [];
    var done = false,
      date = start.clone(),
      monthIndex = date.month(),
      count = 0;
    while (!done) {
      this.weeks.push({
        days: this.buildWeek(date.clone(), month),
      });
      date.add(1, 'w');
      done = count++ > 2 && monthIndex !== date.month();
      monthIndex = date.month();
    }
  }
  protected buildWeek(date, month) {
    var days = [];
    for (var i = 0; i < 7; i++) {
      days.push({
        name: date.format('dd').substring(0, 1),
        number: date.date(),
        isCurrentMonth: date.month() === month.month(),
        isToday: date.isSame(new Date(), 'day'),
        date: date,
        event: this.getEvents(date),
        weather:null
      });
      if(days[i].event.length > 0)
      {
        let year = date.subtract(2, 'years').year();
        let month = +date.month() < 10 ? '0'+date.month() : date.month();
        let day = +date.date() < 10 ? '0'+date.date() : date.date();
        let clone = i;
        this.httpClient.get("https://api.meteostat.net/v1/history/daily?station=10637&start="+ year+"-"+month+"-"+ day+"&end="+ year+"-"+month+"-"+ day+"&key=NP9hLuAU").subscribe(res=>{
          days[clone].weather = "rain";
        })
      }
      date = date.clone();
      date.add(1, 'd');
    }
    return days;
  }

  protected next() {
    var next = this.month.clone();
    this.removeTime(next.month(next.month() + 1).date(1));
    this.month.month(this.month.month() + 1);
    this.buildMonth(next, this.month);
  }

  protected previous() {
    var previous = this.month.clone();
    this.removeTime(previous.month(previous.month() - 1).date(1));
    this.month.month(this.month.month() - 1);
    this.buildMonth(previous, this.month);
  }
  protected select(day) {
    this.selected = day.date;
  }
  protected getEvents(date) {
    let event = [];

    for (let index = 0; index < this.events.length; index++) {
      const element = this.events[index];
      if (
        element.date.month() == date.month() &&
        element.date.date() == date.date()
      ) {
        event.push(this.events[index]);
      }
    }
    if (event.length > 1) {
      event.sort((a, b) => {
        if (a.hour > b.hour) {
          return 1;
        } else if ((a.hour = b.hour)) {
          if (a.min > b.min) {
            return 1;
          } else if (a.min < b.min) {
            return -1;
          } else {
            return 0;
          }
        } else if (a.hour < b.hour) {
          return -1;
        }
        return 0;
      });
    }
    return event;
  }
  protected delete(id) {
    for (let index = 0; index < this.events.length; index++) {
      const element = this.events[index];
      if (id == element.id) {
        this.events.splice(index, 1);
      }
    }
  }
}
