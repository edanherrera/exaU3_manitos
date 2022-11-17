import { Injectable } from '@angular/core';
import { Reservation } from '../models/reservation';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  private reservation : Reservation[] = [];
  constructor() { }
  
  public addReservation(newReservation:Reservation){
    console.log("Dato a agregar: "+ newReservation);
    this.reservation.push(newReservation);
  }

  public getReservation():Reservation[]{
    return this.reservation;
  }

  public deleteReservation(pos:number){
    this.reservation.splice(pos,1);
  }
}
