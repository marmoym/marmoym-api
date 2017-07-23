/**
 * ...
 */
import models from '../../../models'

class TermController {

  public getTermByName(input_name: String) {
    return models.term.findOne({
        where : {
          status: {$not: "DELETED"},
          name : input_name
        }
    }).then((term) => {
      return term;
    })
  }

  public registerTerm(param: any) {
     
    if(!this.checkTermNameExist(param.username)) {
      return false;
    }
    
    if(models.term.create({
        name: param.name, 
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

  public checkTermNameExist(input_name : String){
    if(models.term.count({
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




}

export default new TermController()