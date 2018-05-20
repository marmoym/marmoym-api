import BaseEntity from '@entities/BaseEntity';

class Vote extends BaseEntity {
  public static _NAME: string = 'vote';
  public static TARGET_TYPE: string = 'target_type';
  public static TARGET_ID: string = 'target_id';
  public static UPVOTE_COUNT: string = 'upvote_count';
  public static DOWNVOTE_COUNT: string = 'downvote_count';
  public static STATUS: string = 'status';

  constructor(param: Vote) {
    super();
  }
}

export default Vote;
