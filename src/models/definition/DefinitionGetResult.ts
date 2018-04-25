import ApiResult from '@models/ApiResult';

export default class DefinitionGetResult extends ApiResult({
  definitions: [
    {
      definition_id: 0,
      definition_label: '',
      term_id: 0,
      term_label: '',
      user: '',
      vote: 0,
      pos: '',
      usages: [''],
      updated_at: new Date(),
      created_at: new Date(),
    },
  ],
}) {
  public definition_id: number;
  public definition_label: string;
  public term_id: number;
  public term_label: string;
  public user: string;
  public vote: number;
  public pos: string;
  public usages: string[];
  public updated_at: Date;
  public created_at: Date;

  constructor(data) {
    super({
      definitions: data,
    });
  }
};
