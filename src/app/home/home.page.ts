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
  dateToday = new Date().toISOString();
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
      console.log("Fecha entrada: "+result.fIn);
      console.log("Fecha Hoy:" + this.dateToday);
      
      var Fecha_aux1 = result.fIn.toString().split("T");
      var Fecha_aux1_1 = result.fIn.toString().split("T");
      var Fecha_aux2 = this.dateToday.split("T");
      var fec1 = Fecha_aux1[0].split("-");
      var fec1_1 = Fecha_aux1_1[0].split("-");
      var fec2 = Fecha_aux2[0].split("-");
      console.log("Auxiliar 1: "+ fec1[0]+"-"+fec1[1]+"-"+fec1[2]);
      console.log("Auxiliar 2: "+ fec2[0]+"-"+fec2[1]+"-"+fec2[2]);
      var Fecha1 = new Date(parseInt(fec2[0]),parseInt(fec2[1])-1,parseInt(fec2[2]));
      var Fecha2 = new Date(parseInt(fec1[0]),parseInt(fec1[1])-1,parseInt(fec1[2]));
      var Fecha2_2 = new Date(parseInt(fec1_1[0]),parseInt(fec1_1[1])-1,parseInt(fec1_1[2]));
      console.log("Fecha 1 perrona: "+Fecha1);
      console.log("Fecha 2 perrona: "+Fecha2);
      
      if(result.Token?.includes('Hab')){
        //523112609614
        if(Fecha2<=Fecha1 || Fecha2<=Fecha2_2){
          console.log('Fecha iguanita');
          console.log('Ingresado con éxito Huesped '+result.Token);
          this.reservationService.setCurrentUser(result.Token)
          this.message='Ingreso con éxito';
          return this.goHomeH();
          
        }else{
          this.message='Aún no está en fecha para su ingreso'
        }
        
        
      }else{
        
          console.log('Fecha iguanita');
          console.log('Ingresado con éxito Admin '+result.Token);
          this.message='Ingreso con éxito';
          return this.goHome();
          
        
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
