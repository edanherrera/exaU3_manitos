import { Component, OnInit } from '@angular/core';
import { ReservationService } from '../services/reservation.service';
import { Reservation } from '../models/reservation';
import { FormGroup,FormBuilder,Validators} from '@angular/forms';
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-new-reservacion',
  templateUrl: './new-reservacion.page.html',
  styleUrls: ['./new-reservacion.page.scss'],
})
export class NewReservacionPage implements OnInit {
  // ! Variables
  public myForm:FormGroup;
  public validationMessages: Object;
  showPickerIn = false;
  showPickerOut = false;
  showToken = false;
  dateInValue = '';
  dateOutValue = '';
  dateInLimit = '';
  dateOutLimit = '';
  dateToday = this.formatDate(new Date());
  dateTomorrow = new Date();
  rooms = ['Hab1','Hab2','Hab3','Hab4'];
  prices = [100,200,300,400];
  reservations:Reservation;
  reservation:Reservation[] = [];
  Token = '';
  wNumber : string=''
  url:string="";
  // ! Constructor
  constructor( private reservationService : ReservationService,private fb:FormBuilder, private alertController:AlertController) {
    console.log('fecha hoy',new Date());
    this.reservationService.getReservation().subscribe(res => {
      this.reservation = res;
    })
    this.dateTomorrow.setDate(this.dateTomorrow.getDate()+1);
    this.reservations={
      'name' : '',
      'phone' : 0,
      'fIn' : new Date(),
      'fOut' : new Date(),
      'room' : '',
      'ant':0,
      'price':0
    }
    this.myForm = this.fb.group({
      'name':["",Validators.required],
      'phone':["",Validators.compose([Validators.required,Validators.minLength(12),Validators.maxLength(12), Validators.pattern('^[0-9]+$')])],
      'fOut':["",Validators.required],
      'fIn':["",Validators.compose([Validators.required,])],
      'room':["",Validators.required],
      'ant':["",Validators.compose([Validators.required])]
    });
    this.validationMessages = {

      'name': [
        {type: 'required', message:"Nombre obligatorio obligatorio"},
      ],

      'phone': [
        {type: 'required', message:"Teléfono obligatorio"},
        {type: 'minlength', message:"Telefono incorrecto 12 carácteres mínimo"},
        {type: 'maxlength', message:"Telefono incorrecto 12 carácteres mínimo"},
      ],

      'fOut': [
        {type: 'required', message: "Fecha obligatoria "},
      ],

      'fIn': [
        {type: 'required', message: "Fecha obligatoria "}
      ],

      'room': [
        {type: 'required', message: "Cuarto obligatorio "},
      ],
      'ant':[
        {type: 'required',message: "Anticipo obligatorio"}
      ]}
    }
    
    // ! ngOnInit
    ngOnInit() {
      var date = this.dateToday.split(' ');
      this.dateInLimit = date[0];
      this.dateOutLimit = this.formatDate(this.dateTomorrow)
      date = this.dateOutLimit.split(' ');
      this.dateOutLimit = date[0];
      this.dateInValue = this.dateInLimit;
      this.dateOutValue = this.dateOutLimit;
    }
    // ! If a date change is detected Input
    dateChangedIn(value:any){
      var fecha=value.split('T',1);
      this.dateInValue = fecha[0];
      console.log(this.dateInValue);
      this.showPickerIn = false;
    }
    
    // ! If a date change is detected Output
    dateChangedOut(value:any){
      var fecha=value.split('T',1);
      this.dateOutValue = fecha[0];
      console.log(this.dateOutValue);
      this.showPickerOut = false;
    }
    
    // ! Fill in the date to make a two-digit number (1 -> 01)
    public padTo2Digits(num: number) {
      return num.toString().padStart(2, '0');
    }
    
    // ! make format the date and time
    formatDate(date: Date) {
      return (
        [
          date.getFullYear(),
          this.padTo2Digits(date.getMonth() + 1),
          this.padTo2Digits(date.getDate()),
        ].join('-') +
        ' ' +
        [
          this.padTo2Digits(date.getHours()),
          this.padTo2Digits(date.getMinutes()),
          this.padTo2Digits(date.getSeconds()),
        ].join(':')
        );
      }

      // ! Add new reservation in the service
      async addReservation(){
        const d1 = new Date(this.reservations.fIn).getTime();
        const d2 = new Date(this.reservations.fOut).getTime();
        var diff = Math.abs(d2 - d1);
        var dias = Math.ceil(diff / (1000 * 60 * 60 * 24));
        console.log('Inicio: ',d1)
        console.log('fin: ',d2)
        console.log('dias: ',dias) 
        if(this.available()){        
        if(this.reservations.room=='Hab1'){this.reservations.price=(this.prices[0]*dias);}
        if(this.reservations.room=='Hab2'){this.reservations.price=(this.prices[1]*dias);}
        if(this.reservations.room=='Hab3'){this.reservations.price=(this.prices[2]*dias);}
        if(this.reservations.room=='Hab4'){this.reservations.price=(this.prices[3]*dias);}
        if(this.reservations.price && this.reservations.ant){
          if(this.reservations.price.valueOf() < this.reservations.ant.valueOf() ){
            this.presentAlert() 
            return
          }
        }
            this.reservations.Token = this.gToken().toLowerCase();
          let createuser = await this.reservationService.createAccount(this.reservations.Token,this.reservations.Token);  
          await this.reservationService.addReservation(this.reservations,createuser?.user?.uid as string);
          this.wNumber=this.reservations.phone.toString();
          this.url="whatsapp://send?phone="+this.wNumber+"&text="+"Sr(a). "+this.reservations.name +" el token para ingresar a su habitación es: "+"*"+this.Token+"*";
          console.log('Token: ' + this.Token);
          //this.Token='';
          this.reservations={
            'name' : '',
            'phone' : 0,
            'fIn' : new Date(),
            'fOut' : new Date(),
            'room' : '',
            'ant': 0,
            'price': 0
          }
          this.showToken = true;   }
          else{
            this.sameHabAlert()
          } 
          await this.reservationService.logout()
      }

      available(){
        // let this.reservation:Reservation[] = []
        // this.reservationService.getReservation().subscribe(res => {
        //   this.reservation = res
        // })
        
        
        for(let i=0;i<this.reservation.length;i++){
          if(this.reservation[i].room==this.reservations.room){
            if(this.reservations.fIn>=this.reservation[i].fIn&&this.reservations.fOut<=this.reservation[i].fOut)return false
            if(this.reservations.fIn<=this.reservation[i].fIn&&this.reservations.fOut<=this.reservation[i].fOut&&this.reservations.fOut>=this.reservation[i].fIn)return false
            if(this.reservations.fIn<=this.reservation[i].fIn&&this.reservations.fOut>=this.reservation[i].fOut)return false
            if(this.reservations.fIn>=this.reservation[i].fIn&&this.reservations.fOut>=this.reservation[i].fOut&&this.reservations.fIn<=this.reservation[i].fOut)return false
          }
        }
        return true
      }
      
      public getUrl():string{
        //this.showToken = false;
        return this.url;
      }
      
      // ! Generate Token for guests
      public gToken():string{
        let min = Math.ceil(Math.random()*10000);
        let max = Math.floor(Math.random()*10000);
        return this.Token = (this.reservations.name.substring(0,3)+ 
        this.reservations.phone.toString().substring(5,8) 
        + this.reservations.room  
        + Math.floor(Math.random() * (max - min + 1) + min).toString());
      }

      async presentAlert() {
        const alert = await this.alertController.create({
          header: 'Atención',
          subHeader: 'Error',
          message: 'El anticipo supera al precio de la habitación',
          buttons: ['OK'],
        });
    
        await alert.present();
      }
      async sameHabAlert() {
        const alert = await this.alertController.create({
          header: 'Atención',
          subHeader: 'Error',
          message: 'La habitacion se encuentra ocupada esa fecha',
          buttons: ['OK'],
        });
    
        await alert.present();
      }
    }