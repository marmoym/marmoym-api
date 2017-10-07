import db from '../../database';
import { TermStatus } from '../../models/Status/TermStatus';

export function insertTerm(trx, label: string, roman: string) {
  return db.transacting(trx)
    .into('Term')
    .insert({
      label: label,
      roman: roman,
      status: TermStatus.NORMAL
    });
};