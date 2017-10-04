import db from '../../database';
import * as DefinitionInsertDAO from '../../dao/Definition/DefinitionInsertDAO';
import * as TermSelectDAO from '../../dao/Term/TermSelectDAO';
import * as TermInsertDAO from '../../dao/Term/TermInsertDAO';
import * as UsageInsertDAO from '../../dao/Usage/UsageInsertDAO';
import * as OriginInsertDAO from '../../dao/Origin/OriginInsertDAO';
import { transaction } from '../../database/databaseUtils';

export const addDefinition = (req) => {
  return transaction(async trx => {
    let term = await TermSelectDAO.getTermByLabel(req.term);
    const termId = term.length ? 
      term[0].id 
      : (await TermInsertDAO.insertTerm(trx, req.term, req.roman))[0];

    for (const def of req.defs) {
      const defInserted = await DefinitionInsertDAO.insertDefinition(trx, def, termId);
      const defPosInserted = 
      await DefinitionInsertDAO.insertDefinitionPos(trx, defInserted[0], def.posIds);

      let i = 0;
      for (const usage of def.usages) {
        const usageInserted = await UsageInsertDAO.addUsage(trx, usage, i++);
        const defUsage = await DefinitionInsertDAO.insertDefinitionUsage(
          trx, 
          defInserted[0], 
          usageInserted[0]);

      };
      for (const origin of def.origins) {
        const originInserted = await OriginInsertDAO.insertOrigin(trx, origin, defInserted[0]);
      }
    }
    return 'success';
  });
}