import { db1 } from '../../database';
import * as winston from 'winston';

/**
 * ...
 */
export async function getDefinitionByTermId(termId: any) {
  var list = await db1.definition.findAll({
    where: {
      status: { $not: "DELETED" },
      $or: [
        { term_id: termId }
      ]
    }
  })
    .then(definitions => definitions)
    .catch(err => {
      winston.error(err)
    });

  return list.map(info => info.dataValues)
}

/**
 * ...
 */
export const registerDefinition = async function registerDefinition(params: any, termId: number) {
  return await db1.definition.create({
    term_id: termId,
    contents: params.definitionContents,
    user_id: "1" //고카톤용
  })
    .then(result => result.dataValues.id)
    .catch(err => {
      winston.error(err);
    });

}
