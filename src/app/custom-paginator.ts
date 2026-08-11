import { MatPaginatorIntl } from '@angular/material/paginator';

export class CustomPaginator extends MatPaginatorIntl {

  constructor() {
    super();

    this.itemsPerPageLabel = '';

    this.getRangeLabel = (
  page: number,
  pageSize: number,
  length: number
): string => {

  if (length === 0) {
    return 'Showing 0-0 of 0 results';
  }

  const start = page * pageSize + 1;
  const end = Math.min((page + 1) * pageSize, length);

  return `Showing ${start}-${end} of ${length} results`;
};
  }
}

