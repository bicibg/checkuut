import {Component} from '@angular/core';
//import {BarcodeScanner} from '@ionic-native/barcode-scanner';
import {Barcode} from "../../models/barcode";
import {AlertController, NavController} from "ionic-angular";
import {CheckoutPage} from "../checkout/checkout";
import {ScanPage} from "../scan/scan";
import {AndroidPermissions} from "@ionic-native/android-permissions";
import {QRScanner, QRScannerStatus} from "@ionic-native/qr-scanner";
import {Subscription} from "rxjs";

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {
    newBarcode = null;
    barcodes: any[] = [];
    total:number=0;
    scannerActive=false;
    scanSub:Subscription;
    constructor(private navCtrl:NavController,
                /*private barcodeScanner: BarcodeScanner,*/
                private alertCtrl:AlertController,
                public androidPermissions: AndroidPermissions,
                public qrScanner: QRScanner
    ) {
        QRScanner.prepare((err, status)=>
        {
            if (status.authorized) {

                QRScanner.scan(function(err, text) ); QRScanner.show(); } });


    }

    createCode() {
        if (this.newBarcode) {
            if (this.barcodes.filter(barcode => {
                return barcode.code == this.newBarcode;
            }).length > 0) {
                let existing = this.barcodes.filter(barcode => {
                    return barcode.code == this.newBarcode;
                })[0];
                let index = this.barcodes.indexOf(existing);
                this.barcodes[index].amount++;
            }else{
                this.barcodes.splice(0,0,new Barcode(this.newBarcode));
            }
            let total = 0;
            for(let barcode of this.barcodes){
                total+=barcode.amount;
            }
            this.total = total;
        }
    }
    gotoScanPage(){
        this.navCtrl.push(ScanPage);
    }


    scanCode() {
        this.qrScanner.getStatus().then(status=>{
            if(status.scanning){
                console.log("stop scanning");
                this.scannerActive = false;
                this.qrScanner.destroy().then(()=>{
                    this.scanSub.unsubscribe();
                });
            }else{
                console.log("start scanning");

                this.qrScanner.prepare().then(()=>{
                    document.getElementById("viewport").setAttribute("content", "width=" + (window.screen.width * window.devicePixelRatio) + ", minimal-ui, user-scalable=0");
                    this.scanSub = this.qrScanner.scan().subscribe((text: string) => {
                        document.getElementById("viewport").setAttribute("content", "width=375, minimal-ui, user-scalable=0");
                        console.log('Scanned something', text);
                        this.newBarcode = text;
                        this.createCode();
                    });
                    this.qrScanner.show().then(()=>{
                        this.scannerActive = true;
                    });
                });
            }
        });
        /*
        this.barcodeScanner.scan().then(barcodeData => {
                this.newBarcode = barcodeData.text;
                this.createCode();
        }, (err) => {
            console.log('Error: ', err);
        });
        */
    }

    decreaseAmount(decreaseThis){
        if (this.barcodes.filter(barcode => {
            return barcode.code == decreaseThis.code;
        }).length > 0) {
            let existing = this.barcodes.filter(barcode => {
                return barcode.code == this.newBarcode;
            })[0];
            let index = this.barcodes.indexOf(existing);
            if(index){
                if(existing.amount>1) {
                    this.barcodes[index].amount--;
                }else{
                    this.barcodes.splice(index, 1);
                }
            }
        }
    }

    removeCode(removeThis){
        if (this.barcodes.filter(barcode => {
            return barcode.code == removeThis.code;
        }).length > 0) {
            let existing = this.barcodes.filter(barcode => {
                return barcode.code == this.newBarcode;
            })[0];
            let index = this.barcodes.indexOf(existing);
            if(index){
                this.barcodes.splice(index, 1);
            }
        }
    }

    clearLast(){
        this.newBarcode = null;
    }

    clearAll(){
        this.alertCtrl.create({
            title: 'Confirm reset',
            message: 'Are you done? This will remove all scanned items',
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel'
                },
                {
                    text: 'Clear',
                    handler: () => {
                        this.barcodes = [];
                    }
                }
            ]
        }).present();
    }

    checkOut(){
        this.alertCtrl.create({
            title: 'Confirm checkout',
            message: 'Are you checking out?',
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel'
                },
                {
                    text: 'Checkout',
                    handler: () => {
                        this.reallyCheckout();
                    }
                }
            ]
        }).present();
    }

    reallyCheckout(){
        this.navCtrl.push(CheckoutPage,{barcodes:this.barcodes})
    }

}