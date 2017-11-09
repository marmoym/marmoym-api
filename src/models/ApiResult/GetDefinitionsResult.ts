class GetDefinitionsResult {
  public terms: any[];
  public definitions: any[];
  public users: any[];

  constructor() {
    this.terms = [];
    this.definitions = [];
    this.users = [];
  }
}

export default GetDefinitionsResult;
