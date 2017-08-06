import models from '../../../models/db'

/**
 * ...
 */
export async function getDefinitionByTermId(termId: any) {
  var list = await models.definition.findAll({
    where : {
      status : {$not: "DELETED"},
      $or : [
        {term_id : termId}
      ]
  }})
    .then(definitions => definitions)
    .catch(err => {
      console.log(err)
    })

  return list.map(info => info.dataValues)
}

/**
 * ...
 */
export const registerDefinition = async function registerDefinition(params: any, termId: number) {
  var result = await models.definition.create({
    term_id : termId,
    contents : params.definitionContents,
    user_id : "1" //고카톤용 
  })
    .then(result => result.dataValues.id)
    .catch(err => -1)

  return await result;
}
