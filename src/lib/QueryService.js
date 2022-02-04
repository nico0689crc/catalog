import axiosInstance from "./axios.js";

export class QueryService {
  constructor(basePath) {
    this.http = axiosInstance;
    this.basePath = basePath;
  }

  async findAll() {
    return await this.http.get(this.basePath).then(res => res.data);
  }

  async find(params) {
    const { size = 10, page = 1, include, filter = [], ...restParams } = params;

    const queries = {
      "page[size]": size,
      "page[number]": page,
      ...(Boolean(include) && { include: include.join(",") }),
    };

    if (filter.length > 0) {
      for (const item of filter) {
        queries[`filter[${item.field}]`] = item.criteria;
      }
    }

    const queryString = new URLSearchParams(queries).toString();

    return this.http
      .get(`${this.basePath}?${queryString}`)
      .then(res => res.data);
  }

  async get(url) {
    return this.http.get(url).then(res => res.data);
  }
}
