import http from "@/http-common";

/* eslint-disable */
class ClientDataService {
  getAll(): Promise<any> {
    return http.get("");
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

  findByTitle(title: string): Promise<any> {
    return http.get(`?name=${title}`);
  }
}

export default new ClientDataService();
