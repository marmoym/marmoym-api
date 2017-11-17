class GetDefinitionIdsParam {
  /**
   * ...
   */
  public defIds?: number[];

  /**
   * ...
   */
  public offset?: number;

  constructor(param: GetDefinitionIdsParam) {
    this.defIds = param.defIds;
    this.offset = param.offset;
  }
}

export default GetDefinitionIdsParam;
