import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn, 
} from "typeorm";


import { DB1 } from '@database/db';

@Entity({ database: DB1 })
export default class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  label: string;

  @Column({
    default: 'N',
  })
  status: string;
};
