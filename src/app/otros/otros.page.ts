import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { LanguageService } from '../services/language.service';

@Component({
  selector: 'app-otros',
  templateUrl: './otros.page.html',
  styleUrls: ['./otros.page.scss'],
})
export class OtrosPage implements OnInit {
  textSp = {title:'Recomendaciones',acc1:'Actividades',acc2:'Recomendaciones',acc3:'Historia',acc4:'Números de emergencia',act1:'Masajes',act2:'Bienestar',act3:'Haga que su estadía sea más relajante con un masaje de un terapeuta licenciado experimentado. Correo: manitos@gmail.com',
          rec1:'Alquiler de bicicletas',rec2:"explora y recorre la laguna en bicicleta! Los huéspedes pueden reservar su bicicleta en la recepción de 7:00 a. m. a 7:00 p. m. diariamente.",ad:'Actividades de aventura',ad1:'ocio',ad2:"¡Añade un poco de aventura a tu estancia con una de nuestras actividades de aventura! ¡Elija entre Snorkeling, viajes de pesca, kayak, buceo y más!",selectBtnT:'Seleccionar idioma',selectBtn:'Aceptar',
          mail:'Envíe un correo electrónico a manitos@gmail.com para mas informacion. Se requiere reserva previa.',ent:'Entretenimiento y eventos',ent1:'Desde degustaciones de margaritas en el lobby, tambores y música en vivo, eventos especiales en el área local y más, obtenga toda la información más reciente en nuestro Calendario de entretenimiento.'
          ,lag:'Laguna',lag1:'¡Únase a nosotros para disfrutar de excelente comida, bebidas y una variedad de actividades en nuestra laguna, que incluyen lanzamiento de anillos, área de juegos para niños, mesas de picnic, voleibol, relajarse en una hamaca y más! Abierto al público.',lag2:'¡Envíe un correo electrónico a manitos@gmail.com para consultas!',casc:'Cascada de la Silla',casc1:'Naturaleza',casc2:'Una impresionante formación natural, que te regala fotografías increíbles y una rica brisa que refresca en el calor del verano.'
          ,temp:'Templo del Señor de la Asención',temp1:'Cultura',temp2:'Iglesia Catolica del Señor de la ascencion',moj:'Ruinas de la Hacienda San José Mojarras',moj1:" Esta hacienda en su tiempo fue muy importante para la comunidad ya que dentro de la misma se encuentra una fábrica de alcohol y del ingenio, lo cual hace resaltar la historia que se efectúa dentro de los restos de la hacienda"
          ,lagS:'Laguna de Santa Maria del oro',lagS1:'La laguna mide casi 2.25 kilómetros de largo y 1.2 kilómetros de ancho. La formación de ésta se debe a un cráter creado por el impacto de un meteorito hace millones de años, dándole a la laguna una profundidad de 60 metros.',lagS2:'Una leyenda de desamor rodea este bello lugar. Se dice que el rey de Michiztlán, un poblado antiguo, tenía una hija hermosa. Ésta se enamoró de un hombre que formaba parte de un pueblo enemigo. El rey, al enterarse de esto, enfureció y mandó amarrar a ambos jóvenes a distintos postes cerca del cráter donde se encuentra la laguna. Al verse el uno al otro, pero sin poderse tocar, lloraron toda la noche hasta que sus lágrimas formaron la laguna.'
          ,num:'Emergencias #911',num1:'El 9-1-1 es el número telefónico de atención de emergencias para seguridad, protección civil, servicios de salud y cuerpo de bomberos en beneficio de las y los habitantes.',num3:'Protección Civil',num4:'Este servicio existe para salvaguardar la integridad de la población ante emergencias o desastres que ocasionen daños a la infraestructura urbana, es parte de las estrategias del Gobierno de la Ciudad de México para implementar acciones de prevención, mitigación, auxilio, rehabilitación, restablecimiento y reconstrucción que refuercen una cultura de la prevención.'
          ,num5:'Emergencias',num6:'Otros',num7:'Cruz Roja',num8:'Policía Federal',num9:'Incendios Forestales'};
  textEn =  {title:'Recomendations',acc1:'Activites',acc2:'Recommendations',acc3:'History',acc4:'Emergency Numbers',act1:'Massage',act2:'Wellness',act3:'Make your stay more relaxing with a massage from an experienced licensed therapist. Email: manitos@gmail.com',
          rec1:'Bicycle rental',rec2:"explore and tour the lagoon by bike! You can reserve your bike at the reception from 7:00 am to 5:00 pm. m. to 7:00 p.m. m. daily.",ad:'Adventure activities',ad1:'leisure',ad2:"Add a bit of adventure to your stay with one of our adventure activities! Choose from Snorkeling, Fishing Trips, Kayaking, Diving and more!",selectBtnT:'Choose language',selectBtn:'Ok'
          ,mail:'Send an email to manitos@gmail.com for more information. Advance reservation is required.',ent:'entertainment and events',ent1:'From margarita tastings in the lobby, drumming and live music, special events in the local area and more, get all the latest information in our Entertainment Calendar.'
          ,lag:"lagoon",lag1:'Join us for great food, drinks, and a variety of activities at our lagoon, including ring toss, playground, picnic tables, volleyball, relaxing in a hammock, and more! Open to the public.',lag2:'Email manitos@gmail.com for inquiries!',casc:'Silla Waterfall',casc1:'Nature',casc2:'An impressive nature formation, which you offer uncroyable photographs and a brise riche that rafraîchit in the summer chaleur.'
          ,temp:'Temple of the Lord of the Ascension',temp1:'Culture',temp2:'Catholic Church of the Lord of the Ascension',moj:'Ruins of the Hacienda San José Mojarras',moj1:"This hacienda in its time was very important for the community since within it is an alcohol and sugar factory, which highlights the history that takes place within the remains of the hacienda"
          ,lagS:'Lagoon of Santa Maria del Oro',lagS1:'The lagoon measures almost 2.25 kilometers long and 1.2 kilometers wide. Its formation is due to a crater created by the impact of a meteorite millions of years ago, giving the lagoon a depth of 60 meters.',lagS2:'A legend of heartbreak surrounds this beautiful place. It is said that the king of Michiztlán, an ancient town, had a beautiful daughter. She fell in love with a man who was part of an enemy town. The king, upon learning of this, became enraged and ordered both young men to be tied to different posts near the crater where the lagoon is located. Seeing each other, but unable to touch each other, they cried all night until their tears formed the lagoon.'
          ,num:'Emergencies #911',num1:'9-1-1 is the emergency telephone number for security, civil protection, health services and the fire department for the benefit of the inhabitants.',num3:'Civil protection',num4:'This service exists to safeguard the integrity of the population in the face of emergencies or disasters that cause damage to urban infrastructure, it is part of the strategies of the Government of Mexico City to implement actions of prevention, mitigation, aid, rehabilitation, restoration and reconstruction that reinforce a culture of prevention.'
          ,num5:'Emergencies',num6:'Others',num7:'Red cross',num8:'Federal police',num9:'Forest fires'};
  textFr = {title:'Recommandations',acc1:'Activités',acc2:'Recommandations',acc3:'Histoire',acc4:"Numéros d'urgence",act1:'Massages',act2:'le bien-être',act3:"Rendez votre séjour plus relaxant avec un massage d'un thérapeute agréé expérimenté. Courriel : manitos@gmail.com",
          rec1:'location de vélos',rec2:"explorez et faites le tour du lagon à vélo ! Vous pouvez réserver votre vélo à la réception de 7h00 à 17h00. M. à 19h00 M. du quotidien.",ad:"Activités d'aventure",ad1:'loisirs',ad2:"Ajoutez un peu d'aventure à votre séjour avec l'une de nos activités d'aventure ! Choisissez parmi la plongée en apnée, les voyages de pêche, le kayak, la plongée et plus encore !",selectBtnT:'Choisir la langue',selectBtn:"d'accord"
          ,mail:"Envoyez un e-mail à manitos@gmail.com pour plus d'informations. Une réservation à l'avance est requise.",ent:'animations et événements',ent1:'Des dégustations de margarita dans le hall, des percussions et de la musique live, des événements spéciaux dans la région et plus encore, obtenez toutes les dernières informations dans notre calendrier des divertissements.'
          ,lag:'Lagune',lag1:"Rejoignez-nous pour de la bonne nourriture, des boissons et une variété d'activités dans notre lagon, y compris le lancer d'anneaux, l'aire de jeux, les tables de pique-nique, le volley-ball, la détente dans un hamac, et plus encore ! Ouvert au public.",lag2:'Envoyez un e-mail à manitos@gmail.com pour toute demande de renseignements !', casc:'Cascade de Silla',casc1:'La nature',casc2:'Une formation naturelle impressionnante, qui vous offre des photographies incroyables et une brise riche qui rafraîchit dans la chaleur estivale.'
          ,temp:"Temple du Seigneur de l'Ascension",temp1:'Culture',temp2:"Église catholique du Seigneur de l'Ascension",moj:"Ruines de l'Hacienda San José Mojarras",moj1:"Cette hacienda en son temps était très importante pour la communauté car en son sein se trouve une usine d'alcool et de sucre, qui met en lumière l'histoire qui se déroule dans les vestiges de l'hacienda"
          ,lagS:'Lagune de Santa Maria del Oro',lagS1:"Le lagon mesure près de 2,25 kilomètres de long et 1,2 kilomètre de large. Sa formation est due à un cratère créé par l'impact d'une météorite il y a des millions d'années, donnant au lagon une profondeur de 60 mètres.",lagS2:"Une légende de chagrin entoure ce bel endroit. On dit que le roi de Michiztlán, une ville ancienne, avait une belle fille. Elle est tombée amoureuse d'un homme qui faisait partie d'une ville ennemie. Le roi, en apprenant cela, devint furieux et ordonna aux deux jeunes hommes d'être attachés à différents postes près du cratère où se trouve la lagune. Se voyant, mais incapables de se toucher, ils ont pleuré toute la nuit jusqu'à ce que leurs larmes forment le lagon."
          ,num:'Urgences #911',num1:"Le 9-1-1 est le numéro de téléphone d'urgence pour la sécurité, la sécurité civile, les services de santé et le service d'incendie au profit des habitants.",num3:'Protection civile',num4:"Ce service existe pour sauvegarder l'intégrité de la population face aux urgences ou aux catastrophes qui causent des dommages aux infrastructures urbaines, il fait partie des stratégies du gouvernement de Mexico pour mettre en œuvre des actions de prévention, d'atténuation, d'aide, de réhabilitation, de restauration et reconstruction qui renforcent une culture de prévention."
          ,num5:'Les urgences',num6:'Les autres',num7:'la Croix Rouge',num8:'Police fédérale',num9:'Feux de forêt'};

  textC = this.textSp
  lan: string = 'sp'
  constructor(private lp: LanguageService, private al: AlertController ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    console.log("otros enter")
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
