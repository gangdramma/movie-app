import { http } from "../../services";
import { IApi } from "./types";

export const Login = (data: IApi.Login.Request) =>
  http.post<IApi.Login.Response>("/auth/login", data);
export const Register = (data: IApi.Register.Request) =>
  http.post<IApi.Register.Response>("/auth/register", data);
