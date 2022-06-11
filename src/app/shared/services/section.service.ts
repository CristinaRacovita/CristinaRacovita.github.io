import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class SectionService {
  public activeSection = new BehaviorSubject<string>('home');
}
