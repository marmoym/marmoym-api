import BaseEntity from '@entities/BaseEntity';

class DefinitionPos extends BaseEntity {
  public static _NAME: string = 'definition_pos';
  public static LABEL: string = 'label';
  public static NO: string = 'no';
  public static DEF_ID: string = 'def_id';
  public static POS_ID: string = 'pos_id';
  public static STATUS: string = 'status';

  constructor(param: DefinitionPos) {
    super();
  }
}

export default DefinitionPos;
