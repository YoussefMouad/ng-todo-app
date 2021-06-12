import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';
import { TodoListItem } from '@shared/interfaces';

// TODO: replace this with real data from your application
const EXAMPLE_DATA: TodoListItem[] = [
  { id: 1, title: 'Hydrogen', description: "desc" },
  { id: 2, title: 'Helium', description: "desc" },
  { id: 3, title: 'Lithium', description: "desc" },
  { id: 4, title: 'Beryllium', description: "desc" },
  { id: 5, title: 'Boron', description: "desc" },
  { id: 6, title: 'Carbon', description: "desc" },
  { id: 7, title: 'Nitrogen', description: "desc" },
  { id: 8, title: 'Oxygen', description: "desc" },
  { id: 9, title: 'Fluorine', description: "desc" },
  { id: 10, title: 'Neon', description: "desc" },
  { id: 11, title: 'Sodium', description: "desc" },
  { id: 12, title: 'Magnesium', description: "desc" },
  { id: 13, title: 'Aluminum', description: "desc" },
  { id: 14, title: 'Silicon', description: "desc" },
  { id: 15, title: 'Phosphorus', description: "desc" },
  { id: 16, title: 'Sulfur', description: "desc" },
  { id: 17, title: 'Chlorine', description: "desc" },
  { id: 18, title: 'Argon', description: "desc" },
  { id: 19, title: 'Potassium', description: "desc" },
  { id: 20, title: 'Calcium', description: "desc" },
];

/**
 * Data source for the TodoList view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class TodoListDataSource extends DataSource<TodoListItem> {
  data: TodoListItem[] = EXAMPLE_DATA;
  paginator: MatPaginator | undefined;
  sort: MatSort | undefined;

  constructor() {
    super();
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<TodoListItem[]> {
    if (this.paginator && this.sort) {
      // Combine everything that affects the rendered data into one update
      // stream for the data-table to consume.
      return merge(observableOf(this.data), this.paginator.page, this.sort.sortChange)
        .pipe(map(() => {
          return this.getPagedData(this.getSortedData([...this.data]));
        }));
    } else {
      throw Error('Please set the paginator and sort on the data source before connecting.');
    }
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect(): void { }

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: TodoListItem[]): TodoListItem[] {
    if (this.paginator) {
      const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
      return data.splice(startIndex, this.paginator.pageSize);
    } else {
      return data;
    }
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: TodoListItem[]): TodoListItem[] {
    if (!this.sort || !this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort?.direction === 'asc';
      switch (this.sort?.active) {
        case 'id': return compare(+a.id, +b.id, isAsc);
        case 'title': return compare(a.title, b.title, isAsc);
        case 'description': return compare(a.description, b.description, isAsc);
        default: return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a: string | number, b: string | number, isAsc: boolean): number {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
