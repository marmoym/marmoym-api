import {Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne} from 'typeorm';

import BaseEntity from '@entities/BaseEntity';
import { DB1 } from '@modules/Database';
import Term from '@entities/Term';
import User from '@entities/User';
import Vote from '@entities/Vote';

@Entity({ database: DB1 })
export default class Definition extends BaseEntity {
  @Column()
  public label: string;

  // @Column()
  // public termId: number;

  @ManyToOne((type) => Term, {
    eager: true,
  })
  @JoinColumn({
    name: 'termId',
  })
  public term: Term;

  // @Column()
  // public userId: number;

  @ManyToOne((type) => User, {
    eager: true,
  })
  @JoinColumn({
    name: 'userId',
  })
  public user: User;

  @Column({
    default: 'N',
  })
  public status: string;
  
  // @Column()
  // public voteId: number;

  @OneToOne((type) => Vote, {
    cascade: true,
    eager: true,
  })
  @JoinColumn({
    name: 'voteId',
  })
  public vote: Vote;
};
