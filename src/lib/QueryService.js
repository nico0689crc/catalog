import axiosInstance from "./axios.js";

export class QueryService {
  constructor(basePath) {
    this.http = axiosInstance;
    this.basePath = basePath;
  }

  findAll() {
    return this.http.get(this.basePath);
  }
}
