export type Pagination<Data = unknown> = {
  results: Data[];
  page: number;
  count: number;
  next: string | null;
  previous: string | null;
};
