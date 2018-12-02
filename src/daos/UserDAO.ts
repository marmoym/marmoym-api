import db from '@@entities/db';

const { User } = db;

export async function insert(userId: string, password: string) {
  try {
    const result = await User.create({
      password,
      userId,
      username: userId,
    });
    return result;
  } catch (err) {
    console.log(123444, err);
  }
}
