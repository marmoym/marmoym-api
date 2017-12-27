import BaseModel from "@models/BaseModel";

class CommentPath extends BaseModel {

  /**
   * 
   */
  public static _NAME: string = 'CommentPath';
  public static GPARENT_ID: string = 'gparent_id';
  public static PATH: string = 'path';
  public static STATUS: string = 'status';

  constructor(param: CommentPath) {
    super();
  }
  
}

export default CommentPath;
