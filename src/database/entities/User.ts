import {Column, Entity} from 'typeorm';


import {DB1} from '@database/db';
import BaseEntity from '@entities/BaseEntity';

@Entity({ database: DB1 })
export default class User extends BaseEntity {

  @Column()
  public username: string;

  @Column()
  public password: string;

  @Column()
  public emaiil: string;

  @Column()
  public karma: string;

  @Column({
    default: 'N',
  })
  public status: string;
};
