import * as TermController from './TermController';
import * as DefinitionController from '../Definition/DefinitionController';
import * as UsageController from '../Usage/UsageController';

/**
 * ...
 */
export const getTermList = async (req) => {
  //텀가져오기
    var q = req.query.q == undefined ? '' : req.query.q;

    var termList = await TermController.getTermByName(q);
    var termIdList = termList.map(list => list.id);
    var definitionList = await DefinitionController.getDefinitionByTermId(termIdList);
    var definitionIdList = definitionList.map(list => list.id);
    // var usageIdList = await UsageController.getUsageIdByDefinitionId(definitionIdList)
    var usageList = await UsageController.getUsageByDefinitionId(definitionIdList);

    const result = termList.map(term => {
      term['defList'] = []

      definitionList.map(def => {
        def['usageList'] = []
        // usage
        usageList.map(usage => {
          if(usage['def_id'] == def['id']) {
            def['usageList'].push(usage)
          }
        })
        // add def
        if (def['term_id'] == term['id']) {
          term['defList'].push(def)
        }
      });
      return term;
    });

    return result;

};

