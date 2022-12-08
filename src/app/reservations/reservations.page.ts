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
    this.reservationService.getReservation().subscribe(res => {
      this.reservation=res
      console.log("Las reservaciones: "+this.reservation)
    });
  }

  ngOnInit() {
  }

  public removeReservation(pos:number){
    this.reservationService.deleteReservation(pos);
    this.reservationService.getReservation().subscribe(res => {
      this.reservation
    });
  }

  public goNewReservation(){
    this.router.navigate(['/new-reservacion']);
  }
  public watchReservation (token: any){
    console.log("Las reservaciones: "+this.reservation)
    this.router.navigate(['/view-reservation'], {
      queryParams: { id: token  },
    });
  }
}
