import { Component, inject } from '@angular/core';
import { IonHeader,IonAvatar, IonToolbar, IonTitle, IonContent, IonButton, IonCol,IonRow,IonCard, IonGrid, IonIcon, IonButtons } from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { AdMob, AdmobConsentStatus, AdMobRewardItem, AdOptions, BannerAdOptions, BannerAdPosition, BannerAdSize, RewardAdOptions, RewardAdPluginEvents } from '@capacitor-community/admob';
import { isPlatform } from '@ionic/angular';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { ModalController } from '@ionic/angular/standalone';
import { FlashCardsPage } from '../flash-cards/flash-cards.page';
import { CreatePage } from '../create/create.page';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  imports: [IonHeader, IonAvatar, IonToolbar, IonTitle, IonContent, ExploreContainerComponent,IonCol,IonRow,IonCard,IonGrid,IonIcon,IonButtons, IonButton],
})
export class Tab1Page {
  private modalCtrl: ModalController = inject(ModalController);
  private router = inject(Router);
  constructor() {
    this.initialize();
  }

  async openModal() {
    const modal = await this.modalCtrl.create({
      component: CreatePage,
    });
    modal.present();

    // const { data, role } = await modal.onWillDismiss();
    // console.log(data)
    // if (role === 'confirm') {
    //   this.message = `Hello, ${data}!`;
    // }
  }

  async initialize() {
    await AdMob.initialize();
    const [trackingInfo, consentInfo] = await Promise.all([
      AdMob.trackingAuthorizationStatus(),
      AdMob.requestConsentInfo(),
    ]);

    if (trackingInfo.status === 'notDetermined') {
      await AdMob.requestTrackingAuthorization();
    }

    const authorizationStatus = await AdMob.trackingAuthorizationStatus();
    if (
      authorizationStatus.status === 'authorized' &&
      consentInfo.isConsentFormAvailable &&
      consentInfo.status === AdmobConsentStatus.REQUIRED
    ) {
      await AdMob.showConsentForm();
    }
  }

  async createListing(){
    this.router.navigate(['create'])
  }

  async showBanner() {
    const options: BannerAdOptions = {
      adId: 'ca-app-pub-5409751109104618/6375441972',
      adSize: BannerAdSize.BANNER,
      position: BannerAdPosition.TOP_CENTER,
      margin: 0,
      isTesting: true,
    };
    await AdMob.showBanner(options);
  }

  async hideBanner() {
    await AdMob.hideBanner();

    await AdMob.removeBanner();
  }

  async showInterstitial() {
    const options: AdOptions = {
      adId: '',
      isTesting: true,
    }
    await AdMob.prepareInterstitial(options);
    await AdMob.showInterstitial();
  }

  async showRewardVideo() {
    AdMob.addListener(
      RewardAdPluginEvents.Rewarded,
      (reward: AdMobRewardItem) => {
        console.log('REWARD:', reward);
      }
    );
    const options: RewardAdOptions = {
      adId: '',
      isTesting: true,
    }
    await AdMob.prepareRewardVideoAd(options);
    await AdMob.showRewardVideoAd();
  }
}
