import {Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne} from 'typeorm';

import BaseEntity from '@entities/BaseEntity';
import { DB1 } from '@modules/Database';
import Pos from '@entities/Pos';
import Term from '@entities/Term';
import Usage from '@entities/Usage';
import User from '@entities/User';
import Vote from '@entities/Vote';

@Entity({ database: DB1 })
export default class Definition extends BaseEntity {
  @Column()
  public label: string;

  @Column()
  public termId: number;

  @ManyToOne((type) => Term, {
    cascade: true,
    eager: true,
  })
  @JoinColumn({
    name: 'termId',
  })
  public term: Term;

  @Column()
  public userId: number;

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
  
  @ManyToMany((type) => Pos, {
    eager: true,
  })
  @JoinTable()
  public poss: Pos[];

  @OneToMany((type) => Usage, (usage) => usage.definition, {
    cascade: true,
    eager: true,
  })
  public usages: Usage[];

  @Column()
  public voteId: number;

  @OneToOne((type) => Vote, {
    eager: true,
  })
  @JoinColumn({
    name: 'voteId',
  })
  public vote: Vote;
};
