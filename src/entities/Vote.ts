import {Column, Entity, OneToMany} from 'typeorm';

import BaseEntity from '@entities/BaseEntity';
import { DB1 } from '@modules/Database';
import VoteInstance from '@entities/VoteInstance';

@Entity({ database: DB1 })
export default class Vote extends BaseEntity {
  @Column()
  public downvoteCount: number;

  @Column({
    default: 'N',
  })
  public status: string;

  @Column()
  public targetId: number;

  @Column()
  public targetType: 'C' | 'D';

  @Column()
  public upvoteCount: number;

  @OneToMany((type) => VoteInstance, (voteInstance) => voteInstance.vote, {
  })
  public voteInstances?: VoteInstance[];

  constructor(param?: {
    downvoteCount,
    targetId,
    targetType,
    upvoteCount,
  }) {
    super();
    if (param) {
      this.downvoteCount = param.downvoteCount;
      this.targetId = param.targetId;
      this.targetType = param.targetType;
      this.upvoteCount = param.upvoteCount;
    }
  }
};
