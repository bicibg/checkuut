import {Component} from '@angular/core';
import {Barcode} from "../../models/barcode";
import {AlertController, NavController} from "ionic-angular";
import {QRScanner, QRScannerStatus} from "@ionic-native/qr-scanner";
import {Subscription} from "rxjs";

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {
    newBarcode = null;
    barcodes: any[] = [];
    total: number = 0;
    scannerActive = false;
    scanSub: Subscription;
    gaps: boolean = true;
    delay: number = 3;
    constructor(private navCtrl: NavController,
                private alertCtrl: AlertController,
                public qrScanner: QRScanner
    ) {}

    createCode() {
        if (this.newBarcode) {
            let index = this.barcodes.findIndex(barcode => barcode.code == this.newBarcode);
            if (index > -1) {
                this.barcodes[index].amount++;
            } else {
                this.barcodes.splice(0, 0, new Barcode(this.newBarcode));
            }
            this.calculateTotal();
        }
    }

    calculateTotal() {
        let total = 0;
        for (let barcode of this.barcodes) {
            total += barcode.amount;
        }
        this.total = total;
    }

    scanCode() {
        if (this.scannerActive) {
            console.log("stop scanning");
            this.disableScanning();
        } else {
            console.log("start scanning");
            this.scannerActive = true;
            this.qrScanner.prepare().then((status: QRScannerStatus) => {
                if (status.authorized) {
                    this.enableScanning();
                } else if (status.denied) {
                    console.log('camera denied');
                } else {
                    console.log('camera error');
                }
            }).catch((e: any) => {
                alert('Error is' + e);
            });
        }
    }

    disableScanning(){
        this.qrScanner.disableLight();
        this.scanSub.unsubscribe();
        this.qrScanner.destroy();
        this.scannerActive = false;
    }

    enableScanning(){
        this.qrScanner.enableLight().then(() => {
            this.scanSub = this.qrScanner.scan().subscribe((text: string) => {
                console.log('Scanned something', text);
                this.newBarcode = text;
                this.createCode();
                this.disableScanning();
                this.enableScanning();
            });
            this.qrScanner.resumePreview();

            this.qrScanner.show();
        });
    }


    removeCode(removeThis) {
        let index = this.barcodes.findIndex(barcode => barcode.code == removeThis.code);
        if (index > -1) {
            this.barcodes.splice(index, 1);
        }
        this.calculateTotal();
    }

    clearAll() {
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
                        this.calculateTotal();
                    }
                }
            ]
        }).present();
    }

    getBarcode(barcode) {
        this.newBarcode = barcode.code;
    }
}