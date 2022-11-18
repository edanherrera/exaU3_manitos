import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  //SP = ESPAÑOL
  //EN = INGLES
  //FR = FRANCES
  lan: string = "sp"
  constructor() { }

  getLan(){
    return this.lan  
  }

  setToEn(){
    this.lan='en'
  }

  setToFr(){
    this.lan='fr'
  }

  setToSp(){
    this.lan='sp'
  }
}
