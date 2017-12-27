import BaseModel from './BaseModel';

class Comment extends BaseModel {

  /**
   * 
   */
  public static _NAME: string = 'Comment';
  public static PARENT_ID: string = 'parent_id';
  public static GPARENT_ID: string = 'gparent_id';
  public static TARGET_TYPE: string = 'target_type';
  public static TARGET_ID: string = 'target_id';
  public static LABEL: string = 'label';
  public static USER_ID: string = 'user_id';
  public static VOTE_ID: string = 'vote_id';
  public static STATUS: string = 'status';

  constructor(param: Comment) {
    super();
  }

}

export default Comment;
