import { Component, OnInit } from '@angular/core';
import { ReservationService } from '../services/reservation.service';
import { Reservation } from '../models/reservation';

@Component({
  selector: 'app-new-reservacion',
  templateUrl: './new-reservacion.page.html',
  styleUrls: ['./new-reservacion.page.scss'],
})
export class NewReservacionPage implements OnInit {
  // ! Variables
  showPickerIn = false;
  showPickerOut = false;
  showToken = false;
  dateInValue = '';
  dateOutValue = '';
  dateInLimit = '';
  dateOutLimit = '';
  dateToday = this.formatDate(new Date());
  dateTomorrow = new Date();
  rooms = ['Hab1','Hab2','Hab3','Hab3']
  reservations:Reservation;
  Token = '';
  wNumber : string=''
  url:string="";
  // ! Constructor
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
  
  // ! ngOnInit
  ngOnInit() {
    var date = this.dateToday.split(' ');
    this.dateInLimit = date[0];
    this.dateOutLimit = this.formatDate(this.dateTomorrow)
    date = this.dateOutLimit.split(' ');
    this.dateOutLimit = date[0];
    this.dateInValue = this.dateInLimit;
    this.dateOutValue = this.dateOutLimit;
  }
  // ! If a date change is detected Input
  dateChangedIn(value:any){
    var fecha=value.split('T',1);
    this.dateInValue = fecha[0];
    console.log(this.dateInValue);
    this.showPickerIn = false;
  }
  
  // ! If a date change is detected Output
  dateChangedOut(value:any){
    var fecha=value.split('T',1);
    this.dateOutValue = fecha[0];
    console.log(this.dateOutValue);
    this.showPickerOut = false;
  }
  
  // ! Fill in the date to make a two-digit number (1 -> 01)
  public padTo2Digits(num: number) {
    return num.toString().padStart(2, '0');
  }
  
  // ! make format the date and time
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
    
    // ! Add new reservation in the service 523111310011
    public addReservation(){
      this.reservationService.addReservation(this.reservations);
      console.log(this.reservations);
      this.gToken();
      this.wNumber=this.reservations.phone.toString();
      this.url="whatsapp://send?phone="+this.wNumber+"&text="+"Sr(a). "+this.reservations.name +" el token para ingresar a su habitación es: "+"*"+this.Token+"*";
      console.log('Token: ' + this.Token);
      console.log(this.url);
      //this.Token='';
      this.reservations={
        'name' : '',
        'phone' : 0,
        'fIn' : new Date(),
        'fOut' : new Date(),
        'room' : '',
      }
      this.showToken = true;
    }
    
    public getUrl():string{
      //this.showToken = false;
      return this.url;
    }

    // ! Generate Token for guests
    public gToken():string{
      let min = Math.ceil(Math.random()*10000);
      let max = Math.floor(Math.random()*10000);
      return this.Token = (this.reservations.name.substring(0,3)+ 
      this.reservations.phone.toString().substring(5,8) 
      + this.reservations.room  
      + Math.floor(Math.random() * (max - min + 1) + min).toString());
    }
}