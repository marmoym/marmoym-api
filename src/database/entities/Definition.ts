import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  OneToOne, 
} from "typeorm";

import BaseEntity from '@entities/BaseEntity';
import { DB1 } from '@database/db';
import Pos from '@entities/Pos';
import Term from '@entities/Term';
import Usage from '@entities/Usage';
import User from '@entities/User';
import Vote from '@entities/Vote';

@Entity({ database: DB1 })
export default class Definition extends BaseEntity {
  @Column()
  label: string;

  @ManyToOne((type) => Term, {
    cascade: true,
  })
  @JoinColumn({
    name: 'termId',
  })
  term: Term;

  @ManyToOne((type) => User)
  @JoinColumn({
    name: 'userId',
  })
  user: User;

  @Column({
    default: 'N',
  })
  status: string;
  
  @ManyToMany(type => Pos)
  @JoinTable()
  pos: Pos[];

  @OneToMany(type => Usage, usage => usage.definition, {
    cascade: true,
    eager: true,
  })
  usage: Usage[];

  @OneToOne(type => Vote)
  @JoinColumn()
  vote: Vote;
};
