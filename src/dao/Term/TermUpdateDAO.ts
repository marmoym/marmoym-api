import db from '../../database';
import { TermStatus } from "../../models/TermStatus";

export const updateTermOnlyUpdatedAt = (trx, termId: number) => {
  return db.transacting(trx)
    .into('Term')
    .where({
      id: termId,
    })
    .whereNot({
      status: TermStatus.DELETED
    })
    .update({
      updated_at: db.fn.now()
    });
};