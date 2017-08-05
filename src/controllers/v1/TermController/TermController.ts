/**
 * ...
 */
import models from '../../../models'

export async function getTermByName(input_name: String){
  var list = await models.term.findAll({
                  where : {
                    status: {$not : "DELETED"},
                    name : {$like : '%'+input_name+'%'}
                  }
                }).then((term) => {
                  return term;
                })
  var result = list.map(info => {
    return info.dataValues;
  })
  return result;
}

export async function registerTerm(params: any){
  
  var result = await models.term.create({
                  name: params.termName, 
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

export async function checkTermNameExist(input_name: String){
  if(await models.term.count({
      where: {
        status : {$not: "DELETED"},
        name : input_name   
      }
    }).then(
      (result) => {
        if(result == 0){
          return true;
        }else {
          return false;
        }
      }
    ).catch(
      (err) => {
        return false;
      }
    )
  ){
    return false;
  }
  return true;
}





