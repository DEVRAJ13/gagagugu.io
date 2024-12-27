import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';

@Component({
  selector: 'app-flash-cards',
  templateUrl: './flash-cards.page.html',
  styleUrls: ['./flash-cards.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class FlashCardsPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
