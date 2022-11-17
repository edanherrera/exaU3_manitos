import { Component, OnInit } from '@angular/core';
import { ReservationService } from '../services/reservation.service';
import { Reservation } from '../models/reservation';
import { Router } from '@angular/router';
@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.page.html',
  styleUrls: ['./reservations.page.scss'],
})
export class ReservationsPage implements OnInit {

  public reservation : Reservation[] = [];

  constructor(private reservationService:ReservationService, private router:Router) { 
    this.reservation = this.reservationService.getReservation();
  }

  ngOnInit() {
  }

  public removeReservation(pos:number){
    this.reservationService.deleteReservation(pos);
    this.reservation=this.reservationService.getReservation();
  }

  public goNewReservation(){
    this.router.navigate(['/new-reservacion']);
  }
  public watchReservation (){
    
  }
}
