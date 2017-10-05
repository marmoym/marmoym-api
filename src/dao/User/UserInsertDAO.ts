import db from '../../database';
import { UserStatus } from "../../models/UserStatus";

export const insertUser = (trx, data: any, encodedPw: string) => {
  return db.transacting(trx)
    .into('User')
    .insert({
      username: data.username,
      password: encodedPw,
      email: data.email,
      status: UserStatus.PENDING
    })
};