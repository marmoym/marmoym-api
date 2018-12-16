import ApiResponse from '@@models/ApiResponse';
import Token from '@@modules/Token';
import * as UserDAO from '@@daos/UserDAO';
import UserSignUpParam from '@@models/params/UserSignUpParam';

export async function signUpUser({
  password,
  userId,
}: UserSignUpParam): Promise<ApiResponse<any>> {
  try {
    const token = await Token.create({
      payload: {
        userId,
      },
    });
    
    const result = await UserDAO.insert(userId, password);
    return new ApiResponse({
      result,
      token,
    });
  } catch (err) {
    return new ApiResponse(null, err);
  }
}
