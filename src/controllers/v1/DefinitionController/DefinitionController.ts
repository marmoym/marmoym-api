/**
 * ...
 */
import models from '../../../models'

export async function getDefinitionByTermId(termId: number){
  var definitionInfo = await models.definiton.find({
                        where : {
                          status : {$not: "DELETED"},
                          term_id : termId
                        }
  
                      }).then((definitions) => {
                        return definitions;
                      })

  return definitionInfo;
}

export async function registerDefinition(params: any){
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
