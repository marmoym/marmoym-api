/**
 * Copyright Marmoym 2017
 * 
 */
import { Router, Request, Response } from 'express'
import UserController from '../../controllers/v1/UserController/UserController'

/**
 * Request Mapping: /api/v1/user/
 */
let router: Router = Router();

/**
 * ...
 */
router.get('/login', (req: Request, res: Response) => {
  console.log("hello")
  var result = UserController.getUserToken("admin");
  console.log(1, result)
  res.send("hello"+result)
})

/**
 * ...
 */
router.get('/join', (req: Request, res: Response) => {
  res.send('join')
})

/**
 * ...
 */
router.post('/test', (req: Request, res: Response) => {
  console.log(1, req['body']);
  // UserController.getUserInfo("powerwer123123", "dsds")
  res.send('test')
})

/**
 * ...
 */
router.get('/signup', (req: Request, res: Response) => {

  UserController.registerUser("test", "test");
  res.send('sign up success')
})

export default router;