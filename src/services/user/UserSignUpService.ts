// import * as bcrypt from 'bcrypt';

// import db from '@database/db';
// import * as UserInsertDAO from '@daos/User/UserInsertDAO';
// import * as UserSelectDAO from '@daos/User/UserSelectDAO';
// import { transaction } from '../../database/databaseUtils';
// import authConfig from '@config/authConfig';
// import AppError from "../../models/AppError";
// // import ErrorType from '@constants/ErrorType';
// import SignUpUserParam from '@models/requestParam/SignUpUserParam';

// export function signUpUser(param: SignUpUserParam) {
//   return transaction(async trx => {

//     // Check if email exists
//     const userSelectedByEmail = await UserSelectDAO.selectUserByEmail(param.email);

//     // Check if username exists
//     const userSelectedByUsername = await UserSelectDAO.selectUserByUsername(param.username);

//     if (userSelectedByEmail.length == 0 && userSelectedByUsername.length == 0) {
//       const encodedPw = bcrypt.hashSync(param.password, authConfig.hashSalt);
//       const userInserted = await UserInsertDAO.insertUser(trx, param, encodedPw);

//       return 'UserSignUpSuccess'
//     } else if (userSelectedByEmail.length == 0) {
//       // throw new AppError(ErrorType.EMAIL_ALREADY_USED);
//     } else {
//       // throw new AppError(ErrorType.USERNAME_ALREADY_USED);
//     }
//   });
// }
