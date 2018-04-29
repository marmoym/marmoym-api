import UserStatus from '@constants/Status/UserStatus';
import User from '@entities/User';

export default class UserSelectDAO {
  public static selectUserByEmail(conn, {
    email,
    password,
  }) {
    return conn.raw(`
      select 
        email,
        password
      from public.user
      where email = '${email}';
    `).then((res) => res.rows[0]);
  }
};

// export function selectUserByEmail(email: string) {
//   return db(User._NAME).where({
//       email: email
//     })
//     .whereNot({
//       status: UserStatus.DELETED
//     })
//     .select('*');
// };

// export function selectUserByUsername(username: string) {
//   return db(User._NAME).where({
//       username: username
//     })
//     .whereNot({
//       status: UserStatus.DELETED
//     })
//     .select('*');
// };

// export function selectUserByUserId(userId: number) {
//   return db(User._NAME).where({
//     id: userId
//   })
//   .whereNot({
//     status: UserStatus.DELETED
//   })
//   .select('id', 'username', 'email', 'karma', 'created_at', 'updated_at');
// }

// export function selectUserByIds(userIds: number[]) {
//   return db(User._NAME)
//   .whereNot({
//     status: UserStatus.DELETED
//   })
//   .whereIn('id', userIds)
//   .select('id', 'username', 'email', 'karma');
// }
