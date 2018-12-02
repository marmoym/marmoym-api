import ApiResult from '@@models/ApiResult';
import Token from '@@modules/Token';
import * as UserDAO from '@@daos/UserDAO';

export const signUpUser: SignInUser = async function ({
  password,
  userId,
}) {
  try {
    const token = await Token.create({
      payload: {
        userId,
      },
    });
    
    const result = await UserDAO.insert(userId, password);
    return new ApiResult({
      result,
      token,
    });
  } catch (err) {
    return new ApiResult({});
  }
}

interface SignInUser {
  (param: {
    password: string;
    userId: string;
  }): Promise<ApiResult<any | undefined>>;
}
