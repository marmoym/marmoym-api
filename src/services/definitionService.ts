import ApiResult from '@@models/ApiResult';
import DefinitionAddParam from '@@models/params/DefinitionAddParam';

export async function addDefinition({
  definition,
  term,
}: DefinitionAddParam): Promise<ApiResult<any>> {
  // todo: this will be refactored soon
  // console.log(123, definition, term);
  return new ApiResult({});
}
