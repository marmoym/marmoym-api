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
export default class Pos extends BaseEntity {
  @Column()
  label: string;

  @Column({
    nullable: true,
  })
  labelEn: string;

  @Column({
    default: 'N',
  })
  status: string;
};
