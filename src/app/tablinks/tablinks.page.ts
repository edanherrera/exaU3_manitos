import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { LanguageService } from '../services/language.service';
import { ReservationService } from '../services/reservation.service';
@Component({
  selector: 'app-tablinks',
  templateUrl: './tablinks.page.html',
  styleUrls: ['./tablinks.page.scss'],
})
export class TablinksPage implements OnInit {
  tabNames = {tab1:'Reglamento',tab2:'Ingreso',tab3:'Actividades'}
  lan: string = 'sp'
  tabsSp = {tab1:'Reglamento',tab2:'Ingreso',tab3:'Actividades'};
  tabsEn =  {tab1:'Rules',tab2:'Check in',tab3:'Activities'};
  tabsFr = {tab1:'Régulation',tab2:'Entrée',tab3:'Activités'};
  constructor(private lp: LanguageService,private reservation:ReservationService,private al: AlertController ) { 
    this.lan=lp.getLan()
    if(this.lan=='sp')this.tabNames=this.tabsSp
    if(this.lan=='en')this.tabNames=this.tabsEn
    if(this.lan=='fr')this.tabNames=this.tabsFr

    const user = reservation.getCurrentUser()
    const res = reservation.getReservationByToken(user)
    console.log('INGRESO',(res.price! - res.ant!)) 
    this.adeudoAlert((res.price! - res.ant!))
  }

  ngOnInit() {
  }

  tabChanged(){
    this.lan=this.lp.getLan()
    if(this.lan=='sp')this.tabNames=this.tabsSp
    if(this.lan=='en')this.tabNames=this.tabsEn
    if(this.lan=='fr')this.tabNames=this.tabsFr
  }

  async adeudoAlert(res:number){
    const alert = await this.al.create({
      header: 'Alerta',
          subHeader: 'Adeudo',
          message: 'Actualmente su adeudo es de: '+res,
          buttons: ['OK'],
    });

    await alert.present();
  }
}
