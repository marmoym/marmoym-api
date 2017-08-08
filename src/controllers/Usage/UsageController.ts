import models from '../../models/db';

/**
 * ...
 */
export const getUsageByDefinitionId = async function getUsageByDefinitionId(definitionId: any) {
  var list = await models.usage.findAll({
    where : {
      status : {$not: "DELETED"},
      $or : [
        {def_id : definitionId}
      ]
    },
    order : 'no asc'
  })
    .then(usages => usages)

  return list.map(info => info.dataValues)
}

/**
 * ...
 */
export const getUsageIdByDefinitionId = async (definitionId: number) => {
  var list = await models.definition_usage.findAll({
    where : {
      $or : [
        {def_id : definitionId}
      ]
    }
  })
    .then(usageIdList => usageIdList)
  
  return list.map(elem => elem.dataValues.usage_id);
}

/**
 * ...
 */
export const registerUsage = async (params: any, definitionId: number) => {
  var result = await models.usage.create({
    contents : params.usageContents, 
    no : '1',//TODO 순서처리
    def_id : definitionId
  })
    .then(result => result.dataValues.id)
    .catch(err => -1)
  
  return result;
}

/**
 * ...
 */
export const connectUsageIdAndDefinitionId = async (usageId: number, definitionId: number ) => {
  var result = await models.definition_usage.create({
    def_id : definitionId,
    usage_id : usageId
  })
    .then(result => result.dataValues.id)
    .catch(err => -1)
    
  return result;
}
