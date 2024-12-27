import { Component, Input } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonCol,IonRow,IonCard, IonGrid, IonIcon, IonButtons } from '@ionic/angular/standalone';

@Component({
  selector: 'app-explore-container',
  templateUrl: './explore-container.component.html',
  styleUrls: ['./explore-container.component.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, ExploreContainerComponent,IonCol,IonRow,IonCard,IonGrid,IonIcon,IonButtons, IonButton],
})
export class ExploreContainerComponent {
  @Input() name?: string;
}
