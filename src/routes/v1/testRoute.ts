import { Router, Request, Response } from 'express'
import * as jwt from 'jsonwebtoken';

import { respond } from '../../services/responseService';
import { tokenAuthHandler } from '../../services/authService';
import MarmoymError from '../../models/MarmoymError';
import ErrorType from '../../constants/ErrorType';
import { db1 } from '../../database';

/**
 * Request Mapping: /api/v1/test/
 */
let router: Router = Router();

/**
 * Sample token
 * eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3QyIiwiaWF0IjoxNTAyMzgzMTQ3fQ.uELJhn4IEc-8D6zbUVVTfchkTuVrxQYi8yCLzSzpg0g
 */
router.get('/', tokenAuthHandler, async (req: Request, res: Response) => {
  const token = jwt.sign({username: 'test2'}, 'secret');
  respond(res, 'processed');
});

router.get("/a", (req, res) => {
  throw new MarmoymError(ErrorType.USER_INCORRECT_PASSWORD);
})

router.get("/b", (req, res) => {
  db1.User.findOne({
    where : {
      username : 'test',
    }
  })
    .then(data => {
      respond(res, data);
    })
})

export default router;