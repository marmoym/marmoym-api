import db from '../../database';

export function getOriginByDefinitionId (defId: number) {
  return db('Origin').where({
    def_id: defId,
    status: 'N'
  })
  .select('label')
  .orderBy('created_at', 'desc');
};

