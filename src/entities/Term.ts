import {Column, Entity, JoinColumn, ManyToOne} from 'typeorm';

import BaseEntity from '@entities/BaseEntity';
import { DB1 } from '@modules/Database';
import User from '@entities/User';

@Entity({ database: DB1 })
export default class Term extends BaseEntity {
  @Column()
  public label: string;

  @Column()
  public roman: string;

  @Column()
  public status: string;

  @ManyToOne((type) => User)
  @JoinColumn({
    name: 'userId',
  })
  public user: User;
};
