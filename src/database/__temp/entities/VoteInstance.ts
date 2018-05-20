import BaseEntity from '@entities/BaseEntity';

class VoteInstance extends BaseEntity {
  public static _NAME: string = 'vote_instance';
  public static TARGET_TYPE: string = 'target_type';
  public static TARGET_ID: string = 'target_id';
  public static USER_ID: string = 'user_id';
  public static ACTION: string = 'action';
  
  public static STATUS: string = 'status';

  constructor(param: VoteInstance) {
    super();
  }
}

export default VoteInstance;
