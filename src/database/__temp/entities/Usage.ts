import BaseEntity from '@entities/BaseEntity';

class Usage extends BaseEntity {
  public static _NAME: string = 'usage';
  public static LABEL: string = 'label';
  public static NO: string = 'no';
  public static STATUS: string = 'status';

  constructor(param: Usage) {
    super();
  }
}

export default Usage;
