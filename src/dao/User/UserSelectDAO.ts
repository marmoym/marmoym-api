import db from '../../database';
import { UserStatus } from "../../models/Status/UserStatus";

export function selectUserByEmail(email: string) {
  return db('User').where({
      email: email
    })
    .whereNot({
      status: UserStatus.DELETED
    })
    .select();
};

export function selectUserByUsername(username: string) {
  return db('User').where({
      username: username
    })
    .whereNot({
      status: UserStatus.DELETED
    })
    .select();
};

export function selectUserByUserId(userId: number) {
  return db('User').where({
    id: userId
  })
  .whereNot({
    status: UserStatus.DELETED
  })
  .select('id', 'username', 'email', 'karma', 'created_at', 'updated_at');
}