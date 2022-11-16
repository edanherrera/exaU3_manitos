import { Component, OnInit } from '@angular/core';
import { format } from 'path';
import { ReservationService } from '../services/reservation.service';
import { Reservation } from '../models/reservation';

@Component({
  selector: 'app-new-reservacion',
  templateUrl: './new-reservacion.page.html',
  styleUrls: ['./new-reservacion.page.scss'],
})
export class NewReservacionPage implements OnInit {
  showPickerIn = false;
  showPickerOut = false;
  dateInValue = "";
  dateOutValue = "";
  dateInLimit = "";
  dateOutLimit = "";
  dateToday = this.formatDate(new Date());
  dateTomorrow = new Date();
  rooms = ['Hab1','Hab2','Hab3','Hab3']
  reservations:Reservation;
  constructor( private reservationService : ReservationService) {
    this.dateTomorrow.setDate(this.dateTomorrow.getDate()+1)
    this.reservations={
      'name' : '',
      'phone' : 0,
      'fIn' : new Date(),
      'fOut' : new Date(),
      'room' : '',
    }
    
  }

  ngOnInit() {
    var date = this.dateToday.split(' ');
    this.dateInLimit = date[0];
    console.log(this.dateInLimit);
    this.dateOutLimit = this.formatDate(this.dateTomorrow)
    date = this.dateOutLimit.split(' ');
    this.dateOutLimit = date[0];
    console.log(this.dateOutLimit);
    this.dateInValue = this.dateInLimit;
    this.dateOutValue = this.dateOutLimit;
  }

  dateChangedIn(value:any){
    var fecha=value.split('T',1);
    this.dateInValue = fecha[0];
    console.log(this.dateInValue);
    this.showPickerIn = false;
  }
  dateChangedOut(value:any){
    var fecha=value.split('T',1);
    this.dateOutValue = fecha[0];
    console.log(this.dateOutValue);
    this.showPickerOut = false;
  }
  public padTo2Digits(num: number) {
    return num.toString().padStart(2, '0');
  }
  formatDate(date: Date) {
    return (
      [
        date.getFullYear(),
        this.padTo2Digits(date.getMonth() + 1),
        this.padTo2Digits(date.getDate()),
      ].join('-') +
      ' ' +
      [
        this.padTo2Digits(date.getHours()),
        this.padTo2Digits(date.getMinutes()),
        this.padTo2Digits(date.getSeconds()),
      ].join(':')
    );
  }
  public addReservation(){
    this.reservationService.addReservation(this.reservations);
    console.log(this.reservations);
    this.reservations={
      'name' : '',
      'phone' : 0,
      'fIn' : new Date(),
      'fOut' : new Date(),
      'room' : '',
    }
  }
}
