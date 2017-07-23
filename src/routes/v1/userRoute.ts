/**
 * Copyright Marmoym 2017
 * 
 */
import { Router, Request, Response, NextFunction } from 'express'
import UserController from '../../controllers/v1/UserController/UserController'

/**
 * Request Mapping: /api/v1/user/
 */
let router: Router = Router();

/**
 * ...
 */
router.get('/check_username_exist', (req: Request, res: Response) => {
  console.log(1, req.params)
  var result = UserController.checkUsernameExist(req.params.username)
  if(result){
    res.status(200).json({message: 'User Exist'})
  }else{
    res.status(404).json({code: 0, message: 'User Not Exist'});
  }
})

/**
 * ...
 */
router.get('/check_useremail_exist', (req: Request, res: Response) => {
  console.log(1, req.params)
  var result = UserController.checkUserEmailExist(req.params.useremail)
  if(result){
    res.status(200).json({message: 'UserEmail Exist'})
  }else{
    res.status(404).json({code: 0, message: 'UserEmail Not Exist'});
  }
})

/**
 * ...
 */
router.post('/login', (req: Request, res: Response) => {
 
  console.log(req.body)

  var result = UserController.getUserToken(req.body);
  
  result.then(function(value){
      if(value == undefined){
        res.status(404).json({code: 0, message: 'Login Fail'})
      }else{
        res.status(200).json({code: 1, token: value})
      }
  })

})

/**
 * ...
 */
router.post('/join', (req: Request, res: Response) => {
  console.log(req.body)
  var result = UserController.registerUser(req.body) 
  console.log(1, result) 
  if(result == 'JoinSuccess'){
    res.status(200).json({code: 0, message: 'Join Success'})
  }else if(result == 'UsernameExist'){
    res.status(406).json({code: 0, message: 'Username Exist'})
  }else if(result == 'UserEmailExist'){
    res.status(406).json({code: 0, message: 'UserEmail Exist'})
  }else{
    res.status(500).json({code: 0, message: 'Join Fail'})
  }

})

router.use('/update', (req: Request, res: Response, next: NextFunction ) => {
  if(UserController.verifyUserToken(req.headers['x-access-token']) == 'Verify'){
    next();
  }else{
    res.status(401).json({code: 0, message: 'Token Valid Fail'})
  }
});

router.put('/update', (req: Request, res: Response) => {
  var result = UserController.updateUserInfo(req.body)
  if(result == 'UpdateSuccess'){
    res.status(200).json({code: 0, message: 'Update Success'})
  }else if(result == 'UserEmailExist'){
    res.status(406).json({code: 0, message: 'UserEmail Exist'})
  }else{
    res.status(500).json({code: 0, message: 'Update Fail'})
  }
})

router.use('/delete', (req: Request, res: Response, next : NextFunction ) => {
  if(UserController.verifyUserToken(req.headers['x-access-token'])){
    next();
  }else{
    res.status(401).json({code: 0, message: 'Token Valid Fail'})
  }
});

router.delete('delete', (req: Request, res: Response) => {
  var result = UserController.deleteUser(req.body)
  if(result == 'DeleteSuccess'){
    res.status(200).json({code: 0, message: 'Delete Success'})
  }else{
    res.status(500).json({code: 0, message: 'Delete Fail'})
  }
})

export default router;