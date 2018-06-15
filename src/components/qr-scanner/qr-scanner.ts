import { Component } from '@angular/core';

/**
 * Generated class for the QrScannerComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'qr-scanner',
  templateUrl: 'qr-scanner.html'
})
export class QrScannerComponent {

  text: string;

  constructor() {
    console.log('Hello QrScannerComponent Component');
    this.text = 'Hello World';
  }

}
