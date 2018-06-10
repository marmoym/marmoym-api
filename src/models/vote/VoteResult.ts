import ApiResult from '@models/ApiResult';
import Vote from '@entities/Vote';

export default class VoteResult extends ApiResult {
  public vote: Vote;

  constructor(data) {
    super();
    this.vote = data;
  }
};
