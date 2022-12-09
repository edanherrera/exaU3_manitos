import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Reservation } from '../models/reservation';
import { ReservationService } from '../services/reservation.service';
import { AlertController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/compat/auth';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  reservations:Reservation[] = [];
  reservation:Reservation;
  dateToday = new Date().toISOString();
  message = '';
  constructor(private reservationService:ReservationService,private router: Router, private alertController: AlertController,private auth:AngularFireAuth) {
    this.reservation={
      'name' : '',
      'phone' : 0,
      'fIn' : new Date(),
      'fOut' : new Date(),
      'room' : '',
      'Token':'',
    }
    this.reservationService.getReservation().subscribe(res => {
      this.reservations = res
    });
    
    
  }
  
  async ingresar(){
    if(this.reservation.Token == 'admin'){
      this.router.navigate(['reservations'])
      return
    }
    if(this.reservation.Token!=null){
      var login = await this.reservationService.login(this.reservation.Token!,this.reservation.Token!)
      if(login!=null){
        let result = this.reservations.find(({Token})=> Token === this.reservation.Token)
        this.loginFun(result as Reservation)
      }else{
        console.log("Usuario  o Contraseña incorrectos ");
        this.message='Token incorrecto';
      }
    }else{
      this.message='Token vacio';
    }
    
  }

  public goHome(){
    
    this.router.navigate(['/reservations']);
  }

  public goHomeH(id : any){
    this.router.navigate(['/client/ingreso'],{
      queryParams: { id: id },
    });
  }

  async presentAlert() {
    if(this.reservation.Token == 'admin'){
      return
    }
    const alert = await this.alertController.create({
      header: 'Alert',
      subHeader: 'Importante',
      message: this.message,
      buttons: ['OK'],
    });
    
    await alert.present();
  }
  
  private loginFun(result:Reservation){
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
      
      if(result.Token?.includes('hab')){
        //523112609614
        if(Fecha2<=Fecha1 || Fecha2_2<=Fecha1){
          console.log('Fecha iguanita');
          console.log('Ingresado con éxito Huesped '+result.Token);
          this.message='Ingreso con éxito';
          return this.goHomeH(result.id);
          
        }else{
          this.message='Aún no está en fecha para su ingreso'
        }
        
        
      }else{
          console.log('Fecha iguanita');
          console.log('Ingresado con éxito Admin '+result.Token);
          this.message='Ingreso con éxito';
          return this.goHome();
      }
      }
  }
}
