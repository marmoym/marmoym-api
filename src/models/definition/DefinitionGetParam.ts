import ApiParam from '@models/ApiParam';
import Definition from '@entities/Definition';

export default class DefinitionGetParam extends ApiParam {
  public definitions: Definition[];

  constructor(param) {
    super();
    this.definitions = param.definitions;
  }

  values(): any {
    return {
      definitions: this.definitions,
    };
  }
};
