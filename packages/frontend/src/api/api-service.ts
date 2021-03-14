import axios from "axios";

class ApiService {
  public instance = axios.create();

  constructor() {
    this.instance.defaults.baseURL = "http://localhost:8080/";
    this.instance.defaults.headers.get["Accept"] = "application/json";
    this.instance.defaults.headers.post["Accept"] = "application/json";
  }

  public setBearer(accessToken = "") {
    this.instance.interceptors.request.use((config) => {
      config.headers = {
        Authorization: `Bearer ${accessToken}`
      };
      return config;
    });
  }
}

export const apiService = new ApiService();
