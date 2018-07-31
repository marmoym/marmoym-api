import Definition from '@entities/Definition';
import Term from '@entities/Term';
import User from '@entities/User';
import Vote from '@entities/Vote';

const term1 = new Term({
  id: 1,
  label: 'term0',
});

const term2 = new Term({
  id: 2,
  label: 'term1',
});

const term3 = new Term({
  id: 3,
  label: 'term2',
});

const user1 = new User({
  email: 'user0@email.com',
  id: 1,
  password: '$2a$10$SKF7vz43Bi/r0PEHgztgYOBhFQMwbcxAUn2JEAR8qTEJBAs7a1f4m',
  username: 'user0',
});

const user2 = new User({
  email: 'user1@email.com',
  id: 2,
  password: '$2a$10$SKF7vz43Bi/r0PEHgztgYOBhFQMwbcxAUn2JEAR8qTEJBAs7a1f4m',
  username: 'user1',
});

const user3 = new User({
  email: 'user2@email.com',
  id: 3,
  password: '$2a$10$SKF7vz43Bi/r0PEHgztgYOBhFQMwbcxAUn2JEAR8qTEJBAs7a1f4m',
  username: 'user2',
});

const vote1 = new Vote({
  downvoteCount: 0,
  targetId: 1,
  targetType: 'D',
  upvoteCount: 0,
});

const vote2 = new Vote({
  downvoteCount: 0,
  targetId: 2,
  targetType: 'D',
  upvoteCount: 0,
});

const vote3 = new Vote({
  downvoteCount: 0,
  targetId: 3,
  targetType: 'D',
  upvoteCount: 0,
});

const definition1 = new Definition({
  id: 1,
  label: 'definition1',
  term: term1,
  user: user1,
  vote: vote1,
});

const definition2 = new Definition({
  id: 2,
  label: 'definition2',
  term: term2,
  user: user2,
  vote: vote2,
});

const definition3 = new Definition({
  id: 3,
  label: 'definition3',
  term: term3,
  user: user3,
  vote: vote3,
});

const seedData: {
  definitions: Definition[],
  users: User[],
} = {
  definitions: [
    definition1,
    definition2,
    definition3,
  ],
  users: [
    user1,
    user2,
    user3,
  ],
};

export default seedData;
