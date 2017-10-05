import db from '../../database';

export const addUsage = (trx, label: string, no: number) => {
  return db.transacting(trx)
    .into('Usage')
    .insert({
      label: label,
      no : no,
      status: 'N',
    });
};