import ApiParam from '@models/ApiParam';
import Definition from '@entities/Definition';

export default class DefinitionGetParam extends ApiParam {
  public definitionId: number;
  public limit: number;
  public offset: number;

  constructor(param) {
    super();
    this.definitionId = param.definitionId;
    this.limit = param.limit;
    this.offset = param.offset;
  }

  values(): any {
    return {
      ...(this.definitionId ? {definitionId: this.definitionId} : {}),
    };
  }
};
