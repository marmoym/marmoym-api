import ApiResponse from '@@models/ApiResponse';
import DefinitionAddParam from '@@models/params/DefinitionAddParam';

export async function addDefinition({
  definition,
  term,
}: DefinitionAddParam): Promise<ApiResponse<any>> {
  // todo: this will be refactored soon
  // console.log(123, definition, term);
  return new ApiResponse({});
}
