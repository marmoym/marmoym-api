import ApiResult from '@models/ApiResult';

class DefinitionGetResult extends ApiResult {
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

  constructor({
    created_at,
    definition_id,
    definition_label,
    pos,
    term_label,
    term_id,
    updated_at,
    usages,
    ...restProps,
  }) {
    super(restProps);
    this.created_at = created_at;
    this.definition_label = definition_label;
    this.definition_id = definition_id;
    this.pos = pos;
    this.term_id = term_id;
    this.term_label = term_label;
    this.updated_at = updated_at;
    this.usages = usages;
  }
  
  public static ofMany(data) {
    return data.map((d) => {
      return new DefinitionGetResult({
        created_at: d.created_at,
        definition_id: d.definition_id,
        definition_label: d.definition_label,
        pos: d.pos,
        term_id: d.term_id,
        term_label: d.term_label,
        updated_at: d.updated_at,
        usages: d.usages,
      })
    });
  }
}

export default DefinitionGetResult;
