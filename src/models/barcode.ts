export class Barcode {
    amount:number=1;
    code:string;
    format:string;
    constructor(code){
        if(code && code.length){
            this.code = code;
            switch(this.code.length){
                case 13:
                    this.format = 'EAN13';
                    break;
                case 8:
                    this.format = 'EAN8';
                    break;
                default:
                    this.code = '';
                    this.format = 'EAN13';
            }
        }
    }
}
