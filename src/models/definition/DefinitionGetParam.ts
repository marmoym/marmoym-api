import ApiParam from '@models/ApiParam';

export default class DefinitionGetParam extends ApiParam {
  public page: number;
  public search: string;  
  constructor({
    page,
    search,
  }) {
    super();
    this.page = page;    
    this.search = search;
  }
};
