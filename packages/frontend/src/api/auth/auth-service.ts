import {AxiosResponse} from "axios";
import {apiService} from "../api-service";
import {AuthResDto} from "./dto/auth-res.dto";
import {LoginDto} from "./dto/login.dto";
import {RegisterDto} from "./dto/register.dto";
import {RefreshDto} from "./dto/refresh.dto";
import {setItemsToLocalStorage} from "../../utils/local-storage.utils";

class AuthService {
  public async login(loginDto: LoginDto): Promise<AxiosResponse<AuthResDto>> {
    const res = await apiService.instance.post<AuthResDto>("auth/login", loginDto);
    if (!res?.data) return;
    this.setAuthOptions(res.data);
    return res;
  }

  public async register(registerDto: RegisterDto): Promise<AxiosResponse<AuthResDto>> {
    const res = await apiService.instance.post<AuthResDto>("auth/register", registerDto);
    if (!res?.data) return;
    this.setAuthOptions(res.data);
    return res;
  }

  public async refresh(refreshDto: RefreshDto): Promise<AxiosResponse<AuthResDto>> {
    const res = await apiService.instance.post<AuthResDto>("auth/refresh", refreshDto);
    if (!res) throw new Error("No refresh token");
    this.setAuthOptions(res.data);
    return res;
  }

  protected setAuthOptions(authResDto: AuthResDto): void {
    localStorage.clear();
    setItemsToLocalStorage({...authResDto});
  }
}

export const authService = new AuthService();
