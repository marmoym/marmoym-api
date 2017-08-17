import * as authService from '../../services/authService';
import models from '../../models/db';
import config from '../../config';

/**
 * ...
 */
export const deleteUser = async (req) => {
  return await models.user.update(
    {
      status: 'DELETE'
    }, 
    {
      where : {
        username : req.body.username
      }
    });
};