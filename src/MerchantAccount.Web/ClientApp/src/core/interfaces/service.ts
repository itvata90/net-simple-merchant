export interface BaseService<BodyType, ConfigType = any, ReturnType = any> {
  get: (queryString?: string, config?: ConfigType) => Promise<ReturnType>;
  getSingle: (id: string | number, config?: ConfigType) => Promise<ReturnType>;
  add: (body: BodyType, config?: ConfigType) => Promise<ReturnType>;
  update: (id: string | number, body: BodyType, config?: ConfigType) => Promise<ReturnType>;
  remove: (id: string | number, config?: ConfigType) => Promise<ReturnType>;
}

export interface Filter {
  page?: number;
  limit?: number;
  firstLimit?: number;
  fields?: string[];
  sort?: string;
  currentUserId?: string;

  q?: string;
  keyword?: string;
  excluding?: string[] | number[];
  refId?: string | number;

  pageIndex?: number;
  pageSize?: number;
}
