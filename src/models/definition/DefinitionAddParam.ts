import ApiParam from '@models/ApiParam';
import Definition from '@entities/Definition';

export default class DefinitionAddParam extends ApiParam {
  public definition: Definition;

  constructor(param) {
    super();
    this.definition = param.definition;
  }

  values(): any {
    return {
      ...(this.definition ? {definition: this.definition} : {}),
    };
  }
};
