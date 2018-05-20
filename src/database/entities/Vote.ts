import {Column, Entity,} from 'typeorm';

import BaseEntity from '@entities/BaseEntity';
import {DB1} from '@database/db';

@Entity({ database: DB1 })
export default class Vote extends BaseEntity {
  @Column()
  public targetType: string;

  @Column()
  public targetId: number;

  @Column()
  public upVoteCount: number;

  @Column()
  public downVoteCount: number;

  @Column()
  public status: string;
};
