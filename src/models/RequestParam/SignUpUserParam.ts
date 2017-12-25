class SignUpUserParam {
  /**
   * ...
   */
  public email: string;

  /**
   * ...
   */
  public username: string;

  /**
   * ...
   */
  public password: string;


  constructor(param: SignUpUserParam) {
    this.email = param.email;
    this.password = param.password;
    this.username = param.username;
  }
}

export default SignUpUserParam;
