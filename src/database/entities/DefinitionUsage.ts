import BaseEntity from '@entities/BaseEntity';

class DefinitionUsage extends BaseEntity {
  public static _NAME: string = 'definition_usage';
  public static DEF_ID: string = 'def_id';
  public static USAGE_ID: string = 'usage_id';
  public static STATUS: string = 'status';

  constructor(param: DefinitionUsage) {
    super();
  }
}

export default DefinitionUsage;
