import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Injectable()
export class CsvService {
  public constructor(private http: HttpClient) {}

  public processFileByName(filename: string): Observable<any> {
    return this.getFile(filename).pipe(
      map((res) => JSON.parse(this.csvJSON(res)))
    );
  }

  public processFile(content: string): Observable<any> {
    return of(JSON.parse(this.csvJSON(content)));
  }

  private getFile(filename: string): Observable<any> {
    return this.http.get(`${environment.baseUrl}/assets/${filename}.csv`, {
      responseType: 'text',
    });
  }

  private csvJSON(csv: any): string {
    var lines = csv.split('\n');
    var result = [];
    var headers = lines[0].split(',');

    for (var i = 1; i < lines.length; i++) {
      var obj: any = {};
      var currentline = lines[i].split(',');

      for (var j = 0; j < headers.length; j++) {
        obj[headers[j]] = currentline[j];
      }

      result.push(obj);
    }

    return JSON.stringify(result);
  }

  public transformFromb64(file: string): string {
    return atob(file);
  }
}
