import ApiResult from '@models/ApiResult';

export interface DefinitionIF {
  definition_id: number,
  definition_label: string,
  term_id: number,
  term_label: string,
  user: string,
  vote: number,
  pos: number,
  usages: string[],
  updated_at: Date,
  created_at: Date,
};

export default class DefinitionGetResult extends ApiResult {
  public definitions: DefinitionIF[];

  constructor(data) {
    super();
    this.definitions = data;
  }
};
