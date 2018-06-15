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
    gaps:boolean=true;
    delay:number=3;
    @ViewChild(Slides) slides: Slides;

    constructor(public navCtrl: NavController, public navParams: NavParams) {
    }

    ionViewWillEnter() {
        this.gaps = !!this.navParams.get('gaps');
        if(this.navParams.get('delay')){
            this.delay = this.navParams.get('delay');
        }
        if(this.navParams.get('barcodes')){
            let barcodes = [...this.navParams.get('barcodes')];
            let copy = [];
            for(let barcode of barcodes){
                for(let amount=0;amount<barcode.amount;amount++){
                    copy.push(barcode);
                }
            }
            if(this.gaps){
                let l = 0;
                while (l <= copy.length) {
                    copy.splice(l, 0, new Barcode(''));
                    l += 2;
                }
            }
            this.barcodes = copy;
        }
    }

    startCheckout(){
        this.running = true;
        this.seconds = 3;
        let counter = setInterval(()=>{
            this.seconds = this.seconds-1;
            if(this.seconds<=0){
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
        this.seconds = this.delay;
        let counter = setInterval(()=>{
            this.seconds = this.seconds-1;
            if(this.seconds<=0){
                clearInterval(counter);
                clearInterval(counter);
                this.seconds = undefined;
            }
        },1000);
        setTimeout(()=>{
            this.slides.slideTo(this.current+1, 500);
            this.showNext();
        },this.delay*1000)
    }

    slideChanged() {
        this.current = this.slides.getActiveIndex();
    }

}
