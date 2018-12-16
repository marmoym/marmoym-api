import BaseParam from '@@models/params/BaseParam';

export default interface UserSignUpParam extends BaseParam {
  password;
  userId;
}
