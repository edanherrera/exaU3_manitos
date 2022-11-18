import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Reservation } from '../models/reservation';
import { ReservationService } from '../services/reservation.service';

@Component({
  selector: 'app-view-reservation',
  templateUrl: './view-reservation.page.html',
  styleUrls: ['./view-reservation.page.scss'],
})

export class ViewReservationPage implements OnInit {
  private reservations :Reservation[] = [];
  public reservation : Reservation = {name:'a',phone:0,fIn:new Date(),fOut:new Date(),room:"",Token:""};

  
  constructor(private route: ActivatedRoute,private reservationService:ReservationService) { 
    this.route.queryParams.subscribe(async (params) => {
      this.reservations = this.reservationService.getReservation();
      for(let i=0;i<this.reservations.length;i++){
        if(this.reservations[i].Token==params['id']){
          this.reservation.name = this.reservations[i].name
          this.reservation.phone = this.reservations[i].phone
          this.reservation.fIn = this.reservations[i].fIn
          this.reservation.fOut = this.reservations[i].fOut
          this.reservation.room = this.reservations[i].room
          this.reservation.Token = this.reservations[i].Token
        }
      }
    });  
  }
  
  ngOnInit() {
  }
  
}
