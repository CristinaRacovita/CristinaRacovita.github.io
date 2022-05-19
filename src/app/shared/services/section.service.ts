import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { IndustryCsv } from "../models/industry-csv.enum";

@Injectable()
export class SectionService {
    public activeSection = new BehaviorSubject<string>('home');
    public activeUseCase = new BehaviorSubject<string>(IndustryCsv.Finance);
}