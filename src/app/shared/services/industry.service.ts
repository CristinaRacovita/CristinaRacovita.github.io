import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';
import { IIndustry } from '../models/industry.model';

@Injectable()
export class IndustryService {
  public constructor(private db: AngularFireDatabase) {}

  public getIndustries(): Observable<IIndustry[]> {
    return this.db.list('industries').valueChanges() as Observable<IIndustry[]>;
  }
}
