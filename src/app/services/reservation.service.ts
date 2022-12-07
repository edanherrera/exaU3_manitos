import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map } from 'rxjs';
import { Reservation } from '../models/reservation';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  private reservation : Reservation[] = [];
  private currentUser = ""
  private codeRooms = [4444,3333,2222,1111];
  constructor(private firestore: AngularFirestore) {
    this.reservation=[
      {
        'name' : 'Eduardo Herrera',
        'phone' : 352113938685,
        'fIn' : new Date(),
        'fOut' : new Date(),
        'room' : '',
        'Token': '123456',
        'ant':100,
        'price':500
      },
      {
        'name' : 'Prueba',
        'phone' : 31,
        'fIn' : new Date(),
        'fOut' : new Date(),
        'room' : 'Hab4',
        'Token': 'clientHab4prueba',
        'ant': 0,
        'price':500
      }
    ]
  }
  
  public addReservation(newReservation:Reservation){
    this.firestore.collection('reservations').add(newReservation);
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
  public getReservation(){
    return this.firestore.collection('reservations').snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as Reservation;
          const id = a.payload.doc.id;
          return {id,...data};
        });
      }));
  }
  
  public getReservationById(id:string){
    return this.firestore.collection('reservations').doc(id).valueChanges();
  }

  public deleteReservation(pos:number){
    this.reservation.splice(pos,1);
  }
  public getCodeRoom():number[]{
    return this.codeRooms;
  }

  public getReservationByToken(token: string): Reservation{
    let item: Reservation = this.reservation.find((res)=> {
      return res.Token===token;
    })!;
    return item;
  }
}
