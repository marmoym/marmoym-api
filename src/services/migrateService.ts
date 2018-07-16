import {getCustomRepository} from 'typeorm';
import {Request, Response} from 'express';

import ApiURL from '@models/ApiURL';
import DefinitionGetParam from '@models/definition/DefinitionGetParam';
// import DefinitionGetService from '@services/Definition/DefinitionService';
import { DB1 } from '@modules/Database';
import {DefinitionRepository} from '@src/repositories/DefinitionRepository';
import User from '@entities/User';
import {UserRepository} from '@src/repositories/UserRepository';
import Definition from '@entities/Definition';
import {optional} from '@src/utils/objectUtils';
import Pos from '@entities/Pos';
import {PosRepository} from '@src/repositories/PosRepository';
import Term from '@entities/Term';
import {TermRepository} from '@src/repositories/TermRepository';
import Usage from '@entities/Usage';
import Vote from '@entities/Vote';
import {VoteRepository} from '@src/repositories/VoteRepository';

export async function seed(request: Request, response: Response) {
  console.log('makeSeed!!');

  const userRepo = getCustomRepository(UserRepository, DB1);
  const termRepo = getCustomRepository(TermRepository, DB1);
  const posRepo = getCustomRepository(PosRepository, DB1);
  const voteRepo = getCustomRepository(VoteRepository, DB1);
  const defRepo = getCustomRepository(DefinitionRepository, DB1);
  
  const posLabels = ['명사', '동사'];
  const posLabelEns = ['noun', 'verb'];
  const termLabels = ['앙기모띠', '사과', '바나나', '포도', '트로피카나', '코코넛', '비트코인', '이오스', '가즈아'];
  const termRoman = ['anggimochi', 'saghwa', 'banana', 'podo', 'tropicana', 'coconut', 'bitcoin', 'eos', 'gazzua'];
  const defLabels = ['기분좋다라고하는뜻', '과일종류중 하나 애쁠이다', '과일종류중 하나 바나나', '과일종류중 하나 포도', '포도톡톡 트로피카나~', '과일종류중 하나 코코넛', '암호화폐 기축통화', '미래의 이더리움', '가자의 변형'];
  const defUsages = ['앙 기모띠~~ 여러분들 감사합니다', '사과 톡톡톡 트로피카나~', '바나나 먹으면 바나나', '포도 톡톡톡 트로피카나~', '트로피카나 스파클링~', '코코넛밀크', '비트코인 연말 1억가즈아', '이오스 6월5만원가즈아~', '떡상 가즈아~']

  const users: User[] = [];
  for (let i = 1; i <= 20; i++) {
    const user = new User();
    user.username = 'seeduser' + i;
    user.password = '$2a$10$SKF7vz43Bi/r0PEHgztgYOBhFQMwbcxAUn2JEAR8qTEJBAs7a1f4m';
    user.email = 'seed' + i + '@tymsai.com';
    user.status = 'N';
    user.karma = 0;
    users.push(user);
  }
  await userRepo.save(users);
  console.log('user Inserted');
  
  const poss: Pos[] = [];
  for (let i = 0; i < 2; i++){
    const pos = new Pos();
    pos.label = posLabels[i];
    pos.labelEn = posLabelEns[i];
    pos.status = 'N';
    poss.push(pos);
  }
  await posRepo.save(poss);
  console.log('pos Inserted');

  const terms: Term[] = [];
  for (let i = 0; i < 9; i++) {
    const term = new Term();
    term.label = termLabels[i];
    term.roman = termRoman[i];
    term.status = 'N'
    const user = new User();
    user.id = i + 1;
    term.user = user;
    terms.push(term);
  }
  await termRepo.save(terms);
  console.log('term Inserted');

  const defs: Definition[] = [];
  for (let i = 0; i < 9; i++) {
    console.log(1);
    const def = new Definition();
    console.log(def);
    def.label = defLabels[i];
    const term = new Term();
    term.id = i + 1;
    def.term = term;
    const pos = new Pos();
    pos.id = (i % 2) + 1;
    console.log(pos.id);
    def.poss = [ pos ];
    const usage = new Usage();
    usage.label = defUsages[i];
    usage.status = 'N';
    def.usages = [ usage ];
    const user = new User();
    user.id = i + 1;
    def.user = user;

    const vote = new Vote();
    vote.downVoteCount = 0;
    vote.upVoteCount = 0;
    vote.targetType = 'D';
    vote.status = 'N';
    def.vote = vote;

    console.log(def);
    defs.push(def);
  }
  await defRepo.save(defs);
  console.log('def Inserted');
};
