import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Reservation } from '../models/reservation';
import { ReservationService } from '../services/reservation.service';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  reservations:Reservation[];
  reservation:Reservation;

  constructor(private reservationService:ReservationService,private router: Router) {
    this.reservations = reservationService.getReservation();
    this.reservation={
      'name' : '',
      'phone' : 0,
      'fIn' : new Date(),
      'fOut' : new Date(),
      'room' : '',
      'Token':'',
    }
  }
  public ingresar(){
    
    for (let i = 0; i < this.reservations.length; i++) {
      if(this.reservations[i].Token == this.reservation.Token ){
        console.log('Ingresado con éxito');
        this.goHome();
      }else{
        console.log('Token: '+this.reservations[i].Token);
        console.log("Usuario  o Contraseña incorrectos");
      }
    }
  }
  public goHome(){
    this.router.navigate(['/reservations']);
  }
}
