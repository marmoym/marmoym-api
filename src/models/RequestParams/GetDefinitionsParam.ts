interface GetDefinitionsParamType {
  defIds: number[];
  offset?: number;
}

class GetDefinitionsParam implements GetDefinitionsParamType {
  defIds: number[];
  offset?: number;

  constructor(obj: GetDefinitionsParam) {
    // this.temp = 1;
    // this.temp2;
  }
}

export default GetDefinitionsParam;
