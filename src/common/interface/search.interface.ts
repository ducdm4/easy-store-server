export interface SearchInterface {
  keyword: string;
  sort: Array<{ key: string; value: 'ASC' | 'DESC' }>;
  paging: { page: number; size: number };
  filter?: Array<{ key: string; value: Array<string> }>;
}
