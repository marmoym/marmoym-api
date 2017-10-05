import db from '../../database';
import { UserStatus } from "../../models/UserStatus";

export const selectUserByEmail = (email: string) => {
  return db('User').where({
      email: email
    })
    .whereNot({
      status: UserStatus.DELETED
    })
    .select();
};

export const selectUserByUsername = (username: string) => {
  return db('User').where({
      username: username
    })
    .whereNot({
      status: UserStatus.DELETED
    })
    .select();
};
