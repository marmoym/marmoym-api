import db from '../../database';
import { DefinitionStatus } from '../../models/Status/DefinitionStatus';
import { TermStatus } from '../../models/Status/TermStatus';

export function selectDefinitionsByIds(ids: number[]) {
  return db('Definition').where({
      status: DefinitionStatus.NORMAL
    })
    .whereIn('id', ids)
    .select('id','label','term_id','user_id','vote_id','updated_at');
};

export function selectIdsOfRecentlyAdded(offset: number, limit:number) {
  return db('Definition').where({
      status: DefinitionStatus.NORMAL
    })
    .select('id', 'updated_at')
    .orderBy('created_at', 'desc')
    .limit(limit)
    .offset(Number(offset));
}

export function selectIdsByTermExact(label: string, offset: number, limit: number) {
  return db('Definition')
    .leftJoin('Term', function() {
      this.on('Term.id', '=', 'Definition.term_id')
    })
    .where('Definition.status',DefinitionStatus.NORMAL)
    .where('Term.status', TermStatus.NORMAL)
    .where('Term.label', label)
    .select('Definition.id', 'Definition.updated_at')
    .offset(offset)
    .limit(limit);
};

export function selectIdsByTerm(query: string, offset: number, limit: number) {
  let search_query = query.replace(' ', '%');

  return db('Definition')
    .leftJoin('Term', function() {
      this.on('Term.id', '=','Definition.term_id')
    })
    .where('Definition.status',DefinitionStatus.NORMAL)
    .where('Term.status', TermStatus.NORMAL)
    .where('Term.label', '%'+search_query+'%')
    .select('Definition.id', 'Definition.updated_at')
    .orderBy('Definition.created_at', 'desc')
    .offset(offset)
    .limit(limit);
};