import models from '../../../models/db'

/**
 * ...
 */
export const getTermByName = async function getTermByName(input_name: String) {
  var list = await models.term.findAll({
    where : {
      status: {$not : "DELETED"},
      name : {$like : '%'+input_name+'%'}
    }
  })
    .then(term => term);

  return list.map(info => info.dataValues);
}

/**
 * ...
 */
export const registerTerm = async function registerTerm(params: any) {
  var result = await models.term.create({
    name: params.termName, 
  })
    .then(result => result.dataValues.id)
    .catch(err => -1);
  
  return result;
}

/**
 * ...
 */
export const checkTermNameExist = async function checkTermNameExist(input_name: String) {
  if (await models.term.count({
    where: {
      status : {$not: "DELETED"},
      name : input_name   
    }
  })
    .then(result => result == 0 ? true : false)
    .catch(err => false)
  ) {
    return false;
  }
  return true;
}
