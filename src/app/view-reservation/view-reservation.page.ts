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
      this.reservationService.getReservationById(params['id']).subscribe(i => {
        this.reservation = i as Reservation
      })
    });  
  }
  
  ngOnInit() {
  }
  
}
