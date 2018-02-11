import BaseEntity from '@entities/BaseEntity';

class Definition extends BaseEntity {
  public static _NAME: string = 'definition';
  public static LABEL: string = 'label';
  public static TERM_ID: string = 'term_id';
  public static USER_ID: string = 'user_id';
  public static VOTE_ID: string = 'vote_id';
  public static STATUS: string = 'status';

  constructor(param: Definition) {
    super();
  }
}

export default Definition;
