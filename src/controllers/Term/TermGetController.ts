import db from '../../database';
import * as TermSelectDAO from '../../dao/Term/TermSelectDAO';
import * as DefinitionSelectDAO from '../../dao/Definition/DefinitionSelectDAO';
import * as PosSelectDAO from '../../dao/Pos/PosSelectDAO';
import * as UsageSelectDAO from '../../dao/Usage/UsageSelectDAO';
import * as OriginSelectDAO from '../../dao/Origin/OriginSelectDAO';
import { transaction } from '../../database/databaseUtils';

export async function getTerms(req) {
  const termSelected = await TermSelectDAO.getRecentUpdatedTerm(req.offset);
  
  let temp = await Promise.all(termSelected.map(async obj => {
    obj['defs'] = [];
    const defs = await DefinitionSelectDAO.getRecentCreatedDefinitionsByTermId(obj.termId, 0, 1);

    //get Pos 
    const posSelected = await PosSelectDAO.getPosByDefinitionId(defs[0].id);
    defs[0]['poss'] = [];
    await Promise.all(posSelected.map(posObj => {
      defs[0]['poss'].push(posObj);
    }));

    //get usages 
    const usageSelected = await UsageSelectDAO.getUsageByDefinitionId(defs[0].id);
    defs[0]['usages'] = [];
    await Promise.all(usageSelected.map(usageObj => {
      defs[0]['usages'].push(usageObj);
    }));

    //get origins
    const originSelected = await OriginSelectDAO.getOriginByDefinitionId(defs[0].id);
    defs[0]['origins'] = [];
    await Promise.all(originSelected.map(originObj => {
      defs[0]['origins'].push(originObj);
    }));

    //TODO get extResources
    
    obj['defs'].push(defs[0]);
    return obj;
  }));

  return termSelected;
};