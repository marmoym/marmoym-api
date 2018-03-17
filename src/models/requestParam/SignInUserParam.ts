class SignInUserParam {
  /**
   * ...
   */
  public email: string;

  /**
   * ...
   */
  public password: string;


  constructor(param: SignInUserParam) {
    this.email = param.email;
    this.password = param.password;
  }
}

export default SignInUserParam;
