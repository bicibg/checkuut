import {BrowserModule} from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';
import {SplashScreen} from '@ionic-native/splash-screen';
import {StatusBar} from '@ionic-native/status-bar';
import {Dialogs} from '@ionic-native/dialogs';

import {MyApp} from './app.component';
import {HomePage} from '../pages/home/home';
import {NgxBarcodeModule} from 'ngx-barcode';
import {QRScanner} from "@ionic-native/qr-scanner";
import {AndroidPermissions} from "@ionic-native/android-permissions";

@NgModule({
    declarations: [
        MyApp,
        HomePage,
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
    ],
    providers: [
        StatusBar,
        SplashScreen,
        {provide: ErrorHandler, useClass: IonicErrorHandler},
        Dialogs,
        QRScanner,
        AndroidPermissions
    ]
})
export class AppModule {
}
