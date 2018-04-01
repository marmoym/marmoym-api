import db from '../../database';
import EntityCommonStatus from '@constants/Status/EntityCommonStatus';
import Definition from '@entities/Definition';
import Term from '@entities/Term';

export function selectDefinitionsByIds(ids: number[]) {
  return db(Definition._NAME).where({
      status: EntityCommonStatus.NORMAL
    })
    .whereIn('id', ids)
    .select('id','label','term_id','user_id','vote_id','updated_at');
};

export function selectIdsOfRecentlyAdded(offset: number, limit:number) {
  return db(Definition._NAME).where({
      status: EntityCommonStatus.NORMAL
    })
    .select('id', 'updated_at')
    .orderBy('created_at', 'desc')
    .limit(limit)
    .offset(Number(offset));
}

export function selectIdsByIds(ids: number[]) {
  return db(Definition._NAME)
    .where({
      status: EntityCommonStatus.NORMAL,
    })
    .select('id', 'updated_at')
    .where('Definition.id', '=', ids);
}

export function selectIdsByTermExact(label: string, offset: number, limit: number) {
  return db(Definition._NAME)
    .leftJoin(Term._NAME, function() {
      this.on('Term.id', '=', 'Definition.term_id')
    })
    .where('Definition.status',EntityCommonStatus.NORMAL)
    .where('Term.status', EntityCommonStatus.NORMAL)
    .where('Term.label', label)
    .select('Definition.id', 'Definition.updated_at')
    .offset(offset)
    .limit(limit);
};

export function selectIdsByTerm(query: string, offset: number, limit: number) {
  let search_query = query.replace(' ', '%');

  return db(Definition._NAME)
    .leftJoin(Term._NAME, function() {
      this.on('Term.id', '=','Definition.term_id')
    })
    .where('Definition.status',EntityCommonStatus.NORMAL)
    .where('Term.status', EntityCommonStatus.NORMAL)
    .where('Term.label', '%'+search_query+'%')
    .select('Definition.id', 'Definition.updated_at')
    .orderBy('Definition.created_at', 'desc')
    .offset(offset)
    .limit(limit);
};
