class DefinitionGetParam {
  public page: number;
  public search: string;  
  constructor({
    page,
    search,
  }) {
    this.page = page;    
    this.search = search;
  }
}

export default DefinitionGetParam;
