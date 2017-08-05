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

export async function getUsageIdByDefinitionId(defintionId : number) {
  var list = await models.definition_usage.findAll(  {
                  where : {
                    def_id : defintionId
                  }
                }).then((usageIdList) => {
                  return usageIdList;
                });
  
  
  var result = list.map(elem => {
    return elem.dataValues.usage_id;
  })
  return result;
}
              