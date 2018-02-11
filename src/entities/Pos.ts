import BaseEntity from '@entities/BaseEntity';

class Pos extends BaseEntity {
  public static _NAME: string = 'pos';
  public static LABEL: string = 'label';
  public static LABEL_EN: string = 'label_en';
  public static STATUS: string = 'status';

  constructor(param: Pos) {
    super();
  }
}

export default Pos;
