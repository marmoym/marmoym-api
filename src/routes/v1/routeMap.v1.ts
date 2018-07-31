import { Request, Response } from 'express';

import ApiURL from '@models/ApiURL';
import definitionService, { 
  AddDefinitionParam,
} from '@services/Definition/definitionService';
import HttpMethod from '@constants/HttpMethod';
import * as migrateService from '@services/migrateService';
import { optional, requireNonEmpty } from '@src/utils/objectUtils';
import { Route } from '@routes/routes';
import * as userService from '@services/User/userService';


const pathOrderedRouteMap: Route[] = [
  {
    action: migrateService.seed,
    method: HttpMethod.GET,
    path: ApiURL.ADMIN_SEED,
  },
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
    createParam: (req: Request) => {
      return {
        limit: optional(req.body.limit).orElse(10),
        offset: optional(req.body.offset).orElse(0),
        search: req.body.search,
      };
    },
    method: HttpMethod.POST,
    path: ApiURL.DEFINITIONS,
  },
  {
    action: definitionService.getDefinitionById,
    createParam: (req: Request) => {
      return {
        definitionId: req.body.definitionId,
        limit: req.body.limit,
        offset: req.body.offset,
      };
    },
    method: HttpMethod.POST,
    path: ApiURL.DEFINITIONS_$DEFINITIONID,
  },
  {
    action: definitionService.addDefinition,
    createParam: (req: Request) => {
      return {
        definition: req.body.definition,
      };
    },
    method: HttpMethod.POST,
    path: ApiURL.DEFINITION_NEW,
  },
  {
    action: userService.signUpUser,
    createParam: (req: Request) => {
      return {
        email: requireNonEmpty(req.body.email),
        password: requireNonEmpty(req.body.password),
        username: requireNonEmpty(req.body.username),
      };
    },
    method: HttpMethod.POST,
    path: ApiURL.USER_NEW,
  },
  {
    action: userService.signInUser,
    createParam: (req: Request) => {
      return {
        email: requireNonEmpty(req.body.email),
        password: requireNonEmpty(req.body.password),
      };
    },
    method: HttpMethod.POST,
    path: ApiURL.SESSION_NEW,
  },
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
