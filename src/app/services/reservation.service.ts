import { Injectable } from '@angular/core';
import { Reservation } from '../models/reservation';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  private reservation : Reservation[] = [];
  private codeRooms = [4444,3333,2222,1111];
  constructor() {
    this.reservation=[
      {
        'name' : 'Eduardo Herrera',
        'phone' : 352113938685,
        'fIn' : new Date(),
        'fOut' : new Date(),
        'room' : '123456',
      },
      {
        'name' : 'Prueba',
        'phone' : 31,
        'fIn' : new Date(),
        'fOut' : new Date(),
        'room' : 'clienteprueba',
      }
    ]
  }
  
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
  public getCodeRoom():number[]{
    return this.codeRooms;
  }
}
