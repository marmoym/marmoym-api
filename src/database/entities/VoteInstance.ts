import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn, 
} from "typeorm";

import BaseEntity from '@entities/BaseEntity';
import { DB1 } from '@database/db';
import Term from '@entities/Term';
import User from '@entities/User';

@Entity({ database: DB1 })
export default class VoteInstance extends BaseEntity {
  @Column()
  targetType: string;

  @Column()
  targetId: number;

  @ManyToOne((type) => User)
  @JoinColumn({
    name: 'userId',
  })
  user: User;

  @Column()
  action: string;

  @Column()
  status: string;
  
};
