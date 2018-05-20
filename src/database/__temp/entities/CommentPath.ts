import BaseEntity from "@entities/BaseEntity";

class CommentPath extends BaseEntity {
  public static _NAME: string = 'comment_path';
  public static GPARENT_ID: string = 'gparent_id';
  public static PATH: string = 'path';
  public static STATUS: string = 'status';

  constructor(param: CommentPath) {
    super();
  }
}

export default CommentPath;
