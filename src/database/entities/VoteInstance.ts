import {Column, Entity, JoinColumn, ManyToOne} from 'typeorm';

import BaseEntity from '@entities/BaseEntity';
import {DB1} from '@database/db';
import User from '@entities/User';

@Entity({ database: DB1 })
export default class VoteInstance extends BaseEntity {
  @Column()
  public targetType: string;

  @Column()
  public targetId: number;

  @ManyToOne((type) => User)
  @JoinColumn({
    name: 'userId',
  })
  public user: User;

  @Column()
  public action: string;

  @Column()
  public status: string;

};
