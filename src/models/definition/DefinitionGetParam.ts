import ApiParam from '@models/ApiParam';

export default class DefinitionGetParam extends ApiParam {
  public definitionId: string;
  public page: number;
  public search: string;  

  constructor(param) {
    super();
    this.definitionId = param.definitionId;
    this.page = param.page;    
    this.search = param.search;
  }

  values(): any {
    return {
      ...(this.definitionId ? {definitionId: this.definitionId} : {}),
    };
  }
};
