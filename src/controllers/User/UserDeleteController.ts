import * as authService from '../../services/authService';

import { db1 } from '../../database';
import config from '../../config';

/**
 * ...
 */
export const deleteUser = async (req) => {
  return await db1.user.update(
    {
      status: 'DELETE'
    }, 
    {
      where : {
        username : req.body.username
      }
    });
};