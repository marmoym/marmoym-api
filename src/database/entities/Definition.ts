import {Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne} from 'typeorm';

import BaseEntity from '@entities/BaseEntity';
import {DB1} from '@database/db';
import Pos from '@entities/Pos';
import Term from '@entities/Term';
import Usage from '@entities/Usage';
import User from '@entities/User';
import Vote from '@entities/Vote';

@Entity({ database: DB1 })
export default class Definition extends BaseEntity {
  @Column()
  public label: string;

  @ManyToOne((type) => Term, {
    cascade: true,
  })
  @JoinColumn({
    name: 'termId',
  })
  public term: Term;

  @ManyToOne((type) => User)
  @JoinColumn({
    name: 'userId',
  })
  public user: User;

  @Column({
    default: 'N',
  })
  public status: string;
  
  @ManyToMany((type) => Pos)
  @JoinTable()
  public pos: Pos[];

  @OneToMany((type) => Usage, (usage) => usage.definition, {
    cascade: true,
    eager: true,
  })
  public usage: Usage[];

  @OneToOne((type) => Vote)
  @JoinColumn()
  public vote: Vote;
};
