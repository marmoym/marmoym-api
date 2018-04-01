import db from '../../database';
import UserStatus from '@constants/Status/UserStatus';
import Field from '@constants/Field';
import User from '@entities/User';

export function selectUserByEmail(email: string) {
  return db(User._NAME).where({
      email: email
    })
    .whereNot({
      status: UserStatus.DELETED
    })
    .select(Field.ALL);
};

export function selectUserByUsername(username: string) {
  return db(User._NAME).where({
      username: username
    })
    .whereNot({
      status: UserStatus.DELETED
    })
    .select(Field.ALL);
};

export function selectUserByUserId(userId: number) {
  return db(User._NAME).where({
    id: userId
  })
  .whereNot({
    status: UserStatus.DELETED
  })
  .select('id', 'username', 'email', 'karma', 'created_at', 'updated_at');
}

export function selectUserByIds(userIds: number[]) {
  return db(User._NAME)
  .whereNot({
    status: UserStatus.DELETED
  })
  .whereIn('id', userIds)
  .select('id', 'username', 'email', 'karma');
}
