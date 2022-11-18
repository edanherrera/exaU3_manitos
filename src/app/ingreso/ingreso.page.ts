import { Component, OnInit } from '@angular/core';
import { ReservationService } from '../services/reservation.service';

@Component({
  selector: 'app-ingreso',
  templateUrl: './ingreso.page.html',
  styleUrls: ['./ingreso.page.scss'],
})
export class IngresoPage implements OnInit {
  private token=null
  private user = ""
  constructor(private reservation:ReservationService) { 
    this.user = reservation.getCurrentUser()
  }

  ngOnInit() {
  }

  safePass(){
    let hab = this.user.substring(9,10)
    let password = this.reservation.getcode(Number(hab)-1)
    return password
  }
}
