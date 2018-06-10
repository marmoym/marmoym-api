import ApiParam from '@models/ApiParam';

export default class VoteParam extends ApiParam {
  public targetType: string;
  public targetId: string;
  public userId: number;

  constructor({
    targetType,
    targetId,
    userId,
  }: {
    targetType: string;
    targetId: string;
    userId: number;
  }) {
    super();
    this.targetType = targetType;
    this.targetId = targetId;
    this.userId = userId;
  }
};
