import { Router, Request, Response } from 'express'
import * as jwt from 'jsonwebtoken';

import { respond } from '../../services/responseService';
import { tokenAuthHandler } from '../../services/authService';

/**
 * Request Mapping: /api/v1/test/
 */
let router: Router = Router();

const a = (req, res, next) => {
  next();
}

const b = () => {
  let a = new Promise((resolve, reject) => {
    resolve(1);
  });

  return a;
}

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3QyIiwiaWF0IjoxNTAyMzgzMTQ3fQ.uELJhn4IEc-8D6zbUVVTfchkTuVrxQYi8yCLzSzpg0g
router.get('/', tokenAuthHandler, async (req: Request, res: Response) => {
  const token = jwt.sign({username: 'test2'}, 'secret');
  console.log(1, token)

  respond(res, 'processed');
  // b().then((r) => {
  //   console.log(123, r)
  //   res.sendStatus(200);
  // }).catch(err => {
  //   console.log('error');
  // });
  
});

export default router;