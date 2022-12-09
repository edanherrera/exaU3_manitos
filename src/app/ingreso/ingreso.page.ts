import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AlertController } from '@ionic/angular';
import { LanguageService } from '../services/language.service';
import { ReservationService } from '../services/reservation.service';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { Router } from '@angular/router';
import { Reservation } from '../models/reservation';

@Component({
  selector: 'app-ingreso',
  templateUrl: './ingreso.page.html',
  styleUrls: ['./ingreso.page.scss'],
})
export class IngresoPage implements OnInit {
  textSp = {title:'Ingreso',ubicacion:'Ubicación hotel',checkUbi:'Ubicacion check in y check out',pass:'Contraseña caja fuerte',selectBtnT:'Seleccionar idioma',selectBtn:'Aceptar',};
  textEn = {title:'Check in',ubicacion:'Hotel location',checkUbi:'Check in and check out location',pass:'Safe password',selectBtnT:'Choose language',selectBtn:'Ok'};
  textFr = {title:'Entrée',ubicacion:"emplacement de l'hôtel",checkUbi:"Lieu d'enregistrement et de départ",pass:'mot de passe sécurisé',selectBtnT:'Choisir la langue',selectBtn:"d'accord",};

  textC = this.textSp
  lan: string = 'sp'
  private id?:string;
  private password?:number;
  private token=null
  private res: Reservation = new Reservation;
  constructor(private reservation:ReservationService,
    private lp: LanguageService, 
    private router:Router,
    private al: AlertController
    ,private auth:AngularFireAuth ) { 
      const auth1 = getAuth();
      auth1.onAuthStateChanged((user)=>{
        this.id=user?.uid
        this.reservation.getReservationById(this.id!).subscribe(i => {
          this.res = i as Reservation
          let pass = this.res.room.substring(3,4)
          this.password = this.reservation.getcode(Number(pass)-1)
          console.log(this.password)
        })
      })
  }

  ionViewWillEnter() {
    this.lan=this.lp.getLan()
    if(this.lan=='sp')this.textC=this.textSp
    if(this.lan=='en')this.textC=this.textEn
    if(this.lan=='fr')this.textC=this.textFr
  }
  
  ngOnInit() { 
  }

  public safePass(){
    return this.password
  }
  public logout(){
    this.router.navigate(['']);
    this.reservation.logout()
  }

  applyLanguage(){
    this.lan=this.lp.getLan()
    if(this.lan=='sp')this.textC=this.textSp
    if(this.lan=='en')this.textC=this.textEn
    if(this.lan=='fr')this.textC=this.textFr
  }

  async selectLang(){
    const alert = await this.al.create({
      header: this.textC.selectBtnT,
      buttons: [{
        text: this.textC.selectBtn,
        handler: (data:string) => {
          if(data=='sp')this.lp.setToSp()
          if(data=='en')this.lp.setToEn()
          if(data=='fr')this.lp.setToFr()
          this.applyLanguage()
      }
      }],
      inputs: [
        {
          label: 'Español',
          type: 'radio',
          value: 'sp',
          name: 'lan'
        },
        {
          label: 'English',
          type: 'radio',
          value: 'en',
          name: 'lan'
        },
        {
          label: 'Français',
          type: 'radio',
          value: 'fr',
          name: 'lan'
        },
      ],
      
      
    });

    await alert.present();
  }
}
