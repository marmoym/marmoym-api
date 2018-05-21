import ApiParam from '@models/ApiParam';
import Definition from '@entities/Definition';

export default class DefinitionGetParam extends ApiParam {
  public definitions: Definition[];
  public limit: number;
  public offset: number;

  constructor(param) {
    super();
    this.definitions = param.definitions;
    this.limit = param.limit;
    this.offset = param.offset;
  }

  values(): any {
    return {
      definitions: this.definitions,
    };
  }
};
