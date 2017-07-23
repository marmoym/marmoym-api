/**
 * Copyright Marmoym 2017
 * 
 */
import { Router, Request, Response, NextFunction } from 'express'
import * as UserController from '../../controllers/v1/UserController/UserController'

/**
 * Request Mapping: /api/v1/user/
 */
let router: Router = Router();


/**
 * ...
 */
router.get('/check_username_exist', async (req: Request, res: Response) => {
  
  var result = await UserController.checkUsernameExist(req.params.username)
  
  if(result){
    res.status(200).json({message: 'User Exist'})
  }else{
    res.status(404).json({code: 0, message: 'User Not Exist'});
  }
})

/**
 * ...
 */
router.get('/check_useremail_exist', async (req: Request, res: Response) => {
  
  var result = await UserController.checkUserEmailExist(req.params.useremail)
  
  if(result){
    res.status(200).json({message: 'UserEmail Exist'})
  }else{
    res.status(404).json({code: 0, message: 'UserEmail Not Exist'});
  }

})

/**
 * ...
 */
router.post('/login', async (req: Request, res: Response) => {
 
  var result = await UserController.getUserToken(req.body);
  
  if(result == undefined){
    res.status(404).json({code: 0, message: 'Login Fail'})
  }else{
    res.status(200).json({code: 1, token: result})
  }

})

/**
 * ...
 */
router.post('/join', async (req: Request, res: Response) => {
  
  var result = await UserController.registerUser(req.body) 
  
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

router.use('/update', async (req: Request, res: Response, next: NextFunction ) => {
 
  var result = await UserController.verifyUserToken(req.headers['x-access-token'], req.body)
  
  if(result == 'Authorized'){
    next();
  }else if(result == 'NotAuthorized'){
    res.status(401).json({code: 0, message: 'Not Authorized'})
  }else if(result == 'TokenValidError'){
    res.status(401).json({code: 0, message: "Token Valid Fail"})
  }else {
    res.send(500).json({code: 0, message: 'Internal Server Error'})
  }

});

router.put('/update', async (req: Request, res: Response) => {
  
  var result = await UserController.updateUserInfo(req.body)
  
  if(result == 'UpdateSuccess'){
    res.status(200).json({code: 0, message: 'Update Success'})
  }else if(result == 'UserEmailExist'){
    res.status(406).json({code: 0, message: 'UserEmail Exist'})
  }else{
    res.status(500).json({code: 0, message: 'Update Fail'})
  }

})

router.use('/delete', async (req: Request, res: Response, next : NextFunction ) => {
  
  var result = await UserController.verifyUserToken(req.headers['x-access-token'], req.body)
  
  if(result == 'Authorized'){
    next();
  }else if(result == 'NotAuthorized'){
    res.status(401).json({code: 0, message: 'Not Authorized'})
  }else if(result == 'TokenValidError'){
    res.status(401).json({code: 0, message: "Token Valid Fail"})
  }else {
    res.send(500).json({code: 0, message: 'Internal Server Error'})
  }

});

router.delete('delete', async (req: Request, res: Response) => {
  
  var result = await UserController.deleteUser(req.body)
  
  if(result == 'DeleteSuccess'){
    res.status(200).json({code: 0, message: 'Delete Success'})
  }else{
    res.status(500).json({code: 0, message: 'Delete Fail'})
  }
  
})

export default router;