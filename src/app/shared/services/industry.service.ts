import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { IIndustry } from '../models/industry.model';
import { IUseCase } from '../models/useCase.model';

@Injectable()
export class IndustryService {
  public constructor(private db: AngularFireDatabase) {}

  public getIndustries(): Observable<IIndustry[]> {
    return this.db.list('industries').valueChanges() as Observable<IIndustry[]>;
  }

  public getUseCasesByIndustryName(
    industryName: string
  ): Observable<IUseCase[] | undefined> {
    let industries = this.db.list('industries').valueChanges() as Observable<
      IIndustry[]
    >;
    return industries.pipe(
      map(
        (industriesResult: IIndustry[]) =>
          industriesResult?.find((industry) => industry.name === industryName)
            ?.useCases
      )
    );
  }
}
