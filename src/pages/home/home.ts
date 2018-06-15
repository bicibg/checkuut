import {Component} from '@angular/core';
import {BarcodeScanner} from '@ionic-native/barcode-scanner';
import {Barcode} from "../../models/barcode";
import {AlertController, NavController} from "ionic-angular";
import {CheckoutPage} from "../checkout/checkout";

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {
    newBarcode = null;
    barcodes: any[] = [];
    total:number=0;
    gaps:boolean=true;
    delay:number=3;
    constructor(private navCtrl:NavController,private barcodeScanner: BarcodeScanner,private alertCtrl:AlertController) {
    }

    createCode() {
        if (this.newBarcode) {
            let index = this.barcodes.findIndex(barcode => barcode.code == this.newBarcode);
            if(index>-1){
                this.barcodes[index].amount++;
            }else{
                this.barcodes.splice(0,0,new Barcode(this.newBarcode));
            }
            this.calculateTotal();
        }
    }

    calculateTotal(){
        let total = 0;
        for(let barcode of this.barcodes){
            total+=barcode.amount;
        }
        this.total = total;
    }
    scanCode() {
        this.barcodeScanner.scan({formats:"EAN8,EAN13",resultDisplayDuration:0}).then(barcodeData => {
                this.newBarcode = barcodeData.text;
                this.createCode();
        }, (err) => {
            console.log('Error: ', err);
        });
    }

    decreaseAmount(decreaseThis){
        let index = this.barcodes.findIndex(barcode => barcode.code == decreaseThis.code);
        if(index>-1){
            if(decreaseThis.amount>1) {
                this.barcodes[index].amount--;
            }else{
                this.barcodes.splice(index, 1);
            }
        }
    }


    removeCode(removeThis){
        let index = this.barcodes.findIndex(barcode => barcode.code == removeThis.code);
        if(index >-1){
            this.barcodes.splice(index, 1);
        }
        this.calculateTotal();
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
                        this.calculateTotal();
                    }
                }
            ]
        }).present();
    }

    getBarcode(barcode){
        this.newBarcode = barcode.code;
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
        this.navCtrl.push(CheckoutPage,{barcodes:this.barcodes,delay:this.delay,gaps:this.gaps})
    }

}