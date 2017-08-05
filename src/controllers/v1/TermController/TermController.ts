/**
 * ...
 */
import models from '../../../models'

export async function getTermByName(input_name: String){
  var termInfo = await models.term.findOne({
                  where : {
                    status: {$not: "DELETED"},
                    name : input_name
                  }
                }).then((term) => {
                  return term;
                })
  return termInfo;
}

export async function registerTerm(params: any){

  if(!await checkTermNameExist(params.username)) {
    return false;
  }
  
  if(await models.term.create({
      name: params.name, 
    }).then(
      (result) => {
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
    return true;
  }
  return false;
}





