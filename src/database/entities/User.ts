import {Column, Entity, PrimaryGeneratedColumn,} from 'typeorm';


import {DB1} from '@database/db';

@Entity({ database: DB1 })
export default class User {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public label: string;

  @Column({
    default: 'N',
  })
  public status: string;
};
