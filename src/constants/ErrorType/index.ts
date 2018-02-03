import UserErrorType from './UserErrorType';
import DefinitionErrorType from './DefinitionErrorType';
import AuthErrorType from './AuthErrorType';
import TermErrorType from './TermErrorType';
import MiscErrorType from './MiscErrorType';

export default {
  ...AuthErrorType,
  ...DefinitionErrorType,
  ...MiscErrorType,
  ...TermErrorType,
  ...UserErrorType,
}