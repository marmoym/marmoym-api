import db from '../../database';

export const insertOrigin = (trx, label: string, defId: number) => {
  return db.transacting(trx)
    .into('Origin')
    .insert({
      label: label,
      def_id : defId,
      status: 'N',
    })
};