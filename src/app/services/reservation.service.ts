import { Injectable } from '@angular/core';
import { Reservation } from '../models/reservation';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  private reservation : Reservation[] = [];
  private currentUser = ""
  private codeRooms = [4444,3333,2222,1111];
  constructor() {
    this.reservation=[
      {
        'name' : 'Eduardo Herrera',
        'phone' : 352113938685,
        'fIn' : new Date(),
        'fOut' : new Date(),
        'room' : '',
        'Token': '123456'
      },
      {
        'name' : 'Prueba',
        'phone' : 31,
        'fIn' : new Date(),
        'fOut' : new Date(),
        'room' : 'Hab4',
        'Token': 'clientHab4prueba'
      }
    ]
  }
  
  public addReservation(newReservation:Reservation){
    console.log("Dato a agregar: "+ newReservation);
    this.reservation.push(newReservation);
  }

  public setCurrentUser(user:string){
    this.currentUser = user
  }

  public getCurrentUser(){
    return this.currentUser
  }
  
  public getcode(index:number){
    return this.codeRooms[index]
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
