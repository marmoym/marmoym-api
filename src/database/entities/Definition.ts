import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn, 
} from "typeorm";

import { DB1 } from '@database/connections';
import Term from '@entities/Term';
import User from '@entities/User';

@Entity({ database: DB1 })
export default class Definition {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  label: string;

  @ManyToOne((type) => Term, {
    cascade: true,
  })
  @JoinColumn({
    name: 'term_id',
  })
  term: Term;

  @ManyToOne((type) => User)
  user: User;

};
