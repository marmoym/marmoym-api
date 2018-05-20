import BaseEntity from '@entities/BaseEntity';

class Origin extends BaseEntity {
  public static _NAME: string = 'origin';
  public static DEF_ID: string = 'def_id'
  public static LABEL: string = 'label';
  public static STATUS: string = 'status';

  constructor(param: Origin) {
    super();
  }
}

export default Origin;
