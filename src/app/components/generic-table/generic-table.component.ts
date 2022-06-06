import {
  Component,
  Input,
  OnChanges,
  OnDestroy,
  SimpleChanges,
} from '@angular/core';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-generic-table',
  templateUrl: './generic-table.component.html',
  styleUrls: ['./generic-table.component.scss'],
})
export class GenericTableComponent implements OnChanges, OnDestroy {
  @Input()
  data: Observable<any> | undefined;
  @Input()
  selectedColumn: string = '';
  columns: any[] = [];
  displayedColumns: any[] = [];
  dataSource: any;
  private subscription: Subscription | undefined;

  public ngOnChanges(changes: SimpleChanges): void {
    if (this.data) {
      this.subscription = this.data.subscribe((res) => {
        const firstElements = res.slice(0, 100);
        const columns = firstElements
          .reduce((columns: any, row: any) => {
            return [...columns, ...Object.keys(row)];
          }, [])
          .reduce((columns: any[], column: any) => {
            return columns.includes(column) ? columns : [...columns, column];
          }, []);

        this.columns = columns.map((column: any) => {
          return {
            columnDef: column,
            header: column,
            cell: (element: any) => `${element[column] ? element[column] : ``}`,
          };
        });
        this.displayedColumns = this.columns.map((c) => c.columnDef);
        this.dataSource = firstElements;
      });
    }
  }

  public getClassForColumn(column: string): string {
    if (column === this.selectedColumn) return 'selected-column';

    return '';
  }

  public getFirst100Rows(): any {
    return this.dataSource.l;
  }

  public ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
