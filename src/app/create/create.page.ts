import { Component, ElementRef, ViewChild, OnInit, ContentChild, Input, AfterViewInit, inject } from '@angular/core';
import { Swiper } from 'swiper';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonFooter } from '@ionic/angular/standalone';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { addIcons } from 'ionicons';
import { addSharp, addOutline, closeOutline, storefrontOutline, chevronBackCircleOutline, chevronBackOutline, chatbubbleEllipsesSharp, chatbubbleEllipsesOutline, notificationsSharp, notificationsOutline, peopleCircleSharp, peopleCircleOutline, storefrontSharp, bagHandleSharp, bagHandleOutline, appsSharp, appsOutline } from 'ionicons/icons';
import { SwiperContainer } from 'swiper/element/bundle';
import { AdMob, AdmobConsentStatus, AdMobRewardItem, AdOptions, BannerAdOptions, BannerAdPosition, BannerAdSize, RewardAdOptions, RewardAdPluginEvents } from '@capacitor-community/admob';
import { ModalController } from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { delay } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'app-create',
  templateUrl: './create.page.html',
  styleUrls: ['./create.page.scss'],
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonFooter, ExploreContainerComponent]
})
export class CreatePage implements AfterViewInit {
  @ViewChild('swiper') swiperRef!: ElementRef<SwiperContainer>;
  private modalCtrl: ModalController = inject(ModalController);
  private http: HttpClient = inject(HttpClient);
  @Input() swiperContainerId = '';
  index = 0;
  slidePerView = 1;
  swiper?: Swiper;
  initialized = false;
  options: any = [
    { "id": 1, "label": "Home", "icon": "./assets/home.gif" },
    { "id": 2, "label": "Flat/Apartment", "icon": "./assets/apartment.gif" },
    { "id": 3, "label": "PG", "icon": "./assets/pg.gif" }
  ]

  collection: any = []


  constructor() {
    addIcons({ addSharp, addOutline, closeOutline, storefrontOutline, chevronBackCircleOutline, chevronBackOutline, chatbubbleEllipsesSharp, chatbubbleEllipsesOutline, notificationsSharp, notificationsOutline, peopleCircleSharp, peopleCircleOutline, storefrontSharp, bagHandleSharp, bagHandleOutline, appsSharp, appsOutline });
    // this.initialize();
    // this.showBanner();
    // this.getTopRatedMovies().subscribe(res => {
    //   this.collection = res;
    //   for (let i = 0; i < this.collection.length; i++) {
    //     this.collection[i]["bgColor"] = this.changeBackground();
    //   }
    // })


    // console.log(this.collection)
  }


  getTopRatedMovies(page = 1): Observable<any> {
    return this.http
      .get<any>(`https://raw.githubusercontent.com/DEVRAJ13/gagagugu.io/refs/heads/main/stories.json`)
      .pipe(
        delay(2000) // Simulate slow network
      );
  }

  changeBackground() {
    return `linear-gradient(to right,${this.getRandomHEXColor()},${this.getRandomHEXColor()})`;
  }

  getRandomHEXColor() {
    const SEED = '0123456789abcdef';
    let output = '#';
    while (output.length < 7) {
      output += SEED[Math.floor(Math.random() * SEED.length)];
    }
    return output;
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

  async selectOption(id: number) {
    for (let i = 0; i < this.options.length; i++) {
      this.options[i]["borderColor"] = "#494949;"
      this.options[i]["px"] = "2"
    }
    console.log(id);
  }

  async showBanner() {
    const options: BannerAdOptions = {
      adId: 'ca-app-pub-5409751109104618/6375441972',
      adSize: BannerAdSize.BANNER,
      position: BannerAdPosition.BOTTOM_CENTER,
      margin: 200,
      isTesting: true,
    };
    await AdMob.showBanner(options);
  }

  cancelSearch() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  async hideBanner() {
    await AdMob.hideBanner();

    await AdMob.removeBanner();
  }

  ngOnInit() {

  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      console.log(this.swiperRef.nativeElement.swiper.activeIndex)
    }, 300);
  }

  changeSlide(prevOrNext: number): void {
    // if (prevOrNext === -1) {
    //   this.swiperRef.nativeElement.swiper.slidePrev();
    // } else {

    // }
  }


  swiperSlideChanged(e: any) {
    console.log('changed: ', e);
    const index = e.target.swiper.activeIndex
    console.log(index)
    // this.selectedSegment = this.segmentList[index]
  }

  _segmentSelected(index: number) {
    this.swiper?.slideTo(index)
  }

  onSwiper(e: any) {
    console.log('changed: ', e);
  }

  swiperReady() {
    this.swiper = this.swiperRef?.nativeElement.swiper;
  }

  goNext() {
    this.swiperRef.nativeElement.swiper.slideNext();
    console.log(this.swiperRef.nativeElement.swiper.activeIndex)
  }

  goPrev() {
    this.swiperRef.nativeElement.swiper.slidePrev();
    console.log(this.swiperRef.nativeElement.swiper.activeIndex)
  }


}
