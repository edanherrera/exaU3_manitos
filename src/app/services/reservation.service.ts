import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map } from 'rxjs';
import { Reservation } from '../models/reservation';
import { Observable } from 'rxjs';
import {  AngularFireAuth } from '@angular/fire/compat/auth';
import {  Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  private reservation : Reservation[] = [];
  private currentUser = ""
  private codeRooms = [4444,3333,2222,1111];
  constructor(private firestore: AngularFirestore,private auth:AngularFireAuth,
    private router:Router) {
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
  
  async addReservation(newReservation:Reservation,user:string){
   await this.firestore.doc(`reservations/${user}`).set(newReservation)
  console.log(user)
  }

 async createAccount(email:string,password:string){
    try{
      const user = await (await this.auth.createUserWithEmailAndPassword(email+"@gmail.com",password))
      return user
    }catch(e){
      return null;
    }
  }

  async login(email:string,password:string){
    try{
      const user = await (await this.auth.signInWithEmailAndPassword(email+"@gmail.com",password))
      return user
    }catch(e){
      return null;
    }
  }

  public logout(){
    this.auth.signOut()
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
  public getReservation(): Observable<Reservation[]>{
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

  public deleteReservation(id:string){
    this.firestore.collection('reservations').doc(id).delete()
  }
  public getCodeRoom():number[]{
    return this.codeRooms;
  }

  public getReservationByToken(token: string){
    return this.firestore.collection('reservations').doc(token).valueChanges();
  }
}
