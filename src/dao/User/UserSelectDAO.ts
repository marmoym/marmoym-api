import db from '../../database';

export const selectUserByEmail = (email: string) => {
  return db('User').where({
    email: email
  })
  .select();
};

export const selectUserByUsername = (username: string) => {
  return db('User').where({
    username: username
  })
  .select();
};
