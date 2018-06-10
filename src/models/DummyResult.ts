import ApiResult from '@models/ApiResult';

export default class TestResult extends ApiResult {
  status: string;

  constructor({
    status,
  }) {
    super();
    this.status = status;
  }
};
