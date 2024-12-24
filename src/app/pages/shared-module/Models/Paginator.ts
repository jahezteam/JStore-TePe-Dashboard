export interface paginator {
  pageSize: number;
  pageNumber: number;
  searchText: string;
  sortingType: string;
  sortingColumn: string;
  questionTypeId: number;
  categoryId: number;
  levelId: number;
}

export interface paginatorInput {
  pageSize: number;
  pageNumber: number;
  searchText: string;
}
