// import db from '@database/db';
// import EntityCommonStatus from '@entities/enums/EntityCommonStatus';
// import Definition from '@entities/Definition';
// import Term from '@entities/Term';
// import DefinitionPos from '@entities/DefinitionPos';
// import Pos from '@entities/Pos';
// import DefinitionUsage from '@entities/DefinitionUsage';
// import Usage from '@entities/Usage';
// import User from '@entities/User';  

export default class selectDefinitions {
  public static selectDefinitions({
    definitionId,
  }) {
    // return db.raw(`
    //   select 
    //     def.${Definition.ID} as definition_id,
    //     def.${Definition.LABEL} as definition_label,
    //     def.${Definition.STATUS} as definition_status,
    //     def.${Definition.TERM_ID} as term_id,
    //     term.${Term.LABEL} as term_label,
    //     term.${Term.ROMAN} as term_loman,
    //     term.${Term.STATUS} as term_status,
    //     pos.${Pos.ID} as pos_id,
    //     pos.${Pos.LABEL} as pos_label,
    //     pos.${Pos.LABEL_EN} as pos_label_en,
    //     pos.${Pos.STATUS} as pos_status,
    //     usage.${Usage.ID} as usage_id,
    //     usage.${Usage.NO} as usage_no,
    //     usage.${Usage.LABEL} as usage_label,
    //     usage.${Usage.STATUS} as usage_status,
    //     def.${Definition.CREATED_AT},
    //     def.${Definition.UPDATED_AT}
    //   from ${Definition._NAME} def
    //   left join ${Term._NAME} as term on def.${Definition.TERM_ID} = term.${Term.ID}
    //   left join ${DefinitionPos._NAME} as defpos on def.${Definition.ID} = defpos.${DefinitionPos.DEF_ID}
    //   left join ${Pos._NAME} as pos on defpos.${DefinitionPos.POS_ID} = pos.${Pos.ID}
    //   left join ${DefinitionUsage._NAME} as defusage on def.${Definition.ID} = defusage.${DefinitionUsage.DEF_ID}
    //   left join ${Usage._NAME} as usage on defusage.${DefinitionUsage.USAGE_ID} = usage.${Usage.ID}
    //   where 1 = 1
    //     ${definitionId ? `and def.id = ${definitionId}` : ''}
    // `)
    // .then((res) => res.rows);
  }
};
// select * from ${Definition._NAME} inner join ${Term._NAME} on ${Definition.TERM_ID} = ${Term.ID}


// export function selectDefinitionsByIds(ids: number[]) {
//   return db(Definition._NAME).where({
//       status: EntityCommonStatus.NORMAL
//     })
//     .whereIn('id', ids)
//     .select('id','label','term_id','user_id','vote_id','updated_at');
// };

// export function selectIdsOfRecentlyAdded(offset: number, limit:number) {
//   return db(Definition._NAME).where({
//       status: EntityCommonStatus.NORMAL
//     })
//     .select('id', 'updated_at')
//     .orderBy('created_at', 'desc')
//     .limit(limit)
//     .offset(Number(offset));
// }

// export function selectIdsByIds(ids: number[]) {
//   return db(Definition._NAME)
//     .where({
//       status: EntityCommonStatus.NORMAL,
//     })
//     .select('id', 'updated_at')
//     .where('Definition.id', '=', ids);
// }

// export function selectIdsByTermExact(label: string, offset: number, limit: number) {
//   return db(Definition._NAME)
//     .leftJoin(Term._NAME, function() {
//       this.on('Term.id', '=', 'Definition.term_id')
//     })
//     .where('Definition.status',EntityCommonStatus.NORMAL)
//     .where('Term.status', EntityCommonStatus.NORMAL)
//     .where('Term.label', label)
//     .select('Definition.id', 'Definition.updated_at')
//     .offset(offset)
//     .limit(limit);
// };

// export function selectIdsByTerm(query: string, offset: number, limit: number) {
//   let search_query = query.replace(' ', '%');

//   return db(Definition._NAME)
//     .leftJoin(Term._NAME, function() {
//       this.on('Term.id', '=','Definition.term_id')
//     })
//     .where('Definition.status',EntityCommonStatus.NORMAL)
//     .where('Term.status', EntityCommonStatus.NORMAL)
//     .where('Term.label', '%'+search_query+'%')
//     .select('Definition.id', 'Definition.updated_at')
//     .orderBy('Definition.created_at', 'desc')
//     .offset(offset)
//     .limit(limit);
// };
