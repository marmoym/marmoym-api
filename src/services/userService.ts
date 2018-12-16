import ApiResult from '@@models/ApiResult';
import Token from '@@modules/Token';
import * as UserDAO from '@@daos/UserDAO';
import UserSignUpParam from '@@models/params/UserSignUpParam';

export async function signUpUser({
  password,
  userId,
}: UserSignUpParam): Promise<ApiResult<any>> {
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
    return new ApiResult(null, err);
  }
}
