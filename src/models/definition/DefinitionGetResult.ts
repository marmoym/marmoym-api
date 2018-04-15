import ApiResult from '@models/ApiResult';

class DefinitionGetResult extends ApiResult {
  public def_id: number;
  public term_id: number;
  public term: string;
  public definition: string;
  public user: string;
  public vote: number;
  public pos: string;
  public usages: string[];
  public update_at: Date;
  public create_at: Date;

  constructor({
    create_at,
    definition,
    def_id,
    pos,
    term,
    term_id,
    update_at,
    usages,
    ...restProps,
  }) {
    super(restProps);
    this.create_at = create_at;
    this.definition = definition;
    this.def_id = def_id;
    this.pos = pos;
    this.term = term;
    this.term_id = term_id;
    this.update_at = update_at;
    this.usages = usages;
  }
  
  public static ofMany(data) {
    return data.map((d) => {
      return new DefinitionGetResult({
        create_at: d.create_at,
        definition: d.definition,
        def_id: d.def_id,
        pos: d.pos,
        term: d.term,
        term_id: d.term_id,
        update_at: d.update_at,
        usages: d.usages,
      })
    });
  }
}

export default DefinitionGetResult;
