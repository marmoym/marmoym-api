import db from '../../database';
import { UsageStatus } from '../../models/Status/UsageStatus';

export function insertUsage(trx, label: string, no: number) {
  return db.transacting(trx)
    .into('Usage')
    .insert({
      label: label,
      no : no,
      status: UsageStatus.NORMAL,
    });
};