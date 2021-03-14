import {apiService} from "../api-service";
import {AxiosResponse} from "axios";
import {User} from "../../store/modules/user/user.types";

class UsersService {
  public async getInfo(userId): Promise<AxiosResponse<User>> {
    return apiService.instance.get(`users/${userId}`);
  }
}

export const usersService = new UsersService();
