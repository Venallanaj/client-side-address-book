import http from "@/http-common";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { getName } = require("country-list");

/* eslint-disable */
class ClientDataService {
  getAll(): Promise<any> { ;
    return http.get("");
  }
  getCountries(): Promise<any> {
    return getName();
  }

  get(id: any): Promise<any> {
    return http.get(`/${id}`);
  }

  create(data: any): Promise<any> {
    return http.post("", data);
  }

  update(id: any, data: any): Promise<any> {
    return http.put(`/${id}`, data);
  }

  delete(id: any): Promise<any> {
    return http.delete(`/${id}`);
  }

  deleteAll(): Promise<any> {
    return http.delete(``);
  }

  findByName(name: string): Promise<any> {
    return http.get(`?name=${name}`);
  }
}

export default new ClientDataService();
