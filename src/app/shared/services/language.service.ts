import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable()
export class LanguageService {
    public activeLanguage = new BehaviorSubject<string>('EN');
}