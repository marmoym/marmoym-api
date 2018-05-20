import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn, 
} from "typeorm";

import { DB1 } from '@database/connections';

@Entity({ database: DB1 })
export default class Term {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  label: string;

  @Column()
  roman: string;

  @Column()
  status: string;

  
  
};
