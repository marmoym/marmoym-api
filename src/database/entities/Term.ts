import BaseEntity from '@entities/BaseEntity';

class Term extends BaseEntity {
  public static _NAME: string = 'term';
  public static LABEL: string = 'label';
  public static ROMAN: string = 'roman';
  public static STATUS: string = 'status';

  constructor(param: Term) {
    super();
  }
}

export default Term;
