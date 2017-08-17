import * as TermController from './TermController';
import * as DefinitionController from '../Definition/DefinitionController';
import * as UsageController from '../Usage/UsageController';

/**
 * ...
 */
export const addTerm = async (req) => {
  var termId;
  if (await TermController.checkTermNameExist(req.body.name)) {
    //등록된 Term이 있으므로 Term id를 가져와서 def,usage등록
    var termInfo = await TermController.getTermByName(req.body.termName);
    termId = termInfo.id;
  } else {
    //등록된 Term이 없으므로 등록후 def,usage등롣
    termId = await TermController.registerTerm(req.body);
  }

  if (termId > 0) {
    var definitionId = await DefinitionController.registerDefinition(req.body, termId);
    //def를 등록했으니 usage를 등록하자
    if (definitionId > 0) {
      var usageId = await UsageController.registerUsage(req.body, definitionId);
      if (usageId > 0) {
        return 'Success';
      } else {
        //TODO 롤백처리필요
        return 'Error';
      }
    } else {
      return 'Error';
    }
  } else {
    return 'Error';
  }
};

