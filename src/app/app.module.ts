import {BrowserModule} from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';
import {SplashScreen} from '@ionic-native/splash-screen';
import {StatusBar} from '@ionic-native/status-bar';
import {Dialogs} from '@ionic-native/dialogs';

import {MyApp} from './app.component';
import {HomePage} from '../pages/home/home';
import {NgxBarcodeModule} from 'ngx-barcode';
import {BarcodeScanner} from '@ionic-native/barcode-scanner';
import {CheckoutPage} from "../pages/checkout/checkout";

@NgModule({
    declarations: [
        MyApp,
        HomePage,
        CheckoutPage
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
        CheckoutPage
    ],
    providers: [
        StatusBar,
        SplashScreen,
        {provide: ErrorHandler, useClass: IonicErrorHandler},
        BarcodeScanner,
        Dialogs
    ]
})
export class AppModule {
}
