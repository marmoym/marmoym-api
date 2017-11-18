import definitionRequest from './requestHandlers/definitionRequest';
import userRequest from './requestHandlers/userRequest';

export default {
  ...definitionRequest,
  ...userRequest,
}