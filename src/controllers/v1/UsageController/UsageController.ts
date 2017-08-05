/**
 * ...
 */
import models from '../../../models'

export async function getUsageByUsageId(usageId : any) {

   var list = await models.usage.findAll({
                      where : {
                        status : {$not: "DELETED"},
                        $or : [
                          {id : usageId}
                        ]
                      },
                      order : 'no asc'
                    }).then((usages) => {
                      return usages;
                    })

  var result = list.map(info => {
    return info.dataValues;
  })

  return result;

  
}

export async function getUsageIdByDefinitionId(definitionId : number) {
  var list = await models.definition_usage.findAll(  {
                  where : {
                    def_id : definitionId
                  }
                }).then((usageIdList) => {
                  return usageIdList;
                });
  
  
  var result = list.map(elem => {
    return elem.dataValues.usage_id;
  })
  return result;
}


export async function registerUsage(params : any, definitionId : number) {
  var result = await models.usage.create({
                  contents : params.usageContents, 
                }).then(
                  (result) => {
                    console.log(1000, result.dataValues)
                    return result.dataValues.id;
                  }
                ).catch(
                  (err) => {
                    return -1;
                  }
                )
  return result;

}

export async function connectUsageIdAndDefionitionId(usageId : number, definitionId : number ) {
  var result = await models.definition_usage.create({
                  def_id : definitionId,
                  usage_id : usageId
                }).then(
                  (result) => {
                    console.log(1000, result.dataValues)
                    return result.dataValues.id;
                  }
                ).catch(
                  (err) => {
                    return -1;
                  }
                )
  return result;
}
