import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap/datepicker/datepicker.module';

export class DatepickerUtil {
  public static toNgbDate (date: Date): NgbDateStruct {
    return date && {
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      day: date.getDate(),
    };
  }

  public static toDate (ngbDate: NgbDateStruct): Date {
    return ngbDate && new Date(ngbDate.year, ngbDate.month - 1, ngbDate.day);
  }

  public static compare (date1: NgbDateStruct, date2: NgbDateStruct) {
    if (date1.year > date2.year) {
      return 1;
    }

    if (date1.year < date2.year) {
      return -1;
    }

    if (date1.month > date2.month) {
      return 1;
    }

    if (date1.month < date2.month) {
      return -1;
    }

    return date1.day - date2.day;
  }
}
