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

export async function registerDefinition(params: any) {
  if(await models.defintion.create({
      term_id : params.termId,
      contents : params.contents,
    }).then(
      (result) =>{
        return true;
      }
    ).catch(
      (err) => {
        return false;
      }
    )
  ){
    return true;
  }
  return false;
}
