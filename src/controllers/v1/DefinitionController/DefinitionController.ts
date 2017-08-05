/**
 * ...
 */
import models from '../../../models'

export async function getDefinitionByTermId(termId: number) {
  var list = await models.definiton.findAll({
                        where : {
                          status : {$not: "DELETED"},
                          term_id : termId
                        }
  
                      }).then((definitions) => {
                        return definitions;
                      })
  var result = list.map(info => {
    return info.dataValues;
  })
  return result;
}

export async function registerDefinition(params: any, termId: number) {
  console.log(1, 'iamhere')
  var result = await models.definition.create({
      term_id : termId,
      contents : params.definitionContents,
    }).then(
      (result) =>{
        return result.dataValues.id;
      }
    ).catch(
      (err) => {
        return -1;
      }
    )

return await result;
  
}
