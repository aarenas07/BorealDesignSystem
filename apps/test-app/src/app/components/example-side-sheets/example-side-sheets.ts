import { Component } from '@angular/core';
import { ButtonComponent, SideSheetsComponent } from '@organizacion/ui-kit';

@Component({
  selector: 'app-example-side-sheets',
  imports: [ButtonComponent, SideSheetsComponent],
  templateUrl: './example-side-sheets.html',
  styleUrl: './example-side-sheets.scss',
})
export class ExampleSideSheets {
  // Side Sheet
  isSideSheetOpenLevel = false;
  isSideSheetOpenOne = false;
  isSideSheetOpenTwo = false;
  isSideSheetOpenThree = false;
  isSideSheetOpenFour = false;

  openSideSheetLevel() {
    this.isSideSheetOpenLevel = true;
  }

  closeSideSheetLevel() {
    this.isSideSheetOpenLevel = false;
  }

  openSideSheetOne() {
    this.isSideSheetOpenOne = true;
  }

  closeSideSheetOne() {
    this.isSideSheetOpenOne = false;
  }

  openSideSheetTwo() {
    this.isSideSheetOpenTwo = true;
  }

  closeSideSheetTwo() {
    this.isSideSheetOpenTwo = false;
  }

  openSideSheetThree() {
    this.isSideSheetOpenThree = true;
  }

  closeSideSheetThree() {
    this.isSideSheetOpenThree = false;
  }

  openSideSheetFour() {
    this.isSideSheetOpenFour = true;
  }

  closeSideSheetFour() {
    this.isSideSheetOpenFour = false;
  }
}
