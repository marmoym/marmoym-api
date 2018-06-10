import {Column, Entity, OneToMany} from 'typeorm';

import BaseEntity from '@entities/BaseEntity';
import { DB1 } from '@modules/Database';
import VoteInstance from '@entities/VoteInstance';

@Entity({ database: DB1 })
export default class Vote extends BaseEntity {
  @Column()
  public targetType: string;

  // @Column()
  // public targetId: number;

  @Column()
  public upVoteCount: number;

  @Column()
  public downVoteCount: number;

  @Column()
  public status: string;

  @OneToMany((type) => VoteInstance, (voteInstance) => voteInstance.vote, {
  })
  public voteInstances: VoteInstance[];
};
