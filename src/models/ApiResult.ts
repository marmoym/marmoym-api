interface Cookie {
  maxAge: number;
  name: string;
  value: string;
}

export interface ApiParamParam {
  cookies?: Cookie[];
}

export default class ApiResult {
  public cookies: Cookie[] = undefined;

  constructor(param: ApiParamParam) {
    this.cookies = param.cookies ? param.cookies : undefined;
  }
};
