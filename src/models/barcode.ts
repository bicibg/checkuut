export class Barcode {
    amount:number=1;
    code:string;
    displayed:boolean=false;

    constructor(code){
        this.code = code;
    }
}
