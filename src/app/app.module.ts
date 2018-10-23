import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ScanPage } from '../pages/scan/scan';
import { NgxBarcodeModule } from 'ngx-barcode';
//import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import {CheckoutPage} from "../pages/checkout/checkout";
import { AndroidPermissions } from '@ionic-native/android-permissions';
import {QRScanner} from "@ionic-native/qr-scanner";

@NgModule({
  declarations: [
    MyApp,
    HomePage,
      CheckoutPage,
      ScanPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
      NgxBarcodeModule

  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
      CheckoutPage,
      ScanPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
      //BarcodeScanner,
      AndroidPermissions,
      QRScanner

  ]
})
export class AppModule {}
