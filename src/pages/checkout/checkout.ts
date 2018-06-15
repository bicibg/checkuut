import {Component, ViewChild} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import { Slides } from 'ionic-angular';
import {Barcode} from "../../models/barcode";


@Component({
    selector: 'page-checkout',
    templateUrl: 'checkout.html',
})
export class CheckoutPage {

    barcodes: any[] = [];
    current:number=0;
    seconds:number;
    running:boolean=false;
    @ViewChild(Slides) slides: Slides;

    constructor(public navCtrl: NavController, public navParams: NavParams) {
    }

    ionViewWillEnter() {

        if(this.navParams.get('barcodes')){
            let barcodes = [...this.navParams.get('barcodes')];
            let copy = [];
            for(let barcode of barcodes){
                for(let amount=0;amount<barcode.amount;amount++){
                    copy.push(barcode);
                }
            }
            let l = 0;
            while (l <= copy.length) {
                copy.splice(l, 0, new Barcode(''));
                l += 2;
            }
            this.barcodes = copy;
        }
    }

    startCheckout(){
        this.running = true;
        this.seconds = 3;
        let counter = setInterval(()=>{
            this.seconds = this.seconds-1;
            if(this.seconds<1){
                clearInterval(counter);
                this.seconds = undefined;
            }
        },1000);
        setTimeout(()=>{
            this.showNext();
        },3000);
    }

    stopCheckout(){
        this.running = false;
    }

    showNext(){
        if(!this.barcodes[this.current+1]){
            this.stopCheckout();
        }
        if(!this.barcodes[this.current+1] || !this.running) return;
        this.seconds = 2;
        let counter = setInterval(()=>{
            this.seconds = this.seconds-1;
            if(this.seconds<1){
                clearInterval(counter);
                this.seconds = undefined;
            }
        },1000);
        setTimeout(()=>{
            this.slides.slideTo(this.current+1, 500);
            this.showNext();
        },2000)
    }

    slideChanged() {
        this.current = this.slides.getActiveIndex();
    }

}
