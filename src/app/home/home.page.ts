import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Reservation } from '../models/reservation';
import { ReservationService } from '../services/reservation.service';
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  reservations:Reservation[];
  reservation:Reservation;
  dateToday = new Date();
  message = '';
  constructor(private reservationService:ReservationService,private router: Router, private alertController: AlertController) {
    this.reservations = reservationService.getReservation();
    this.reservation={
      'name' : '',
      'phone' : 0,
      'fIn' : new Date(),
      'fOut' : new Date(),
      'room' : '',
      'Token':'',
    }
  }
  
  public ingresar(){
    var result = this.reservations.find(({Token})=> Token === this.reservation.Token)
    if(!(result==null)){


      if(result.Token?.includes('Hab')){
        
        //if(result.fIn.getDate()>this.dateToday.getDate()){
          console.log('Fecha iguanita');
          console.log('Ingresado con éxito Huesped '+result.Token);
          this.reservationService.setCurrentUser(result.Token)
          this.message='Ingreso con éxito';
          return this.goHomeH();

        //}else{
          //this.message='Aún no está en fecha para su ingreso'
        //}


      }else{
        //if(result.fIn.getDate()==this.dateToday.getDate()){
          console.log('Fecha iguanita');
          console.log('Ingresado con éxito Admin '+result.Token);
          this.message='Ingreso con éxito';
          return this.goHome();

        //}else{this.message='Aún no está en fecha para su ingreso';}
      }
    }else{
      console.log("Usuario  o Contraseña incorrectos ");
      this.message='Token incorrecto';
    }
  }

  public goHome(){
    
    this.router.navigate(['/reservations']);
  }
  public goHomeH(){
    
    this.router.navigate(['/client']);
  }
  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Alert',
      subHeader: 'Importante',
      message: this.message,
      buttons: ['OK'],
    });

    await alert.present();
  }
}
