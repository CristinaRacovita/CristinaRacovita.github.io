import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-steps',
  templateUrl: './steps.component.html',
  styleUrls: ['./steps.component.scss'],
})
export class StepsComponent {
  public isSmallScreen = false;

  public constructor(breakpointObserver: BreakpointObserver) {
    this.isSmallScreen = breakpointObserver.isMatched('(max-width: 765px)');
  }
}
