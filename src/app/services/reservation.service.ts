import { Injectable } from '@angular/core';
import { Reservation } from '../models/reservation';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  private reservation : Reservation[] = [];
  constructor() { }
  
  public addReservation(newReservation:Reservation){
    this.reservation.push(newReservation);
  }
}
