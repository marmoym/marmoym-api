import db from '../../database';
import UserStatus from '@constants/Status/UserStatus';
import Entity from '@constants/Entity';
import Field from '@constants/Field';

export function selectUserByEmail(email: string) {
  return db(Entity.USER).where({
      email: email
    })
    .whereNot({
      status: UserStatus.DELETED
    })
    .select(Field.ALL);
};

export function selectUserByUsername(username: string) {
  return db(Entity.USER).where({
      username: username
    })
    .whereNot({
      status: UserStatus.DELETED
    })
    .select(Field.ALL);
};

export function selectUserByUserId(userId: number) {
  return db(Entity.USER).where({
    id: userId
  })
  .whereNot({
    status: UserStatus.DELETED
  })
  .select('id', 'username', 'email', 'karma', 'created_at', 'updated_at');
}

export function selectUserByIds(userIds: number[]) {
  return db(Entity.USER)
  .whereNot({
    status: UserStatus.DELETED
  })
  .whereIn('id', userIds)
  .select('id', 'username', 'email', 'karma');
}
