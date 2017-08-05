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
router.get('/test', (req: Request, res: Response) => {
   res.status(200).json({code: 1, mesage: 'Success'});
})

/**
 * ...
 */
router.get('/', async(req: Request, res: Response) => {
  //텀가져오기
  console.log(1, req.query.q)
  var termList = await TermController.getTermByName(req.query.q);
  console.log(10000, termList);
  var termIdList = termList.map(list => {
    console.log(100, list.id)
    return list.id;
  })
  var definitionList = await DefinitionController.getDefinitionByTermId(termIdList);
  
  var definitionIdList = definitionList.map(list => {
    return list.id;
  })
  var usageIdList = await UsageController.getUsageIdByDefinitionId(definitionIdList)
  var usageList = await UsageController.getUsageByUsageId(usageIdList);
  console.log(10000, termList);
  console.log(4321, definitionList)
  console.log(112412414, usageList)

  var result = [];
  
  termList.map(list => {
    var temp = [];
    definitionList.map(defList => {
      var usage = usageList.map(usageList => {
        if(defList.id == usageList.id){
          return usageList;
        }
      })
      if(defList.term_id == list.id){
        temp.push(defList);
        temp.push(usageList);
      }
      
    })
    console.log(5151515151515151515, temp);

  
  })
  console.log(1512515151, result);

  res.status(200).json({code: 1, mesage: 'Success'});
})
/**
 * ...
 */
router.post('/', async (req: Request, res: Response) => {
  console.log(1, req.body)
  var termId;
  if(await TermController.checkTermNameExist(req.body.name)){
    //등록된 Term이 있으므로 Term id를 가져와서 def,usage등록
    var termInfo = await TermController.getTermByName(req.body.termName)
    termId = termInfo.id;
  }else{
    //등록된 Term이 없으므로 등록후 def,usage등롣
    termId = await TermController.registerTerm(req.body)
    
  }
  console.log(1, 'heello'+termId+req.body)
  if(termId > 0){
    var definitionId = await DefinitionController.registerDefinition(req.body, termId)
      if(definitionId > 0){//def를 등록했으니 usage를 등록하자
        var usageId = await UsageController.registerUsage(req.body, definitionId)
        if(usageId > 0){
          var result = await UsageController.connectUsageIdAndDefionitionId(usageId, definitionId)
          if(result >0){
            res.status(200).json({code: 1, mesage: 'Success'});
          }else{
            //TODO 롤백처리필요
            res.status(500).json({code: 2, message: 'Internal Server Error'});
          }
        }else{
          //TODO 롤백처리필요
          res.status(500).json({code: 3, message: 'Internal Server Error'});
        }
      }else{
        //TODO 롤백 처리
        res.status(500).json({code: 4, message: 'Internal Server Error'});
      }
  }
  else{
    //TODO 롤백 처리
    res.status(500).json({code: 5, message: 'Internal Server Error'});
  }
 
})

/**
 * ...
 */
router.put('/', (req: Request, res: Response) => {
  res.status(200).json({code: 1, mesage: 'Succ222ess'});
})

/**
 * ...
 */
router.delete('/delete/:id', (req: Request, res: Response) => {

})


export default router;