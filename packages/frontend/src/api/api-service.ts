import axios from "axios";

class ApiService {
  public instance = axios.create();

  constructor() {
    this.instance.defaults.baseURL = "http://localhost:8080/";
    this.instance.interceptors.request.use((config) => {
      config.headers = {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        Accept: "application/json",
        "Content-Type": "application/json"
      };
      return config;
    });
  }
}

export const apiService = new ApiService();
