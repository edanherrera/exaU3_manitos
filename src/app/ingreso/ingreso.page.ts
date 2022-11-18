import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { LanguageService } from '../services/language.service';
import { ReservationService } from '../services/reservation.service';

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
  private token=null
  private user = ""
  constructor(private reservation:ReservationService,private lp: LanguageService, private al: AlertController ) { 
    this.user = reservation.getCurrentUser()
  }

  ionViewWillEnter() {
    console.log("ingreso entering")
    this.lan=this.lp.getLan()
    if(this.lan=='sp')this.textC=this.textSp
    if(this.lan=='en')this.textC=this.textEn
    if(this.lan=='fr')this.textC=this.textFr
  }
  
  ngOnInit() {
  }

  safePass(){
    let hab = this.user.substring(9,10)
    let password = this.reservation.getcode(Number(hab)-1)
    return password
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
