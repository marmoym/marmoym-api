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
//TODO usage등록처리

  return -1;
}

export async function connectUsageIdAndDefionitionId(usageId : number, definitionId : number ) {
//TODO definitio_usage 테이블에 usageid def id 등록처리

  return -1;
}
