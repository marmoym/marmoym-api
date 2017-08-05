/**
 * ...
 */
import models from '../../../models/db'

export async function getDefinitionByTermId(termId: any) {
  console.log(5, termId);
  var list = await models.definition.findAll({
                        where : {
                          status : {$not: "DELETED"},
                          $or : [
                            {term_id : termId}
                          ]
                        }
  
                      }).then((definitions) => {
                        console.log(6, definitions)
                        return definitions;
                      })
                      .catch((err) =>{
                        console.log(err)
                      })
  var result = list.map(info => {
    return info.dataValues;
  })
  return result;
}

export async function registerDefinition(params: any, termId: number) {
  console.log(1, 'iamhere'+params.definitionContents+termId)
  var result = await models.definition.create({
      term_id : termId,
      contents : params.definitionContents,
      user_id : "1" //고카톤용 
    }).then(
      (result) => {
        console.log(4, result.dataValues)
        return result.dataValues.id;
      }
    ).catch(
      (err) => {
        console.log(4141, err)
        return -1;
      }
    )

return await result;
  
}
