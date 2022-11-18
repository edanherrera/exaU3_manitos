import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { LanguageService } from '../services/language.service';

@Component({
  selector: 'app-reglamento',
  templateUrl: './reglamento.page.html',
  styleUrls: ['./reglamento.page.scss'],
})
export class ReglamentoPage implements OnInit {
  textSp = {title:'Reglamento',btn:'Idioma',selectBtnT:'Seleccionar idioma',selectBtn:'Aceptar',rules:['El cliente tiene la obligación ineludible de registrarse al momento de su llegada al hotel y de registrar su salida terminada su reserva.',
                                                                          'Cada cliente es responsable por los daños y/o perjuicios que ocasione a sí mismo, a otros huéspedes, a trabajadores, o a equipamiento e infraestructura del hotel, quedando obligado al pago o indemnización correspondiente.',
                                                                        'El cliente que el día de su salida desocupe su habitación después de las 12:00 horas, sin previo aviso y sin justificar su retraso, deberá pagar un día adicional a la duración de su reserva.']};
  textEn =  {title:'Rules',btn:'Language',selectBtnT:'Choose language',selectBtn:'Ok',rules:['The client has the obligation of checking in at his arrival and check out at the end of the reservation.',
                                                                        'Each client is responsible for damages made to himself, other resident or even workers or hotel equipment and infrastructure, having to make the corresponding payment or compensation ',
                                                                         'The client has to take his leave on the before 12:00 pm otherwise he must pay an additional day to his reservation']};
  textFr = {title:'Régulation',btn:'langage',selectBtnT:'Choisir la langue',selectBtn:"d'accord",rules:["Le client a l'obligation de check-in à son arrivée et de check-out à la fin de la réservation.'",
  "Each client is responsible for damages made to himself, other resident or even workers or hotel equipment and infrastructure, having to make the corresponding payment or compensation ",
'Le client qui, le jour de son départ, libère sa chambre après 12h00, sans préavis et sans justifier de son retard, devra payer un jour supplémentaire à la durée de sa réservation.']};

  textC = this.textSp
  lan: string = 'sp'
  constructor(private lp: LanguageService, private al: AlertController ) {
    this.applyLanguage()
   }

  ngOnInit() {
  }
  ionViewDidLeave() {
    console.log("reglamento is exited")
  }
  ionViewWillEnter() {
    console.log("reglamento is about to enter")
    this.lan=this.lp.getLan()
    if(this.lan=='sp')this.textC=this.textSp
    if(this.lan=='en')this.textC=this.textEn
    if(this.lan=='fr')this.textC=this.textFr
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
          if(data=='sp')this.lp.setToEn()
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
