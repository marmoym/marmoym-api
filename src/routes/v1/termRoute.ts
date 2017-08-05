/**
 * Copyright Marmoym 2017
 * 
 * Term routes
 */

import { Router, Request, Response } from 'express'
import * as TermController from '../../controllers/v1/TermController/TermController'
import * as DefinitionController from '../../controllers/v1/DefinitionController/DefinitionController'
import * as UsageController from '../../controllers/v1/UsageController/UsageController'

/**
 * Request Mapping: /api/v1/term/
 */
let router: Router = Router();

/**
 * ...
 */
router.get('/:name', (req: Request, res: Response) => {
  
})

/**
 * ...
 */
router.post('/register', async (req: Request, res: Response) => {
  var termId;
  if(await TermController.checkTermNameExist(req.body.name)){
    //등록된 Term이 있으므로 Term id를 가져와서 def,usage등록
    var termInfo = await TermController.getTermByName(req.body.name)
    termId = termInfo.id;
  }else{
    //등록된 Term이 없으므로 등록후 def,usage등롣
    termId = await TermController.registerTerm(req.body)
    
  }

  if(termId > 0){
    var definitionId = await DefinitionController.registerDefinition(req.body, termInfo.id)
      if(definitionId > 0){//def를 등록했으니 usage를 등록하자
        var usageId = await UsageController.registerUsage(req.body, definitionId)
        if(usageId > 0){
          var result = await UsageController.connectUsageIdAndDefionitionId(usageId, definitionId)
          if(result >0){
            res.status(200).json({code: 1, });
          }else{
            //TODO 롤백처리필요
            res.status(500).json({code: 1, message: 'Internal Server Error'});
          }
        }else{
          //TODO 롤백처리필요
          res.status(500).json({code: 1, message: 'Internal Server Error'});
        }
      }else{
        //TODO 롤백 처리
        res.status(500).json({code: 1, message: 'Internal Server Error'});
      }
  }
  else{
    //TODO 롤백 처리
    res.status(500).json({code: 1, message: 'Internal Server Error'});
  }
 
})

/**
 * ...
 */
router.put('/update/:id', (req: Request, res: Response) => {

})

/**
 * ...
 */
router.delete('/delete/:id', (req: Request, res: Response) => {

})


export default router;