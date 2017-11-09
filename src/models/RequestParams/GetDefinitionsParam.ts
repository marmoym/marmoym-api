class GetDefinitionsParam {
  public defIds: number[];
  public offset?: number;

  constructor(param: GetDefinitionsParam) {
    this.defIds = param.defIds;
    this.offset = param.offset;
  }
}

export default GetDefinitionsParam;
