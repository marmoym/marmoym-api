import db from '../../database';
import * as TermSelectDAO from '../../dao/Term/TermSelectDAO';
import * as DefinitionSelectDAO from '../../dao/Definition/DefinitionSelectDAO';
import * as PosSelectDAO from '../../dao/Pos/PosSelectDAO';
import * as UsageSelectDAO from '../../dao/Usage/UsageSelectDAO';
import * as OriginSelectDAO from '../../dao/Origin/OriginSelectDAO';
import MarmoymError from '../../models/MarmoymError';
import ErrorType from '../../models/ErrorType';
import { transaction } from '../../database/databaseUtils';

export async function getDefinitionByTermId(req) {
  const termSelected = await TermSelectDAO.selectTermByTermId(req.termId);

  if (termSelected.length == 0) {
    throw new MarmoymError(ErrorType.Term.TERM_NOT_FOUND);
  } else {
    termSelected[0]['defs'] = [];
    //TODO 현재는 최신순으로 등록된 defs를 가져오지만 추후 vote순으로 가져오기
    const defs = 
      await DefinitionSelectDAO.selectRecentlyCreatedDefinitionsByTermId(req.termId, req.offset, 5);

    await Promise.all(defs.map(async defObj => {
      //get Pos 
      const posSelected = await PosSelectDAO.selectPosByDefinitionId(defObj.id);
      defObj['poss'] = [];
      await Promise.all(posSelected.map(posObj => {
        defObj['poss'].push(posObj);
      }));

      //get usages 
      const usageSelected = await UsageSelectDAO.selectUsageByDefinitionId(defObj.id);
      defObj['usages'] = [];
      await Promise.all(usageSelected.map(usageObj => {
        defObj['usages'].push(usageObj);
      }));

      //get origins
      const originSelected = await OriginSelectDAO.selectOriginByDefinitionId(defObj.id);
      defObj['origins'] = [];
      await Promise.all(originSelected.map(originObj => {
        defObj['origins'].push(originObj);
      }));

      //TODO get extResources
      
    }));
    
    termSelected[0]['defs'].push(defs);
  }
  
  return termSelected;
};