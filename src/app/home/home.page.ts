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
    var result = this.reservations.find(({Token})=> Token === this.reservation.Token)
    if(!(result==null)){
      if(result.Token?.includes('Hab')){
        console.log('Ingresado con éxito Huesped '+result.Token);
          return this.goHomeH();
        }else{
          console.log('Ingresado con éxito Admin '+result.Token);
          return this.goHome();
        }
    }else{
      console.log("Usuario  o Contraseña incorrectos ");
    }
  }
  public goHome(){
    
    this.router.navigate(['/reservations']);
  }
  public goHomeH(){
    
    this.router.navigate(['/client']);
  }
}
