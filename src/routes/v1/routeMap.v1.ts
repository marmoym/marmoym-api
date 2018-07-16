import ApiURL from '@models/ApiURL';
import * as definitionService from '@services/Definition/definitionService';
import * as userService from '@services/User/userService';
import HttpMethod from '@constants/HttpMethod';
import { optional, requireNonEmpty } from '@src/utils/objectUtils';
import { Route } from '@routes/routes';

const pathOrderedRouteMap: Route[] = [
  // {
  //   action: AdminAction.postAdminSeed,
  //   method: HttpMethod.GET,
  //   path: ApiURL.ADMIN_SEED,
  // },
  // {
  //   action: CommentAction.postComment,
  //   method: HttpMethod.POST,
  //   path: ApiURL.COMMENT,
  // },
  // {
  //   action: CommentAction.getComments,
  //   method: HttpMethod.GET,
  //   path: ApiURL.COMMENTS,
  // },
  {
    action: definitionService.getDefinitions,
    createParam: (req) => {
      return {
        limit: optional(req.body.limit).orElse(10),
        offset: optional(req.body.offset).orElse(0),
        search: req.body.search,
      };
    },
    method: HttpMethod.POST,
    path: ApiURL.DEFINITIONS,
  },
  // {
  //   action: DefinitionAction.postDefinitionsDefinitionid,
  //   method: HttpMethod.POST,
  //   path: ApiURL.DEFINITIONS_$DEFINITIONID,
  // },
  // {
  //   action: DefinitionAction.postDefinitionNew,
  //   method: HttpMethod.POST,
  //   path: ApiURL.DEFINITION_NEW,
  // },
  {
    action: userService.signUpUser,
    method: HttpMethod.POST,
    path: ApiURL.USER_NEW,
  },
  // {
  //   action: UserAction.postSessionNew,
  //   method: HttpMethod.POST,
  //   path: ApiURL.SESSION_NEW,
  // },
  // {
  //   action: VoteAction.upVote,
  //   method: HttpMethod.POST,
  //   path: ApiURL.VOTE_UP,
  // },
  // {
  //   action: VoteAction.downVote,
  //   method: HttpMethod.POST,
  //   path: ApiURL.VOTE_DOWN,
  // },
];

export default pathOrderedRouteMap;
