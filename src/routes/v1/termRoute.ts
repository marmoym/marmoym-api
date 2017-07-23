/**
 * Copyright Marmoym 2017
 * 
 * Term routes
 */

import { Router, Request, Response } from 'express'
import TermController from '../../controllers/v1/TermController/TermController'


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
router.post('/register', (req: Request, res: Response) => {

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